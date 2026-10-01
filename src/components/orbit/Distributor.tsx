import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Package, Truck, Users, Search, LogIn, LayoutDashboard, Boxes, ShieldCheck, KeyRound, ArrowRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Reveal, SectionHeader } from "./Reveal";
import { CURRENCIES, chartFor, metricsFor, type Currency } from "./portal/data";
import { BulkOrder, Inventory, Authenticate, ApiKeys } from "./portal/Modules";
import { Onboarding } from "./portal/Onboarding";

const SERIES = [
  { key: "fulfilled", label: "Fulfilled", color: "oklch(0.78 0.22 148)" },
  { key: "transit", label: "In Transit", color: "oklch(0.80 0.16 75)" },
  { key: "pending", label: "Pending Hub Pickup", color: "oklch(0.70 0.15 245)" },
] as const;

const VIEWS = [
  { id: "orders", label: "Bulk Order Engine", icon: Boxes },
  { id: "inventory", label: "Inventory & Pricing", icon: Package },
  { id: "auth", label: "Product Authentication", icon: ShieldCheck },
  { id: "api", label: "Developer / API Keys", icon: KeyRound },
] as const;

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { payload: Record<string, number> }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-xl border border-primary/40 bg-card/95 px-4 py-3 text-xs shadow-xl backdrop-blur">
      <div className="font-display text-sm mb-1">{label}</div>
      <div>Litres distributed: <b>{d.fulfilled.toLocaleString()}L</b></div>
      <div>In transit: {d.transit.toLocaleString()}L</div>
      <div>Pending pickup: {d.pending.toLocaleString()}L</div>
      <div className="text-primary mt-1">Active orders: {d.orders.toLocaleString()}</div>
    </div>
  );
}

