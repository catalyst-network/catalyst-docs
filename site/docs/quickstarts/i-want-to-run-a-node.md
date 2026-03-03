---
sidebar_position: 1
title: "Quickstart: I want to run a node"
---

## You will need

- Linux host (recommended) with open TCP port **30333** (P2P)
- Rust toolchain (for building from source) or a release binary (when available)

## Steps

1) Clone and build the node:

```bash
git clone https://github.com/catalyst-network/catalyst-node-rust
cd catalyst-node-rust
make setup
make build
```

2) Start a local node with RPC enabled:

```bash
./target/release/catalyst-cli start --rpc
```

## Verify

In a second terminal:

```bash
./target/release/catalyst-cli status --rpc-url http://127.0.0.1:8545
```

## Troubleshooting

- If you’re setting up a long-running node (systemd, firewall, pruning, upgrades), follow **[Node operators → Run a node](/docs/node-operators/run-a-node)**.

