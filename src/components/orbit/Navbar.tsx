import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "./SocialLinks";
import { ProductSearch } from "./ProductSearch";

const divisions = [
  { title: "Crop Protection", families: [{ slug: "fungicides", title: "Fungicides" }, { slug: "insecticides", title: "Insecticides & Miticides" }, { slug: "herbicides", title: "Herbicides" }] },
  { title: "Plant Nutrition & Soil", families: [{ slug: "fertilizers", title: "Foliar Fertilizers" }, { slug: "bio-stimulants", title: "Biostimulants" }, { slug: "soil-conditioners", title: "Soil Conditioners" }] },
  { title: "Public Health", families: [{ slug: "public-health", title: "Public Health Insecticides" }] },
  { title: "Application Equipment", families: [{ slug: "knapsack-sprayers", title: "Knapsack Sprayers" }] },
];
const aboutLinks = [
  { title: "Vision & Mission", hash: "vision-mission" },
  { title: "Company Overview", hash: "company-overview" },
  { title: "Partnerships & Careers", hash: "partnerships-careers" },
];
const pageLinks = [
  { href: "/crop-doctor", title: "Crop Doctor" },
  { href: "/news", title: "News" },
  { href: "/location", title: "Location" },
  { href: "/contact", title: "Contact Us" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<"about" | "products" | null>(null);
  const [division, setDivision] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = () => { setMobileOpen(false); setOpen(null); setDivision(null); };
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) close();
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", escape); };
  }, []);
  const toggle = (menu: "about" | "products") => { setOpen(open === menu ? null : menu); setDivision(null); };
  return <>
    <div className="relative z-[60] border-t-4 border-orbit-green bg-card px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="flex items-center gap-3 sm:gap-5">
          <img src="/orbit-logo.png" alt="Orbit Agro Products logo" width={120} height={96} className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-28" />
          <div className="min-w-0">
            <p className="font-display text-2xl font-extrabold leading-tight text-orbit-green sm:text-3xl md:text-4xl">ORBIT AGRO CHEMICAL INDUSTRIES LTD.</p>
            <p className="mt-2 text-sm font-semibold text-orbit-red sm:text-base">We grow through ... Partnerships</p>
          </div>
        </Link>
        {pathname === "/" && <div className="mt-5"><ProductSearch label="Search products, active ingredients, crops or pests" /></div>}
      </div>
    </div>
    <header ref={navRef} className="sticky top-0 z-50 border-y border-border bg-card shadow-sm">
      <nav aria-label="Main navigation" className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <div className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" asChild><Link to="/" onClick={close}>Home</Link></Button>
          <div className="relative" onMouseEnter={() => setOpen("about")} onMouseLeave={() => setOpen(null)}>
            <Button variant="ghost" onClick={() => toggle("about")} aria-expanded={open === "about"} aria-controls="desktop-about-menu">About Us <ChevronDown /></Button>
            {open === "about" && <div id="desktop-about-menu" className="absolute left-0 top-full w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
              {aboutLinks.map((item) => <Link key={item.hash} to="/about" hash={item.hash} onClick={close} className="block rounded-md px-3 py-3 text-sm hover:bg-secondary hover:text-orbit-green">{item.title}</Link>)}
            </div>}
          </div>
          <div className="relative" onMouseEnter={() => setOpen("products")} onMouseLeave={() => { setOpen(null); setDivision(null); }}>
            <Button variant="ghost" onClick={() => toggle("products")} aria-expanded={open === "products"} aria-controls="desktop-products-menu">Our Products <ChevronDown /></Button>
            {open === "products" && <div id="desktop-products-menu" className="absolute left-0 top-full w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
              <Link to="/products" onClick={close} className="block border-b border-border px-3 py-3 text-sm font-semibold text-orbit-red">All products</Link>
              {divisions.map((item) => <div key={item.title} className="relative" onMouseEnter={() => setDivision(item.title)}>
                <Button variant="ghost" className="h-auto w-full justify-between px-3 py-3 text-left" aria-expanded={division === item.title} onClick={() => setDivision(division === item.title ? null : item.title)}>{item.title}<ChevronRight /></Button>
                {division === item.title && <div className="absolute left-full top-0 w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
                  {item.families.map((family) => <Link key={family.slug} to="/products/$family" params={{ family: family.slug }} onClick={close} className="block rounded-md px-3 py-3 text-sm hover:bg-secondary hover:text-orbit-green">{family.title}</Link>)}
                </div>}
              </div>)}
            </div>}
          </div>
          {pageLinks.map((item) => <Button key={item.href} variant="ghost" asChild><Link to={item.href} onClick={close}>{item.title}</Link></Button>)}
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => { setMobileOpen(!mobileOpen); setOpen(null); }}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
        <div className="flex items-center gap-2"><SocialLinks /><Button asChild className="hidden sm:inline-flex"><Link to="/contact">Get Quote</Link></Button></div>
        {mobileOpen && <div id="mobile-navigation" className="absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-card p-3 shadow-lg lg:hidden">
          <Link to="/" onClick={close} className="block px-3 py-3 text-sm">Home</Link>
          <Button variant="ghost" className="h-12 w-full justify-between" onClick={() => toggle("about")} aria-expanded={open === "about"}>About Us <ChevronDown /></Button>
          {open === "about" && <div className="ml-4 border-l-2 border-orbit-green pl-2">{aboutLinks.map((item) => <Link key={item.hash} to="/about" hash={item.hash} onClick={close} className="block px-3 py-3 text-sm">{item.title}</Link>)}</div>}
          <Button variant="ghost" className="h-12 w-full justify-between" onClick={() => toggle("products")} aria-expanded={open === "products"}>Our Products <ChevronDown /></Button>
          {open === "products" && <div className="ml-4 border-l-2 border-orbit-green pl-2">
            <Link to="/products" onClick={close} className="block px-3 py-3 text-sm font-semibold text-orbit-red">All products</Link>
            {divisions.map((item) => <div key={item.title}>
              <Button variant="ghost" className="h-12 w-full justify-between text-left" onClick={() => setDivision(division === item.title ? null : item.title)} aria-expanded={division === item.title}>{item.title}<ChevronDown /></Button>
              {division === item.title && <div className="ml-3 border-l border-border pl-2">{item.families.map((family) => <Link key={family.slug} to="/products/$family" params={{ family: family.slug }} onClick={close} className="block px-3 py-3 text-sm">{family.title}</Link>)}</div>}
            </div>)}
          </div>}
          {pageLinks.map((item) => <Link key={item.href} to={item.href} onClick={close} className="block px-3 py-3 text-sm">{item.title}</Link>)}
        </div>}
      </nav>
    </header>
  </>;
}
