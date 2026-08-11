import { Reveal, SectionHeader } from "./Reveal";
import { MapPin, Phone, Mail, MessageCircle, Check } from "lucide-react";
import { useState } from "react";

const INQUIRY_TYPES = ["Farmer", "Distributor", "Enterprise", "Export"];

export function Contact() {
  const [inquiry, setInquiry] = useState("Farmer");
  const [form, setForm] = useState({ name: "", organization: "", email: "", phone: "", message: "" });
  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Inquiry type: ${inquiry}`,
      `Name: ${form.name}`,
      `Organization: ${form.organization}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:orbitagro@orbitagro.co.ke?subject=${encodeURIComponent(
      `${inquiry} inquiry — ${form.name || "Website"}`,
    )}&body=${encodeURIComponent(body)}`;
  };

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
              onSubmit={handleSubmit}
              className="glass-emerald rounded-3xl p-8 md:p-10 space-y-5"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" type="text" value={form.name} onChange={set("name")} />
                <Field label="Organization" type="text" value={form.organization} onChange={set("organization")} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" type="email" value={form.email} onChange={set("email")} required />
                <Field label="Phone" type="tel" value={form.phone} onChange={set("phone")} />
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Inquiry Type</div>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TYPES.map((t) => {
                    const active = inquiry === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setInquiry(t)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs transition-all ${
                          active
                            ? "border-primary bg-primary/15 text-primary shadow-[0_0_20px_oklch(0.72_0.20_150/0.35)]"
                            : "border-border hover:border-primary/60 hover:text-primary"
                        }`}
                      >
                        {active && <Check className="h-3 w-3" />}
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">Message</div>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all"
              >
                Send Inquiry
              </button>
            </form>

          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="space-y-5 h-full">
              <InfoCard icon={MapPin} label="Headquarters" value="Nairobi, Kenya" />
              <InfoCard icon={Phone} label="Sales Line" value="+254 752 368 468" />
              <InfoCard icon={Mail} label="Email" value="orbitagro@orbitagro.co.ke" />
              <a
                href="https://wa.me/254752368468"
                target="_blank"
                rel="noreferrer"
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
