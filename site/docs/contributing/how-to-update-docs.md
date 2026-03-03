---
sidebar_position: 1
title: How to update docs
---

## You will need

- Node.js >= 20
- This repo checked out locally

## Steps

### 1) Install dependencies

```bash
npm install
```

### 2) Run the docs site locally

```bash
npm run start
```

### 3) Make changes

Docs live in:

- `site/docs/`

### 4) Verify locally

```bash
npm run build
```

## Verify

- Local build succeeds (this catches broken internal links)
- New pages follow the writing standards in **[Style guide](/docs/contributing/style-guide)**

## Troubleshooting

- If the build fails due to broken links, fix the target path or update the link.
- If you renamed a doc file, update any `to: "/docs/..."` references in `site/docusaurus.config.ts`.

