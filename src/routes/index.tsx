import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicLoader } from "@/components/orbit/CinematicLoader";
import { Navbar } from "@/components/orbit/Navbar";
import { Hero } from "@/components/orbit/Hero";
import { Solutions } from "@/components/orbit/Solutions";
import { Stats } from "@/components/orbit/Stats";
import { Testimonials } from "@/components/orbit/Testimonials";
import { FarmVisit } from "@/components/orbit/FarmVisit";
import { Footer } from "@/components/orbit/Footer";
import { AIAssistant } from "@/components/orbit/AIAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orbit Agro — Intelligent Agriculture for Africa" },
      {
        name: "description",
        content:
          "Premium crop protection, precision farming intelligence and smart agrochemical distribution. Engineering the future of African agriculture.",
      },
      { property: "og:title", content: "Orbit Agro — Intelligent Agriculture for Africa" },
      {
        property: "og:description",
        content: "The operating system of African agriculture. Crop intelligence, dosage precision and distribution at scale.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <CinematicLoader onDone={() => setLoaded(true)} />}
      <main className="relative">
        <Navbar />
        <Hero />
        <Solutions />
        <Stats />
        <Testimonials />
        <FarmVisit />
        <Footer />
        <AIAssistant />
      </main>
    </>
  );
}
