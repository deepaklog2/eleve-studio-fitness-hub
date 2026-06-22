import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] p-12 md:p-20 text-center"
          style={{ background: "var(--gradient-ember)" }}
        >
          <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
          <h2 className="font-display text-5xl md:text-7xl text-primary-foreground relative">
            Stop scrolling.<br />Start lifting.
          </h2>
          <p className="text-primary-foreground/80 mt-5 max-w-xl mx-auto relative">
            First trial session is on us. Walk in, meet the trainers, feel the energy.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
            <Link to="/book">
              <button className="group inline-flex items-center gap-2 rounded-full bg-background px-7 py-3.5 text-sm uppercase tracking-widest font-semibold text-foreground hover:bg-foreground hover:text-background transition">
                Book free trial <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/plans">
              <button className="inline-flex items-center gap-2 rounded-full border border-background/40 text-primary-foreground px-7 py-3.5 text-sm uppercase tracking-widest font-semibold hover:bg-background/10 transition">
                View memberships
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
