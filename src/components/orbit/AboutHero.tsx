import { Reveal } from "./Reveal";
import { Calendar, Target, Eye } from "lucide-react";

export function AboutHero() {
  return (
    <section className="relative px-6 pt-10 pb-16">
      <div className="mx-auto max-w-7xl space-y-8">
        <div id="company-overview" className="scroll-mt-24">
        <Reveal>
          <div className="p-2 md:p-4">
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
        </div>
        <div id="vision-mission" className="grid scroll-mt-24 gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-lg border border-border border-t-4 border-t-orbit-green bg-card p-8 md:p-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl text-orbit-green"><Eye className="h-5 w-5" /> Vision</h2>
            <p className="text-lg leading-relaxed">Orbit Agro Chemical Industries Ltd is a one-stop company in providing quality, effective and affordable products and services to farming communities in East Africa.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-lg border border-border border-t-4 border-t-orbit-red bg-card p-8 md:p-10">
            <h2 className="mb-4 flex items-center gap-2 text-2xl text-orbit-red"><Target className="h-5 w-5" /> Mission</h2>
            <p className="text-lg leading-relaxed">We strive to be the leading provider of farming solutions in Kenya and the region.</p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
