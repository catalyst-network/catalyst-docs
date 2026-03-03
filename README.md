# Catalyst Docs

Single, public documentation hub for the Catalyst ecosystem (operators, wallets, builders, protocol + RPC reference).

## Local development

Prereqs:
- Node.js >= 20

Install:

```bash
npm install
```

Run locally:

```bash
npm run start
```

Build:

```bash
npm run build
```

Serve the production build locally:

```bash
npm run serve
```

## Repo layout

- `site/`: Docusaurus app (config, theme, docs content)

## Deploy (GitHub Pages)

This repo is set up to build the site on every PR, and deploy `site/build/` to GitHub Pages on merges to `main`.

Notes:
- For project pages, Docusaurus uses `baseUrl: "/catalyst-docs/"`.
- The deployed URL will be the org GitHub Pages host + repo path (example: `https://catalyst-network.github.io/catalyst-docs/`).

