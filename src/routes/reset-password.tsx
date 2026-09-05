import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { KeyRound } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Orbit Agro" },
      { name: "description", content: "Set a new password for your Orbit Agro staff account." },
      { property: "og:title", content: "Reset Password — Orbit Agro" },
      { property: "og:description", content: "Set a new password for your Orbit Agro staff account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("Checking your reset link…");

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    const isRecoveryLink = hash.get("type") === "recovery";

    supabase.auth.getSession().then(({ data }) => {
      if (isRecoveryLink || data.session) {
        setRecoveryReady(true);
        setMessage("");
      } else {
        setMessage("This reset link is invalid or has expired. Request a new one from the admin sign-in page.");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setRecoveryReady(true);
        setMessage("");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setBusy(true);
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? error.message : "Password updated. You can now return to the admin dashboard.");
    if (!error) {
      setPassword("");
      setConfirmPassword("");
    }
    setBusy(false);
  };

  const input = "w-full rounded-xl bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none";

  return (
    <main className="relative">
      <Navbar />
      <section className="min-h-[72vh] px-6 pb-24 pt-40">
        <div className="mx-auto max-w-lg">
          <div className="mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-primary">
            <KeyRound className="h-3.5 w-3.5" /> Staff access
          </div>
          <h1 className="font-display text-4xl font-light md:text-5xl">Set a new password</h1>

          {message && (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground/90">
              {message}
            </div>
          )}

          {recoveryReady && (
            <form onSubmit={updatePassword} className="glass mt-8 space-y-4 rounded-2xl p-6 md:p-8">
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="New password (minimum 8 characters)"
                autoComplete="new-password"
                className={input}
              />
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className={input}
              />
              <button
                disabled={busy}
                className="rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Updating…" : "Update password"}
              </button>
            </form>
          )}

          <Link to="/admin" className="mt-6 inline-block text-sm text-primary hover:underline">
            Return to admin sign in
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}