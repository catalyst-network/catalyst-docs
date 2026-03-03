---
sidebar_position: 5
title: Snapshots / fast sync
---

Catalyst supports snapshot-based bootstrapping for faster sync on new machines.

Canonical references:

- Sync guide: `catalyst-node-rust/docs/sync-guide.md`
- RPC surface: `catalyst_getSnapshotInfo`, `catalyst_getSyncInfo` in `catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`

## You will need

- An RPC node that publishes snapshot metadata (operator feature)
- Disk space for the snapshot archive + extracted DB

## Steps

### Operator: publish a snapshot

1) Create a snapshot directory:

```bash
./target/release/catalyst-cli db-backup \
  --data-dir /var/lib/catalyst/node/data \
  --out-dir "/var/lib/catalyst/node/snapshots/snap.$(date +%s)"
```

2) Serve the archive (simple sidecar) and publish metadata (see `catalyst-cli snapshot-*` commands).

### User: sync from snapshot

```bash
./target/release/catalyst-cli sync-from-snapshot \
  --rpc-url http://<RPC_HOST>:8545 \
  --data-dir /var/lib/catalyst/node/data
```

## Verify

```bash
curl -sS -X POST http://<RPC_HOST>:8545 \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getSnapshotInfo","params":[]}' | jq
```

## Troubleshooting

- If snapshot verification fails, confirm `chain_id`, `network_id`, and `genesis_hash` match using `catalyst_getSyncInfo`.

