---
sidebar_position: 3
title: Key concepts
---

This page defines the concepts referenced across operator, wallet, and builder docs.

## Cycle, block, LSU

- **Cycle**: the consensus time unit.
- **Block**: the explorer-friendly term for a cycle that produced a ledger update.
- **LSU (Ledger State Update)**: the applied state transition for a cycle.

Important: some cycles legitimately produce **no LSU**, so `catalyst_getBlockByNumber(<cycle>)` can return `null`.

## Accounts, keys, identifiers

- **Protocol account**: identified by a **32-byte public key** (`pubkey32`), hex-encoded as `0x<64 hex>`.
- **EVM address**: 20-byte hex address (`address20`), `0x<40 hex>`.

In several places, Catalyst derives the EVM address from a protocol key:

- `evm_sender = last20(pubkey32)`

Canonical reference: `catalyst-sdk/README.md` (“Deterministic contract addresses”).

## Transactions (CTX2)

Catalyst tooling uses **CTX2** transactions submitted via:

- `catalyst_sendRawTransaction`

This is **not** Ethereum `eth_sendRawTransaction`.

Canonical references:

- `catalyst-sdk/README.md` (CTX2 + method name)
- `catalyst-node-rust/crates/catalyst-rpc/src/lib.rs` (`catalyst_sendRawTransaction`)

## Typical transaction flow

- Fetch signing domain: `catalyst_getTxDomain`
- Build + sign tx (SDK or CLI)
- Submit: `catalyst_sendRawTransaction`
- Poll: `catalyst_getTransactionReceipt`
- For contracts, verify code: `catalyst_getCode`

See **[RPC: transaction lifecycle](/docs/rpc-reference/transaction-lifecycle)** for end-to-end examples.

## Tokenomics (v1 baseline)

- Fair launch: `0 KAT` at genesis.
- Fixed issuance: `1 KAT` per successful cycle (target ~20s).
- Unit scale: `1 KAT = 1_000_000_000 atoms` (`block_reward_atoms = 1_000_000_000`).
- Fee routing: `70%` burn, `30%` reward pool, `0%` treasury.
- Reward split baseline: producer set gets larger share; eligible waiting workers also receive rewards.
- Fee credits: only for eligible waiting workers, non-transferable, and never a replacement for mandatory transaction fees.

See **[Overview: tokenomics](/docs/overview/tokenomics)** for parameters, rationale, and verification.

