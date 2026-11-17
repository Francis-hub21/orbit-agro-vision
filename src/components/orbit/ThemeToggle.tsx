import { useEffect } from "react";

export function ThemeToggle() {
  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);
  return null;
}
