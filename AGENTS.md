# Project architecture rules

- Keep product search shared in `src/components/orbit/ProductSearch.tsx` and derive results from `src/data/products.ts` so the home and catalog stay consistent.
- Keep product family membership in `src/data/products.ts` as the source of truth for catalog filters and Crop Doctor recommendations.