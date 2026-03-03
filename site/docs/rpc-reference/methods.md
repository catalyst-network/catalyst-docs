---
sidebar_position: 2
title: RPC methods (catalog)
---

This page is a catalog of the current Catalyst JSON-RPC surface.

Canonical source of truth:

- [`catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/crates/catalyst-rpc/src/lib.rs) (`trait CatalystRpc`)

## Stable vs experimental

- **Stable**: relied on by wallets/SDK/explorer today.
- **Experimental**: may change; pin node version/commit if you depend on it.

## Identity / domain

- **Stable**: `catalyst_getTxDomain()` → `{ chain_id, network_id, genesis_hash, protocol_version, tx_wire_version }`
- **Stable**: `catalyst_chainId()` → `0x...` (hex string)
- **Stable**: `catalyst_networkId()` → string
- **Stable**: `catalyst_genesisHash()` → `0x...` (32 bytes hex string; best-effort for legacy DBs)

## Sync / snapshots

- **Stable**: `catalyst_getSyncInfo()` → chain identity + head
- **Experimental**: `catalyst_getSnapshotInfo()` → operator-published snapshot metadata or `null`

## Chain head / blocks

- **Stable**: `catalyst_head()` → `{ applied_cycle, applied_lsu_hash, applied_state_root, last_lsu_cid? }`
- **Stable**: `catalyst_blockNumber()` → `u64`
- **Stable**: `catalyst_getBlockByNumber(number, full_transactions)` → `block | null`
- **Stable**: `catalyst_getBlockByHash(hash32, full_transactions)` → `block | null`
- **Stable**: `catalyst_getBlocksByNumberRange(start, count, full_transactions)` → `block[]`

## Transactions

- **Stable**: `catalyst_sendRawTransaction(0x<bytes>)` → `0x<tx_id>`
- **Stable**: `catalyst_getTransactionReceipt(tx_id)` → `receipt | null`
- **Stable**: `catalyst_getTransactionByHash(tx_id)` → `tx | null`
- **Stable**: `catalyst_getTransactionInclusionProof(tx_id)` → `proof | null`
- **Experimental**: `catalyst_getTransactionsByAddress(pubkey32, from_cycle?, limit)` → `summary[]` (best-effort scan)

## Accounts

- **Stable**: `catalyst_getBalance(pubkey32)` → string (integer)
- **Experimental**: `catalyst_getBalanceProof(pubkey32)` → `{ balance, state_root, proof[] }`
- **Stable**: `catalyst_getNonce(pubkey32)` → `u64`
- **Experimental**: `catalyst_getAccount(pubkey32)` → object or `null` (shape may evolve)

## Node info

- **Experimental**: `catalyst_networkInfo()` → object (currently minimal)
- **Experimental**: `catalyst_syncing()` → bool or sync object (currently minimal)
- **Experimental**: `catalyst_peerCount()` → `u64`
- **Stable**: `catalyst_version()` → string

## EVM helpers

- **Stable**: `catalyst_getCode(address20)` → `0x...` (empty `0x` if none)
- **Stable**: `catalyst_getStorageAt(address20, slot32)` → `0x...` (32 bytes)
- **Experimental**: `catalyst_getLastReturn(address20)` → `0x...` (dev placeholder)

