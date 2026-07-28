# Fryup.UK — Cloudflare Pages Deployment & Preview Configuration Guide

## Overview
Fryup.UK is configured for zero-configuration static site deployment on **Cloudflare Pages** via Git integration with GitHub repository `Fryup`.

---

## Cloudflare Pages Configuration Settings

| Setting Key | Target Value |
|---|---|
| **Project Name** | `fryup-uk` |
| **Production Branch** | `main` |
| **Framework Preset** | `Astro` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Node.js Version** | `20.x` or `24.x` (`NODE_VERSION = 20.18.0`) |

---

## Environment Variables Configuration

Set these environment variables in Cloudflare Pages Dashboard -> Settings -> Environment Variables:

```ini
# Production Domain
PUBLIC_SITE_URL=https://fryup.uk

# Node Version
NODE_VERSION=20.18.0

# Feature Flags (Keep monetization disabled for launch)
ENABLE_ADS=false
ENABLE_AFFILIATES=false
```

---

## Cloudflare Header & Routing Rules (`_headers` and `_redirects`)

Cloudflare Pages automatically serves files from `dist/`.
- Trailing slashes are canonical (`trailingSlash: 'always'`).
- Sitemap generated at `https://fryup.uk/sitemap-index.xml`.
- Robots policy served at `https://fryup.uk/robots.txt`.
