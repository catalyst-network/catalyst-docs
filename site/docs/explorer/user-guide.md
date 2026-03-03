---
sidebar_position: 1
title: Explorer user guide
---

## You will need

- The explorer URL for your network (public testnet or your operator’s explorer)

## Steps

### 1) Look up a transaction

- Paste a tx hash (`0x...`) into the search bar (or open `/tx/<txHash>`).
- Check:
  - receipt status (`pending` / `selected` / `applied` / `dropped`)
  - applied cycle (if present)

### 2) Look up an address

- Paste an address into search (explorer may support either `pubkey32` or `address20` views depending on the build).

### 3) Browse blocks (cycles)

Important: in Catalyst, “blocks” map to **cycles**, and some cycles produce **no block/LSU**.

You may see “No block produced” for certain cycle numbers. This is expected.

## Verify

- A recent applied tx should appear after indexing catches up.

## Troubleshooting

- If a tx is missing, the explorer/indexer may be behind. Verify via RPC directly:
  - `catalyst_getTransactionReceipt(tx_id)`

