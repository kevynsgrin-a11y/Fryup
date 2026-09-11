import data from '../data/ingredient-nutrition.json';

/**
 * Ingredient nutrition reference data, built at commit time by
 * scripts/build-ingredient-nutrition.mjs from the TrueAPI portfolio
 * ingredient dictionary (USDA FoodData Central values resolved offline).
 * Per-100 g reference values for raw ingredients — never a per-serving
 * analysis of a recipe — and unresolved entries carry no numbers by design.
 */
export interface IngredientNutritionEntry {
  resolved: boolean;
  fdcId?: number | null;
  fdcName?: string | null;
  dataType?: string | null;
  confidence?: number | null;
  per100g?: Record<string, number>;
  recipeSlugs?: string[];
}

export interface IngredientNutritionData {
  version: number;
  generatedBy: string;
  dictionarySource: string;
  dictionaryFetchedAt: string | null;
  fdcAttribution: { text: string; url: string };
  counts: {
    ingredientNames: number;
    recipesJoined: number;
    plateComponents: number;
    resolved: number;
    unresolved: number;
  };
  plateComponents: Record<string, string>;
  ingredients: Record<string, IngredientNutritionEntry>;
}

export const ingredientNutritionData = data as unknown as IngredientNutritionData;

export const FDC_ATTRIBUTION = ingredientNutritionData.fdcAttribution;

/** Lookup for a recipe ingredient string; undefined unless verified against FDC. */
export function nutritionForIngredient(
  name: string,
): IngredientNutritionEntry | undefined {
  const entry = ingredientNutritionData.ingredients[String(name).trim()];
  return entry?.resolved ? entry : undefined;
}

/** Lookup for a plate-builder component id (sausage, bacon, ...). */
export function nutritionForPlateComponent(
  componentId: string,
): { name: string; entry: IngredientNutritionEntry } | undefined {
  const name = ingredientNutritionData.plateComponents[componentId];
  if (!name) return undefined;
  const entry = nutritionForIngredient(name);
  return entry ? { name, entry } : undefined;
}

const CORE_NUTRIENTS: ReadonlyArray<readonly [string, string]> = [
  ['kcal', 'kcal'],
  ['protein_g', 'protein'],
  ['fat_g', 'fat'],
  ['carbs_g', 'carbs'],
];

/** "714 kcal, 0 g protein, 78.6 g fat, 0 g carbs (per 100 g)" — only nutrients present. */
export function formatPer100gLine(
  entry: IngredientNutritionEntry,
): string {
  const per100g = entry.per100g;
  if (!per100g) return '';
  const parts: string[] = [];
  for (const [key, label] of CORE_NUTRIENTS) {
    const value = per100g[key];
    if (value == null) continue;
    parts.push(key === 'kcal' ? `${value} kcal` : `${value} g ${label}`);
  }
  return parts.length > 0 ? `${parts.join(', ')} (per 100 g)` : '';
}
