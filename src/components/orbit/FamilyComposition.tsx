import type { Family } from "@/data/products";

export function FamilyComposition({ family }: { family: Family }) {
  const products = family.products.filter((product) => product.image?.startsWith("/products/")).slice(0, 3);
  return <div className="flex h-full w-full items-center justify-center gap-1 bg-card px-4 py-5">
    {products.map((product) => <img key={product.slug} src={product.image} alt={product.name} loading="lazy" className="h-full min-w-0 flex-1 object-contain" />)}
  </div>;
}