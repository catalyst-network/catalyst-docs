---
sidebar_position: 2
title: Wallet builder guide
---

This page is for teams implementing wallet support (signing + submission + nonce management).

Canonical handoff references:

- `catalyst-node-rust/docs/wallet-interop.md`
- `catalyst-node-rust/docs/wallet-builder-handoff-catalyst-testnet.md`
- Wallet implementation: `WebWallet/` repo

:::warning
Never ask users to paste private keys into web forms. Wallets must handle signing locally and securely.
:::

## You will need

- A JSON-RPC endpoint (or a list with failover)
- A transaction signing implementation for Catalyst (CTX2) with the correct domain separation

## Steps

### 1) Treat chain identity as a single “domain”

Fetch in one call:

- `catalyst_getTxDomain`

Reason: avoids chain identity skew behind load balancers.

### 2) Build and sign CTX2 transactions

- Submit via `catalyst_sendRawTransaction` (not Ethereum `eth_sendRawTransaction`)
- Use the domain’s `chain_id` + `genesis_hash` in the signing payload

If you are using the SDK:

- `@catalyst/sdk` exports `getTxDomain`, `signingPayloadV2`, and helpers.

### 3) Nonce management

- Read committed nonce: `catalyst_getNonce(pubkey32)`
- Protocol nonces are monotonic per-sender.

Wallet pattern:

- keep a local “pending nonce” counter per account
- on startup, reconcile against `catalyst_getNonce`
- on dropped txs, retry with the next nonce only after confirming committed nonce

### 4) Receipt polling

Poll:

- `catalyst_getTransactionReceipt(tx_id)`

Treat these as terminal:

- `applied`
- `dropped`

## Verify

- Submit a transfer on a devnet/local testnet and confirm:
  - receipt transitions `pending -> selected -> applied`
  - nonce increments on apply

## Troubleshooting

- **Signature failures**: confirm your wallet uses `catalyst_getTxDomain` and a single consistent RPC backend for domain + submission.

