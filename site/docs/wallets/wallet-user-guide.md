---
sidebar_position: 1
title: Wallet user guide
---

This page is for **wallet users**. If you’re building a wallet, see **[Wallet builder guide](/docs/wallets/wallet-builder-guide)**.

:::warning
Key safety:

- Never paste your seed phrase/private key into websites or support chats.
- Never store secrets in screenshots, cloud notes, or plaintext files.
- Assume any computer you “temporarily” use can be compromised.
:::

## You will need

- A wallet app configured for the correct network (testnet vs mainnet)
- A secure backup plan (offline recommended)

## Steps

### 1) Create a new account

- Create a new wallet/account in the app.
- Write down your recovery phrase / key backup and store it offline.

### 2) Confirm you’re on the right network

The current testnet wallet implementation uses these defaults:

- `network_id`: `catalyst-testnet`
- `chain_id`: `0xbf8457c` (hex) / `200820092` (decimal)
- default RPC failover list: EU/US/Asia

Canonical source: `WebWallet/README.md`.

### 3) Get testnet funds (testnet only)

Use the faucet:

- **[Faucet → User guide](/docs/faucet/user-guide)**

### 4) Use the explorer to verify activity

- **[Explorer → User guide](/docs/explorer/user-guide)**

## Verify

- The wallet shows the correct network identity before signing.
- The explorer shows your transaction after it is applied.

## Troubleshooting

- **Wallet refuses to sign**: often a chain identity mismatch (wrong RPC URL / wrong network).
- **Balance doesn’t update**: explorer/indexer can lag; verify via RPC `catalyst_getBalance(pubkey32)` if you have a trusted endpoint.

