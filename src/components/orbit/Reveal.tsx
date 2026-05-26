import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
}) {
  return (
    <Reveal className="max-w-3xl mb-16">
      <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-5">{eyebrow}</div>
      <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05]">{title}</h2>
      {desc && (
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">{desc}</p>
      )}
    </Reveal>
  );
}
