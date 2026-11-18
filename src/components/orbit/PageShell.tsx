import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AIAssistant } from "./AIAssistant";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative">
      <Navbar />
      <div>{children}</div>
      <Footer />
      <AIAssistant />
    </main>
  );
}
