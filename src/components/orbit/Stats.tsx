import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const stats = [
  { value: 120000, suffix: "+", label: "Farmers Served" },
  { value: 47, suffix: "", label: "Distribution Regions" },
  { value: 2.4, suffix: "M", label: "Hectares Protected", decimals: 1 },
  { value: 38, suffix: "%", label: "Yield Uplift" },
];

function Counter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const dur = 2000;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(value * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return (
    <span ref={ref}>
      {v >= 1000 ? Math.floor(v).toLocaleString() : v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative glass-emerald rounded-3xl overflow-hidden p-10 md:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.72_0.20_150/0.2),transparent_70%)]" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  className="text-center md:text-left"
                >
                  <div className="font-display text-5xl md:text-7xl font-light text-gradient-emerald leading-none">
                    <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
