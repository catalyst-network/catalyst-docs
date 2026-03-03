---
sidebar_position: 1
title: What is Catalyst?
---

Catalyst is a blockchain stack (node + RPC + SDK + apps) focused on running a practical network and building an ecosystem around it.

## You will need

- A Catalyst RPC endpoint (public testnet or a local node)
- A wallet (for end users) or a signing key (for builders/operators)

## Key components (where to look for canonical truth)

- **Node (Rust)**: consensus, state, networking, JSON-RPC server  
  Repo: [`catalyst-network/catalyst-node-rust`](https://github.com/catalyst-network/catalyst-node-rust)
- **SDK + deploy tooling (TypeScript)**: CTX2 tx builder/signing, deploy CLI  
  Repo: [`catalyst-network/catalyst-sdk`](https://github.com/catalyst-network/catalyst-sdk)
- **Explorer + indexer (Node.js)**: reads RPC, indexes blocks/txs  
  Repo: [`catalyst-network/BlockExplorer`](https://github.com/catalyst-network/BlockExplorer)
- **Faucet (Node.js + infra)**: testnet KAT distribution service  
  Repo(s): [`catalyst-network/Faucet`](https://github.com/catalyst-network/Faucet)
- **Wallet (WebWallet)**: testnet wallet implementation  
  Repo: [`catalyst-network/WebWallet`](https://github.com/catalyst-network/WebWallet)

## Terminology used in these docs

- **Cycle vs block**: In Catalyst, a “block” corresponds to a **consensus cycle**. Some cycles may produce no block/LSU; RPC calls can legitimately return `null` for those cycles (explorer displays “No block produced”).  
  Canonical note: [`BlockExplorer/README.md`](https://github.com/catalyst-network/BlockExplorer/blob/main/README.md) and [`catalyst-node-rust/docs/explorer-handoff.md`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/docs/explorer-handoff.md).
- **pubkey32 vs address20**:
  - **`pubkey32`**: 32-byte hex public key used as the account identifier in protocol transactions (example: `0x<64 hex>`).
  - **`address20`**: 20-byte hex EVM address used for contracts and EVM account derivations (example: `0x<40 hex>`).

## Verify (quick sanity checks)

If you have an RPC URL, you can confirm basic chain identity:

```bash
RPC_URL="https://testnet-eu-rpc.catalystnet.org"

curl -sS "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getTxDomain","params":[]}' | jq
```

Expected shape (fields may grow over time, but these are stable for tooling):

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "chain_id": "0x...",
    "network_id": "catalyst-testnet",
    "genesis_hash": "0x...",
    "protocol_version": 0,
    "tx_wire_version": 2
  }
}
```

## Troubleshooting

- **`catalyst_getTxDomain` fails**: you’re likely hitting the wrong URL (not an HTTP JSON-RPC endpoint) or a node without RPC enabled.

