---
sidebar_position: 3
title: "Quickstart: I want to deploy a contract"
---

This quickstart covers two supported paths:

- **SDK/CLI path (recommended)**: `catalyst-sdk` deploy CLI
- **Node CLI path**: `catalyst-cli deploy`

## You will need

- An RPC URL (public testnet or local testnet)
- A funded key
- A compiled contract artifact (Foundry or Hardhat), or raw initcode bytes

## Steps (SDK/CLI path)

1) Build the deploy CLI:

```bash
git clone https://github.com/catalyst-network/catalyst-sdk
cd catalyst-sdk
npm install
npm run build
```

2) Deploy from a Foundry artifact (after `forge build`):

```bash
RPC_URL="https://testnet-eu-rpc.catalystnet.org"

node packages/cli/dist/index.js deploy \
  --rpc-url "$RPC_URL" \
  --key-file wallet.key \
  --wait --verify-code \
  out/Counter.sol/Counter.json
```

## Verify

- The CLI will print a `tx_id` and a `contract_address`.
- `--wait` polls `catalyst_getTransactionReceipt(...)` until applied/failed.
- `--verify-code` checks `catalyst_getCode(contract_address)` is not `0x`.

## Troubleshooting

- For the full guide (including local testnet, receipt fields, and `getCode` validation), see **[Deploy a contract](/docs/sdk/deploy-contract)**.

