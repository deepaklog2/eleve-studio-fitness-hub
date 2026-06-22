import { motion } from "framer-motion";
import { Dumbbell, Heart, Music2, Flame, Users, Target } from "lucide-react";

const services = [
  { icon: Dumbbell, title: "Strength", desc: "Free weights, racks, full machine circuit. Build muscle the right way." },
  { icon: Heart, title: "Cardio", desc: "Treadmills, cycles, ellipticals. Sweat sessions that actually work." },
  { icon: Flame, title: "Crossfit", desc: "High-intensity functional training. Push past your limits." },
  { icon: Music2, title: "Zumba", desc: "Dance off the calories. Energy-packed group sessions." },
  { icon: Target, title: "Weight Loss", desc: "Structured programs with diet plans and progress tracking." },
  { icon: Users, title: "Personal Training", desc: "1-on-1 coaching with certified trainers. Get your own coach." },
];

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">What we offer</div>
          <h2 className="font-display text-5xl md:text-6xl">Train your way</h2>
          <p className="text-muted-foreground mt-4">Six disciplines. One studio. Whatever your goal, we have the gear and the coaches.</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative glass rounded-2xl p-7 overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 size-40 rounded-full bg-gradient-ember opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />
              <s.icon className="size-9 text-primary mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-display text-2xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
