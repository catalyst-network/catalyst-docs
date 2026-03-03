---
sidebar_position: 4
title: "Quickstart: I want to build a dApp"
---

## You will need

- Node.js >= 20
- A Catalyst RPC URL

## Steps

1) Install the SDK package:

```bash
npm install @catalyst/sdk
```

2) Read the tx lifecycle (so you understand domain separation + receipts):

- **[RPC: transaction lifecycle](/docs/rpc-reference/transaction-lifecycle)**

3) Follow the SDK guide:

- **[SDK → Get started](/docs/sdk/get-started)**

## Verify

- Deploy a small contract and verify code exists via `catalyst_getCode`.

## Troubleshooting

- If signing fails intermittently behind a load balancer, ensure your tooling uses `catalyst_getTxDomain` (single-call domain).

