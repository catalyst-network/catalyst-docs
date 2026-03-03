---
sidebar_position: 2
title: Explorer operator guide
---

This guide is for operators running the Catalyst explorer + indexer.

Canonical references:

- Explorer repo: [`BlockExplorer/README.md`](https://github.com/catalyst-network/BlockExplorer/blob/main/README.md)
- Node RPC surface: [`catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/crates/catalyst-rpc/src/lib.rs)
- Node handoff for explorers: [`catalyst-node-rust/docs/explorer-handoff.md`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/docs/explorer-handoff.md)

:::warning
If you enable history pruning on your node, very old block/tx queries can return `null`. For explorers, keep at least one **archival** RPC node (no pruning) or a sufficiently long history window.
:::

## You will need

- Node.js >= 22 (per explorer repo)
- A Catalyst HTTPS JSON-RPC URL (or your own node’s RPC)
- Chain identity values for the target network (chain id, network id, genesis hash)

## Steps (local dev)

### 1) Clone and install

```bash
git clone https://github.com/catalyst-network/BlockExplorer
cd BlockExplorer
npm ci
```

### 2) Configure env

```bash
cp apps/indexer/.env.example apps/indexer/.env
cp apps/web/.env.example apps/web/.env
```

Edit `apps/indexer/.env` and set:

- `CATALYST_RPC_URL` (or `CATALYST_RPC_URLS` for failover)

Security/guardrails (recommended, and present in the repo):

- the indexer performs a startup chain identity check and refuses to run if mismatched
- TLS verification must be enabled (it refuses to start if `NODE_TLS_REJECT_UNAUTHORIZED=0`)

### 3) Run

```bash
npm run dev
```

Expected ports (from repo README):

- Indexer/API: `http://localhost:4040`
- Web UI: `http://localhost:5173` (or next free port)

## Verify

- Open the web UI and confirm:
  - it loads latest cycles/blocks
  - it can fetch tx receipts for a known tx hash

## Troubleshooting

- **RPC error `-32029` rate limited**: add endpoint failover, increase backoff, or run against your own node.
- **“No block produced” cycles**: expected on Catalyst (cycles can be empty).

