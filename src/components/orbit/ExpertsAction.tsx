import { Reveal } from "./Reveal";
import labImg from "@/assets/orbit/team-lab.jpg.asset.json";
import groupImg from "@/assets/orbit/team-group.jpg.asset.json";
import receptionImg from "@/assets/orbit/team-reception.jpg.asset.json";

const photos = [
  { src: labImg.url, alt: "Orbit Agro specialist at the laboratory quality-control desk", span: true },
  { src: groupImg.url, alt: "Orbit Agro production and formulation team gathered in the facility", span: false },
  { src: receptionImg.url, alt: "Orbit Agro experts standing beside their product display", span: false },
];

export function ExpertsAction() {
  return (
    <section className="relative pb-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Gallery grid — stacks above the text on mobile, sits beside it on desktop */}
          <Reveal>
            <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-full min-h-[380px] sm:min-h-[440px]">
              {photos.map((p) => (
                <div
                  key={p.src}
                  className={`group relative rounded-2xl overflow-hidden glass ${p.span ? "row-span-2" : ""}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
            </div>
          </Reveal>

          {/* Text container directly beside the gallery */}
          <Reveal delay={0.15}>
            <div className="glass-emerald rounded-2xl p-8 md:p-12 h-full flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4">Our Team</div>
              <h3 className="font-display text-3xl md:text-4xl font-light leading-tight mb-6">
                Our Experts in <span className="text-gradient-emerald">Action</span>
              </h3>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-4">
                Meet the dedicated specialists formulating, testing, and distributing premium crop
                protection. Behind every successful harvest is our team's{" "}
                <span className="text-gradient-emerald font-medium">world-class manufacturing excellence</span>.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                From laboratory research to local product delivery, we work seamlessly to secure your
                yields—growing together through partnerships.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
