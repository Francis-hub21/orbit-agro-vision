import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import logo from "@/assets/orbit/logo.png";
import { ThemeToggle } from "./ThemeToggle";
import { families } from "@/data/products";

const leadingLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

const links = [
  { href: "/crop-doctor", label: "Crop Doctor" },
  { href: "/news", label: "News" },
  { href: "/location", label: "Location" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const last = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = last.current;
    last.current = y;
    if (y > prev && y > 80) {
      setHidden(true);
      setMenuOpen(false);
    } else if (y < prev - 4) {
      setHidden(false);
    }
  });

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);


  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 180);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-6">
        <nav className="glass relative flex items-center justify-between rounded-full px-4 py-2.5 md:px-5">
          <Link to="/" className="flex items-center gap-3">
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
                Agro Products
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-7 text-xs tracking-[0.15em] uppercase text-muted-foreground">
            {leadingLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary transition-colors duration-300">
                  {l.label}
                </a>
              </li>
            ))}
            <li className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <Link
                to="/products"
                className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300"
              >
                Products
                <ChevronDown className={`h-3 w-3 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22 }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                  >
                    <div className="glass rounded-2xl p-2 w-64 shadow-[0_20px_60px_oklch(0_0_0/0.25)]">
                      {families.map((f) => (
                        <Link
                          key={f.slug}
                          to="/products/$family"
                          params={{ family: f.slug }}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[11px] tracking-[0.12em] hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                          {f.title}
                          <span className="text-primary/70 normal-case tracking-normal text-[10px]">
                            {f.products.length}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary transition-colors duration-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="/contact"
              className="hidden sm:inline-flex rounded-full px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white shadow-[0_0_24px_oklch(0.58_0.22_27/0.5)] hover:shadow-[0_0_36px_oklch(0.58_0.22_27/0.8)] transition-all"
              style={{ background: "var(--gradient-emerald-red)" }}
            >
              Get Quote
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-primary/10 hover:text-primary transition-colors lg:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className="glass absolute left-0 right-0 top-[calc(100%+0.5rem)] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-2xl p-3 shadow-[0_20px_60px_oklch(0_0_0/0.25)] lg:hidden"
              >
                <ul className="flex flex-col text-sm text-foreground">
                  {leadingLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      type="button"
                      aria-expanded={menuOpen}
                      onClick={() => {
                        setMenuOpen(false);
                        document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      Our Products <ChevronDown className="h-4 w-4 -rotate-90" />
                    </button>
                  </li>
                  {links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  <li className="border-t border-border mt-2 pt-2">
                    <a
                      href="/contact"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl bg-primary px-4 py-3 text-center font-medium text-primary-foreground"
                    >
                      Get Quote
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
}
