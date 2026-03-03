---
sidebar_position: 2
title: Style guide (writing standards)
---

These rules keep docs consistent across audiences and reduce operational risk.

## Required structure for guides

Every “how-to” guide must include:

- **You will need** (prerequisites)
- **Steps** (copy/paste commands)
- **Verify** (expected outputs or checks)
- **Troubleshooting**
- **Rollback / cleanup** (where relevant)

## Terminology

Be consistent after defining once:

- **cycle vs block**: define mapping once; then use **cycle** for protocol/RPC, and “block” only when discussing explorer UX.
- **pubkey32 vs address20**: define once; always label which one a command expects.

## Code fences and expected outputs

- Commands must be copy/pasteable.
- Include **expected output snippets** when operators/users need to know what “success” looks like.

## Security and safety requirements

- Never instruct users to paste private keys into websites, issue trackers, logs, or support chats.
- Add explicit warnings for destructive operations (DB wipe, prune, snapshot restore).
- When a guide touches private keys:
  - mention file permissions (`chmod 600`)
  - mention backups and offline storage

## Admonitions

Use Docusaurus admonitions for risk:

- `:::warning` for key handling, destructive ops, and production safety
- `:::tip` for optional improvements

