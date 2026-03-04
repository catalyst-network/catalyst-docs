---
sidebar_position: 1
title: "RPC: transaction lifecycle"
---

:::note Not for everyday users
If you’re just using a wallet or an app, you don’t need this page.

This page is for people building wallets, SDKs, dApps, and tooling that submit transactions directly to Catalyst RPC.
:::

This page is the canonical “how a tx moves through Catalyst” reference:

1) fetch domain  
2) build + sign  
3) submit  
4) poll receipt until final

Canonical implementation: [`catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/crates/catalyst-rpc/src/lib.rs) (methods `catalyst_getTxDomain`, `catalyst_sendRawTransaction`, `catalyst_getTransactionReceipt`).

## You will need

- An HTTP JSON-RPC URL (example: `https://testnet-eu-rpc.catalystnet.org`)
- `curl` and `jq`

## Steps

### 1) Fetch signing domain (required)

Always fetch the signing domain in **one call**:

```bash
RPC_URL="https://testnet-eu-rpc.catalystnet.org"

curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getTxDomain","params":[]}' | jq
```

Expected response shape:

```json
{
  "result": {
    "chain_id": "0x...",
    "network_id": "catalyst-testnet",
    "genesis_hash": "0x...",
    "protocol_version": 0,
    "tx_wire_version": 2
  }
}
```

Why this matters:

- Tooling should **not** fetch `chainId` and `genesisHash` via separate calls. With load balancers, you can hit different backends and get mismatched identity, causing signature verification failures.

### 2) Build + sign a transaction (CTX2)

Catalyst uses **CTX2** transactions submitted via:

- `catalyst_sendRawTransaction`

This is **not** Ethereum `eth_sendRawTransaction`. The easiest way to build/sign is to use the SDK tooling.

Recommended paths:

- **SDK library**: `@catalyst/sdk`
- **CLI deploy/call**: `catalyst-sdk` repo (`node packages/cli/dist/index.js ...`)
- **Node CLI**: `catalyst-cli` (for operators)

### 3) Submit (`catalyst_sendRawTransaction`)

Submit a signed raw tx hex (string).

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"catalyst_sendRawTransaction",
    "params":["0x<signed_ctx2_bytes_hex>"]
  }' | jq
```

Expected response:

```json
{ "result": "0x<tx_id_32_bytes_hex>" }
```

Notes (implementation details that affect clients):

- The server rejects overly large tx payloads and validates a **fee floor** before accepting.
- The server verifies the tx signature using the domain (chain id + genesis hash).
- The server rejects **nonce too low** at the RPC boundary (replay protection).

### 4) Poll receipt (`catalyst_getTransactionReceipt`)

```bash
TX_ID="0x<tx_id>"

curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getTransactionReceipt\",
    \"params\":[\"$TX_ID\"]
  }" | jq
```

Receipt fields (current shape, subject to additive changes):

- `status`: one of `pending`, `selected`, `applied`, `dropped`
- `selected_cycle`: cycle number once the tx is selected for inclusion
- `applied_cycle`: cycle number once applied
- `applied_state_root`: authenticated state root after apply (when available)
- `success` / `error`: EVM/apply outcome (when available)

## Verify

A tx is “final” for most clients when `status == "applied"` or `status == "dropped"`.

For contract deployments, verify code exists:

```bash
CONTRACT="0x<address20>"

curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getCode\",
    \"params\":[\"$CONTRACT\"]
  }" | jq -r '.result'
```

Expected:

- `0x...` (non-empty) for deployed code
- `0x` for “no code”

## Troubleshooting

### `-32029` rate limited

Some endpoints will return JSON-RPC error code **`-32029`** when rate limited.

Mitigation:

- add client-side backoff + jitter
- spread calls across time (don’t poll receipts at 50ms; use ~1–2s and increase)
- for indexers, prefer batch/range calls (see `catalyst_getBlocksByNumberRange`)

### “Invalid transaction signature”

Most common causes:

- tooling used the wrong signing domain (wrong network / mismatched `genesis_hash`)
- chain identity skew behind an LB (use `catalyst_getTxDomain` single-call domain)

### “Nonce too low”

You submitted a tx with `nonce <= committed_nonce` for that sender.

Mitigation:

- fetch nonce via `catalyst_getNonce(pubkey32)` and increment correctly
- ensure you don’t re-send already-applied txs after restart (track tx ids + nonces)

