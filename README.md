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
- For the current setup (custom domain), the site is served from the domain root:
  - `https://docs.catalystnet.org/`
- If you host as a GitHub Pages **project site** instead, the site is served under `/<repo>/` and Docusaurus must use `baseUrl: "/catalyst-docs/"`.

