# Fryup.UK — Production Launch Checklist

## Pre-Launch Verification Checklist

- [x] **Static Build Verified**: `npm run build` generates 120 pages cleanly in `dist/`.
- [x] **TypeScript Validation**: `npx astro check` passed with 0 errors and 0 warnings.
- [x] **Content Schema Validation**: 84 recipes and 15 guides verified against Zod content schemas.
- [x] **FSA Safety Standards**: Pork core internal temperature (75°C) and Lion Mark egg guidance verified across all recipes.
- [x] **Metric Units & UK English**: Metric-first measurements (`g`, `ml`, `°C` fan) and UK terminology (`back bacon`, `cumberland sausage`, `bap`, `brown sauce`).
- [x] **Photorealistic Visual Assets**: 99 high-resolution photorealistic food photography assets (`/images/recipes/*.jpg`). Zero cartoon placeholders.
- [x] **SEO & Schemas**: JSON-LD Recipe, BreadcrumbList, ItemList, Organization, WebSite schemas emitted.
- [x] **Interactive Tools**: Build Your Fry-Up tool and Multi-Timer functional.
- [x] **Monetisation Disabled**: Monetisation feature-flagged off (`ENABLE_ADS=false`).
- [x] **Legal & Privacy**: UK ICO/GDPR compliant Cookie Policy, Privacy Policy, Terms, and Affiliate Disclosure written.

---

## Production Launch Steps (For Operator)

1. **GitHub Connection**: Push branch `main` to `GitHub / Fryup`.
2. **Cloudflare Pages Setup**: Link repository `Fryup` in Cloudflare Pages dashboard.
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Custom Domain**: Attach custom domain `https://fryup.uk` in Cloudflare Pages dashboard.
4. **SSL & DNS**: Ensure Cloudflare proxy (orange cloud) is enabled for `fryup.uk` and `www.fryup.uk`.
5. **Search Console Submission**: Submit `https://fryup.uk/sitemap-index.xml` to Google Search Console and Bing Webmaster Tools.
