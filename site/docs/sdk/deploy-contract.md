---
sidebar_position: 2
title: Deploy a contract
---

This is the full, end-to-end deployment guide (local testnet + public testnet). It also serves as the reference for verifying deployment correctness via **receipt polling** and `catalyst_getCode`.

Canonical references:

- Node deploy notes: [`catalyst-node-rust/docs/evm-deploy.md`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/docs/evm-deploy.md)
- SDK/CLI deploy behavior: [`catalyst-sdk/docs/deploy-cli.md`](https://github.com/catalyst-network/catalyst-sdk/blob/main/docs/deploy-cli.md)
- RPC methods: [`catalyst-node-rust/crates/catalyst-rpc/src/lib.rs`](https://github.com/catalyst-network/catalyst-node-rust/blob/main/crates/catalyst-rpc/src/lib.rs) (`catalyst_sendRawTransaction`, `catalyst_getTransactionReceipt`, `catalyst_getCode`)

:::warning
Key safety:

- do not paste private keys into websites, issues, logs, or chat
- treat `wallet.key` as a secret; use file permissions (`chmod 600`)
:::

## You will need

- Node.js >= 20
- An RPC URL:
  - local testnet: `http://127.0.0.1:8545`
  - public testnet: `https://testnet-eu-rpc.catalystnet.org`
- A **32-byte hex private key** in a file (`wallet.key`)
- Contract initcode source:
  - Foundry/Hardhat artifact JSON, or
  - a raw `.hex` initcode file

## Steps

### Option A: Deploy to a local testnet (recommended for first-time validation)

#### 1) Start the local testnet (3 nodes, RPC on node1)

```bash
git clone https://github.com/catalyst-network/catalyst-node-rust
cd catalyst-node-rust

make testnet-up
make testnet-status
```

RPC endpoint for node1:

```bash
RPC_URL="http://127.0.0.1:8545"
```

#### 2) Create a key file

```bash
openssl rand -hex 32 > wallet.key
chmod 600 wallet.key
```

#### 3) Fund your pubkey32 (local testnet faucet key)

Derive your `pubkey32` from the private key (this prints **hex without `0x`**):

```bash
PUBKEY32_HEX=$(./target/release/catalyst-cli pubkey --key-file wallet.key)
PUBKEY32="0x$PUBKEY32_HEX"
echo "pubkey32=$PUBKEY32"
```

Send funds from the deterministic local faucet:

```bash
cargo run -p catalyst-cli -- send "$PUBKEY32" 25 \
  --key-file testnet/faucet.key \
  --rpc-url "$RPC_URL"
```

#### 4) Build the SDK CLI

```bash
cd ..
git clone https://github.com/catalyst-network/catalyst-sdk
cd catalyst-sdk
npm install
npm run build
```

#### 5) Deploy from raw initcode (known-good fixture)

This fixture deploys a contract that returns `0x2a` on empty calldata:

```bash
node packages/cli/dist/index.js deploy \
  --rpc-url "$RPC_URL" \
  --key-file ../catalyst-node-rust/wallet.key \
  --wait --verify-code \
  ../catalyst-node-rust/testdata/evm/return_2a_initcode.hex
```

Expected output (shape):

```text
tx_id: 0x...
contract_address: 0x...
receipt_status: applied
code_verified: true
```

#### 6) (Optional) Call the contract (tx + receipt return data)

This is a **transaction** (not `eth_call`).

You must provide **calldata bytes** (hex). If you have Foundry installed, you can generate calldata with `cast calldata`.

```bash
DATA=$(cast calldata "setNumber(uint256)" 42)

node packages/cli/dist/index.js call \
  --rpc-url "$RPC_URL" \
  --key-file ../catalyst-node-rust/wallet.key \
  --to 0x<contract_address> \
  --data "$DATA" \
  --wait
```

::::caution
EVM `value` (payable calls)

On current Catalyst testnet, EVM calls do not carry an Ethereum-style `value`. Contracts that require `msg.value` may not be usable until value support is exposed by the runtime/RPC.
::::

### Option B: Deploy to public testnet

Follow the same CLI command, but:

- use `--rpc-url https://testnet-eu-rpc.catalystnet.org`
- ensure your key is funded (use the hosted faucet)

## Verify

### Verify receipt is applied

Poll:

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

Terminal statuses (current node implementation):

- `applied`: final success (or applied with `success=false` when present)
- `dropped`: final failure/drop

### Verify code exists (`catalyst_getCode`)

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

Expected:

- non-empty `0x...` for deployed code
- `0x` for “no code”

## Rollback / cleanup

Local testnet:

```bash
cd catalyst-node-rust
make testnet-down
```

If you created a `wallet.key` only for local testing, securely delete it:

```bash
shred -u wallet.key
```

## Troubleshooting

### Receipt stays `pending`/`selected`

- Wait longer (poll every 1–2 seconds, then back off).
- Verify you’re hitting the correct RPC node and it’s progressing (`catalyst_head`).

### `--verify-code` fails (`catalyst_getCode` returned `0x`)

Most common causes:

- you queried the wrong `contract_address`
- tx did not apply successfully (check receipt `status` and `error`)

### Signature failures

Use the single-call signing domain method:

- `catalyst_getTxDomain`

See **[RPC: transaction lifecycle](/docs/rpc-reference/transaction-lifecycle)**.

