---
sidebar_position: 1
title: Faucet user guide (testnet)
---

The faucet is **testnet-only** and is intended to provide small amounts of KAT for development and testing.

## You will need

- Your Catalyst **`pubkey32`** address (`0x` + 64 hex chars) as requested by the faucet UI/API
- Access to the hosted faucet UI (or your operator’s faucet)

Official public faucet:

- `https://faucet.catalystnet.org/`

## Steps

### 1) Request funds via the UI

1) Enter your address.
2) Complete the captcha (Turnstile).
3) Submit the request.

On success, the faucet returns a tx hash and an optional “next eligible” timestamp.

### 2) (Optional) Request funds via API

Fetch faucet settings:

```bash
FAUCET_API_BASE_URL="https://<your-faucet-api-base-url>"

curl -sS "$FAUCET_API_BASE_URL/v1/info" | jq
```

Expected shape (from faucet backend docs):

```json
{
  "networkName": "Catalyst Testnet",
  "chainId": "0xbf8457c",
  "symbol": "KAT",
  "amount": "0.1",
  "cooldownSeconds": 86400
}
```

Request funds:

```bash
curl -sS -X POST "$FAUCET_API_BASE_URL/v1/request" \
  -H 'content-type: application/json' \
  -d '{ "address": "0x...", "turnstileToken": "token-from-turnstile" }' | jq
```

Expected shape:

```json
{ "txHash": "0x...", "nextEligibleAt": "2026-02-23T14:06:22.806Z" }
```

## Verify

- Open the explorer tx page (template): `https://explorer.catalystnet.org/tx/<txHash>`
- Or verify via RPC receipt polling:
  - `catalyst_getTransactionReceipt(txHash)`

## Troubleshooting

- **Cooldown**: faucet enforces per-address and per-IP cooldown (typically 24h).
- **Wrong chain**: the production faucet backend enforces a chain id allowlist (testnet only).

