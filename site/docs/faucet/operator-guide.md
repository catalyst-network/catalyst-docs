---
sidebar_position: 2
title: Faucet operator guide
---

This guide is for running a **testnet-only** faucet service (backend + web UI + infra).

Canonical references (read these first):

- Backend API: [`Faucet/catalyst-faucet/README.md`](https://github.com/catalyst-network/Faucet/blob/main/catalyst-faucet/README.md)
- Web UI: [`Faucet/catalyst-faucet-web/README.md`](https://github.com/catalyst-network/Faucet/blob/main/catalyst-faucet-web/README.md)
- Infra + runbooks: [`Faucet/catalyst-faucet-infra/README.md`](https://github.com/catalyst-network/Faucet/blob/main/catalyst-faucet-infra/README.md) and `runbooks/`

:::warning
Operational risk:

- A faucet runs a **hot wallet**. Assume it will be attacked.
- Treat secrets as production-grade (secret manager, rotation, audit).
- Never run the faucet against mainnet unless you have a dedicated security plan.
:::

## You will need

- A Catalyst RPC URL (HTTPS recommended)
- A funded faucet hot-wallet private key (keep it in a secret manager)
- Redis + Postgres (for cooldowns + claim logging)
- Cloudflare Turnstile keys (captcha)

## Steps

### Option A: Local dev (no Docker)

Backend:

```bash
cd Faucet/catalyst-faucet
cp .env.example .env
# edit .env (RPC_URL, CHAIN_ID, FAUCET_PRIVATE_KEY, REDIS_URL, DATABASE_URL, TURNSTILE_SECRET_KEY, ...)

npm install
npm run prisma:generate
npm run prisma:migrate:dev
npm run dev
```

Web:

```bash
cd ../catalyst-faucet-web
cp .env.example .env.local
# edit env (NEXT_PUBLIC_FAUCET_API_BASE_URL, NEXT_PUBLIC_TURNSTILE_SITE_KEY, ...)

npm install
npm run dev
```

### Option B: Production VM (Docker Compose + TLS proxy)

Use the infra repo, which includes:

- `docker-compose.prod.yml` (backend + web + redis + postgres + caddy)
- example env files and runbooks

High-level flow (see repo README for full details):

```bash
cd Faucet/catalyst-faucet-infra

sudo mkdir -p /opt/catalyst-faucet/{env,data,backups}
sudo chown -R "$USER":"$USER" /opt/catalyst-faucet
chmod 700 /opt/catalyst-faucet

cp env/backend.env.example /opt/catalyst-faucet/env/backend.env
cp env/web.env.example /opt/catalyst-faucet/env/web.env
cp env/postgres.env.example /opt/catalyst-faucet/env/postgres.env
cp env/caddy.env.example /opt/catalyst-faucet/env/caddy.env

# edit env files (backend.env contains secrets)
chmod 600 /opt/catalyst-faucet/env/*.env

cp /opt/catalyst-faucet/env/caddy.env ./.env
docker-compose -f docker-compose.prod.yml up -d --build
```

## Verify

Backend health:

```bash
curl -sS http://127.0.0.1:8080/health | jq
```

Backend info:

```bash
curl -sS http://127.0.0.1:8080/v1/info | jq
```

## Abuse mitigation checklist (minimum)

From the backend implementation:

- captcha (Turnstile) before any on-chain action
- per-address cooldown
- per-IP cooldown (store only salted hash)
- optional per-country / per-ASN cooldown (when behind Cloudflare)
- global RPM cap
- admin pause switch
- chain id allowlist (testnet-only)

See `Faucet/catalyst-faucet/README.md` (“Threat model / abuse mitigation”).

## Troubleshooting

- **Service refuses to start**: chain id allowlist mismatch (`CHAIN_ID` must match testnet).
- **High error rate / timeouts**: your RPC endpoint is slow or rate-limiting; add failover or run your own node.

