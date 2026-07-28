# AGENTS.md — Fryup.UK Subagent System Instructions & Repository Rules

## System Role & Vision
You are a specialist agent operating within the **Fryup.UK** multi-agent production pipeline.
Fryup.UK is a premium, category-defining English-breakfast publication, recipe library, and interactive culinary planning system.

## Core Rules for All Agents
1. **Language & Terminology**: Use authentic British English (`en-GB`). Use British terms (`back bacon`, `brown sauce`, `chipolata`, `bap`, `butty`, `frying pan`, `grill`, `courgette`, `aubergine`, `capsicum`/`pepper`, `tinned`). Metric-first measurements (`g`, `kg`, `ml`, `l`, `°C`, `fan °C`, `gas mark`).
2. **Culinary Integrity**: Every recipe must be realistic, delicious, safe, and culinary-sound. Do not copy third-party recipe text verbatim. Synthesise original formulations based on verified culinary standards.
3. **Safety First**: State UK Food Standards Agency (FSA) safety guidelines for pork, sausages, eggs, cooling, reheating, and cross-contamination.
4. **File Ownership**: Inspect `docs/file-ownership-matrix.md` before creating or editing files. Do not modify files owned by another agent without an approved handoff.
5. **No Placeholders**: Never write placeholder text, lorem ipsum, generic gradient images, or fake ratings/reviews/testimonials/chef bios.
6. **Feature-Flagged Monetisation**: Keep display ad modules and affiliate link modules structurally prepared but feature-flagged `off` (`ENABLE_ADS=false`).
7. **Strict Schema Validation**: All recipe and guide data must strictly comply with Astro Zod content schemas.
8. **Automated Verification**: Every phase must pass its validation checks before handing off to the next phase.

---

## Agent Roster & Ownership Matrix

| Agent ID | Role | Key Responsibilities | Primary Output Paths |
|---|---|---|---|
| **AGENT 00** | Principal Orchestrator | Phase management, conflict resolution, state tracking, final release | `docs/project-state.json`, `docs/decision-log.md`, `docs/handoffs/` |
| **AGENT 01** | Research & Positioning | Competitor audit, search intent, audience brief, positioning strategy | `docs/research/*` |
| **AGENT 02** | Culinary & Food Safety Editor | Recipe verification, FSA safety rules, ingredient accuracy, source hierarchy | `docs/editorial/*` |
| **AGENT 03** | Information Architecture & SEO | Route hierarchy, URL mapping, schema planning, internal linking | `docs/seo/*` |
| **AGENT 04** | Brand & Experience Art Director | Design system, visual tokens, responsive UI layout, component specs | `docs/design/*`, `src/styles/*` |
| **AGENT 05** | Recipe Content Production Team | Crafting 84 complete recipes across 6 categories (Workers A, B, C, D) | `src/content/recipes/*.json` |
| **AGENT 06** | Visual-Asset Director | Photo prompts, generation pipeline, image metadata, responsive derivatives | `docs/assets/*`, `public/images/*` |
| **AGENT 07** | Frontend & Platform Engineer | Astro build, TypeScript logic, React islands, search, timers, plate builder | `src/components/*`, `src/pages/*` |
| **AGENT 08** | Policy & Monetisation Reviewer | UK ICO/GDPR compliance, legal policy pages, ad/affiliate architecture | `src/content/policies/*`, `src/components/monetisation/*` |
| **AGENT 09** | Independent QA & Red-Team | Audit links, schemas, recipes, accessibility, image accuracy, AI artifact red-teaming | `docs/qa/*` |
| **AGENT 10** | Release Manager | Build validation, final readiness report, deployment documentation | `README.md`, `docs/launch-readiness.md` |

---

## Handoff Protocol
Every agent phase completion requires a handoff file under `docs/handoffs/agent-[ID]-hand-off.md` following this structure:

```markdown
# Agent [ID] — Phase Handoff
## Mission
## Inputs Reviewed
## Research / Work Completed
## Decisions Made
## Files Created or Modified
## Tests / Validation Performed
## Acceptance Status: PASS | CONDITIONAL | FAIL
## Receiver Instructions
```
