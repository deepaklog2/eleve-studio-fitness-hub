import { Link } from "@tanstack/react-router";
import { Instagram, MapPin, Phone, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Eleve" className="h-12 w-12 rounded-md ring-1 ring-primary/40" />
            <div>
              <div className="font-display text-2xl tracking-widest text-gradient-ember">ELEVE</div>
              <div className="text-[10px] tracking-[0.3em] text-muted-foreground">UNISEX FITNESS STUDIO</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Chennai's home for serious training — cardio, strength, Crossfit, Zumba, and personalised coaching.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-widest text-primary">Explore</h4>
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/plans", "Plans"],
            ["/book", "Book Trial"],
            ["/contact", "Contact"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="block text-sm text-muted-foreground hover:text-primary">
              {label}
            </Link>
          ))}
        </div>

        <div className="space-y-3 text-sm text-muted-foreground">
          <h4 className="text-sm uppercase tracking-widest text-primary">Visit</h4>
          <p className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" /> No.16, 1st Floor, EVK Sampath Salai, Vepery, Chennai 600007</p>
          <p className="flex items-center gap-2"><Phone className="size-4 text-primary" /> <a href="tel:+917200390099" className="hover:text-primary">+91 72003 90099</a></p>
          <p className="flex items-center gap-2"><Clock className="size-4 text-primary" /> Mon–Sat 5am–10pm · Sun 24h</p>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm uppercase tracking-widest text-primary">Follow</h4>
          <div className="flex gap-3">
            <a href="https://www.instagram.com/eleve_fitness_fam/" target="_blank" rel="noreferrer" className="size-10 grid place-items-center rounded-full glass hover:bg-gradient-ember hover:text-primary-foreground transition">
              <Instagram className="size-5" />
            </a>
            <a href="https://www.instagram.com/eleve_unisexfitnessstudio/" target="_blank" rel="noreferrer" className="size-10 grid place-items-center rounded-full glass hover:bg-gradient-ember hover:text-primary-foreground transition">
              <Instagram className="size-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Eleve Studio · Built with intensity.
      </div>
    </footer>
  );
}
