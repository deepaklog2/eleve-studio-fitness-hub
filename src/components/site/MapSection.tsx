import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Phone } from "lucide-react";

const ELEVE = { lat: 13.0840409, lng: 80.2625961 };

export function MapSection() {
  const [Map, setMap] = useState<null | typeof import("./LeafletMap")>(null);

  useEffect(() => {
    let cancelled = false;
    import("./LeafletMap").then((m) => {
      if (!cancelled) setMap(m);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="location" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Find us</div>
          <h2 className="font-display text-5xl md:text-6xl">In the heart of Vepery</h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl overflow-hidden glass shadow-ember h-[480px]">
            {Map ? (
              <Map.LeafletMap lat={ELEVE.lat} lng={ELEVE.lng} />
            ) : (
              <div className="h-full grid place-items-center text-muted-foreground">Loading map…</div>
            )}
          </div>

          <div className="space-y-5">
            <div className="glass rounded-2xl p-6 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary mb-2">Address</div>
                <p className="text-sm leading-relaxed">
                  No.16, 1st Floor, EVK Sampath Salai,<br />
                  Vepery, Park Town,<br />
                  Chennai, Tamil Nadu 600007
                </p>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary mb-2">Hours</div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>Mon – Sat · 5 AM — 10 PM</li>
                  <li>Sunday · Open 24 hours</li>
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${ELEVE.lat},${ELEVE.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-ember text-primary-foreground py-3 text-sm font-semibold"
                >
                  <Navigation className="size-4" /> Directions
                </a>
                <a
                  href="tel:+917200390099"
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass py-3 text-sm font-semibold hover:border-primary/60"
                >
                  <Phone className="size-4" /> Call
                </a>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-ember grid place-items-center">
                  <MapPin className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Free Parking</div>
                  <div className="text-xs text-muted-foreground">Garage, lot & street parking available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
