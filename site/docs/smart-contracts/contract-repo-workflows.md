---
sidebar_position: 3
title: Contract repo layout & workflows
---

This page links to existing Catalyst contract repos and recommended workflows.

## Canonical repos

- **Identity contracts (Foundry)**: `catalyst-identity-contracts`  
  Designed to be usable by wallets/nodes that can only read raw EVM storage (`catalyst_getStorageAt`).
- **General contracts**: `catalyst-contracts` (currently minimal; expect changes)

## Identity contracts: recommended deploy + test flow

The identity contracts repo contains a Foundry `forge script --broadcast` deploy script, but Catalyst deployments should be done via **CTX2** tooling.

Recommended workflow:

- deploy: `catalyst-sdk/scripts/deploy-catalyst-identity-contracts.sh`
- smoke test: `catalyst-sdk/scripts/test-deployed-identity-contracts.mjs`

## Recommended workflow (Foundry)

1) Write + test contracts:

```bash
forge test -vvv
```

2) Compile:

```bash
forge build
```

3) Deploy via Catalyst tooling (CTX2):

- Use the SDK deploy CLI (see **[Smart contracts → Deployment guide](/docs/smart-contracts/deployment-guide)**).

## Verify

- Track deployments per `chainId` (store addresses in `deployments/<chainId>.json`, or similar).
- Always verify code exists via `catalyst_getCode`.

