import { createFileRoute } from "@tanstack/react-router";
import { Plans } from "@/components/site/Plans";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Membership Plans — Eleve Studio" },
      { name: "description", content: "Monthly, quarterly, half-yearly and annual gym memberships at Eleve Studio, Vepery." },
      { property: "og:title", content: "Membership Plans — Eleve Studio" },
      { property: "og:description", content: "Transparent pricing. Pick your pace." },
    ],
  }),
  component: () => (
    <div className="pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center mb-4">
        <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Memberships</div>
        <h1 className="font-display text-6xl md:text-7xl">Pick your <span className="text-gradient-ember">pace.</span></h1>
        <p className="text-muted-foreground mt-4">All plans include every machine, cardio zone, lockers and WiFi.</p>
      </div>
      <Plans compact />
      <CTA />
    </div>
  ),
});
