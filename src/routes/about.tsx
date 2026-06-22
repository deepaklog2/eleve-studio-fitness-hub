import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Heart, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Eleve Studio | Vepery, Chennai" },
      { name: "description", content: "Eleve Studio is a unisex fitness studio in Vepery, Chennai. Modern equipment, expert trainers, and a community that pushes you forward." },
      { property: "og:title", content: "About Eleve Studio" },
      { property: "og:description", content: "A studio for people who want real, lasting results." },
      { property: "og:image", content: "/gym-2.jpg" },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Inclusive", desc: "Unisex space for every body, every level." },
  { icon: Award, title: "Expert coaches", desc: "Certified trainers like Jaguar Mani, Prakash and Dinesh." },
  { icon: ShieldCheck, title: "Hygienic", desc: "Cleaned daily. Wheelchair-accessible entrance & parking." },
  { icon: Sparkles, title: "Results-driven", desc: "Personalised plans for weight loss, strength & lifestyle." },
];

function About() {
  return (
    <>
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src="/gym-2.jpg" alt="" className="h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.3em] text-primary mb-4">Our story</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display text-6xl md:text-8xl">
            More than a gym.<br /><span className="text-gradient-ember">A studio.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-muted-foreground max-w-2xl mx-auto mt-6">
            Eleve Studio was built on a simple idea: a fitness space where everyone — beginner or advanced, men or women — gets the equipment, coaching, and energy they need to actually transform.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-7"
          >
            <v.icon className="size-8 text-primary mb-4" />
            <h3 className="font-display text-2xl">{v.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-10 md:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Amenities</div>
          <h2 className="font-display text-5xl mb-6">Everything you need.</h2>
          <ul className="space-y-3 text-muted-foreground">
            {[
              "Modern strength & cardio equipment",
              "Group classes — Zumba, Crossfit",
              "Personal training packages",
              "Wheelchair-accessible entrance & parking",
              "Restrooms · Lockers · Free WiFi",
              "Free parking — garage, lot & street",
              "Open from 5 AM · Sundays 24 hours",
              "Debit / Credit cards · Google Pay accepted",
            ].map((a) => (
              <li key={a} className="flex items-start gap-3">
                <span className="mt-1.5 size-2 rounded-full bg-gradient-ember shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4"
        >
          <img src="/gym-3.jpg" alt="" className="rounded-2xl object-cover aspect-square" />
          <img src="/gym-1.jpg" alt="" className="rounded-2xl object-cover aspect-square mt-8" />
          <img src="/gym-2.jpg" alt="" className="rounded-2xl object-cover aspect-square mt-4" />
          <img src="/gym-3.jpg" alt="" className="rounded-2xl object-cover aspect-square" />
        </motion.div>
      </section>
    </>
  );
}
