import { useState } from "react";
import { Reveal, SectionHeader } from "./Reveal";
import { CalendarCheck, MapPin, Sprout, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function FarmVisit() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="farm-visit" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="On-Farm Support"
          title={<>Schedule a <span className="text-gradient-emerald">Farm Visit.</span></>}
          desc="Our agronomists travel to your farm to assess crops, diagnose issues and design a tailored protection programme — at no cost to you."
        />

        <div className="grid lg:grid-cols-5 gap-6">
          <Reveal className="lg:col-span-2">
            <div className="space-y-4 h-full">
              {[
                { icon: Sprout, title: "On-site agronomy", text: "A specialist walks your fields, identifies pests and diseases, and assesses soil and crop stage." },
                { icon: CalendarCheck, title: "Custom programme", text: "We design a season-long crop protection and nutrition plan tailored to your acreage and budget." },
                { icon: MapPin, title: "Anywhere in Kenya", text: "From Nakuru to Nyeri, Uasin Gishu to Makueni — our team comes to where the farm is." },
              ].map((b) => (
                <div key={b.title} className="glass rounded-2xl p-6 flex gap-4">
                  <div className="h-11 w-11 rounded-xl glass-emerald flex items-center justify-center shrink-0">
                    <b.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display text-base mb-1">{b.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{b.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget as HTMLFormElement);
                const name = fd.get("Full Name") || "";
                const phone = fd.get("Phone (+254...)") || "";
                const region = fd.get("County / Region") || "";
                const date = fd.get("Preferred Date") || "";
                const crops = fd.get("Crop(s) Grown") || "";
                const acres = fd.get("Approx. Acreage") || "";
                const focus = fd.get("focus") || "";
                const subject = encodeURIComponent(`Farm Visit Request — ${name}`);
                const body = encodeURIComponent(
                  `New farm visit request from the Orbit Agro website:\n\n` +
                  `Name: ${name}\nPhone: ${phone}\nCounty/Region: ${region}\n` +
                  `Preferred Date: ${date}\nCrops: ${crops}\nAcreage: ${acres}\n\n` +
                  `Focus areas:\n${focus}\n`
                );
                window.location.href = `mailto:nexelkaranja091@gmail.com?subject=${subject}&body=${body}`;
                setSubmitted(true);
              }}
              className="glass-emerald rounded-3xl p-8 md:p-10 space-y-5"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl mb-2">Asante sana!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Your farm visit request is received. One of our agronomists will call you on the number you provided within 24 hours to confirm a date.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Full Name" type="text" required />
                    <Field label="Phone (+254...)" type="tel" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="County / Region" type="text" required />
                    <Field label="Preferred Date" type="date" required />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Crop(s) Grown" type="text" placeholder="Maize, tomato, kale…" />
                    <Field label="Approx. Acreage" type="number" placeholder="5" />
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">What would you like the agronomist to focus on?</div>
                    <textarea
                      name="focus"
                      rows={3}
                      placeholder="Pests, soil, fertilizer plan, irrigation, etc."
                      className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all"
                  >
                    Request My Farm Visit
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    Prefer to call? Reach our team on <a href="tel:+254752368468" className="text-primary">+254 752 368 468</a>
                  </p>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </div>
      <input
        name={label}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
