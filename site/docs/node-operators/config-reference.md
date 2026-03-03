---
sidebar_position: 3
title: Config reference (safe defaults)
---

This is a **minimal operator-facing** config reference. Canonical schema lives in:

- `catalyst-node-rust/crates/catalyst-cli/src/config.rs` (`NodeConfig`)

## You will need

- Your node’s `config.toml`

## Key sections you should understand

### `[protocol]` (chain identity)

Critical fields:

- `chain_id`: domain separation (also EVM `chainId`)
- `network_id`: human-readable network name

:::warning
Do not change `chain_id`/`network_id` on a running network. Doing so effectively creates a new chain.
:::

Also relevant for public networks:

- `faucet_mode`: for public testnets, avoid `deterministic`
- `allow_deterministic_faucet`: set `false` for any public network

### `[rpc]` (exposure risk)

Safe defaults:

- bind to `127.0.0.1`
- restrict access via SSH tunnel / reverse proxy / IP allowlist

### `[storage]` (growth and pruning)

If you are not running an archival node, enable history pruning to cap disk usage:

- `history_prune_enabled`
- `history_keep_cycles` (retention window)

## Verify

After editing config:

```bash
./target/release/catalyst-cli --config /path/to/config.toml start --rpc
```

If config is invalid, the node will fail fast with a validation error.

