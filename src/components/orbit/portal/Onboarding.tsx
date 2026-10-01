import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check, Store, Warehouse, Building2 } from "lucide-react";

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-3 py-2.5 text-sm outline-none focus:border-primary";
const tiers = [
  { id: "Independent Retail Store", icon: Store },
  { id: "Sub-County Wholesaler", icon: Warehouse },
  { id: "Regional Distribution Hub", icon: Building2 },
];
const lines = ["Crop Protection & Agrochemicals", "Fertilizers", "Spraying Equipment", "Animal Health"];

export function Onboarding({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [f, setF] = useState({ name: "", tax: "", region: "", tier: "", focus: [] as string[] });
  const close = () => {
    onClose();
    setTimeout(() => { setStep(0); setF({ name: "", tax: "", region: "", tier: "", focus: [] }); }, 300);
  };
  const valid = [
    f.name.trim().length > 1 && f.tax.trim().length > 3 && f.region.trim().length > 1,
    !!f.tier,
    f.focus.length > 0,
  ][step];
  const submit = () => {
    const body = `Business: ${f.name}\nTax ID: ${f.tax}\nRegion: ${f.region}\nTier: ${f.tier}\nFocus: ${f.focus.join(", ")}`;
    window.open(
      `mailto:orbitagro@orbitagro.co.ke?subject=${encodeURIComponent("Distributor Portal Access Request")}&body=${encodeURIComponent(body)}`,
      "_blank",
    );
    setStep(3);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/70 backdrop-blur-sm p-4"
          onClick={close}
        >
          <motion.div
            initial={{ y: 20, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-emerald relative w-full max-w-lg rounded-3xl p-6 md:p-8"
          >
            <button aria-label="Close" onClick={close} className="absolute right-4 top-4"><X className="h-5 w-5" /></button>
            {step < 3 && (
              <>
                <div className="flex gap-2 mb-6">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
                <h3 className="font-display text-2xl mb-1">
                  {["Business vetting", "Operation tier", "Supply chain focus"][step]}
                </h3>
                <p className="text-sm text-muted-foreground mb-5">Step {step + 1} of 3</p>
              </>
            )}

            {step === 0 && (
              <div className="space-y-3">
                <input name="business-name" id="business-name" maxLength={120} placeholder="Official business name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} className={inputCls} />
                <input name="tax-id" id="tax-id" maxLength={40} placeholder="Business licence / KRA PIN" value={f.tax} onChange={(e) => setF({ ...f, tax: e.target.value })} className={inputCls} />
                <input name="region" id="region" maxLength={80} placeholder="Location / region" value={f.region} onChange={(e) => setF({ ...f, region: e.target.value })} className={inputCls} />
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3">
                {tiers.map((t) => (
                  <label key={t.id} className={`flex items-center gap-3 rounded-2xl border p-4 cursor-pointer transition ${f.tier === t.id ? "border-primary bg-primary/10" : "border-border"}`}>
                    <input type="radio" name="tier" value={t.id} checked={f.tier === t.id} onChange={() => setF({ ...f, tier: t.id })} className="sr-only" />
                    <t.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{t.id}</span>
                  </label>
                ))}
              </div>
            )}
            {step === 2 && (
              <div className="grid gap-3">
                {lines.map((l) => (
                  <label key={l} className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="focus"
                      value={l}
                      checked={f.focus.includes(l)}
                      onChange={(e) => setF({ ...f, focus: e.target.checked ? [...f.focus, l] : f.focus.filter((x) => x !== l) })}
                      className="accent-primary h-4 w-4"
                    />
                    <span className="text-sm">{l}</span>
                  </label>
                ))}
              </div>
            )}
            {step === 3 && (
              <div className="text-center py-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-8 w-8" />
                </motion.div>
                <h3 className="font-display text-2xl">Application received</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our distribution team will review {f.name} and contact you within 2 business days.</p>
                <button onClick={close} className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground">Done</button>
              </div>
            )}

            {step < 3 && (
              <div className="mt-6 flex justify-between">
                <button disabled={step === 0} onClick={() => setStep(step - 1)} className="text-sm text-muted-foreground disabled:opacity-30">Back</button>
                <button
                  disabled={!valid}
                  onClick={() => (step === 2 ? submit() : setStep(step + 1))}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm text-primary-foreground disabled:opacity-40"
                >
                  {step === 2 ? "Submit application" : "Continue"}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
