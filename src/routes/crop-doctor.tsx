import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { CropDoctor } from "@/components/orbit/CropDoctor";
import { Calculator } from "@/components/orbit/Calculator";

export const Route = createFileRoute("/crop-doctor")({
  head: () => ({
    meta: [
      { title: "Crop Doctor & Dosage Calculator — Orbit Agro" },
      { name: "description", content: "Diagnose crop threats and calculate the right Orbit product dose and safety interval for your farm." },
      { property: "og:title", content: "Crop Doctor & Dosage Calculator — Orbit Agro" },
      { property: "og:description", content: "Diagnose crop threats and calculate the right Orbit product dose and safety interval for your farm." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <PageShell><CropDoctor /><Calculator /></PageShell>,
});
