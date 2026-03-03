---
sidebar_position: 4
title: Common pitfalls
---

## Domain skew (load balancers)

Symptom:

- signatures fail intermittently (“Invalid transaction signature”)

Cause:

- tooling fetched `chainId`/`genesisHash` in separate calls and hit different backends

Fix:

- use `catalyst_getTxDomain` (single-call domain)

## Fee floor

Symptom:

- `catalyst_sendRawTransaction` rejects with “fee too low”

Fix:

- ensure your tx includes at least the minimum required fee for its type/shape

## Data limits

Symptom:

- RPC rejects “tx too large”

Fix:

- reduce calldata/initcode size, or split operations

## Receipt polling too aggressively

Symptom:

- rate limiting error code `-32029`

Fix:

- increase poll interval and add exponential backoff + jitter

