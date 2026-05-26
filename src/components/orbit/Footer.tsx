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
              <span className="font-display tracking-[0.2em] uppercase text-sm">
                Orbit<span className="text-primary"> Agro</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Engineering the future of intelligent agriculture across Africa. Precision crop protection,
              distribution intelligence and agronomy at scale.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm">
              <input
                placeholder="Your email"
                className="flex-1 rounded-l-full bg-input/40 border border-border px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <button className="rounded-r-full bg-primary px-5 text-xs uppercase tracking-[0.2em] text-primary-foreground">
                Subscribe
              </button>
            </form>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Platform</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#solutions" className="hover:text-primary">Solutions</a></li>
              <li><a href="#crop-doctor" className="hover:text-primary">Crop Doctor</a></li>
              <li><a href="#calculator" className="hover:text-primary">Calculator</a></li>
              <li><a href="#distributor" className="hover:text-primary">Distributors</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Sustainability</a></li>
              <li><a href="#contact" className="hover:text-primary">Contact</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Orbit Agrochemical Ltd · Nairobi, Kenya</div>
          <div className="tracking-[0.3em] uppercase">Engineered in Africa</div>
        </div>
      </div>
    </footer>
  );
}
