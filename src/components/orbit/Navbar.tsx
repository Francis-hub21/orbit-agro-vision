import { motion } from "framer-motion";

const links = [
  { href: "#solutions", label: "Solutions" },
  { href: "#crop-doctor", label: "Crop Doctor" },
  { href: "#calculator", label: "Calculator" },
  { href: "#distributor", label: "Distributors" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-6">
        <nav className="glass flex items-center justify-between rounded-full px-6 py-3">
          <a href="#" className="flex items-center gap-2.5">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-primary/40 blur-md" />
              <div className="relative h-full w-full rounded-full border border-primary/60 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              </div>
            </div>
            <span className="font-display font-medium tracking-[0.2em] text-sm uppercase">
              Orbit<span className="text-primary"> Agro</span>
            </span>
          </a>
          <ul className="hidden md:flex items-center gap-7 text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary transition-colors duration-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="rounded-full bg-primary px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground shadow-[0_0_24px_oklch(0.72_0.20_150/0.5)] hover:shadow-[0_0_36px_oklch(0.72_0.20_150/0.7)] transition-all"
          >
            Get Quote
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
