import { useEffect, useState } from "react";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { PageShell } from "@/components/orbit/PageShell";
import { AboutHero } from "@/components/orbit/AboutHero";
import { Storytelling } from "@/components/orbit/Storytelling";
import { ExpertsAction } from "@/components/orbit/ExpertsAction";
import { CoreValues } from "@/components/orbit/CoreValues";

type AboutCategory = "vision-mission" | "company-overview" | "partnerships-careers";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Orbit Agro" },
      {
        name: "description",
        content:
          "Who Orbit Agrochemical Industries is, our mission and the values behind how we grow, protect crops and support farming communities.",
      },
      { property: "og:title", content: "About Us — Orbit Agro" },
      {
        property: "og:description",
        content:
          "Who Orbit Agrochemical Industries is, our mission and the values behind how we grow, protect crops and support farming communities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const routerHash = useRouterState({ select: (s) => s.location.hash.replace("#", "") });
  const [activeTab, setActiveTab] = useState<AboutCategory>("vision-mission");

  useEffect(() => {
    const currentHash = (routerHash || window.location.hash.replace("#", "")) as AboutCategory;
    if (
      currentHash === "vision-mission" ||
      currentHash === "company-overview" ||
      currentHash === "partnerships-careers"
    ) {
      setActiveTab(currentHash);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [routerHash]);

  const handleSelectTab = (tab: AboutCategory) => {
    setActiveTab(tab);
    window.history.replaceState(null, "", `/about#${tab}`);
  };

  return (
    <PageShell>
      {/* Top Category Switcher Bar */}
      <div className="border-b border-gray-200 bg-gray-100 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-700">About Orbit Agro</p>
            <h1 className="mt-1 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {activeTab === "vision-mission" && "Vision & Mission"}
              {activeTab === "company-overview" && "Company Overview"}
              {activeTab === "partnerships-careers" && "Partnerships & Careers"}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSelectTab("vision-mission")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeTab === "vision-mission"
                  ? "bg-green-700 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Vision &amp; Mission
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab("company-overview")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeTab === "company-overview"
                  ? "bg-green-700 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Company Overview
            </button>
            <button
              type="button"
              onClick={() => handleSelectTab("partnerships-careers")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeTab === "partnerships-careers"
                  ? "bg-green-700 text-white shadow-sm"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              Partnerships &amp; Careers
            </button>
          </div>
        </div>
      </div>

      {/* Category 1: Vision & Mission Only */}
      {activeTab === "vision-mission" && (
        <div>
          <AboutHero />
          <CoreValues />
        </div>
      )}

      {/* Category 2: Company Overview Only */}
      {activeTab === "company-overview" && (
        <div>
          <Storytelling />
        </div>
      )}

      {/* Category 3: Partnerships & Careers Only */}
      {activeTab === "partnerships-careers" && (
        <div>
          <ExpertsAction />
        </div>
      )}
    </PageShell>
  );
}
