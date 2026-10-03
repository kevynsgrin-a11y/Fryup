/**
 * packet-render.ts — Recipe Finalz presentation-packet renderer (fryup rollout).
 *
 * The packet's pre-built skeleton IS the markup-contract HTML (one content
 * container, direct-child data-block elements, jump bar, quantities only in
 * the shared .rpc-card). This module applies the deployment transforms at
 * BUILD time (Astro static render — no hydration semantics to fight) and
 * fails loud on skeleton drift. Pure functions; unit-tested via vitest.
 *
 * Deterministic packet rebuild (Recipe Finalz workspace):
 *   node scripts/compose-presentation.mjs --all-final --write
 */
export interface Packet {
  meta: { slug: string }
  skeleton: string
  jsonld: Record<string, unknown>
}

export const ORIGIN = 'https://fryup.uk'

export interface HeroSpec {
  /** Site's own real photograph, already served at this path. */
  src: string
  width: number
  height: number
}

/**
 * Article HTML for a recipe page. Transforms:
 * 1. hero figure → the site's real hero photograph (reserved space)
 * 2. CARD shot → same real photograph (1:1 crop derives later)
 * 3. unmapped shot placeholders stripped as whole tags (real-only media)
 * 4. packet Recipe JSON-LD appended (aggregateRating removed, absolute image)
 * Throws on any drift so the build fails instead of shipping broken markup.
 */
export function renderPacketArticle(packet: Packet, hero: HeroSpec): string {
  let body = packet.skeleton
  const title = String(packet.jsonld.name ?? packet.meta.slug)
  const heroCap =
    body.match(/<figure data-block="hero">[\s\S]*?<figcaption>([\s\S]*?)<\/figcaption>/)?.[1] ?? ''
  const heroImg = `<img src="${hero.src}" width="${hero.width}" height="${hero.height}" style="aspect-ratio:4/3;object-fit:cover" alt="${title}" fetchpriority="high" decoding="async">`
  body = body.replace(
    /<figure data-block="hero">[\s\S]*?<\/figure>/,
    `<figure data-block="hero">${heroImg}${heroCap ? `<figcaption>${heroCap}</figcaption>` : ''}</figure>`
  )
  body = body.replace(
    /<figure data-shot="CARD"><img[^>]*><\/figure>/,
    `<figure data-shot="CARD"><img src="${hero.src}" width="${hero.width}" height="${hero.height}" style="aspect-ratio:1/1" alt="${title}" fetchpriority="high" decoding="async"></figure>`
  )
  body = body.replace(/<img src="\/assets\/recipes\/"[^>]*>/g, '')
  // Real-only media: figures left without an image (placeholder shots) are
  // removed whole — their captions are composer spec, not reader content,
  // and empty figures render stray gaps via [data-block] margins.
  body = body.replace(/<figure data-(?:shot|block)="[^"]*"[^>]*>(?:(?!<img[\s\S])[\s\S])*?<\/figure>/g, '')
  if (body.includes('src="/assets/recipes/"'))
    throw new Error(`packet drift: ${packet.meta.slug} placeholder survived full-tag strip`)
  if (/<figcaption>[^<]*must match the card/i.test(body))
    throw new Error(`packet drift: ${packet.meta.slug} composer spec caption leaked`)
  const heroHits = body.split(hero.src).length - 1
  if (heroHits !== 2)
    throw new Error(`packet drift: ${packet.meta.slug} expected hero+card twice, got ${heroHits}`)
  const ld = `<script type="application/ld+json" is:inline>${JSON.stringify(
    packetJsonld(packet, hero)
  ).replace(/</g, '\\u003c')}</script>`
  return body + ld
}

export function packetJsonld(packet: Packet, hero: HeroSpec): Record<string, unknown> {
  const ld = { ...packet.jsonld }
  ld.image = [ORIGIN + hero.src]
  // Nothing visible to match — never ship crowd data.
  delete ld.aggregateRating
  return ld
}
