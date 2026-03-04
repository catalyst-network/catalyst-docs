---
sidebar_position: 2
title: Install / build binaries
---

## You will need

- Linux host
- Either:
  - a **release binary** (no build), or
  - a Rust toolchain + build dependencies (source build)

## Steps

### Option A (recommended): download a release binary (no build)

If you want to run a node without compiling anything, use a published release.

1) Go to the releases page and download the latest `catalyst-cli` for Linux.

- Node repo releases: `https://github.com/catalyst-network/catalyst-node-rust/releases`

2) Verify the checksum (recommended) and install the binary somewhere stable, for example:

```bash
sudo install -m 0755 catalyst-cli /usr/local/bin/catalyst-cli
```

### Option B: build from source

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

