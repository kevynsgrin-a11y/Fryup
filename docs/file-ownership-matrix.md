# Fryup.UK — File Ownership Matrix

## Purpose
Prevents agents from editing the same files concurrently. Each agent owns specific directory paths and file patterns.

| Agent | Exclusive File Paths / Patterns |
|---|---|
| **AGENT 00 (Orchestrator)** | `docs/project-state.json`, `docs/decision-log.md`, `docs/file-ownership-matrix.md`, `docs/handoffs/*` |
| **AGENT 01 (Research)** | `docs/research/market-brief.md`, `docs/research/competitor-matrix.csv`, `docs/research/search-intent-map.csv`, `docs/research/topic-opportunity-map.md`, `docs/research/positioning-brief.md` |
| **AGENT 02 (Culinary Editor)** | `docs/editorial/culinary-standards.md`, `docs/editorial/food-safety-standard.md`, `docs/editorial/measurement-standard.md`, `docs/editorial/allergen-standard.md`, `docs/editorial/recipe-review-log.csv`, `docs/editorial/physical-test-queue.md`, `docs/sources/source-register.csv` |
| **AGENT 03 (SEO Editor)** | `docs/seo/information-architecture.md`, `docs/seo/url-map.csv`, `docs/seo/keyword-page-map.csv`, `docs/seo/internal-link-map.csv`, `docs/seo/schema-plan.md`, `docs/seo/indexing-checklist.md`, `docs/seo/redirect-plan.md`, `docs/seo/content-gap-report.md` |
| **AGENT 04 (Art Director)** | `docs/design/*`, `src/styles/*` |
| **AGENT 05 - Worker A** | `src/content/recipes/classic-full-english-breakfast.json` through recipe 30 |
| **AGENT 05 - Worker B** | `src/content/recipes/` recipes 31 through 52 |
| **AGENT 05 - Worker C** | `src/content/recipes/` recipes 53 through 68 |
| **AGENT 05 - Worker D** | `src/content/recipes/` recipes 69 through 84 |
| **AGENT 06 (Assets Director)** | `docs/assets/asset-plan.md`, `docs/assets/asset-manifest.json`, `docs/assets/image-generation-log.csv`, `docs/assets/image-qa-log.csv`, `public/images/*` |
| **AGENT 07 (Engineering)** | `src/components/*`, `src/layouts/*`, `src/pages/*`, `src/lib/*`, `src/types/*`, `astro.config.mjs`, `package.json`, `tsconfig.json`, `scripts/*` |
| **AGENT 08 (Policy Reviewer)** | `src/content/policies/*`, `src/components/monetisation/*`, `src/config/monetisation.ts` |
| **AGENT 09 (Red-Team QA)** | `docs/qa/test-results.json`, `docs/qa/visual-review.md`, `docs/qa/screenshots/*` |
| **AGENT 10 (Release Manager)** | `README.md`, `docs/launch-readiness.md`, `docs/release-handoff.md`, `docs/production-launch-checklist.md` |
