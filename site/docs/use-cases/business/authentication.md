---
title: Authentication (email trust & anti-impersonation)
sidebar_position: 1
---

Download the source PDF:

- [`authentication.pdf`](/files/use-cases/authentication.pdf)

## Problem

Email impersonation and phishing are effective because recipients cannot reliably verify the sender’s identity. Even when organizations adopt anti-malware tools, spoofing and Business Email Compromise can still succeed.

## What Catalyst enables (conceptually)

- **Verifiable signatures**: messages can carry a signature that recipients can verify against an organization identity key.
- **Immutable audit trail**: a tamper-resistant record of “message fingerprints” can help prove timing and provenance.
- **Automation**: identity proofs can be generated automatically by a mail gateway or client plugin.

## A practical architecture

1) **Organization identity** is established (KYC/verification outside the chain, then publish a public key + metadata).
2) Outbound email is processed by:
   - a **mail gateway** (recommended), or
   - a **client plugin**
3) The gateway:
   - hashes the email (or selected fields),
   - signs the hash with the org key,
   - optionally timestamps the signed hash on-chain.
4) Recipients verify:
   - the signature matches the org key,
   - the timestamp/audit entry exists (optional).

## What’s required (today)

This use case requires application-layer work:

- an email gateway/plugin
- a registry of “known org keys” (could be on-chain via contracts, or off-chain with on-chain anchoring)
- UX that makes “verified sender” obvious

## Verify

- Run a demo where a signed email is accepted and a forged email is flagged.
- Store only **hashes** on-chain (never store email contents).

## Links

- **Catalyst website**: `https://catalystnet.org/`
- **Docs**: `https://docs.catalystnet.org/`

