---
sidebar_position: 2
title: Operational security
---

This page is for operators running nodes, explorers, and faucets.

## You will need

- A deployment plan that separates roles (don’t run everything on one box unless you accept the blast radius)
- A secret management approach (not `.env` files in home directories)

## Steps

### 1) Key handling rules

- Keep private keys out of logs.
- Use file permissions (`chmod 600`) for local key files.
- Prefer a secret manager for services (faucet, CI deploy keys).
- Rotate keys on suspected exposure.

### 2) RPC exposure

- Bind RPC to `127.0.0.1` by default.
- If you must expose it:
  - IP allowlist
  - rate limiting at the edge
  - TLS

### 3) Backups and rollback

- Snapshot the DB before upgrades.
- Practice restore procedures on a staging host.

## Verify

- You can restore a backup snapshot into a fresh directory and the node starts successfully.

## Troubleshooting

- If you’re debugging an incident, pause the faucet (admin pause) and restrict RPC exposure first, then diagnose.

