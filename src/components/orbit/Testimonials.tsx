import { Reveal, SectionHeader } from "./Reveal";
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

export function Testimonials() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>Voices from the <span className="text-gradient-emerald">field.</span></>}
          desc="Real words from farmers across Kenya who grow with Orbit Agro."
        />
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="glass rounded-2xl p-8 h-full flex flex-col"
              >
                <Quote className="h-7 w-7 text-primary mb-5" />
                <p className="text-base leading-relaxed text-foreground/90 flex-1">{t.quote}</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-display text-lg">{t.name}</div>
                  <div className="text-xs tracking-wider uppercase text-muted-foreground mt-1">{t.role}</div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
