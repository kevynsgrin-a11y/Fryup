import fs from 'fs';
import path from 'path';

const RECIPES_DIR = path.join(process.cwd(), 'src', 'content', 'recipes');
const GUIDES_DIR = path.join(process.cwd(), 'src', 'content', 'guides');

console.log('=== AUTOMATED CONTENT VALIDATION AUDIT ===');

const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.json'));
console.log(`Auditing ${recipeFiles.length} recipe content files...`);

let errors = 0;
const slugs = new Set();

recipeFiles.forEach(file => {
  const filePath = path.join(RECIPES_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Check unique slug
  if (slugs.has(data.slug)) {
    console.error(`ERROR: Duplicate slug detected: ${data.slug}`);
    errors++;
  }
  slugs.add(data.slug);

  // Check required fields
  if (!data.id || !data.title || !data.description || !data.heroImage) {
    console.error(`ERROR: Missing core metadata in ${file}`);
    errors++;
  }

  // Check ingredients
  if (!data.ingredientGroups || data.ingredientGroups.length === 0) {
    console.error(`ERROR: Recipe ${file} has no ingredient groups`);
    errors++;
  }

  // Check instructions
  if (!data.instructions || data.instructions.length === 0) {
    console.error(`ERROR: Recipe ${file} has no instructions`);
    errors++;
  }

  // Check FSA safety notes
  if (!data.foodSafetyNotes || data.foodSafetyNotes.length === 0) {
    console.error(`ERROR: Recipe ${file} missing FSA food safety notes`);
    errors++;
  }
});

const guideFiles = fs.readdirSync(GUIDES_DIR).filter(f => f.endsWith('.md'));
console.log(`Auditing ${guideFiles.length} guide content files...`);

if (recipeFiles.length < 84) {
  console.error(`ERROR: Total recipes count (${recipeFiles.length}) is below required minimum of 84`);
  errors++;
}

if (guideFiles.length < 15) {
  console.error(`ERROR: Total guides count (${guideFiles.length}) is below required minimum of 15`);
  errors++;
}

if (errors === 0) {
  console.log('✅ ALL CONTENT VALIDATION CHECKS PASSED PERFECTLY!');
  process.exit(0);
} else {
  console.error(`❌ Validation failed with ${errors} errors.`);
  process.exit(1);
}
