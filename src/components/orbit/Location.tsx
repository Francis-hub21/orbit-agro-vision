import { Reveal, SectionHeader } from "./Reveal";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

export function Location() {
  return (
    <section id="location" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Find Us"
          title={<>Visit our <span className="text-gradient-emerald">Nairobi headquarters.</span></>}
          desc="Orbit Agro Chemical Industries Limited — proudly based in Nairobi, Kenya."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <div className="glass rounded-3xl overflow-hidden h-full min-h-[420px]">
              <iframe
                title="Orbit Agro Chemical Industries Limited — Nairobi, Kenya"
                src="https://www.google.com/maps?q=Nairobi,Kenya&output=embed"
                className="w-full h-full min-h-[420px] border-0 grayscale-[40%] contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-4 h-full">
              <InfoCard
                icon={MapPin}
                label="Headquarters"
                value="Orbit Agro Chemical Industries Ltd"
                sub="Nairobi, Kenya"
              />
              <InfoCard
                icon={Phone}
                label="Call Us"
                value="+254 752 368 468"
                href="tel:+254752368468"
              />
              <InfoCard
                icon={Mail}
                label="Email Us"
                value="orbitagro@orbitagro.co.ke"
                href="mailto:orbitagro@orbitagro.co.ke"
              />
              <InfoCard
                icon={Clock}
                label="Opening Hours"
                value="Mon — Fri"
                sub="08:00 — 17:00 EAT"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
  sub,
  href,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  sub?: string;
  href?: string;
}) {
  const inner = (
    <div className="glass rounded-2xl p-6 flex items-start gap-4 hover:border-primary/50 transition-colors h-full">
      <div className="h-10 w-10 rounded-xl glass-emerald flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{label}</div>
        <div className="font-display text-base">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </div>
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}
