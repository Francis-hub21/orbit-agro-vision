# Project architecture rules

- Keep product search shared in `src/components/orbit/ProductSearch.tsx` and derive results from `src/data/products.ts` so the home and catalog stay consistent.
- Keep product family membership in `src/data/products.ts` as the source of truth for catalog filters and Crop Doctor recommendations.
- Map uploaded product photos centrally in `src/data/products.ts` using exact case-sensitive public filenames so all product views share the same images.
- Build category compositions from the family's uploaded product images in `FamilyComposition` so category visuals cannot diverge from catalogue membership.
- Keep social destinations and custom logo rendering shared in `SocialLinks` so navigation, contact and footer stay consistent.
- Render company identity in the shared in-flow header above sticky navigation, with home search directly below it, to avoid duplicate branding and viewport-dependent offsets.