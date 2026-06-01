import { SectionHeader } from "./Reveal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const items = [
  {
    quote: "Big thank you to you, Orbit Agro. I had a fantastic talk with one of your agronomists — wow, he is an encyclopedia of knowledge. I took heaps of notes and have truckloads of things to follow up on in my farm. KEEP UP THE GOOD JOB!!",
    name: "Paul Mwangi",
    role: "Farmer · Nakuru County",
  },
  {
    quote: "I have used Glyweed on my farm and it worked wonders. I highly recommend farmers to try it.",
    name: "Sally Cherotich",
    role: "Farmer · Uasin Gishu County",
  },
  {
    quote: "I believe one of the best farming secrets is its ability to network like-minded individuals. Help and valuable knowledge can be shared.",
    name: "Mary Mueni",
    role: "Farmer · Makueni County",
  },
  {
    quote: "Nimetumia bidhaa za Orbit Agro mara kwa mara na matokeo yameniridhisha. Hongera pia kwa wataalamu wenu ambao tunawasiliana nao mara kwa mara.",
    name: "Patrick Ndichu",
    role: "Farmer · Nyeri County",
  },
];

// Duplicate for seamless marquee
const loop = [...items, ...items];

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Testimonials"
            title={<>Voices from the <span className="text-gradient-emerald">field.</span></>}
            desc="Real words from farmers across Kenya who grow with Orbit Agro."
          />
        </div>
      </div>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-background to-transparent" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {loop.map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-8 w-[360px] md:w-[440px] shrink-0 flex flex-col"
            >
              <Quote className="h-7 w-7 text-primary mb-5" />
              <p className="text-base leading-relaxed text-foreground/90 flex-1">{t.quote}</p>
              <div className="mt-6 pt-6 border-t border-border">
                <div className="font-display text-lg">{t.name}</div>
                <div className="text-xs tracking-wider uppercase text-muted-foreground mt-1">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
