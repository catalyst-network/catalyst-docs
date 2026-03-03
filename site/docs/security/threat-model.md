---
sidebar_position: 1
title: Threat model (summary)
---

This page summarizes the main security threats across the Catalyst ecosystem and points to canonical threat model docs.

Canonical references:

- Node threat model: `catalyst-node-rust/docs/security-threat-model.md`
- Faucet security checklist + secret handling: `Faucet/catalyst-faucet-infra/security/`

## High-level threats

- **Key compromise**: wallet keys, operator keys, faucet hot wallet keys
- **RPC abuse**: rate limiting, spam, denial of service
- **Supply-chain risk**: compromised dependencies or build artifacts
- **Operator mistakes**: wrong chain identity, unsafe RPC exposure, skipping backups
- **Indexing trust**: explorers/indexers can lag or lie; treat them as convenience layers

## Mitigation themes

- **Domain separation**: tooling should use `catalyst_getTxDomain` to avoid signing on the wrong chain.
- **Least privilege**: separate roles (validator, RPC node, explorer indexer, faucet).
- **Rate limiting**: server-side limits (RPC code `-32029`) plus client backoff.
- **Backups + rollback**: treat upgrades as stateful changes; always snapshot before change.