export function Distributor() {
  const [scope, setScope] = useState<"regional" | "global">("regional");
  const [range, setRange] = useState<"24h" | "7d" | "30d">("30d");
  const [currency, setCurrency] = useState<Currency>("KES");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState<Record<string, boolean>>({ fulfilled: true, transit: true, pending: true });
  const [view, setView] = useState<(typeof VIEWS)[number]["id"] | null>(null);
  const [onboard, setOnboard] = useState(false);

  const m = metricsFor(scope, range);
  const data = chartFor(scope);
  const sym = CURRENCIES[currency].symbol;
  const vol = (m.volume * 1e6 * CURRENCIES[currency].rate) / 1e6;

  const metrics = [
    { label: "Order Volume", value: `${sym} ${vol.toFixed(vol < 10 ? 1 : 0)}M`, badge: "+18.2%", icon: TrendingUp },
    { label: "Inventory Sync", value: `${m.hubs} hubs`, badge: "live", icon: Package },
    { label: "Active Routes", value: m.routes.toLocaleString(), icon: Truck },
    { label: "Active Shipments", value: m.shipments.toLocaleString(), icon: Users },
  ];

  const enter = (v: (typeof VIEWS)[number]["id"] = "orders") => {
    setView(v);
    setTimeout(() => document.getElementById("portal-modules")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <section id="distributor" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Portal header */}
        <div className="sticky top-20 z-30 mb-10 glass rounded-2xl px-4 py-3 flex flex-wrap items-center gap-3">
          <div className="font-display text-base mr-auto">B2B Distributor Portal</div>
          <div className="relative order-last w-full md:order-none md:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              name="portal-search"
              id="portal-search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); if (e.target.value) setView("inventory"); }}
              placeholder="Search SKU or product…"
              className="w-full rounded-full border border-border bg-background/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <select
            name="portal-currency"
            id="portal-currency"
            aria-label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="rounded-full border border-border bg-background/60 px-3 py-2 text-sm"
          >
            <option value="KES">EN · KES</option>
            <option value="USD">EN · USD</option>
            <option value="NGN">EN · NGN</option>
          </select>
          <button onClick={() => setOnboard(true)} className="flex items-center gap-1.5 text-sm text-primary">
            <LogIn className="h-4 w-4" /> Distributor Login / Register
          </button>
        </div>

        <SectionHeader
          eyebrow="B2B Distributor Portal"
          title={<>Streamline an entire <span className="text-gradient-emerald">regional supply chain.</span></>}
          desc="Save hundreds of operational hours. Wholesale pricing, live inventory, bulk ordering and logistics tracking — unified in one enterprise dashboard."
        />

        <div className="-mt-8 mb-12 flex flex-wrap justify-center gap-4">
          <Link to="/products" className="flex items-center gap-2 rounded-full border border-primary/60 px-6 py-3 text-sm text-primary shadow-[0_0_24px_oklch(0.72_0.20_150/0.35)] hover:bg-primary/10 transition">
            Explore Solutions <ArrowRight className="h-4 w-4" />
          </Link>
          <button onClick={() => enter()} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition">
            <LayoutDashboard className="h-4 w-4" /> Enter Dashboard
          </button>
        </div>

        <Reveal>
          <div className="glass-emerald rounded-3xl p-6 md:p-8 relative overflow-hidden">
            {/* Control bar */}
            <div className="relative mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex rounded-full border border-border p-1" role="group">
                {(["regional", "global"] as const).map((s) => (
                  <button key={s} onClick={() => setScope(s)} className={`rounded-full px-4 py-1.5 text-xs transition ${scope === s ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                    {s === "regional" ? "Regional View" : "Global View"}
                  </button>
                ))}
              </div>
              <select name="timeframe" id="timeframe" aria-label="Timeframe" value={range} onChange={(e) => setRange(e.target.value as typeof range)} className="rounded-full border border-border bg-background/60 px-3 py-1.5 text-xs">
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {metrics.map((mt, i) => (
                <motion.div key={mt.label} layout initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 min-w-0">
                  <div className="flex items-center justify-between mb-3">
                    <mt.icon className="h-4 w-4 text-primary" />
                    {mt.badge === "live" ? (
                      <span className="flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">
                        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
                        Live
                      </span>
                    ) : mt.badge ? (
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] text-primary">{mt.badge}</span>
                    ) : null}
                  </div>
                  <div className="font-display text-2xl">{mt.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{mt.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="relative glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-xs text-muted-foreground">Regional Distribution Flow</div>
                  <div className="font-display text-xl mt-1">{range === "24h" ? "Last 24 hours" : range === "7d" ? "Last 7 days" : "Last 30 days"}</div>
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  {SERIES.map((s) => (
                    <label key={s.key} className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input type="checkbox" name={`series-${s.key}`} checked={shown[s.key]} onChange={(e) => setShown({ ...shown, [s.key]: e.target.checked })} className="sr-only" />
                      <span className="h-3 w-3 rounded-sm border" style={{ borderColor: s.color, background: shown[s.key] ? s.color : "transparent" }} />
                      <span className={shown[s.key] ? "" : "text-muted-foreground line-through"}>{s.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="currentColor" className="text-border" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: "currentColor" }} className="text-muted-foreground" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "currentColor" }} className="text-muted-foreground" axisLine={false} tickLine={false} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                    <Tooltip content={<ChartTooltip />} />
                    {SERIES.map((s) => shown[s.key] && (
                      <Line key={s.key} type="monotone" dataKey={s.key} stroke={s.color} strokeWidth={2.5} dot={{ r: 3, fill: s.color }} activeDot={{ r: 6 }} style={{ filter: `drop-shadow(0 0 6px ${s.color})` }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground max-w-md">
                Onboard your agrovet, wholesale or regional distribution business. Get live inventory, bulk pricing and automated logistics.
              </p>
              <button onClick={() => setOnboard(true)} className="rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all">
                Request Portal Access
              </button>
            </div>
          </div>
        </Reveal>

        {/* Modules */}
        <div id="portal-modules" className="mt-10 scroll-mt-40">
          <div className="flex flex-wrap gap-2 mb-4">
            {VIEWS.map((v) => (
              <button key={v.id} onClick={() => setView(view === v.id ? null : v.id)} className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${view === v.id ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/60"}`}>
                <v.icon className="h-4 w-4" /> {v.label}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            {view && (
              <motion.div key={view} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="glass rounded-3xl p-5 md:p-7">
                {view === "orders" && <BulkOrder currency={currency} />}
                {view === "inventory" && <Inventory currency={currency} query={query} />}
                {view === "auth" && <Authenticate />}
                {view === "api" && <ApiKeys />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Onboarding open={onboard} onClose={() => setOnboard(false)} />
    </section>
  );
}
