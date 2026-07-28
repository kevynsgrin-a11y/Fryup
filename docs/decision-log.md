# Fryup.UK — Architectural & Product Decision Log

## Log Entries

### DECISION 001 — Technical Stack & Framework Selection
- **Date**: 2026-07-27
- **Context**: Fryup.UK requires static content performance for 84+ recipes and 15+ guides, combined with dynamic client-side interactivity for the "Build Your Fry-Up" tool, cook mode timers, scaling, and shopping list.
- **Decision**: Selected **Astro 5.x** with TypeScript (strict mode) and static site generation (`output: 'static'`). Interactive components implemented as targeted React/Preact Islands (`client:load`, `client:visible`).
- **Rationale**: Delivers sub-second LCP, zero client JS overhead for editorial pages, perfect SEO, and isolated hydrations for tool components. Fully compatible with Cloudflare Pages (`dist` build directory).

### DECISION 002 — Measurement System & Regional Conventions
- **Date**: 2026-07-27
- **Context**: Project target market is United Kingdom (`en-GB`) with secondary international audience.
- **Decision**: Metric-first UK measurements canonical (`g`, `ml`, `cm`, `°C` fan). British culinary terminology strictly enforced (`back bacon`, `cumberland sausage`, `brown sauce`, `chipolata`, `bap`, `butty`, `frying pan`, `grill`).
- **Rationale**: Protects authentic British identity and prevents confusion across UK home cooks while providing clear metric units for international readers.

### DECISION 003 — Design Token System & Palette
- **Date**: 2026-07-27
- **Context**: Brand visual identity requires a warm, premium British café-editorial aesthetic without cartoonish tropes or Union Jack overload.
- **Decision**: Curated Palette:
  - Ink Charcoal (`#1C1917`) for typography
  - Warm Morning Enamel / Cream (`#FDFBF7`) for background
  - Tomato Oxblood (`#991B1B` / `#7F1D1D`) for primary accents
  - Egg Yolk Gold (`#D97706` / `#F59E0B`) for secondary highlights
  - Sage Leaf Green (`#44403C` / `#365314`) for dietary & freshness tags
  - Toast Neutrals (`#F5F5F4`, `#E7E5E4`) for cards and containers
- **Rationale**: Evokes morning window light, dark oak, cast iron, and vintage British teahouses while passing WCAG 2.2 AA contrast rules.

### DECISION 004 — Feature-Flagged Monetisation
- **Date**: 2026-07-27
- **Context**: Site revenue model relies on future ads and affiliate links, but initial build must be completely free of tracking and live monetization IDs.
- **Decision**: Built `AdSlot.astro` and `AffiliateModule.astro` with default configuration key `ENABLE_ADS=false`.
- **Rationale**: Ensures fast clean initial launch and privacy compliance while establishing robust layout stability for future deployment.
