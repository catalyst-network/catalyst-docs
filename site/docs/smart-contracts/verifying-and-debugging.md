---
sidebar_position: 4
title: Verify deployment & debug
---

## You will need

- RPC URL
- `curl` + `jq`

## Steps

### 1) Confirm the tx applied

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getTransactionReceipt\",
    \"params\":[\"0x<tx_id>\"]
  }" | jq
```

Check:

- `status` is `applied` (or `dropped`)
- if present, `success` is `true` and `error` is empty
- `return_data` can contain revert data for failed calls

### 2) Confirm code exists

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getCode\",
    \"params\":[\"0x<address20>\"]
  }" | jq -r '.result'
```

### 3) Inspect storage (no indexer required)

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d "{
    \"jsonrpc\":\"2.0\",
    \"id\":1,
    \"method\":\"catalyst_getStorageAt\",
    \"params\":[\"0x<address20>\",\"0x<slot32>\"]
  }" | jq -r '.result'
```

## Verify

- Code is non-empty
- Expected storage slots match your contract’s storage layout

## Troubleshooting

- If receipt is missing, ensure you saved the `tx_id` and are querying the correct chain identity.

