import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Plus, Trash2, Newspaper } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";

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

type Article = { id: string; title: string; date: string; body: string };

const STORE_KEY = "orbit-news";
const ADMIN_CODE = "orbit-admin";

const seed: Article[] = [
  {
    id: "seed-1",
    title: "Blazer 221ZC now available countrywide",
    date: new Date().toISOString().slice(0, 10),
    body: "Our dual-action insecticide combining thiamethoxam and lambda-cyhalothrin is now stocked across all Orbit Agro distributors for fall armyworm and thrips control.",
  },
];

function load(): Article[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Article[]) : seed;
  } catch {
    return seed;
  }
}

function NewsPage() {
  const [articles, setArticles] = useState<Article[]>(seed);
  const [hydrated, setHydrated] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setArticles(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORE_KEY, JSON.stringify(articles));
  }, [articles, hydrated]);

  const publish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setArticles((prev) => [
      { id: crypto.randomUUID(), title: title.trim(), body: body.trim(), date: new Date().toISOString().slice(0, 10) },
      ...prev,
    ]);
    setTitle("");
    setBody("");
  };

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

          {/* Admin panel */}
          <div className="mt-12 glass rounded-2xl p-6 md:p-8">
            {!admin ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAdmin(code === ADMIN_CODE);
                }}
                className="flex flex-wrap items-end gap-3"
              >
                <div className="flex-1 min-w-[220px]">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2 flex items-center gap-2">
                    <Lock className="h-3 w-3 text-primary" /> Admin access
                  </div>
                  <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter admin code"
                    className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <button className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">
                  Unlock
                </button>
              </form>
            ) : (
              <form onSubmit={publish} className="space-y-4">
                <div className="text-[10px] tracking-[0.3em] uppercase text-primary flex items-center gap-2">
                  <Newspaper className="h-3 w-3" /> Publish an update
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Headline"
                  className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
                />
                <textarea
                  rows={4}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write the update…"
                  className="w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none resize-none"
                />
                <button className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground">
                  <Plus className="h-3.5 w-3.5" /> Publish
                </button>
              </form>
            )}
          </div>

          <div className="mt-10 space-y-5">
            <AnimatePresence initial={false}>
              {articles.map((a) => (
                <motion.article
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-primary mb-2">{a.date}</div>
                      <h2 className="font-display text-2xl">{a.title}</h2>
                      <p className="mt-3 text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{a.body}</p>
                    </div>
                    {admin && (
                      <button
                        onClick={() => setArticles((prev) => prev.filter((x) => x.id !== a.id))}
                        aria-label={`Delete ${a.title}`}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
