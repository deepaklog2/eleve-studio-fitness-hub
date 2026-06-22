import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, Dumbbell, Flame } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 180]);
  const y2 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden flex items-center">
      {/* Parallax background image */}
      <motion.div
        style={{ y: y1, scale }}
        className="absolute inset-0 -z-10"
      >
        <img src="/gym-1.jpg" alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
      </motion.div>

      {/* Glow orbs */}
      <motion.div
        style={{ y: y2 }}
        className="absolute -top-20 -left-20 size-[420px] rounded-full blur-3xl opacity-30 bg-gradient-ember"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-0 right-0 size-[520px] rounded-full blur-3xl opacity-20 bg-gradient-ember"
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16 grid gap-8 md:grid-cols-12 items-center">
        <motion.div style={{ opacity }} className="md:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary"
          >
            <Flame className="size-3.5" /> Vepery · Chennai
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85]"
          >
            BURN. <br />
            <span className="text-gradient-ember">LIFT. RISE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            A unisex fitness studio for people who show up. Cardio, strength, Crossfit, Zumba and personalised coaching — under one roof, open from 5 AM.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Link to="/book">
              <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-ember px-7 py-3.5 text-sm uppercase tracking-widest font-semibold text-primary-foreground shadow-ember">
                Book a free trial
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/plans">
              <button className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm uppercase tracking-widest font-semibold hover:border-primary/60 transition">
                <Dumbbell className="size-4" /> See plans
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-8 pt-8 text-sm"
          >
            {[
              ["500+", "Members"],
              ["10+", "Trainers"],
              ["4.7★", "Google Rating"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="font-display text-3xl text-gradient-ember">{k}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{v}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5 relative hidden md:block"
        >
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-ember">
            <img src="/gym-2.jpg" alt="Eleve Studio equipment" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-xs uppercase tracking-widest text-primary">Open Now</div>
              <div className="font-display text-2xl">5 AM — 10 PM</div>
            </div>
          </div>
          <motion.img
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            src="/logo.png"
            alt=""
            className="absolute -top-8 -right-8 size-28 rounded-2xl ring-2 ring-primary/40 shadow-gold"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground"
      >
        scroll
      </motion.div>
    </section>
  );
}
