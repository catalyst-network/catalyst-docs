---
sidebar_position: 1
title: Get started
---

This section is for builders (dApps, tooling, wallets). If you’re just using apps, start with:

- **[Use cases (for everyone)](/docs/use-cases/send-money)**
- **[Quickstart: use Catalyst apps](/docs/quickstarts/i-want-to-use-apps)**

## You will need

- Node.js >= 20
- A Catalyst JSON-RPC URL

## Steps

### 1) Install the SDK

```bash
npm install @catalyst/sdk
```

### 2) Connect to RPC and fetch the tx signing domain

```ts
import { RpcClient, getTxDomain } from '@catalyst/sdk';

const client = new RpcClient('https://testnet-eu-rpc.catalystnet.org');

const domain = await getTxDomain(client);
console.log({
  chainId: `0x${domain.chainId.toString(16)}`,
  networkId: domain.networkId,
  genesisHashLen: domain.genesisHash.length,
});
```

## Verify

Your domain fetch should succeed and `genesisHashLen` should be `32`.

## Next steps

- **[Deploy a contract](/docs/sdk/deploy-contract)**
- **[Common pitfalls](/docs/sdk/common-pitfalls)**

## Troubleshooting

- **Intermittent signature failures behind a load balancer**: ensure you use `getTxDomain` (single-call domain) rather than fetching chain identity via multiple RPC calls.
- **Wrong network**: compare `network_id` / `chain_id` against the wallet defaults (testnet) before signing.

