---
title: Timestamping (prove data existed at a time)
sidebar_position: 2
---

Download the source PDF:

- [`TimeStamping.pdf`](/files/use-cases/TimeStamping.pdf)

## Problem

For IP, legal, and compliance workflows, you often need proof that:

- a document existed at a specific time
- the document has not been modified since
- the proof remains available long-term

## What Catalyst enables (conceptually)

- **Tamper-evident proofs** by anchoring a document hash on-chain
- **Attribution** by signing the hash with an identity key
- **Persistence** via replication across nodes

## Steps (conceptual flow)

1) Compute a cryptographic hash of the file (the “fingerprint”).
2) Sign the hash with the user/org key.
3) Submit the signed hash + timestamp metadata on-chain (or store off-chain and anchor a commitment on-chain).
4) Later, to verify:
   - recompute hash
   - verify the signature
   - verify the on-chain timestamp/commitment exists

## Verify

- Demonstrate that changing a single byte in the document changes the hash.
- Demonstrate the signature fails if the proof is tampered with.

## Security

Never publish sensitive document contents on-chain. Publish only:

- hashes / commitments
- minimal metadata (and only if non-sensitive)

