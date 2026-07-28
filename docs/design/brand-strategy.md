# Fryup.UK — Brand Strategy & Visual Identity

## Brand Personality
- **Identity**: Premium British Café-Editorial. Warm, rustic, clean, authoritative, nostalgic yet modern.
- **Atmosphere**: Soft morning window light, dark oak tables, cream enamelware, cast-iron skillets, subtle morning steam, warm tea.
- **Avoid**: Union Jack gimmicks, cartoon sausages, pub sign parodies, American chrome diner styling, greasy spoon grime, neon gradients, or sterile white minimal cards.

---

## Color Palette Tokens

```css
:root {
  /* Canvas & Backgrounds */
  --color-canvas-primary: #FDFBF7;   /* Warm Morning Cream / Paper */
  --color-canvas-secondary: #F5F2EB; /* Soft Warm Neutral */
  --color-card-bg: #FFFFFF;          /* Pure White Card Fill */
  --color-card-border: #E5E0D8;      /* Warm Muted Border */

  /* Primary Typography & Ink */
  --color-ink-primary: #1C1917;      /* Warm Deep Charcoal / Ink */
  --color-ink-secondary: #44403C;    /* Muted Slate Text */
  --color-ink-subtle: #78716C;       /* Light Muted Caption Text */

  /* Primary Accents */
  --color-accent-oxblood: #991B1B;   /* Tomato Oxblood Red */
  --color-accent-oxblood-dark: #7F1D1D;
  --color-accent-yolk: #D97706;      /* Egg Yolk Amber Gold */
  --color-accent-yolk-light: #FEF3C7;
  --color-accent-sage: #365314;      /* Sage Leaf Green */
  --color-accent-sage-light: #ECFDF5;

  /* Toast & Neutral Tones */
  --color-toast-border: #D6D3D1;
  --color-toast-shadow: rgba(28, 25, 23, 0.06);
}
```

## Typography System
- **Display Serif**: `Playfair Display`, `Georgia`, serif system fallback.
- **Body & Interface Sans**: `Inter`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif fallback.
- **Numeric & Tabular**: `Tabular Figures` enabled for recipe times, quantities, and timers (`font-variant-numeric: tabular-nums`).
