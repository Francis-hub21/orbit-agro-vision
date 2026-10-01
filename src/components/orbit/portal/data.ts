import { allProducts } from "@/data/products";

export const HUBS = ["Nairobi", "Nakuru", "Eldoret", "Kisumu", "Mombasa"] as const;

export const CURRENCIES = {
  KES: { symbol: "KSh", rate: 1 },
  USD: { symbol: "$", rate: 1 / 129 },
  NGN: { symbol: "₦", rate: 11.8 },
} as const;
export type Currency = keyof typeof CURRENCIES;

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

export const catalog = allProducts.map((p) => {
  const h = hash(p.slug);
  return {
    sku: `OAC-${p.slug.slice(0, 4).toUpperCase()}-${(h % 900) + 100}`,
    name: p.name,
    family: p.family,
    image: p.image,
    priceKes: 450 + (h % 40) * 85,
    stock: Object.fromEntries(HUBS.map((hub, i) => [hub, ((h >> i) % 7) * 120])) as Record<string, number>,
  };
});
export type CatalogItem = (typeof catalog)[number];

export const tierPrice = (base: number, qty: number) =>
  qty > 500 ? base * 0.75 : qty > 50 ? base * 0.85 : base;

export const fmt = (kes: number, c: Currency) => {
  const { symbol, rate } = CURRENCIES[c];
  return `${symbol} ${(kes * rate).toLocaleString(undefined, { maximumFractionDigits: c === "USD" ? 2 : 0 })}`;
};

type Scope = "regional" | "global";
type Range = "24h" | "7d" | "30d";
export const metricsFor = (scope: Scope, range: Range) => {
  const m = (scope === "global" ? 3.2 : 1) * (range === "24h" ? 0.05 : range === "7d" ? 0.3 : 1);
  return {
    volume: 2.4 * m,
    hubs: scope === "global" ? 112 : 47,
    routes: Math.round(128 * (scope === "global" ? 2.6 : 1)),
    shipments: Math.round(1840 * m),
  };
};

export const chartFor = (scope: Scope) => {
  const k = scope === "global" ? 2.8 : 1;
  return ["W1", "W2", "W3", "W4", "W5"].map((w, i) => ({
    week: w,
    fulfilled: Math.round((28000 + i * 4200 + (i % 2) * 3000) * k),
    transit: Math.round((12000 + i * 1800) * k),
    pending: Math.round((6000 + ((i * 1300) % 4000)) * k),
    orders: Math.round((820 + i * 105) * k),
  }));
};
