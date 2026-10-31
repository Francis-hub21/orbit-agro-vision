import { Reveal, SectionHeader } from "./Reveal";
import aboutImg from "@/assets/orbit/about.jpg";
import { motion } from "framer-motion";

export function Storytelling() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="About Us"
          title={<>You need agrochemicals? <span className="text-gradient-emerald">Think Orbit Agro.</span></>}
          desc="We grow through partnerships."
        />

        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-16 aspect-[16/9] md:aspect-[21/9]">
            <motion.img
              src={aboutImg}
              alt="Orbit Agro farmland and crop fields in Kenya"
              width={1280}
              height={854}
              initial={{ scale: 1.6, opacity: 0, filter: "blur(12px)" }}
              whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.72_0.20_150/0.25),transparent_70%)]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Established 2009</div>
                <h3 className="font-display text-3xl md:text-5xl font-light leading-tight">
                  Orbit Agro Chemical <span className="text-gradient-emerald">Industries Limited.</span>
                </h3>
              </motion.div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
