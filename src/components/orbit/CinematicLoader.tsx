import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import orbitLogo from "@/assets/orbit/logo.png.asset.json";
import orbitLogoAlt from "@/assets/orbit/logo-alt.jpg.asset.json";

const stages = [
  "Initializing Agricultural Intelligence",
  "Loading Smart Distribution Network",
  "Synchronizing Crop Intelligence Systems",
  "Orbit Agro Ecosystem Online",
];

export function CinematicLoader({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 1.8);
        const s = Math.min(3, Math.floor(next / 26));
        setStage(s);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onDone, 800);
          }, 500);
        }
        return next;
      });
    }, 40);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* radial scan */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.20_150/0.18),transparent_60%)]" />
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
          </div>

          {/* particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary"
                initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
                animate={{ opacity: [0, 1, 0], y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
                style={{ filter: "blur(1px)" }}
              />
            ))}
          </div>

          {/* logo */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-12"
          >
            <div className="absolute inset-0 -m-8 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
            <motion.div
              className="absolute inset-0 -m-3 rounded-full border border-primary/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ borderStyle: "dashed" }}
            />
            <img
              src={orbitLogo}
              alt="Orbit Agro"
              className="relative h-32 w-32 rounded-full object-contain shadow-[0_0_60px_oklch(0.72_0.20_150/0.6)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <div className="font-display text-3xl font-light tracking-[0.3em] text-gradient-emerald uppercase">
              Orbit Agro
            </div>
            <div className="mt-2 text-xs tracking-[0.4em] text-muted-foreground uppercase">
              Intelligent Agriculture
            </div>
          </motion.div>

          <div className="w-80 max-w-[80vw]">
            <div className="h-px w-full bg-border overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-emerald-glow to-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <AnimatePresence mode="wait">
                <motion.span
                  key={stage}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="text-primary/80"
                >
                  {stages[stage]}
                </motion.span>
              </AnimatePresence>
              <span>{Math.floor(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
