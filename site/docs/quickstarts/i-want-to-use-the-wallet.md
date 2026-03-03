---
sidebar_position: 2
title: "Quickstart: I want to use the wallet"
---

## You will need

- A supported wallet app (web wallet for testnet)
- A safe place to store backups (offline recommended)

## Steps

1) Open the wallet and create/import an account.

2) Confirm the wallet shows the expected network identity before signing anything:

- `network_id`: `catalyst-testnet`
- `chain_id`: `0xbf8457c` (hex) / `200820092` (decimal)

Canonical defaults (for the current testnet wallet implementation):

- `WebWallet/README.md`

3) Request testnet funds from the faucet (testnet only):

- See **[Faucet → User guide](/docs/faucet/user-guide)**.

## Verify

- You can view your address and transactions in the explorer. See **[Explorer → User guide](/docs/explorer/user-guide)**.

## Troubleshooting

- If the wallet refuses to sign, it’s often because **chain identity mismatched** (wrong RPC URL / wrong network).
- Never paste your private key into websites or support chats. See **[Wallets → User guide](/docs/wallets/wallet-user-guide)**.

