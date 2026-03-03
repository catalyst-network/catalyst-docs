---
sidebar_position: 3
title: Release & versioning policy
---

## Policy (current)

**Latest-only docs**, with compatibility notes.

What that means:

- Docs track the `main` branch of the Catalyst repos.
- Pages call out stability:
  - **Stable**: compatible across releases
  - **Experimental**: may change without notice; pin a commit/tag

## When to add versioned docs

When Catalyst publishes tagged releases with breaking changes, we will switch to Docusaurus versioned docs:

- Create a doc version at each node/SDK release tag.
- Keep “Current” as the default view.

## How to cut a docs version (Docusaurus)

From `site/`:

```bash
npm run docusaurus docs:version vX.Y.Z
```

Then update navigation and CI as needed.

