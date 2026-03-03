---
sidebar_position: 2
title: Install / build binaries
---

## You will need

- Rust toolchain (for source builds)
- Linux build dependencies (RocksDB, OpenSSL, toolchain)

## Steps

### Build from source (recommended)

```bash
git clone https://github.com/catalyst-network/catalyst-node-rust
cd catalyst-node-rust

make setup
make build
```

Binary path:

```bash
./target/release/catalyst-cli --help
```

### Docker (developer convenience)

The node repo includes Docker helpers:

```bash
cd catalyst-node-rust
make docker-build
make docker-run
```

## Verify

```bash
./target/release/catalyst-cli status --rpc-url http://127.0.0.1:8545
```

## Troubleshooting

- If native dependencies fail to compile, follow the node repo prerequisites section:
  - `catalyst-node-rust/README.md`

