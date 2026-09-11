import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import data from '../../src/data/ingredient-nutrition.json';
import {
  FDC_ATTRIBUTION,
  formatPer100gLine,
  nutritionForIngredient,
  nutritionForPlateComponent,
  type IngredientNutritionData,
} from '../../src/lib/nutrition';

const artifact = data as unknown as IngredientNutritionData;
const PLACEHOLDER_INGREDIENTS = new Set(['Core Component Item']);

function recipeIngredientNames(): Map<string, string[]> {
  const names = new Map<string, string[]>();
  const dir = new URL('../../src/content/recipes/', import.meta.url);
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
    const recipe = JSON.parse(readFileSync(new URL(file, dir), 'utf8'));
    for (const group of recipe.ingredientGroups ?? []) {
      for (const ingredient of group.ingredients ?? []) {
        const name = String(ingredient.ingredient ?? '').trim();
        if (!name || PLACEHOLDER_INGREDIENTS.has(name)) continue;
        if (!names.has(name)) names.set(name, []);
        names.get(name)!.push(recipe.slug ?? file);
      }
    }
  }
  return names;
}

describe('ingredient nutrition reference data', () => {
  it('covers every non-placeholder recipe ingredient string', () => {
    const names = recipeIngredientNames();
    expect(names.size).toBeGreaterThan(0);
    for (const [name, slugs] of names) {
      expect(artifact.ingredients[name], name).toBeDefined();
      expect(
        artifact.ingredients[name].recipeSlugs?.sort(),
        name,
      ).toEqual([...new Set(slugs)].sort());
    }
  });

  it('covers every plate-builder component name', () => {
    expect(Object.keys(artifact.plateComponents).length).toBeGreaterThanOrEqual(10);
    for (const [id, name] of Object.entries(artifact.plateComponents)) {
      expect(artifact.ingredients[name], `component ${id}`).toBeDefined();
    }
  });

  it('carries provenance for resolved entries and no numbers for unresolved ones', () => {
    let resolved = 0;
    let unresolved = 0;
    for (const [name, entry] of Object.entries(artifact.ingredients)) {
      if (entry.resolved) {
        resolved += 1;
        expect(entry.fdcId, name).toEqual(expect.any(Number));
        expect(entry.dataType, name).toEqual(expect.any(String));
        expect(Object.keys(entry.per100g ?? {}).length, name).toBeGreaterThan(0);
      } else {
        unresolved += 1;
        expect(entry.per100g, name).toBeUndefined();
        expect(entry.fdcId, name).toBeUndefined();
      }
    }
    expect(resolved).toBe(artifact.counts.resolved);
    expect(unresolved).toBe(artifact.counts.unresolved);
  });

  it('stamps the dictionary snapshot date and FDC attribution', () => {
    expect(artifact.dictionaryFetchedAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
    expect(FDC_ATTRIBUTION.url).toBe('https://fdc.nal.usda.gov');
    expect(FDC_ATTRIBUTION.text).toContain('FoodData Central');
  });

  it('lookups return only verified entries and format only carried nutrients', () => {
    // Unresolved and unknown names must never return numbers.
    const unresolvedName = Object.entries(artifact.ingredients).find(
      ([, entry]) => !entry.resolved,
    )?.[0];
    if (unresolvedName) {
      expect(nutritionForIngredient(unresolvedName)).toBeUndefined();
    }
    expect(nutritionForIngredient('Definitely Not An Ingredient')).toBeUndefined();

    const resolvedName = Object.entries(artifact.ingredients).find(
      ([, entry]) => entry.resolved,
    )?.[0];
    if (resolvedName) {
      const entry = nutritionForIngredient(resolvedName);
      expect(entry?.resolved).toBe(true);
      expect(formatPer100gLine(entry!)).toMatch(/\(per 100 g\)$/);
    }

    expect(
      formatPer100gLine({
        resolved: true,
        per100g: { kcal: 714, protein_g: 0, fat_g: 78.6, carbs_g: 0 },
      }),
    ).toBe('714 kcal, 0 g protein, 78.6 g fat, 0 g carbs (per 100 g)');
    expect(
      formatPer100gLine({ resolved: true, per100g: { fiber_g: 2 } }),
    ).toBe('');

    // Plate component lookup joins through the component name map.
    const [firstId, firstName] = Object.entries(artifact.plateComponents)[0];
    const component = nutritionForPlateComponent(firstId);
    if (component) {
      expect(component.name).toBe(firstName);
      expect(component.entry.resolved).toBe(true);
    } else {
      expect(nutritionForPlateComponent(firstId)).toBeUndefined();
    }
  });
});
