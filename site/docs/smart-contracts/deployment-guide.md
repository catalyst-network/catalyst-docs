---
sidebar_position: 2
title: Deployment guide
---

This guide focuses on deploying Solidity/EVM contracts to Catalyst using supported tooling.

Canonical references:

- `catalyst-node-rust/docs/evm-deploy.md`
- `catalyst-sdk/docs/foundry-compile-and-deploy.md`
- `catalyst-sdk/docs/deploy-cli.md`

## You will need

- Foundry (`forge`) or Hardhat (to compile)
- A funded `wallet.key` (32-byte hex private key)
- A Catalyst RPC URL

## Steps (Foundry + catalyst-deploy CLI)

### 1) Build the SDK/CLI

```bash
git clone https://github.com/catalyst-network/catalyst-sdk
cd catalyst-sdk
npm install
npm run build
```

### 2) Compile your contracts

From your contracts repo:

```bash
forge build
```

### 3) Deploy an artifact

```bash
RPC_URL="https://testnet-eu-rpc.catalystnet.org"

node /path/to/catalyst-sdk/packages/cli/dist/index.js deploy \
  --rpc-url "$RPC_URL" \
  --key-file wallet.key \
  --wait --verify-code \
  out/MyContract.sol/MyContract.json
```

## Verify

- Receipt is applied (`catalyst_getTransactionReceipt`)
- Code is non-empty (`catalyst_getCode`)

## Troubleshooting

- If deployment applies but code is empty, double-check you deployed **initcode**, not runtime bytecode.

