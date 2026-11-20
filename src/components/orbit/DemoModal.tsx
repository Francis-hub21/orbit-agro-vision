import { X } from "lucide-react";
import { useEffect } from "react";

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-labelledby="interactive-demo-title"
        aria-modal="true"
        className="relative w-full max-w-6xl overflow-hidden rounded-lg border border-white/15 bg-zinc-950 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white sm:px-6">
          <h2 id="interactive-demo-title" className="text-sm font-medium sm:text-base">
            Interactive Demo
          </h2>
          <button
            aria-label="Close interactive demo"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <div className="aspect-[16/9] w-full bg-black">
          <iframe
            allow="fullscreen; clipboard-write"
            allowFullScreen
            className="h-full w-full border-0"
            src="https://app.supademo.com/embed/cmwnjoffk004ay00kot752gr4?embed_v=2"
            title="Orbit Agro interactive demo"
          />
        </div>
      </section>
    </div>
  );
}