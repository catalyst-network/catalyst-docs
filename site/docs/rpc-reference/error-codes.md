---
sidebar_position: 3
title: Error codes
---

This page documents error behaviors clients should handle.

Canonical source:

- `catalyst-node-rust/crates/catalyst-rpc/src/lib.rs` (`RPC_ERR_RATE_LIMITED_CODE`, signature/nonce checks)

## `-32029` rate limited

Some methods may return JSON-RPC error code **`-32029`** when the node is rate limiting.

Client guidance:

- retry with exponential backoff + jitter
- reduce polling frequency (especially receipts)
- for indexers, prefer range calls like `catalyst_getBlocksByNumberRange`

## Invalid params

Examples (current behavior for `catalyst_sendRawTransaction`):

- tx too large (hex chars > limit)
- fee too low (below minimum required)
- invalid signature
- nonce too low

## Not found

Many “get by hash/number” methods return `null` when data is missing:

- a cycle produced no block/LSU
- a tx is unknown or pruned
- you’re querying beyond history retention (pruned nodes)

