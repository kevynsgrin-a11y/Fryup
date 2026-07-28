# Fryup.UK — JSON-LD Structured Data Schema Architecture

## Schema Implementation Matrix

Every page type on Fryup.UK emits valid, structured JSON-LD according to schema.org specifications and Google Rich Result guidelines:

1. **Recipe Schema (`schema.org/Recipe`)**:
   - Emitted on all 84 recipe detail pages.
   - Fields: `@context`, `@type`, `name`, `image`, `description`, `prepTime` (ISO 8601), `cookTime`, `totalTime`, `recipeYield`, `recipeCategory`, `recipeCuisine` ("British"), `keywords`, `recipeIngredient`, `recipeInstructions` (`HowToStep` array with durations), `author` (`Organization`: Fryup.UK Editorial Kitchen), `publisher`, `datePublished`, `dateModified`.
   - Strictly excludes: Fake ratings (`aggregateRating`), fake review counts, hidden ingredients, or video fields without video files.

2. **BreadcrumbList Schema (`schema.org/BreadcrumbList`)**:
   - Emitted on all recipe, guide, category, and policy pages.
   - Specifies ordered `itemListElement` array (`Position`, `Name`, `Item`).

3. **Itemlist Schema (`schema.org/ItemList`)**:
   - Emitted on taxonomy hub pages (`/recipes/full-english/`, `/recipes/air-fryer/`, etc.).

4. **Organization & WebSite Schema (`schema.org/Organization`, `schema.org/WebSite`)**:
   - Emitted on Homepage (`/`) and About Page (`/about/`).
   - Declares site name, URL, canonical domain (`https://fryup.uk`), logo URL, and search action (`SearchAction`).

5. **Article Schema (`schema.org/Article`)**:
   - Emitted on 15 long-form guide pages and history/equipment pages.
