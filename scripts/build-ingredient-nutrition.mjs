#!/usr/bin/env node
/**
 * Build the ingredient nutrition reference for fryup.uk from the TrueAPI
 * portfolio ingredient dictionary (static USDA FoodData Central values,
 * resolved offline). Committed build-time artifact: no runtime API calls.
 *
 * Sources joined:
 *   - src/content/recipes/*.json: ingredientGroups[].ingredients[].ingredient
 *     (NOTE: 83 of 84 recipe files still carry template stubs; the join is
 *     per-string and works for any recipe once real ingredients are authored.)
 *   - src/components/tools/PlateBuilder.tsx AVAILABLE_COMPONENTS names,
 *     extracted by regex and asserted non-empty so refactors fail loudly.
 *
 * Dictionary input: DICTIONARY_PATH (env) or argv[2], defaulting to the
 * committed subset copy src/data/ingredient-dictionary.json. Reading an
 * external bundle also refreshes the subset copy.
 *
 * Output: src/data/ingredient-nutrition.json with per-100 g nutrients plus
 * provenance (fdcId, dataType, confidence), a dictionaryFetchedAt stamp,
 * coverage counts, and lookup maps for recipes and plate components.
 *
 * Refresh one-liner (after the portfolio bundle grows):
 *   DICTIONARY_PATH=<path-to-updated-bundle> node scripts/build-ingredient-nutrition.mjs
 *
 * Unresolved names carry resolved:false and no numbers — the site must never
 * render invented nutrition for them.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const recipesDir = resolve(repoRoot, 'src/content/recipes');
const plateBuilderPath = resolve(
  repoRoot,
  'src/components/tools/PlateBuilder.tsx',
);
const subsetPath = resolve(repoRoot, 'src/data/ingredient-dictionary.json');
const outputPath = resolve(repoRoot, 'src/data/ingredient-nutrition.json');

const dictionaryPath = resolve(
  repoRoot,
  process.env.DICTIONARY_PATH ||
    process.argv[2] ||
    'src/data/ingredient-dictionary.json',
);

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

// --- Collect ingredient names from recipes -------------------------------------

// Known template-stub placeholder strings (83/84 recipe files carry them).
// They are not real ingredients and are excluded from the join by design.
const PLACEHOLDER_INGREDIENTS = new Set(['Core Component Item']);

const recipeIngredients = new Map(); // name -> Set of slugs
for (const file of readdirSync(recipesDir).filter((f) => f.endsWith('.json'))) {
  const recipe = readJson(resolve(recipesDir, file));
  const slug = recipe.slug ?? file.replace(/\.json$/, '');
  for (const group of recipe.ingredientGroups ?? []) {
    for (const ingredient of group.ingredients ?? []) {
      const name = String(ingredient.ingredient ?? '').trim();
      if (!name || PLACEHOLDER_INGREDIENTS.has(name)) continue;
      if (!recipeIngredients.has(name)) recipeIngredients.set(name, new Set());
      recipeIngredients.get(name).add(slug);
    }
  }
}

// --- Collect plate component names from PlateBuilder --------------------------

const plateBuilderSource = readFileSync(plateBuilderPath, 'utf8');
const componentRows = [...plateBuilderSource.matchAll(/\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)'/g)]
  .map((m) => ({ id: m[1], name: m[2] }));
if (componentRows.length < 10) {
  throw new Error(
    `Expected >=10 AVAILABLE_COMPONENTS rows in PlateBuilder.tsx, found ${componentRows.length}`,
  );
}
const plateComponents = {};
for (const { id, name } of componentRows) plateComponents[id] = name;

// --- Join against the dictionary ----------------------------------------------

const dictionary = readJson(dictionaryPath);
if (!dictionary || !dictionary.entries) {
  throw new Error(`Dictionary at ${dictionaryPath} has no entries object`);
}
const dictByLower = new Map(
  Object.keys(dictionary.entries).map((key) => [key.toLowerCase(), key]),
);

function lookup(name) {
  const entries = dictionary.entries;
  if (Object.hasOwn(entries, name)) return { key: name, entry: entries[name] };
  const lowerKey = dictByLower.get(name.toLowerCase());
  return lowerKey ? { key: lowerKey, entry: entries[lowerKey] } : null;
}

const names = [
  ...new Set([...recipeIngredients.keys(), ...Object.values(plateComponents)]),
].sort();
const ingredients = {};
const usedDictKeys = new Set();
let resolvedCount = 0;
const unmatched = [];
for (const name of names) {
  const match = lookup(name);
  if (!match) {
    unmatched.push(name);
    continue;
  }
  usedDictKeys.add(match.key);
  const { resolved, fdcId, name: fdcName, dataType, confidence, per100g } =
    match.entry;
  if (resolved) resolvedCount += 1;
  ingredients[name] = {
    resolved: Boolean(resolved),
    ...(resolved
      ? {
          fdcId: fdcId ?? null,
          fdcName: fdcName ?? null,
          dataType: dataType ?? null,
          confidence: confidence ?? null,
          per100g: per100g ? { ...per100g } : {},
        }
      : {}),
    recipeSlugs: [...(recipeIngredients.get(name) ?? [])].sort(),
  };
}

if (unmatched.length > 0) {
  throw new Error(
    `Ingredient names missing from the dictionary:\n${unmatched.join('\n')}`,
  );
}

const output = {
  version: 1,
  generatedBy: 'scripts/build-ingredient-nutrition.mjs',
  dictionarySource: dictionary.source ?? 'TrueAPI portfolio ingredient dictionary',
  dictionaryFetchedAt: dictionary.fetchedAt ?? null,
  fdcAttribution: {
    text: 'Nutrition data: USDA FoodData Central',
    url: 'https://fdc.nal.usda.gov',
  },
  note: 'Per-100 g reference values for raw ingredients from USDA FoodData Central via the TrueAPI portfolio ingredient dictionary. Reference values for the raw ingredient, not a per-serving analysis of any recipe. Entries with resolved:false are not yet verified against FoodData Central and carry no numbers by design.',
  counts: {
    ingredientNames: Object.keys(ingredients).length,
    recipesJoined: [...recipeIngredients.values()].reduce(
      (total, slugs) => total + slugs.size,
      0,
    ),
    plateComponents: Object.keys(plateComponents).length,
    resolved: resolvedCount,
    unresolved: Object.keys(ingredients).length - resolvedCount,
  },
  plateComponents,
  ingredients,
};

writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

if (dictionaryPath !== subsetPath) {
  const subsetEntries = {};
  for (const key of [...usedDictKeys].sort()) subsetEntries[key] = dictionary.entries[key];
  const subset = {
    bundle: dictionary.bundle ?? null,
    source: dictionary.source ?? 'TrueAPI portfolio ingredient dictionary',
    fetchedAt: dictionary.fetchedAt ?? null,
    note: `Subset of the TrueAPI portfolio ingredient dictionary filtered to the ${usedDictKeys.size} keys fryup.uk joins on (recipe ingredient strings plus plate-builder component names). Regenerated by scripts/build-ingredient-nutrition.mjs whenever DICTIONARY_PATH points at an updated full bundle.`,
    counts: { entries: Object.keys(subsetEntries).length },
    entries: subsetEntries,
  };
  writeFileSync(subsetPath, `${JSON.stringify(subset, null, 2)}\n`, 'utf8');
}

console.log(
  `Wrote ${outputPath}: ${output.counts.ingredientNames} ingredient names ` +
    `(${output.counts.plateComponents} plate components, ${output.counts.recipesJoined} recipe joins), ` +
    `${output.counts.resolved} resolved, ${output.counts.unresolved} unresolved` +
    (dictionaryPath !== subsetPath ? `; refreshed subset at ${subsetPath}` : ''),
);
