import { Reveal } from "./Reveal";
import { Calendar, Target, ArrowRight } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative px-6 pt-10 pb-16">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-6">
        <Reveal>
          <div className="glass rounded-3xl p-8 md:p-10 h-full">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary mb-4">
              <Calendar className="h-3.5 w-3.5" /> About Us · Established 2009
            </div>
            <h2 className="font-display text-2xl md:text-3xl leading-snug mb-4">
              Orbit Agro Chemical Industries Limited <span className="text-gradient-emerald">(OACIL)</span>
            </h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              OACIL was established in 2009 and specializes in the provision of superior quality crop protection products
              specially formulated for the Kenyan farmer — enabling them to enjoy high yields with very minimal investment.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our approach is unique. We source finished products from reputable international manufacturers as well as
              raw materials, which are then formulated into finished products for local use.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-emerald rounded-3xl p-8 md:p-10 h-full flex flex-col">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-primary mb-4">
              <Target className="h-3.5 w-3.5" /> OACIL Mission
            </div>
            <p className="font-display text-xl md:text-2xl leading-snug flex-1">
              To achieve <span className="text-gradient-emerald">world-class manufacturing excellence</span> by providing
              competitive farming solutions tailored for farmers in Kenya and the region.
            </p>
            <a
              href="/#farm-visit"
              className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_20px_oklch(0.72_0.20_150/0.5)] hover:shadow-[0_0_36px_oklch(0.72_0.20_150/0.8)] transition-all"
            >
              Schedule a Farm Visit <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
