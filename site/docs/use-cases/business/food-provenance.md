---
title: Food provenance (traceability & trust)
sidebar_position: 3
---

:::note
Based on an older partner research PDF. Treat as a conceptual use case (not a shipped Catalyst app).
:::

## Problem

Consumers and regulators increasingly want trustworthy answers to:

- where was this product produced?
- when was it harvested/processed?
- did it meet handling/storage standards?

Paper-based or siloed databases make end-to-end provenance hard to verify and easy to forge.

## What Catalyst enables (conceptually)

- **Shared source of truth** across multiple parties (producer → logistics → retailer)
- **Non-forgeable attestations**: each party signs the data they add
- **Auditability**: a tamper-evident timeline of custody and claims

## A practical architecture

1) At harvest/production, create a **batch identifier** (or token) for the lot.
2) At each handoff, write an attestation:
   - who handled it (identity key)
   - what happened (event type)
   - when/where (timestamp, location)
   - optional sensor evidence (IoT readings) stored off-chain, anchored by hash
3) End users scan a QR code and see:
   - the provenance timeline
   - the signed claims

## Verify

- Pick a product batch and trace it end-to-end.
- Show that a forged “producer claim” cannot be verified without the producer key.

