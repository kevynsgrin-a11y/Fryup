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
    expect((html.match(/data-block="/g) ?? []).length).toBeGreaterThanOrEqual(10); // Tier C packets carry fewer blocks (no At a Glance/Doneness/Finish)
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
