import { Reveal, SectionHeader } from "./Reveal";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Begin the Conversation"
          title={<>Let's grow the future <span className="text-gradient-emerald">together.</span></>}
          desc="Talk to our agronomy specialists, regional distribution leads, or enterprise solutions team."
        />
        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="glass-emerald rounded-3xl p-8 md:p-10 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" type="text" />
                <Field label="Organization" type="text" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" type="email" />
                <Field label="Phone" type="tel" />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Inquiry Type</div>
                <div className="flex flex-wrap gap-2">
                  {["Farmer", "Distributor", "Enterprise", "Export"].map((t) => (
                    <button key={t} type="button" className="rounded-full border border-border px-4 py-1.5 text-xs hover:border-primary/60 hover:text-primary transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message</div>
                <textarea
                  rows={4}
                  className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button className="w-full rounded-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all">
                Send Inquiry
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-5 h-full">
              <InfoCard icon={MapPin} label="Headquarters" value="Industrial Area · Nairobi, Kenya" />
              <InfoCard icon={Phone} label="Sales Line" value="+254 700 000 000" />
              <InfoCard icon={Mail} label="Enterprise" value="solutions@orbitagro.co.ke" />
              <a
                href="#"
                className="block glass-emerald rounded-2xl p-6 group hover:shadow-[0_0_30px_oklch(0.72_0.20_150/0.4)] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Instant</div>
                    <div className="font-display text-lg">Chat on WhatsApp</div>
                  </div>
                </div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">{label}</div>
      <input
        type={type}
        className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-6 flex items-start gap-4">
      <div className="h-10 w-10 rounded-xl glass-emerald flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">{label}</div>
        <div className="font-display text-base">{value}</div>
      </div>
    </div>
  );
}
