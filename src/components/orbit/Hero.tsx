import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import { TerrainScene } from "./TerrainScene";
import { useRef, useState } from "react";
import { DemoModal } from "./DemoModal";

function SolarParticle({ index, total, progress }: { index: number; total: number; progress: MotionValue<number> }) {
  const angle = (index / total) * Math.PI * 2;
  const dx = Math.cos(angle) * 80;
  const dy = Math.sin(angle) * 80;
  const x = useTransform(progress, [0, 1], [dx * 0.2, dx * 12]);
  const y = useTransform(progress, [0, 1], [dy * 0.2, dy * 12]);
  const opacity = useTransform(progress, [0, 0.2, 0.9], [0, 1, 0]);
  const scale = useTransform(progress, [0, 1], [0.6, 2]);
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full bg-primary"
      style={{ left: "50%", top: "50%", filter: "blur(0.5px)", x, y, opacity, scale }}
    />
  );
}

export function Hero() {
  const [demo, setDemo] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const particleSpread = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section ref={ref} className="relative h-screen min-h-[820px] w-full overflow-hidden">
      {/* 3D Terrain — solar system core, zooms out on scroll */}
      <motion.div style={{ scale: sceneScale, opacity: sceneOpacity }} className="absolute inset-0 origin-center">
        <TerrainScene />
      </motion.div>

      {/* Atmospheric overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)] pointer-events-none" />

      {/* Floating particles + scroll-driven solar dispersion */}
      <motion.div style={{ opacity: sceneOpacity }} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * Math.PI * 2;
          const dx = Math.cos(angle) * 80;
          const dy = Math.sin(angle) * 80;
          return (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary"
              style={{
                left: "50%",
                top: "50%",
                filter: "blur(0.5px)",
                x: useTransform(particleSpread, [0, 1], [dx * 0.2, dx * 12]),
                y: useTransform(particleSpread, [0, 1], [dy * 0.2, dy * 12]),
                opacity: useTransform(particleSpread, [0, 0.2, 0.9], [0, 1, 0]),
                scale: useTransform(particleSpread, [0, 1], [0.6, 2]),
              }}
            />
          );
        })}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 glass-emerald rounded-full px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-primary/90">
                Africa · Agri-Tech Intelligence
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] font-light tracking-tight">
              Cultivating a<br />
              <span className="text-gradient-emerald font-medium">higher standard</span>
              <br />
              for the future of farming.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              Premium crop protection, precision farming intelligence, and smart agrochemical
              distribution powering the next generation of African farming.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#solutions"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_30px_oklch(0.72_0.20_150/0.6)] hover:shadow-[0_0_50px_oklch(0.72_0.20_150/0.9)] transition-all"
              >
                Explore Solutions
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => setDemo(true)}
                className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] hover:border-primary/60 transition-all"
              >
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 border border-primary/40">
                  <Play className="h-3 w-3 fill-primary text-primary" />
                </span>
                Watch Interactive Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16 grid grid-cols-3 gap-8 max-w-md"
            >
              {[
                { k: "120k+", v: "Farmers" },
                { k: "47", v: "Regions" },
                { k: "2.4M", v: "Hectares" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-light text-gradient-emerald">{s.k}</div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-10 w-px bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>

      <DemoModal open={demo} onClose={() => setDemo(false)} />
    </section>
  );
}
