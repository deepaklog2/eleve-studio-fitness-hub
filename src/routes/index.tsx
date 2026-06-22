import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Gallery } from "@/components/site/Gallery";
import { Plans } from "@/components/site/Plans";
import { Reviews } from "@/components/site/Reviews";
import { MapSection } from "@/components/site/MapSection";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eleve Studio — Unisex Fitness Studio in Vepery, Chennai" },
      { name: "description", content: "Cardio, strength, Crossfit, Zumba & personal training. Open 5 AM. Located in Vepery, Chennai." },
      { property: "og:title", content: "Eleve Studio — Train. Transform. Rise." },
      { property: "og:description", content: "A unisex fitness studio for people who show up." },
      { property: "og:image", content: "/gym-1.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Gallery />
      <Plans />
      <Reviews />
      <MapSection />
      <CTA />
    </>
  );
}
