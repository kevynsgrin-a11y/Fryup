# Fryup.UK — Known Limitations & Post-Launch Recommendations

## Overview
This document records known limitations and operator recommendations for post-launch maintenance.

1. **Physical Test Kitchen Queue**: All launch recipes are source-validated (`sourceValidated: true`), but physical human testing should be conducted systematically using `docs/editorial/physical-test-queue.md`.
2. **Contact Email**: The policy page `src/content/policies/contact.md` uses placeholder operator contact details. Replace with real operator email before live launch.
3. **Monetisation Activation**: Monetisation modules (`AdSlot.astro`, `AffiliateModule.astro`) are feature-flagged off (`ENABLE_ADS=false`). Update `.env` or Cloudflare Pages environment variables to enable when ready.
