# Fryup.UK — “The proper fry-up, made at home.”

> Premium English-breakfast cookbook, recipe library, visual reference, and interactive fry-up planning tool.

## Overview
**Fryup.UK** (https://fryup.uk) is a category-defining digital publication for traditional and modern English breakfasts, individual component masterclasses, and synchronized cooking tools.

### Core Highlights
- **84 Complete Recipes**: Individually routed, metric-first UK measurements (`g`, `ml`, `°C` fan), FSA food safety temperature guidance, and step-by-step instructions.
- **15 Long-Form Editorial Guides**: Ingredient selection, sausage mechanics, bacon curing, black pudding history, equipment reviews, and timing science.
- **Build Your Fry-Up Tool (`/build-your-fry-up/`)**: Interactive diner scaler, plate composer, consolidated shopping list, and synchronized cooking timeline.
- **Synchronized Multi-Timer (`/fry-up-timer/`)**: Dedicated multi-dish timer to ensure bacon, sausages, eggs, beans, and toast finish hot simultaneously.
- **Cook Mode & Serving Scaler**: Distraction-free full-screen step navigation and instant portion multiplier.
- **Zero Placeholders**: 99 original editorial food photography assets.
- **Technical SEO**: Complete JSON-LD (Recipe, BreadcrumbList, ItemList, Organization, WebSite), `sitemap-index.xml`, `robots.txt`, and `rss.xml`.
- **Feature-Flagged Monetisation**: Display ads and affiliate modules built and disabled by default (`ENABLE_ADS=false`).

---

## Tech Stack & Architecture
- **Framework**: Astro 5.x (Static Site Generation, `output: 'static'`).
- **Interactive Islands**: Preact/React components for tools, timers, and cook mode.
- **Styling**: Tailwind CSS v4 with custom British café-editorial design tokens.
- **TypeScript**: Strict mode enabled.
- **Deployment Target**: Cloudflare Pages (`npm run build` -> `dist`).

---

## Local Development & Commands

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Content & Schema Validation
npm run validate:content

# Run Unit Tests
npm run test

# Typecheck
npm run typecheck

# Production Build (Output: dist/)
npm run build

# Preview Production Build
npm run preview
```

---

## Subagent Operating System
The repository includes a complete subagent management system under `AGENTS.md` and `docs/handoffs/`:
- `Agent 00`: Principal Orchestrator
- `Agent 01`: Market & Competitor Research
- `Agent 02`: Culinary & Food Safety Editor
- `Agent 03`: Information Architecture & SEO
- `Agent 04`: Brand & Experience Art Director
- `Agent 05`: Recipe Content Production Team (Workers A, B, C, D)
- `Agent 06`: Visual-Asset Director
- `Agent 07`: Frontend & Platform Engineer
- `Agent 08`: Policy & Monetisation Reviewer
- `Agent 09`: Independent QA & Red-Team Reviewer
- `Agent 10`: Release Manager
