# Fryup.UK — Information Architecture & Site Map

## Route Tree Overview

```
/ (Homepage)
├── /recipes/ (Recipe Index)
│   ├── /recipes/full-english/
│   ├── /recipes/components/
│   ├── /recipes/sausages-bacon-black-pudding/
│   ├── /recipes/eggs-beans-vegetables/
│   ├── /recipes/potatoes-breads/
│   ├── /recipes/vegetarian-vegan/
│   ├── /recipes/air-fryer/
│   ├── /recipes/modern/
│   └── /recipes/quick/
│   └── [flat recipe slug] (e.g. /recipes/classic-full-english-breakfast/)
├── /build-your-fry-up/ (Interactive Plate Builder & Planner)
├── /fry-up-timer/ (Interactive Multi-Item Timer)
├── /guides/ (Editorial & Culinary Guides Index)
│   └── [guide slug] (e.g. /guides/what-belongs-on-a-full-english-breakfast/)
├── /history/ (History of the English Breakfast)
├── /equipment/ (Fry-Up Cookware & Pan Guide)
├── /about/ (Editorial Kitchen & Mission)
├── /editorial-policy/
├── /recipe-development-policy/
├── /media-policy/
├── /sources/ (Culinary Source Register)
├── /affiliate-disclosure/
├── /privacy/
├── /cookies/
├── /accessibility/
├── /contact/
├── /search/
├── /favourites/
└── /404/
```

## Canonical URL & Trailing Slash Policy
- Host: `https://fryup.uk`
- Trailing slashes: **Enforced** (`trailingSlash: 'always'`)
- Flat Recipe URLs: All recipes map directly under `/recipes/[slug]/` to ensure clean, stable URL structures.
