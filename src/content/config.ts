import { defineCollection, z } from 'astro:content';

const recipesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    introduction: z.string(),
    classification: z.enum([
      'classic-full-plate',
      'regional-tradition',
      'component-technique',
      'dietary-adaptation',
      'modern-interpretation',
      'condiments-beverages'
    ]),
    traditionLevel: z.enum(['traditional', 'regional', 'modern', 'adaptation']),
    recipeCategory: z.string(),
    recipeCuisine: z.string().default('British'),
    keywords: z.array(z.string()),
    tags: z.array(z.string()),
    dietaryTags: z.array(z.string()),
    allergens: z.array(z.string()),
    difficulty: z.enum(['Easy', 'Medium', 'Advanced']),
    prepTimeMinutes: z.number(),
    activeTimeMinutes: z.number(),
    cookTimeMinutes: z.number(),
    restTimeMinutes: z.number().default(0),
    totalTimeMinutes: z.number(),
    servings: z.number(),
    yieldUnit: z.string(),
    equipment: z.array(z.string()),
    ingredientGroups: z.array(
      z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({
            ingredient: z.string(),
            amount: z.number(),
            unit: z.string(),
            displayAmount: z.string(),
            preparation: z.string().optional(),
            optional: z.boolean().default(false),
            allergenTags: z.array(z.string()).optional(),
            substitutionNotes: z.string().optional()
          })
        )
      })
    ),
    instructions: z.array(
      z.object({
        stepNumber: z.number(),
        heading: z.string().optional(),
        instruction: z.string(),
        durationMinutes: z.number().optional(),
        temperatureC: z.number().optional(),
        panHeat: z.string().optional(),
        internalTemperatureC: z.number().optional(),
        sensoryCue: z.string().optional(),
        timerLabel: z.string().optional(),
        safetyNote: z.string().optional()
      })
    ),
    timingPlan: z.object({
      suggestedStartTimeOffset: z.string(),
      parallelSteps: z.array(z.string()),
      holdWarmInstructions: z.string()
    }),
    temperatureGuidance: z.object({
      panHeat: z.string(),
      ovenTempC: z.number().optional(),
      fanOvenTempC: z.number().optional(),
      gasMark: z.number().optional(),
      internalSafeTempC: z.number().optional()
    }),
    foodSafetyNotes: z.array(z.string()),
    makeAhead: z.string(),
    storage: z.string(),
    freezing: z.string(),
    reheating: z.string(),
    substitutions: z.array(z.string()),
    variations: z.array(z.string()),
    commonMistakes: z.array(z.string()),
    servingSuggestions: z.array(z.string()),
    relatedRecipes: z.array(z.string()),
    relatedGuides: z.array(z.string()),
    heroImage: z.string(),
    imageAlt: z.string(),
    imageCaption: z.string(),
    author: z.string().default('Fryup.UK Editorial Kitchen'),
    datePublished: z.string(),
    dateModified: z.string(),
    sourceValidated: z.boolean().default(true),
    kitchenTested: z.boolean().default(false)
  })
});

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().default('Fryup.UK Editorial Kitchen'),
    datePublished: z.string(),
    dateModified: z.string(),
    heroImage: z.string(),
    imageAlt: z.string(),
    category: z.string(),
    relatedRecipes: z.array(z.string()).optional()
  })
});

const policiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.string()
  })
});

export const collections = {
  recipes: recipesCollection,
  guides: guidesCollection,
  policies: policiesCollection
};
