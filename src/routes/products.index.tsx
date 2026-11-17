import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import { families } from "@/data/products";
import { pendingProducts } from "@/data/products";
import { ProductSearch } from "@/components/orbit/ProductSearch";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Products — Orbit Agro Chemical Industries" },
      {
        name: "description",
        content:
          "Explore Orbit Agro's full range: fungicides, insecticides, herbicides, fertilizers, bio stimulants, soil conditioners, public health products and knapsack sprayers.",
      },
      { property: "og:title", content: "Our Products — Orbit Agro Chemical Industries" },
      {
        property: "og:description",
        content: "Eight product families of superior quality crop protection for the Kenyan farmer.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductsIndex,
});

function ProductsIndex() {
  return (
    <main className="relative">
      <Navbar />
      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Our Products</div>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight max-w-3xl">
            Superior quality <span className="text-gradient-emerald">crop protection</span> for every season.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
            Select a product family to see every product, its active ingredient, classification, target
            diseases or pests, pre-harvest interval, application rates, mode of action and benefits.
          </p>

          <div className="mt-8">
            <ProductSearch label="Search by product, ingredient, crop or pest" />
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {families.map((f, i) => (
              <motion.div
                key={f.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/products/$family"
                  params={{ family: f.slug }}
                  className="group block h-full glass rounded-lg p-6 hover:ring-1 hover:ring-primary/50 transition-all"
                >
                  <h2 className="font-display text-xl mb-2">{f.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-primary">
                    {f.products.length} products
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <section aria-labelledby="pending-products-title" className="mt-12 border-t border-border pt-8">
            <h2 id="pending-products-title" className="font-display text-xl">Awaiting category confirmation</h2>
            <p className="mt-1 text-sm text-muted-foreground">These entries remain unclassified until their product categories are confirmed.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {pendingProducts.map((product) => (
                <div key={product.slug} className="rounded-lg border border-border bg-card px-4 py-3">
                  <span className="font-medium">{product.name}</span>
                  <span className="ml-3 rounded-full bg-orbit-yellow/30 px-2 py-1 text-xs text-foreground">Unconfirmed</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
