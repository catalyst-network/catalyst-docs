---
sidebar_position: 1
title: Run a node
---

This guide targets **node operators**. It separates “run the node” concerns (service management, storage, monitoring, upgrades) from app-builder docs.

Canonical operator reference (upstream): [`catalyst-node-rust/docs/node-operator-guide.md`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/docs/node-operator-guide.md).

:::warning
Running a public node is operationally risky. Treat the host as production infrastructure:

- never paste private keys into logs or tickets
- take backups before upgrades
- test changes on a devnet/local testnet first
:::

## You will need

- Linux host (Ubuntu/Debian examples below)
- Open TCP **30333** (P2P). Open **8545** (RPC) only if you know what you’re doing (prefer IP allowlist / SSH tunnel).
- Either:
  - a **release binary** (no build), or
  - build deps (for source builds): `build-essential`, `clang`, `cmake`, `libssl-dev`

## Steps

### 1) Get the binary (no-build or source-build)

Choose one:

- **No build (recommended)**: download a `catalyst-cli` release binary
  - `https://github.com/catalyst-network/catalyst-node-rust/releases`
- **Build from source**: continue with the steps below

If you downloaded a binary, install it to a stable path used by systemd, for example:

```bash
sudo install -m 0755 catalyst-cli /var/lib/catalyst/node/catalyst-cli
```

### 2) Install build dependencies (Ubuntu/Debian) (source builds only)

```bash
sudo apt update
sudo apt install -y build-essential pkg-config libssl-dev clang libclang-dev cmake
```

### 3) Build the node (source builds only)

```bash
git clone https://github.com/catalyst-network/catalyst-node-rust
cd catalyst-node-rust

make setup
make build
```

Expected output (example):

```text
Finished release [optimized] target(s) in ...
```

The binary is:

```bash
./target/release/catalyst-cli --help
```

### 4) Create a dedicated user + directories

```bash
sudo useradd --system --create-home --home-dir /var/lib/catalyst --shell /usr/sbin/nologin catalyst || true
sudo mkdir -p /var/lib/catalyst/node
sudo chown -R catalyst:catalyst /var/lib/catalyst
sudo chmod 700 /var/lib/catalyst
```

### 5) Generate a config (safe defaults)

Catalyst can generate a default config file if the path doesn’t exist.

```bash
sudo -u catalyst mkdir -p /var/lib/catalyst/node
sudo -u catalyst /home/$USER/catalyst-node-rust/target/release/catalyst-cli \
  --config /var/lib/catalyst/node/config.toml start --rpc
```

Stop it (Ctrl+C) after it starts once—this creates sibling directories near the config:

- `data/` (RocksDB state)
- `logs/`
- `node.key` (P2P identity key)

:::warning
Do **not** delete `node.key` during resets/upgrades unless you intend to change the node’s network identity.
:::

### 6) Run under systemd

Create a unit file:

```bash
sudo tee /etc/systemd/system/catalyst.service >/dev/null <<'EOF'
[Unit]
Description=Catalyst node (catalyst-cli)
After=network-online.target
Wants=network-online.target

[Service]
User=catalyst
Group=catalyst
WorkingDirectory=/var/lib/catalyst/node

ExecStart=/var/lib/catalyst/node/catalyst-cli --config /var/lib/catalyst/node/config.toml start --validator --rpc --rpc-address 127.0.0.1 --rpc-port 8545
Restart=on-failure
RestartSec=2
LimitNOFILE=1048576

# Hardening (baseline)
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/catalyst

[Install]
WantedBy=multi-user.target
EOF
```

Install the binary into place:

```bash
sudo install -o catalyst -g catalyst -m 0755 \
  /home/$USER/catalyst-node-rust/target/release/catalyst-cli \
  /var/lib/catalyst/node/catalyst-cli
```

If you used a release binary and already installed it to `/var/lib/catalyst/node/catalyst-cli`, you can skip this step.

Start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now catalyst
sudo systemctl status catalyst --no-pager
```

### 7) Firewall (minimum)

If using `ufw`:

```bash
sudo ufw allow 30333/tcp
# RPC: keep private whenever possible (SSH tunnel / IP allowlist)
# sudo ufw allow from <YOUR_IP>/32 to any port 8545 proto tcp
sudo ufw reload
sudo ufw status numbered
```

## Verify

### RPC is reachable (local)

```bash
curl -sS -X POST http://127.0.0.1:8545 \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_head","params":[]}' | jq
```

Expected shape:

```json
{
  "result": {
    "applied_cycle": 0,
    "applied_lsu_hash": "0x...",
    "applied_state_root": "0x..."
  }
}
```

### Logs

```bash
journalctl -u catalyst -f
```

## Storage growth, pruning, maintenance

Long-running networks grow without bound unless you prune history (block/tx metadata used by explorers).

Recommended for validator nodes (keep 7 days @ 1 cycle/sec):

```toml
[storage]
history_prune_enabled = true
history_keep_cycles = 604800
history_prune_interval_seconds = 300
history_prune_batch_cycles = 1000
```

Canonical reference: `catalyst-node-rust/docs/node-operator-guide.md` (“Storage growth / history pruning”).
Upstream link: [`docs/node-operator-guide.md`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/docs/node-operator-guide.md).

:::warning
Pruning can make old `catalyst_getBlockByNumber` / `catalyst_getTransactionByHash` return `null`. Keep at least one archival node for explorers/indexers.
:::

## Upgrade / rollback checklist

Before upgrading:

- **Back up the DB**:

```bash
/var/lib/catalyst/node/catalyst-cli db-backup \
  --data-dir /var/lib/catalyst/node/data \
  --out-dir "/var/lib/catalyst/node/backup.$(date +%s)"
```

- Roll out the new binary to a single canary node first.

If you need to roll back:

```bash
sudo systemctl stop catalyst

/var/lib/catalyst/node/catalyst-cli db-restore \
  --data-dir /var/lib/catalyst/node/data \
  --from-dir "/var/lib/catalyst/node/backup.<ts>"

sudo systemctl start catalyst
```

## Troubleshooting

- **RPC reachable but tx inclusion is slow**: receipt starts `pending`/`selected`; inclusion can take multiple cycles. Poll `catalyst_getTransactionReceipt`.
- **“Insufficient data collected: got 1, required 2”**: usually P2P connectivity issues (port blocked, bad bootstrap peers, clock drift). See `catalyst-node-rust/docs/node-operator-guide.md`.

