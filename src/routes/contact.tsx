import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { Contact } from "@/components/orbit/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Orbit Agro" },
      { name: "description", content: "Talk to Orbit Agro specialists by email, phone or WhatsApp about products, distribution and farm support." },
      { property: "og:title", content: "Contact Us — Orbit Agro" },
      { property: "og:description", content: "Talk to Orbit Agro specialists by email, phone or WhatsApp about products, distribution and farm support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell><Contact /></PageShell>,
});
