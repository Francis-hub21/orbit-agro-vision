import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Clock, User, FolderOpen, Phone, Mail, CalendarClock, MapPin } from "lucide-react";
import { Navbar } from "@/components/orbit/Navbar";
import { Footer } from "@/components/orbit/Footer";
import tomatoImg from "@/assets/orbit/news/news-tomato.jpg.asset.json";
import maizeImg from "@/assets/orbit/news/news-maize.jpg.asset.json";
import potatoImg from "@/assets/orbit/news/news-potato.jpg.asset.json";
import onionImg from "@/assets/orbit/news/news-onion.jpg.asset.json";
import wheatImg from "@/assets/orbit/news/news-wheat.jpg.asset.json";
import mangoImg from "@/assets/orbit/news/news-mango.webp.asset.json";
import wambuguImg from "@/assets/orbit/news/event-wambugu-atc-2025.jpg.asset.json";
import agitechImg from "@/assets/orbit/news/event-agitech-expo-2024.jpg.asset.json";
import kisimaImg from "@/assets/orbit/news/event-kisima-meru-2024.jpg.asset.json";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Our News & Farmers Support — Orbit Agro Chemical Industries" },
      {
        name: "description",
        content:
          "Farming guides, events and announcements from Orbit Agro Chemical Industries Limited — supporting Kenyan farmers for high yields.",
      },
      { property: "og:title", content: "Our News & Farmers Support — Orbit Agro" },
      {
        property: "og:description",
        content:
          "Farming guides, events and announcements from Orbit Agro Chemical Industries Limited.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

type CategoryId = "farming-news" | "events-announcements";

type Article = {
  id: string;
  title: string;
  image: string;
  date: string;
  author: string | null;
  category: CategoryId;
  location?: string;
  body: string[];
};

const categories: { id: CategoryId; label: string }[] = [
  { id: "farming-news", label: "Farming News" },
  { id: "events-announcements", label: "Events & Announcements" },
];

const articles: Article[] = [
  {
    id: "wambugu-atc-exhibition-2025",
    title: "Wambugu ATC Exhibition 2025",
    image: wambuguImg.url,
    date: "July 25, 2025",
    author: null,
    category: "events-announcements",
    location: "25th and 26th July 2025 · Nyeri",
    body: [
      "Orbit Agrochemical Industries Limited at the Wambugu ATC exhibition, held on 25th and 26th July 2025 in Nyeri.",
    ],
  },
  {
    id: "agitech-grand-expo-2024",
    title: "AGITECH Grand Expo 2024",
    image: agitechImg.url,
    date: "October 11, 2024",
    author: null,
    category: "events-announcements",
    location: "11th and 12th October 2024 · Mutithi, Mwea, Kirinyaga County (Embu – Makutano highway)",
    body: [
      "Orbit Agrochemical Industries Limited at the AGITECH Grand Expo 2024, held on 11th and 12th October 2024 at Mutithi, Mwea, Kirinyaga County, along the Embu – Makutano highway.",
    ],
  },
  {
    id: "kisima-farm-meru-field-day-2024",
    title: "Kisima Farm, Meru County — Farmers Field Day 2024",
    image: kisimaImg.url,
    date: "October 3, 2024",
    author: null,
    category: "events-announcements",
    location: "3rd October 2024 · Kisima Farm, Meru County",
    body: [
      "Orbit Agrochemical Industries Limited at the Farmers Field Day 2024, held on 3rd October 2024 at Kisima Farm, Meru County.",
    ],
  },
  {
    id: "tomato-farming",
    title: "Tomato Farming",
    image: tomatoImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "Numerous varieties of the tomato plant are widely grown in temperate climates across the world, with greenhouses allowing for the production of tomatoes throughout all seasons of the year. Tomato plants typically grow to 1–3 meters (3–10 ft) in height.",
    ],
  },
  {
    id: "maize-farming",
    title: "Maize Farming",
    image: maizeImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "Maize is a tall annual grass with a single stem, ranging in height from 1.2 m (4 ft) to 4 m (13 ft). The long narrow leaves arise from the nodes or joints, alternately on opposite sides on the stalk. Maize is monoecious, with separate male and female flowers on the same plant",
    ],
  },
  {
    id: "potato-farming",
    title: "Potato Farming",
    image: potatoImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "Potato plants are herbaceous perennials that grow about 60 centimetres (24 inches) high, depending on variety, with the leaves dying back after flowering, fruiting and tuber formation.",
    ],
  },
  {
    id: "onion-farming",
    title: "Onion Farming",
    image: onionImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "The onion has been grown and selectively bred in cultivation for at least 7,000 years. It is a biennial plant but is usually grown as an annual. Modern varieties typically grow to a height of 15 to 45 cm (6 to 18 in).",
    ],
  },
  {
    id: "wheat-farming",
    title: "Wheat Farming",
    image: wheatImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "Wheat is an annual crop. It can be planted in autumn and harvested in early summer as winter wheat in climates that are not too severe, or planted in spring and harvested in autumn as spring wheat. It is normally planted after tilling the soil by ploughing and then harrowing to kill weeds and create an even surface.",
    ],
  },
  {
    id: "mango-farming",
    title: "Mango Farming",
    image: mangoImg.url,
    date: "August 14, 2023",
    author: "by Admin",
    category: "farming-news",
    body: [
      "Mango trees grow to 30–40 meters (98–131 feet) tall, with a crown radius of 10–15 m (33–49 ft). The trees are long-lived, as some specimens still fruit after 300 years.",
      "In deep soil, the taproot descends to a depth of 6 m (20 ft), with profuse, wide-spreading feeder roots and anchor roots penetrating deeply into the soil.",
    ],
  },
];

