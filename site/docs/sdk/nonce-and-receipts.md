---
sidebar_position: 3
title: Nonce + receipt polling patterns
---

## You will need

- A Catalyst RPC URL
- A sender `pubkey32` (or a private key in your wallet/tooling)

## Steps

### 1) Read committed nonce

```bash
curl -sS -X POST "$RPC_URL" \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"catalyst_getNonce","params":["0x<pubkey32>"]}' | jq
```

### 2) Submit txs sequentially

Best practice:

- keep a local “pending nonce” counter per account
- never submit two different txs with the same nonce

### 3) Poll receipts with backoff

Start with ~1s polling, then back off if needed.

Terminal receipt statuses (current node implementation):

- `applied`
- `dropped`

## Verify

- After a tx is applied, `catalyst_getNonce(pubkey32)` should increase.

## Troubleshooting

- If you see “Nonce too low”, refresh your committed nonce and rebuild the tx.

