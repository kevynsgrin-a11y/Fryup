import { describe, expect, it } from 'vitest';
import { packetJsonld, renderPacketArticle, type Packet } from '../../src/lib/packet-render';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// A real packet from the rollout set — the transforms must hold on actual
// composed content, not only on synthetic fixtures.
const realPath = new URL('../../src/content/packets/bacon-butty-with-brown-sauce.json', import.meta.url);
const real = JSON.parse(readFileSync(fileURLToPath(realPath), 'utf8')) as Packet;
const hero = { src: '/images/recipes/bacon-butty-with-brown-sauce.jpg', width: 1200, height: 800 };

describe('renderPacketArticle', () => {
  it('keeps exactly one content container with direct-child blocks', () => {
    const html = renderPacketArticle(real, hero);
    expect((html.match(/data-rpc="content"/g) ?? []).length).toBe(1);
    expect((html.match(/data-block="/g) ?? []).length).toBeGreaterThanOrEqual(8); // Tier C floor after img-less figure cleanup (no At a Glance/Doneness/Finish/glamour)
  });

  it('swaps hero and card to the real photograph, exactly twice', () => {
    const html = renderPacketArticle(real, hero);
    expect((html.match(new RegExp(`src="${hero.src}"`, 'g')) ?? []).length).toBe(2);
  });

  it('strips every unmapped placeholder as a whole tag', () => {
    const html = renderPacketArticle(real, hero);
    expect(html).not.toContain('src="/assets/recipes/"');
    // no orphaned attribute fragments inside shot figures
    expect(/data-shot="[^"]*">[^<]*width="/.test(html)).toBe(false);
  });

  it('appends Recipe JSON-LD without aggregateRating and with the absolute hero', () => {
    const html = renderPacketArticle(real, hero);
    const ld = JSON.parse(
      html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)![1]
    );
    expect(ld['@type']).toBe('Recipe');
    expect(ld.aggregateRating).toBeUndefined();
    expect(ld.image).toEqual(['https://fryup.uk' + hero.src]);
  });

  it('throws on skeleton drift (placeholder survives strip)', () => {
    const broken: Packet = {
      ...real,
      skeleton: real.skeleton.replace(/<figure data-block="hero">[\s\S]*?<\/figure>/, 'x'),
    };
    expect(() => renderPacketArticle(broken, hero)).toThrow(/drift/);
  });
});

describe('packetJsonld', () => {
  it('never ships crowd data and absolutises the image', () => {
    const ld = packetJsonld(real, hero);
    expect(ld.aggregateRating).toBeUndefined();
    expect((ld.image as string[])[0]).toMatch(/^https:\/\/fryup\.uk\//);
  });
});

describe('renderPacketArticle (judge-fix regressions)', () => {
  it('removes img-less shot figures whole — no orphaned spec captions, no empty glamour gaps', () => {
    const html = renderPacketArticle(real, hero);
    expect(html).not.toMatch(/<figure data-shot="[^"]*"><figcaption>/);
    expect(html).not.toMatch(/<figure data-block="pre-card-glamour"><\/figure>/);
    expect(html).not.toMatch(/must match the card/i);
    // hero and CARD figures survive (they carry real imgs)
    expect(html).toContain('data-block="hero"');
    expect(html).toContain('data-shot="CARD"');
  });

  it('uses the recipe title as hero alt, not composer boilerplate', () => {
    const html = renderPacketArticle(real, hero);
    expect(html).not.toContain('site style tokens');
    expect(html).toMatch(/alt="[^"]*Bacon Butty[^"]*"/);
  });
});

describe('renderPacketArticle (step-survival — the over-strip regression)', () => {
  it('never removes content figures: every step figure survives the shot-slot cleanup', () => {
    const html = renderPacketArticle(real, hero);
    // fryup packets wrap steps as <figure data-block="step" ...> figcaptions WITHOUT imgs
    const steps = html.match(/<figure data-block="step"/g) ?? [];
    expect(steps.length).toBeGreaterThanOrEqual(2); // bacon-butty is a genuine 2-step recipe
    expect(html).toMatch(/<strong>Step 1\./);
    // while the shot-slot cleanups still hold
    expect(html).not.toMatch(/<figure data-shot="[^"]*"><figcaption>/);
    expect(html).not.toMatch(/<figure data-block="pre-card-glamour"><\/figure>/);
  });
});
