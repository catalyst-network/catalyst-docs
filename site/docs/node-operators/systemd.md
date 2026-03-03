---
sidebar_position: 4
title: systemd examples
---

This page provides a systemd template. For the full run flow, see **[Run a node](/docs/node-operators/run-a-node)**.

## You will need

- A built `catalyst-cli` binary installed at a stable path
- A config directory owned by a dedicated user (recommended)

## Steps

1) Create `/etc/systemd/system/catalyst.service`:

```ini
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

NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/catalyst

[Install]
WantedBy=multi-user.target
```

2) Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now catalyst
sudo systemctl status catalyst --no-pager
```

## Verify

```bash
curl -sS -X POST http://127.0.0.1:8545 \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_version","params":[]}' | jq
```

## Troubleshooting

- Use `journalctl -u catalyst -f` to tail logs.

