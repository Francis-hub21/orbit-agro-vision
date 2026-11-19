import { SocialLinks } from "./SocialLinks";

export function Footer() {
  return (
    <footer className="relative border-t border-border mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <img src="/orbit-logo.png" alt="Orbit Agro Products" width={104} height={86} className="h-20 w-24 object-contain" />
              <span className="max-w-xs font-display text-sm font-semibold">ORBIT AGRO CHEMICAL INDUSTRIES LTD.</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              We provide superior quality crop protection products to enable farmers to enjoy high
              yields with very minimal investment. Established 2009. Nairobi, Kenya.
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div><span className="text-primary">Phone:</span> <a href="tel:+254752368468" className="hover:text-primary">+254 752 368 468</a></div>
              <div><span className="text-primary">Email:</span> <a href="mailto:orbitagro@orbitagro.co.ke" className="hover:text-primary">orbitagro@orbitagro.co.ke</a></div>
              <div><span className="text-primary">Address:</span> Place 446 Godowns, Mombasa Road Opposite Signature Mall, P.O. Box 48870 - 00100 Nairobi, Kenya</div>
            </div>
            <SocialLinks showLabels={true} className="mt-6 flex-col items-start gap-2.5" />

          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Products</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/products" className="hover:text-primary">Fungicides</a></li>
              <li><a href="/products" className="hover:text-primary">Insecticides</a></li>
              <li><a href="/products" className="hover:text-primary">Herbicides</a></li>
              <li><a href="/products" className="hover:text-primary">Fertilizers</a></li>
              <li><a href="/products" className="hover:text-primary">Bio Stimulants</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary">About Us</a></li>
              <li><a href="/location" className="hover:text-primary">Location</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact</a></li>
              <li><a href="/crop-doctor" className="hover:text-primary">Crop Doctor</a></li>
              <li><a href="/news" className="hover:text-primary">News</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex justify-center">
          <img src="/orbit-logo.png" alt="Orbit Agro Products" loading="lazy" width={232} height={190} className="w-40 object-contain sm:w-48" />
        </div>
        <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Orbit Agro Chemical Industries Limited · Nairobi, Kenya · All Rights Reserved</div>
          <div>We grow through ... Partnerships</div>
        </div>
      </div>
    </footer>
  );
}
