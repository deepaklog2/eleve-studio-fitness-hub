import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, Sparkles, Dumbbell, Flame, Zap, Crown, ShieldCheck, Clock, Users, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CTA } from "@/components/site/CTA";
import { cn } from "@/lib/utils";

interface Plan {
  id: string;
  name: string;
  description: string | null;
  price_inr: number;
  duration_months: number;
  features: string[];
  is_featured: boolean;
  sort_order: number;
}

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Membership Plans — Eleve Studio" },
      { name: "description", content: "Monthly, quarterly, half-yearly and annual gym memberships at Eleve Studio, Vepery." },
      { property: "og:title", content: "Membership Plans — Eleve Studio" },
      { property: "og:description", content: "Transparent pricing. Pick your pace." },
    ],
  }),
  component: PlansPage,
});

const benefits = [
  { icon: ShieldCheck, title: "No hidden fees", body: "What you see is what you pay. No registration, no locker, no surprise charges." },
  { icon: Clock, title: "Open 5 AM – 10 PM", body: "Train before work, on lunch, or after-hours. Sunday access available too." },
  { icon: Users, title: "Floor coaches always on", body: "Form checks, spotters and programme guidance included with every plan." },
  { icon: Heart, title: "Cancel anytime", body: "Pause or stop when life happens. Your remaining months stay credited." },
];

const planVisual: Record<string, { gradient: string; icon: any; image: string; tag: string }> = {
  default: { gradient: "from-amber-500/30 via-orange-500/10 to-transparent", icon: Dumbbell, image: "/gym-1.jpg", tag: "Starter" },
  monthly: { gradient: "from-amber-500/30 via-orange-500/10 to-transparent", icon: Flame, image: "/gym-1.jpg", tag: "Flexible" },
  quarterly: { gradient: "from-orange-500/30 via-amber-500/10 to-transparent", icon: Zap, image: "/gym-2.jpg", tag: "Best Start" },
  "half-yearly": { gradient: "from-rose-500/30 via-orange-500/10 to-transparent", icon: Sparkles, image: "/gym-3.jpg", tag: "Committed" },
  annual: { gradient: "from-yellow-500/40 via-amber-500/15 to-transparent", icon: Crown, image: "/gym-2.jpg", tag: "Top Value" },
};

function getVisual(name: string) {
  const key = name.toLowerCase().replace(/\s+/g, "-");
  return planVisual[key] || planVisual.default;
}

function PlansPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase.from("plans").select("*").order("sort_order");
      if (error) throw error;
      return (data || []) as unknown as Plan[];
    },
  });

  return (
    <div className="relative">
      {/* Parallax Hero */}
      <section ref={heroRef} className="relative min-h-[90vh] overflow-hidden flex items-center">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 -z-10">
          <img src="/gym-3.jpg" alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="absolute inset-0 noise opacity-30 mix-blend-overlay" />
        </motion.div>
        <motion.div style={{ y: useTransform(scrollY, [0, 600], [0, -80]) }} className="absolute -top-20 -right-20 size-[520px] rounded-full blur-3xl opacity-30 bg-gradient-ember" />

        <motion.div style={{ opacity: heroOpacity }} className="relative mx-auto max-w-5xl px-6 pt-32 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary"
          >
            <Sparkles className="size-3.5" /> Memberships
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-6xl md:text-8xl lg:text-9xl leading-[0.85]"
          >
            Pick your <br /><span className="text-gradient-ember">pace.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6"
          >
            Four ways to train. One studio. Transparent pricing, full access to every machine, every zone, every coach.
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground"
        >
          scroll
        </motion.div>
      </section>

      {/* Plan cards grid */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-96 glass rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan, i) => {
                const v = getVisual(plan.name);
                const Icon = v.icon;
                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.08, duration: 0.6 }}
                    whileHover={{ y: -8 }}
                    className={cn(
                      "relative rounded-3xl p-7 glass flex flex-col overflow-hidden group",
                      plan.is_featured && "ring-2 ring-primary shadow-ember",
                    )}
                  >
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100", v.gradient)} />
                    <div className="relative">
                      {plan.is_featured && (
                        <div className="absolute -top-1 right-0 inline-flex items-center gap-1 rounded-full bg-gradient-ember px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-primary-foreground">
                          <Sparkles className="size-3" /> Popular
                        </div>
                      )}
                      <Icon className="size-8 text-primary mb-4" />
                      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{v.tag}</div>
                      <h3 className="font-display text-3xl mt-1">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 min-h-[40px]">{plan.description}</p>
                      <div className="my-6">
                        <div className="flex items-baseline gap-1">
                          <span className="font-display text-5xl text-gradient-ember">₹{plan.price_inr.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                          {plan.duration_months} {plan.duration_months === 1 ? "month" : "months"}
                          {plan.duration_months > 1 && (
                            <span className="ml-2 text-primary">· ₹{Math.round(plan.price_inr / plan.duration_months).toLocaleString("en-IN")}/mo</span>
                          )}
                        </div>
                      </div>
                      <ul className="space-y-2.5 text-sm flex-1">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <Check className="size-4 text-primary mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to="/contact" className="mt-7 block">
                        <button
                          className={cn(
                            "w-full rounded-full py-3 text-sm uppercase tracking-widest font-semibold transition",
                            plan.is_featured
                              ? "bg-gradient-ember text-primary-foreground hover:opacity-90"
                              : "glass hover:border-primary/60",
                          )}
                        >
                          Enquire now
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Detailed parallax sections for each plan */}
      {plans.map((plan, i) => (
        <ParallaxPlanSection key={plan.id} plan={plan} index={i} />
      ))}

      {/* Benefits */}
      <section className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Every plan includes</div>
            <h2 className="font-display text-5xl md:text-6xl">No fine print.</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6"
              >
                <b.icon className="size-7 text-primary mb-4" />
                <h3 className="font-display text-xl">{b.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-6xl text-center mb-12"
          >
            Questions, answered.
          </motion.h2>
          <div className="space-y-4">
            {[
              ["Is there a registration fee?", "No. The price you see is the price you pay. No locker fee, no joining fee, no card fee."],
              ["Can I pause my membership?", "Yes — pause up to 30 days per year for medical or travel reasons. Just message us on WhatsApp."],
              ["Do you have a free trial?", "Walk in any morning and we'll show you around. Talk to us about a complimentary session at the front desk."],
              ["What's included on every plan?", "Full access to cardio, strength, functional zone, lockers, WiFi, and floor coaching."],
            ].map(([q, a], i) => (
              <motion.details
                key={q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6 group"
              >
                <summary className="cursor-pointer font-display text-xl flex justify-between items-center">
                  {q}
                  <span className="text-primary text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-muted-foreground mt-3">{a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}

function ParallaxPlanSection({ plan, index }: { plan: Plan; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const v = getVisual(plan.name);
  const Icon = v.icon;
  const reversed = index % 2 === 1;

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40", v.gradient)} />
      <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-2 items-center relative">
        <motion.div style={{ y: reversed ? imageY : y, rotate }} className={cn("relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-ember", reversed && "md:order-2")}>
          <img src={v.image} alt={plan.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <Icon className="size-10 text-primary mb-3" />
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">{v.tag}</div>
            <div className="font-display text-4xl text-gradient-ember">{plan.name}</div>
          </div>
        </motion.div>
        <motion.div style={{ y: reversed ? y : imageY }} className="space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-primary">Plan {String(index + 1).padStart(2, "0")}</div>
          <h2 className="font-display text-5xl md:text-6xl leading-[0.95]">
            {plan.name} <br /><span className="text-gradient-ember">membership.</span>
          </h2>
          <p className="text-muted-foreground text-lg">{plan.description}</p>
          <div className="flex items-baseline gap-4">
            <div className="font-display text-6xl text-gradient-ember">₹{plan.price_inr.toLocaleString("en-IN")}</div>
            <div className="text-sm uppercase tracking-widest text-muted-foreground">
              {plan.duration_months} {plan.duration_months === 1 ? "month" : "months"}
            </div>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3 pt-4">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <Link to="/contact">
            <button className="mt-4 group inline-flex items-center gap-2 rounded-full bg-gradient-ember px-7 py-3.5 text-sm uppercase tracking-widest font-semibold text-primary-foreground shadow-ember">
              Enquire about {plan.name}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
