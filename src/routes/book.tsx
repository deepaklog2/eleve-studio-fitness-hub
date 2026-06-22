import { createFileRoute } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { motion } from "framer-motion";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a Free Trial — Eleve Studio, Chennai" },
      { name: "description", content: "Book a free trial session at Eleve Studio in Vepery, Chennai. Gym, cardio, Crossfit, Zumba or personal training." },
      { property: "og:title", content: "Book a Free Trial at Eleve Studio" },
      { property: "og:description", content: "Walk in, meet the trainers, feel the energy." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Booking</div>
          <h1 className="font-display text-6xl md:text-7xl">Reserve <span className="text-gradient-ember">your spot.</span></h1>
          <p className="text-muted-foreground mt-4">Tell us what you want to try. We'll confirm your slot by phone.</p>
        </motion.div>
        <BookingForm />
      </div>
    </section>
  );
}
