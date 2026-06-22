import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const images = ["/gym-1.jpg", "/gym-2.jpg", "/gym-3.jpg", "/gym-1.jpg", "/gym-2.jpg", "/gym-3.jpg"];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-45%"]);

  return (
    <section ref={ref} className="relative py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Inside the studio</div>
        <h2 className="font-display text-5xl md:text-6xl">Built for results</h2>
      </div>
      <motion.div style={{ x }} className="flex gap-6 pl-6">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 w-[300px] md:w-[480px] aspect-[4/5] rounded-3xl overflow-hidden glass"
          >
            <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent" />
            <div className="absolute bottom-4 left-4 font-display text-xl text-gradient-ember">
              0{i + 1}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