function NewsPage() {
  const countOf = (id: CategoryId) => articles.filter((a) => a.category === id).length;

  return (
    <main className="relative">
      <Navbar />
      <section className="px-6 pt-36 pb-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Farmers Support</div>
            <h1 className="font-display text-4xl md:text-6xl font-light leading-tight">
              Our <span className="text-gradient-emerald">news</span>
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We provide superior quality crop protection products to enable farmers enjoy high yields with very
              minimal investment.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-10">
              {articles.map((a, i) => (
                <motion.article
                  key={a.id}
                  id={a.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.04 * (i % 2), ease: [0.22, 1, 0.36, 1] }}
                  className="glass overflow-hidden rounded-2xl scroll-mt-28"
                >
                  <div
                    className={`relative w-full ${
                      a.category === "events-announcements" ? "aspect-[4/5]" : "aspect-[16/9]"
                    }`}
                  >
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full ${
                        a.category === "events-announcements"
                          ? "bg-background p-3 object-contain"
                          : "object-cover"
                      }`}
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <h2 className="font-display text-2xl md:text-3xl font-light">{a.title}</h2>
                    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {a.date}
                      </span>
                      {a.author && (
                        <span className="inline-flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-primary" /> {a.author}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <FolderOpen className="h-3.5 w-3.5 text-primary" />{" "}
                        {categories.find((c) => c.id === a.category)?.label}
                      </span>
                    </div>
                    {a.location && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary" /> {a.location}
                      </div>
                    )}
                    <div className="mt-4 space-y-3">
                      {a.body.map((p, j) => (
                        <p key={j} className="text-sm md:text-[15px] text-foreground/85 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 self-start">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-display text-lg">Categories</h3>
                <div className="mt-3 h-px w-full bg-border" />
                <ul className="mt-4 space-y-3 text-sm">
                  {categories.map((c) => {
                    const first = articles.find((a) => a.category === c.id);
                    return (
                      <li key={c.id}>
                        <a
                          href={`#${first?.id ?? ""}`}
                          className="flex items-center justify-between gap-3 text-muted-foreground transition-colors hover:text-primary"
                        >
                          <span>{c.label}</span>
                          <span className="text-xs opacity-70">{countOf(c.id)}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="glass-emerald rounded-2xl p-6 space-y-4 text-sm">
                <h3 className="font-display text-lg">Need support?</h3>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Have a question? Call us now</div>
                    <a href="tel:+254752368468" className="hover:text-primary">
                      +254 752 368 468
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="text-muted-foreground">We are open on</div>
                    <div>Mon - Fri : 08:00-17:00</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <div className="text-muted-foreground">Need support? Drop us an email</div>
                    <a href="mailto:orbitagro@orbitagro.co.ke" className="break-all hover:text-primary">
                      orbitagro@orbitagro.co.ke
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
