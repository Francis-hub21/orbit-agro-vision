import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { AboutHero } from "@/components/orbit/AboutHero";
import { Storytelling } from "@/components/orbit/Storytelling";
import { ExpertsAction } from "@/components/orbit/ExpertsAction";
import { CoreValues } from "@/components/orbit/CoreValues";

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
  component: () => <PageShell><Storytelling /><AboutHero /><div id="partnerships-careers" className="scroll-mt-24"><ExpertsAction /><section className="mx-auto max-w-7xl px-6 pb-12"><h2 className="mb-3 text-2xl text-orbit-green">Partnerships & Careers</h2><a href="mailto:orbitagro@orbitagro.co.ke" className="text-primary underline underline-offset-4">orbitagro@orbitagro.co.ke</a></section></div><CoreValues /></PageShell>,
});
