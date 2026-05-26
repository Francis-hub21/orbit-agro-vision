import { Reveal, SectionHeader } from "./Reveal";
import { motion } from "framer-motion";
import { TrendingUp, Package, Truck, Users } from "lucide-react";

const metrics = [
  { label: "Order Volume", value: "₦ 2.4M", delta: "+18.2%", icon: TrendingUp },
  { label: "Inventory Sync", value: "47 hubs", delta: "Live", icon: Package },
  { label: "Active Routes", value: "128", delta: "+12", icon: Truck },
  { label: "Distributors", value: "1,840", delta: "+92", icon: Users },
];

export function Distributor() {
  return (
    <section id="distributor" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="B2B Distributor Portal"
          title={<>Streamline an entire <span className="text-gradient-emerald">regional supply chain.</span></>}
          desc="Save hundreds of operational hours. Wholesale pricing, live inventory, bulk ordering and logistics tracking — unified in one enterprise dashboard."
        />

        <Reveal>
          <div className="glass-emerald rounded-3xl p-6 md:p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.72_0.20_150/0.15),transparent_60%)] pointer-events-none" />

            {/* Dashboard mockup */}
            <div className="relative grid md:grid-cols-4 gap-4 mb-6">
              {metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <m.icon className="h-4 w-4 text-primary" />
                    <span className="text-[10px] tracking-wider uppercase text-primary">{m.delta}</span>
                  </div>
                  <div className="font-display text-2xl">{m.value}</div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">{m.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div className="relative glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Regional Distribution Flow</div>
                  <div className="font-display text-xl mt-1">Last 30 days</div>
                </div>
                <div className="flex gap-4 text-[10px] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" /> Fulfilled</span>
                  <span className="flex items-center gap-1.5 text-muted-foreground"><span className="h-2 w-2 rounded-full bg-muted-foreground/60" /> Forecast</span>
                </div>
              </div>

              {/* SVG Chart */}
              <svg viewBox="0 0 600 180" className="w-full h-44">
                <defs>
                  <linearGradient id="cf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.20 150)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.72 0.20 150)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={45 * i + 15} x2="600" y2={45 * i + 15} stroke="oklch(0.30 0.04 160 / 0.3)" strokeDasharray="2 4" />
                ))}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  d="M0,140 C60,120 100,90 160,100 C220,110 260,60 320,50 C380,40 420,80 480,55 C540,30 580,40 600,30"
                  fill="none"
                  stroke="oklch(0.78 0.25 148)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 }}
                  d="M0,140 C60,120 100,90 160,100 C220,110 260,60 320,50 C380,40 420,80 480,55 C540,30 580,40 600,30 L600,180 L0,180 Z"
                  fill="url(#cf)"
                />
                {/* dotted forecast */}
                <path
                  d="M0,150 C100,135 200,115 300,100 C400,85 500,70 600,60"
                  fill="none" stroke="oklch(0.70 0.02 150 / 0.5)" strokeWidth="1.5" strokeDasharray="4 4"
                />
              </svg>

              <div className="mt-2 grid grid-cols-6 text-[10px] uppercase tracking-wider text-muted-foreground">
                {["W1", "W2", "W3", "W4", "W5", "Now"].map((w) => <div key={w}>{w}</div>)}
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground max-w-md">
                Onboard your agrovet, wholesale or regional distribution business. Get live inventory,
                bulk pricing and automated logistics.
              </p>
              <button className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all">
                Request Portal Access
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
