export function Footer() {
  return (
    <footer className="relative border-t border-border mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="h-8 w-8 rounded-full border border-primary/60 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
              </div>
              <span className="font-display font-medium text-sm">
                Orbit<span className="text-primary"> Agro</span> Chemical Industries
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              We provide superior quality crop protection products to enable farmers to enjoy high
              yields with very minimal investment. Established 2009. Nairobi, Kenya.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div><span className="text-primary">Phone:</span> <a href="tel:+254752368468" className="hover:text-primary">+254 752 368 468</a></div>
              <div><span className="text-primary">Email:</span> <a href="mailto:orbitagro@orbitagro.co.ke" className="hover:text-primary">orbitagro@orbitagro.co.ke</a></div>
              <div><span className="text-primary">Hours:</span> Mon — Fri · 08:00 — 17:00</div>
              <div><span className="text-primary">Address:</span> Nairobi, Kenya</div>
            </div>
            <a
              href="https://wa.me/254752368468?text=Hello%20Orbit%20Agro%2C%20I%20would%20like%20more%20information%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.28 4.87L2 22l5.3-1.32a9.9 9.9 0 004.74 1.2c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.8 14.06c-.24.68-1.4 1.3-1.93 1.34-.53.05-1.02.24-3.46-.72-2.94-1.16-4.8-4.2-4.95-4.4-.14-.2-1.17-1.56-1.17-2.98 0-1.42.75-2.12 1.02-2.4.26-.29.56-.36.75-.36.19 0 .38.002.55.01.17.008.42-.07.65.5.24.58.8 1.98.87 2.12.07.15.12.32.02.51-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.61 2.01 1.11.99 2.04 1.3 2.33 1.44.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.69.8 1.98.94.29.15.48.22.55.34.07.12.07.7-.17 1.38z" />
              </svg>
              Chat with us on WhatsApp
            </a>
            <div className="mt-4 text-sm text-muted-foreground">
              <span className="text-primary">Facebook:</span>{" "}
              <a
                href="https://www.facebook.com/people/Orbit-Agrochemical-industries-ltd/100069240842491/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-primary/40 underline-offset-4 hover:text-primary"
              >
                Orbit Agrochemical Industries Ltd
              </a>
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Products</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#solutions" className="hover:text-primary">Fungicides</a></li>
              <li><a href="#solutions" className="hover:text-primary">Insecticides</a></li>
              <li><a href="#solutions" className="hover:text-primary">Herbicides</a></li>
              <li><a href="#solutions" className="hover:text-primary">Fertilizers</a></li>
              <li><a href="#solutions" className="hover:text-primary">Bio Stimulants</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary">About Us</a></li>
              <li><a href="#location" className="hover:text-primary">Location</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
              <li><a href="#crop-doctor" className="hover:text-primary">Crop Doctor</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Orbit Agro Chemical Industries Limited · Nairobi, Kenya · All Rights Reserved</div>
          <div className="tracking-[0.3em] uppercase">We Grow Through Partnerships</div>
        </div>
      </div>
    </footer>
  );
}
