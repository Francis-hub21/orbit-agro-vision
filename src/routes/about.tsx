import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { AboutHero } from "@/components/orbit/AboutHero";
import { Storytelling } from "@/components/orbit/Storytelling";
import { ExpertsAction } from "@/components/orbit/ExpertsAction";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Orbit Agro" },
      { name: "description", content: "Who Orbit Agrochemical Industries is, our mission and the values behind how we grow, protect, listen and nurture." },
      { property: "og:title", content: "About Us — Orbit Agro" },
      { property: "og:description", content: "Who Orbit Agrochemical Industries is, our mission and the values behind how we grow, protect, listen and nurture." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell><AboutHero /><Storytelling /></PageShell>,
});
