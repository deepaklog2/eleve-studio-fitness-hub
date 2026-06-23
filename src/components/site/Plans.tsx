import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Check, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
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

export function Plans({ compact = false }: { compact?: boolean }) {
  const { data: plans = [], isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data || []) as unknown as Plan[];
    },
  });

  return (
    <section id="plans" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        {!compact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Membership</div>
            <h2 className="font-display text-5xl md:text-6xl">Pick your pace</h2>
            <p className="text-muted-foreground mt-4">
              Transparent pricing. Cancel anytime. All plans include access to every machine, the cardio zone, lockers and free WiFi.
            </p>
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-96 glass rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "relative rounded-3xl p-7 glass flex flex-col",
                  plan.is_featured && "ring-2 ring-primary shadow-ember",
                )}
              >
                {plan.is_featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gradient-ember px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-primary-foreground">
                    <Sparkles className="size-3" /> Most popular
                  </div>
                )}
                <h3 className="font-display text-3xl">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-5xl text-gradient-ember">₹{plan.price_inr.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                    {plan.duration_months} {plan.duration_months === 1 ? "month" : "months"}
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
                <Link to="/plans" className="mt-7">
                  <button
                    className={cn(
                      "w-full rounded-full py-3 text-sm uppercase tracking-widest font-semibold transition",
                      plan.is_featured
                        ? "bg-gradient-ember text-primary-foreground hover:opacity-90"
                        : "glass hover:border-primary/60",
                    )}
                  >
                    View plan
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
