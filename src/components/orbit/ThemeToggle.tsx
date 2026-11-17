import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("orbit-theme") : null;
    setDark(false);
    document.documentElement.classList.remove("dark");
  }, []);

  const toggle = () => {
    setDark(false);
    document.documentElement.classList.remove("dark");
    try { localStorage.setItem("orbit-theme", "light"); } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label="Orbit uses the official light theme"
      title="Official light theme"
      disabled
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground hover:text-primary hover:border-primary transition-colors"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
