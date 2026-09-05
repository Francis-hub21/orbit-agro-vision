import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Plus, Trash2, Newspaper, LogOut, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Orbit Agro Newsroom" },
      {
        name: "description",
        content: "Staff dashboard for publishing Orbit Agro news, advisories and product announcements.",
      },
      { property: "og:title", content: "Admin Dashboard — Orbit Agro Newsroom" },
      { property: "og:description", content: "Publish and manage Orbit Agro news updates." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Post = { id: string; title: string; body: string; published_at: string };

function AdminPage() {
  const [email, setEmail] = useState("karanjafrancis091@gmail.com");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const refreshPosts = useCallback(async () => {
    const { data } = await supabase
      .from("news_posts")
      .select("id,title,body,published_at")
      .order("published_at", { ascending: false });
    setPosts((data as Post[]) ?? []);
  }, []);

  const checkAdmin = useCallback(async (userId: string) => {
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin");
    setIsAdmin(Boolean(data?.length));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      setSession(u ? { email: u.email ?? undefined } : null);
      if (u) void checkAdmin(u.id);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user;
      setSession(u ? { email: u.email ?? undefined } : null);
      if (u) void checkAdmin(u.id);
      else setIsAdmin(false);
    });
    void refreshPosts();
    return () => sub.subscription.unsubscribe();
  }, [checkAdmin, refreshPosts]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    setBusy(false);
  };

  const signUp = async () => {
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/admin` },
    });
    setMsg(error ? error.message : "Account created. If sign-in doesn't happen automatically, confirm your email then sign in.");
    setBusy(false);
  };

  const claimAdmin = async () => {
    setBusy(true);
    const { data, error } = await supabase.rpc("claim_admin");
    if (error) setMsg(error.message);
    else if (data) {
      setIsAdmin(true);
      setMsg("Admin access granted to this account.");
    } else setMsg("An admin already exists. Ask the existing admin to grant you access.");
    setBusy(false);
  };

  const publish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("news_posts").insert({ title: title.trim(), body: body.trim() });
    if (error) setMsg(error.message);
    else {
      setTitle("");
      setBody("");
      await refreshPosts();
    }
    setBusy(false);
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("news_posts").delete().eq("id", id);
    if (error) setMsg(error.message);
    else await refreshPosts();
  };

  const input =
    "w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none";

  return (
    <main className="relative">
      <Navbar />
      <section className="px-6 pt-40 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Admin</div>
          <h1 className="font-display text-4xl md:text-5xl font-light">
            Newsroom <span className="text-gradient-emerald">dashboard</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">
            Publish news, advisories and product announcements. Everything you publish here is saved to the Orbit Agro
            database and appears instantly on the public News page for every visitor.
          </p>

          {msg && (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground/90">
              {msg}
            </div>
          )}

          {!session ? (
            <form onSubmit={signIn} className="mt-8 glass rounded-2xl p-6 md:p-8 space-y-4">
              <div className="text-[10px] tracking-[0.3em] uppercase text-primary flex items-center gap-2">
                <Lock className="h-3 w-3" /> Staff sign in
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@orbitagro.co.ke"
                className={input}
              />
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 8 characters)"
                className={input}
              />
              <div className="flex flex-wrap gap-3">
                <button
                  disabled={busy}
                  className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={signUp}
                  disabled={busy}
                  className="rounded-full border border-primary/40 px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10 disabled:opacity-60"
                >
                  Create staff account
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 space-y-6">
              <div className="glass rounded-2xl p-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
                <div className="min-w-0">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1">Signed in</div>
                  <div className="truncate text-sm">{session.email}</div>
                  <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className={`h-3.5 w-3.5 ${isAdmin ? "text-primary" : ""}`} />
                    {isAdmin ? "Admin access" : "No admin access yet"}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  {!isAdmin && (
                    <button
                      onClick={claimAdmin}
                      disabled={busy}
                      className="rounded-full bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-primary-foreground disabled:opacity-60"
                    >
                      Claim admin
                    </button>
                  )}
                  <button
                    onClick={() => supabase.auth.signOut()}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs uppercase tracking-[0.15em] hover:border-primary/60"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Sign out
                  </button>
                </div>
              </div>

              {isAdmin && (
                <form onSubmit={publish} className="glass rounded-2xl p-6 md:p-8 space-y-4">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-primary flex items-center gap-2">
                    <Newspaper className="h-3 w-3" /> Publish an update
                  </div>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Headline" className={input} />
                  <textarea
                    rows={5}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Write the update…"
                    className={`${input} resize-none`}
                  />
                  <button
                    disabled={busy}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
                  >
                    <Plus className="h-3.5 w-3.5" /> Publish
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="mt-12 space-y-5">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Published updates</div>
            <AnimatePresence initial={false}>
              {posts.map((a) => (
                <motion.article
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4">
                    <div className="min-w-0">
                      <div className="text-xs text-primary mb-2">{a.published_at}</div>
                      <h2 className="font-display text-xl">{a.title}</h2>
                      <p className="mt-2 text-sm text-foreground/85 leading-relaxed whitespace-pre-line">{a.body}</p>
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => remove(a.id)}
                        aria-label={`Delete ${a.title}`}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
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
