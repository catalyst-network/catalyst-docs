---
sidebar_position: 2
title: Network environments
---

Catalyst commonly uses separate network environments so you can develop safely without risking production funds/state.

## You will need

- An RPC URL for the environment you’re targeting
- The environment’s **chain identity**: `chain_id`, `network_id`, and `genesis_hash`

## Environments

- **Local devnet**: a node (or the built-in local testnet harness) on your machine.
- **Public testnet**: shared network for app testing and early ecosystem integrations.
- **Mainnet**: production network (treat operationally as high risk).

## Chain identity (do not mix)

Wallets and SDK tooling must treat these as a single unit:

- `chain_id`: domain separation (also the EVM `chainId`)
- `network_id`: human-readable name (example: `catalyst-testnet`)
- `genesis_hash`: stable hash of the genesis configuration

Canonical references:

- `catalyst-node-rust/docs/network-identity.md`
- RPC implementation: `catalyst-node-rust/crates/catalyst-rpc/src/lib.rs` (`catalyst_getTxDomain`)

## Verify

Fetch identity in one call:

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getTxDomain","params":[]}' | jq -r '.result'
```

## Troubleshooting

- **Load balancer skew**: don’t fetch `chainId`/`genesisHash` via separate calls. Use `catalyst_getTxDomain` (single-call domain) to avoid mismatched values across backends.

