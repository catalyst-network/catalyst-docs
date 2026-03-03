---
sidebar_position: 1
title: EVM support status
---

Catalyst supports EVM smart contracts, but the execution and tooling model is **not Ethereum**.

## Current status (today)

Based on the current node implementation:

- **Deploy**: supported via CTX2 smart-contract transactions (`catalyst_sendRawTransaction`)
- **Read code**: supported via `catalyst_getCode(address20)`
- **Storage reads**: supported via `catalyst_getStorageAt(address20, slot32)`
- **Receipts**: supported via `catalyst_getTransactionReceipt(tx_id)`

Canonical references:

- Node deploy doc: `catalyst-node-rust/docs/evm-deploy.md`
- RPC methods: `catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`
- SDK deploy helpers: `catalyst-sdk/packages/sdk/src/evm/deploy.ts`

## What’s different vs Ethereum

- **Submission method**: `catalyst_sendRawTransaction` (not `eth_sendRawTransaction`)
- **Signing domain**: `catalyst_getTxDomain` (single-call domain separation; includes `genesis_hash`)
- **Cycle/block semantics**: some cycles produce no block/LSU; explorers must handle gaps

## Verify

After deployment, confirm code exists:

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getCode\",
    \"params\":[\"0x<address20>\"]
  }" | jq -r '.result'
```

