---
sidebar_position: 1
title: Get started
---

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

## Troubleshooting

- **Intermittent signature failures behind a load balancer**: ensure you use `getTxDomain` (single-call domain) rather than fetching chain identity via multiple RPC calls.
- **Wrong network**: compare `network_id` / `chain_id` against the wallet defaults (testnet) before signing.

