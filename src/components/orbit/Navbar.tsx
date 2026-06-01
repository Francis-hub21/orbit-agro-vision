import { motion } from "framer-motion";
import logo from "@/assets/orbit/logo.png";

const links = [
  { href: "#solutions", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#crop-doctor", label: "Crop Doctor" },
  { href: "#farm-visit", label: "Farm Visit" },
  { href: "#location", label: "Location" },
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
        <nav className="glass flex items-center justify-between rounded-full px-5 py-2.5">
          <a href="#" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Orbit Agro Chemical Industries logo"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-contain shadow-[0_0_18px_oklch(0.72_0.20_150/0.45)]"
            />
            <span className="font-display font-medium text-sm md:text-base leading-tight">
              Orbit<span className="text-primary"> Agro</span>
              <span className="hidden md:block text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                Chemical Industries
              </span>
            </span>
          </a>
          <ul className="hidden lg:flex items-center gap-7 text-xs tracking-[0.15em] uppercase text-muted-foreground">
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
