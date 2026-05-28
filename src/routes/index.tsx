import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CinematicLoader } from "@/components/orbit/CinematicLoader";
import { Navbar } from "@/components/orbit/Navbar";
import { Hero } from "@/components/orbit/Hero";
import { Solutions } from "@/components/orbit/Solutions";
import { Storytelling } from "@/components/orbit/Storytelling";
import { CropDoctor } from "@/components/orbit/CropDoctor";
import { Calculator } from "@/components/orbit/Calculator";
import { Distributor } from "@/components/orbit/Distributor";
import { Stats } from "@/components/orbit/Stats";
import { Testimonials } from "@/components/orbit/Testimonials";
import { Contact } from "@/components/orbit/Contact";
import { Location } from "@/components/orbit/Location";
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
        <Storytelling />
        <CropDoctor />
        <Calculator />
        <Distributor />
        <Stats />
        <Testimonials />
        <Contact />
        <Footer />
        <AIAssistant />
      </main>
    </>
  );
}
