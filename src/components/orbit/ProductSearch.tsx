import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { allProducts } from "@/data/products";
import { crops } from "@/data/crops";

export function ProductSearch({ label = "Search products, crops or pests" }: { label?: string }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return [];
    return allProducts
      .filter((product) => {
        const associatedCrops = crops.filter((crop) => crop.recommended.includes(product.slug)).map((crop) => crop.name);
        return [product.name, product.activeIngredient, product.classification, product.description, product.family, ...associatedCrops, ...(product.targets ?? [])]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase()
          .includes(term);
      })
      .slice(0, 7);
  }, [query]);

  return (
    <div className="relative z-20 w-full max-w-2xl">
      <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-foreground shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />
        <input
          aria-label={label}
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          onChange={(event) => setQuery(event.target.value)}
          placeholder={label}
          type="search"
          value={query}
        />
        <span className="hidden text-xs text-muted-foreground sm:inline">Search</span>
      </label>
      {query.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {results.length ? (
            <ul aria-label="Matching products" className="divide-y divide-border">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    className="flex items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-secondary"
                    params={{ family: product.familySlug }}
                    to="/products/$family"
                    hash={product.slug}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">{product.name}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {product.family}{product.activeIngredient ? ` · ${product.activeIngredient}` : ""}
                      </span>
                    </span>
                    <span className="shrink-0 text-xs text-primary">View</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-muted-foreground">No matching products found.</p>
          )}
        </div>
      )}
    </div>
  );
}