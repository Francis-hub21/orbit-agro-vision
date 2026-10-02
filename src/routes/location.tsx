import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { Location } from "@/components/orbit/Location";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Find Us — Orbit Agro" },
      { name: "description", content: "Visit Orbit Agrochemical Industries in Nairobi, Kenya. Map, directions and office details." },
      { property: "og:title", content: "Find Us — Orbit Agro" },
      { property: "og:description", content: "Visit Orbit Agrochemical Industries in Nairobi, Kenya. Map, directions and office details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell><Location /></PageShell>,
});
