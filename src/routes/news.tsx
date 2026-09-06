import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import { supabase } from "@/integrations/supabase/client";
import { resolveNewsImages } from "@/lib/news-images";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Latest News & Updates — Orbit Agro Chemical Industries" },
      {
        name: "description",
        content:
          "Product launches, agronomy advisories, field days and company updates from Orbit Agro Chemical Industries Limited, Nairobi.",
      },
      { property: "og:title", content: "Latest News & Updates — Orbit Agro" },
      { property: "og:description", content: "Product launches, advisories and field updates from Orbit Agro Kenya." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: NewsPage,
});

type Post = { id: string; title: string; body: string; published_at: string; image_url: string | null };

const monthOf = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { month: "short" });
const dayYearOf = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-US", { day: "numeric", year: "numeric" });

function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase
      .from("news_posts")
      .select("id,title,body,published_at,image_url")
      .order("published_at", { ascending: false })
      .then(async ({ data }) => {
        const rows = (data as Post[]) ?? [];
        setPosts(rows);
        setLoading(false);
        setImages(await resolveNewsImages(rows.map((r) => r.image_url ?? "")));
      });
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Newsroom</div>
          <h1 className="font-display text-4xl md:text-6xl font-light leading-tight">
            Latest <span className="text-gradient-emerald">news & advisories</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Product launches, agronomy advisories, field days and company updates from the Orbit Agro team.
          </p>

          <Link
            to="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
          >
            <Lock className="h-3.5 w-3.5" /> Admin dashboard
          </Link>

          <div className="mt-10 space-y-5">
            {loading && <div className="text-sm text-muted-foreground">Loading updates…</div>}
            {!loading && posts.length === 0 && (
              <div className="text-sm text-muted-foreground">No updates published yet.</div>
            )}
            {posts.map((a, i) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass overflow-hidden rounded-2xl"
              >
                {a.image_url && images[a.image_url] && (
                  <div className="relative">
                    <img
                      src={images[a.image_url]}
                      alt={a.title}
                      loading="lazy"
                      className="w-full max-h-[420px] object-cover"
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 rounded-lg bg-primary px-4 py-2 text-center leading-tight text-primary-foreground">
                      <div className="text-base font-semibold uppercase">{monthOf(a.published_at)}</div>
                      <div className="text-xs">{dayYearOf(a.published_at)}</div>
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-display text-2xl">{a.title}</h2>
                      <div className="mt-1 text-sm text-muted-foreground">by Admin</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{a.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
