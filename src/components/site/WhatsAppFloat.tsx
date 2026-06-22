import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppFloat() {
  const msg = encodeURIComponent("Hi Eleve Studio! I'm interested in joining.");
  return (
    <motion.a
      href={`https://wa.me/917200390099?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring" }}
      className="fixed bottom-6 right-6 z-40 size-14 grid place-items-center rounded-full text-white shadow-ember"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="size-7" />
      <span className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ background: "#25D366" }} />
    </motion.a>
  );
}
