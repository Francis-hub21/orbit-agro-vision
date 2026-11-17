import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Mail, Download } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import { ContactModal } from "@/components/orbit/ContactModal";
import { families, getFamily, type Product } from "@/data/products";

const CATALOGUE_URL = "https://www.orbitagro.co.ke/assets/orbit-agro-product-catalogue_web.pdf";

export const Route = createFileRoute("/products/$family")({
  validateSearch: (search: Record<string, unknown>): { from?: string } => ({
    ...(typeof search.from === "string" ? { from: search.from } : {}),
  }),
  loader: ({ params }) => {
    const family = getFamily(params.family);
    if (!family) throw notFound();
    return { family };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product family not found — Orbit Agro" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.family.title} — Orbit Agro Chemical Industries`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.family.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.family.intro },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: FamilyPage,
});

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="border-t border-border pt-3">
      <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-1">{label}</div>
      <div className="text-sm text-foreground/90 leading-relaxed">{value}</div>
    </div>
  );
}

function DetailList({ label, items }: { label: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="border-t border-border pt-3">
      <div className="text-[10px] tracking-[0.25em] uppercase text-primary mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <span
            key={t}
            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-foreground/90"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductBlock({ product, onContact }: { product: Product; onContact: (name: string) => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      id={product.slug}
      className="glass scroll-mt-28 rounded-lg overflow-hidden"
    >
      <div className="grid md:grid-cols-[320px_1fr]">
        <div className="aspect-[4/3] md:aspect-auto md:min-h-full bg-card overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={`${product.name} product pack`}
              loading="lazy"
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
              Product image coming soon
            </div>
          )}
        </div>
        <div className="p-6 md:p-8">
          <h2 className="font-display text-2xl md:text-3xl">{product.name}</h2>
          {product.description && (
            <p className="mt-3 text-sm md:text-base text-foreground/85 leading-relaxed">{product.description}</p>
          )}

          <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
            <Detail label="Active Ingredient" value={product.activeIngredient} />
            <Detail label="Classification" value={product.classification} />
            <DetailList label="Target Disease / Pest" items={product.targets} />
            <Detail label="Pre-Harvest Interval" value={product.preHarvest} />
            <Detail label="Application Rates" value={product.applicationRate} />
            <Detail label="Mode of Action" value={product.modeOfAction} />
            <DetailList label="Benefits" items={product.benefits} />
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              onClick={() => onContact(product.name)}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_24px_oklch(0.72_0.20_150/0.45)] hover:shadow-[0_0_40px_oklch(0.72_0.20_150/0.75)] transition-all"
            >
              <Mail className="h-3.5 w-3.5" /> Contact Us
            </button>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10 transition-colors"
            >
              Go to Contact Page
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

const backTargets: Record<string, { label: string; href: string }> = {
  "crop-doctor": { label: "Back to Crop Doctor", href: "/crop-doctor" },
  calculator: { label: "Back to the dosage calculator", href: "/crop-doctor#calculator" },
  solutions: { label: "Back to Our Products", href: "/#solutions" },
};

function FamilyPage() {
  const { family } = Route.useLoaderData();
  const { from } = Route.useSearch();
  const back = from ? backTargets[from] : undefined;
  const [requested, setRequested] = useState<string | null>(null);

  return (
    <main className="relative">
      <Navbar />
      <section className="px-6 pt-40 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-3">
            {back && (
              <a
                href={back.href}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> {back.label}
              </a>
            )}
            <Link to="/products" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-3.5 w-3.5" /> All product families
            </Link>
          </div>
          <div className="mt-6 text-[10px] tracking-[0.4em] uppercase text-primary">Product Family</div>
          <h1 className="mt-3 font-display text-4xl md:text-6xl font-light">{family.title}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">{family.intro}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {families.map((f) => (
              <Link
                key={f.slug}
                to="/products/$family"
                params={{ family: f.slug }}
                className={`rounded-full border px-4 py-1.5 text-xs transition-all ${
                  f.slug === family.slug
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border hover:border-primary/60 hover:text-primary"
                }`}
              >
                {f.title}
              </Link>
            ))}
          </div>

          <a
            href={CATALOGUE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
          >
            <Download className="h-3.5 w-3.5" /> Download Catalogue
          </a>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl space-y-8">
          {family.products.map((product) => (
            <ProductBlock key={product.slug} product={product} onContact={setRequested} />
          ))}
        </div>
      </section>

      <Footer />
      <ContactModal
        open={requested !== null}
        onClose={() => setRequested(null)}
        productName={requested ?? undefined}
      />
    </main>
  );
}
