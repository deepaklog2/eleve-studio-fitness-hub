import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/site/ContactForm";
import { MapSection } from "@/components/site/MapSection";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Eleve Studio, Vepery, Chennai" },
      { name: "description", content: "Visit Eleve Studio in Vepery, Chennai. Call +91 72003 90099 or send us a message." },
      { property: "og:title", content: "Contact Eleve Studio" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Say hello</div>
            <h1 className="font-display text-6xl md:text-7xl">Let's <span className="text-gradient-ember">talk.</span></h1>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3"><ContactForm /></div>
            <div className="lg:col-span-2 space-y-4">
              <a href="tel:+917200390099" className="block glass rounded-2xl p-6 hover:border-primary/60 transition">
                <Phone className="size-6 text-primary mb-3" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Phone</div>
                <div className="font-display text-2xl mt-1">+91 72003 90099</div>
              </a>
              <a href={`https://wa.me/917200390099?text=${encodeURIComponent("Hi Eleve!")}`} target="_blank" rel="noreferrer" className="block glass rounded-2xl p-6 hover:border-primary/60 transition">
                <MessageCircle className="size-6 text-primary mb-3" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                <div className="font-display text-2xl mt-1">Chat instantly</div>
              </a>
              <div className="glass rounded-2xl p-6">
                <Mail className="size-6 text-primary mb-3" />
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Hours</div>
                <div className="text-sm mt-2 text-muted-foreground">
                  Mon–Sat · 5 AM — 10 PM<br />Sunday · Open 24 hours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MapSection />
    </>
  );
}
