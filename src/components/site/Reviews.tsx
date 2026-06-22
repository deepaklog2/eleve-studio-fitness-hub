import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  { name: "Corey Formosa", rating: 5, text: "Visiting from Australia, the staff are extremely kind and by far the best in the area. Highly recommend for anyone visiting." },
  { name: "Stephany B", rating: 5, text: "I've been a regular and truly appreciate the great equipment and overall setup — it's one of the best in the area." },
  { name: "Sneha Umashankar", rating: 5, text: "An excellent unisex gym for beginners and advanced. Various equipment and friendly trainers — thanks JAGUAR MANI sir!" },
  { name: "Shalini Renuka", rating: 5, text: "Very good place to get started. Neat & clean atmosphere with knowledgeable trainers." },
  { name: "Kareem Sheriff", rating: 5, text: "Great place to get in shape. JAGUAR MANI pushes me beyond my limits and helps me achieve my goals." },
  { name: "Mohan Loganathan", rating: 5, text: "Well-equipped and newly renovated. Trainers are experienced and friendly. Good atmosphere." },
  { name: "Charan", rating: 5, text: "Fantastic place to get your sweat on! State-of-the-art equipment and knowledgeable trainers." },
  { name: "Mahesh Kumar", rating: 5, text: "Very neatly maintained. Trainers are very good and help according to need. Equipment is well maintained." },
];

function Card({ r }: { r: (typeof reviews)[number] }) {
  return (
    <div className="w-[340px] shrink-0 glass rounded-2xl p-6 mx-3">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-full bg-gradient-ember grid place-items-center font-display text-primary-foreground">
          {r.name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm">{r.name}</div>
          <div className="flex gap-0.5">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star key={i} className="size-3 fill-primary text-primary" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
    </div>
  );
}

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden mask-fade">
      <div
        className={cn(
          "flex animate-marquee shrink-0",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ ["--duration" as string]: "55s" } as React.CSSProperties}
      >
        {reviews.map((r, i) => <Card key={`a${i}`} r={r} />)}
      </div>
      <div
        className={cn("flex animate-marquee shrink-0", reverse && "[animation-direction:reverse]")}
        style={{ ["--duration" as string]: "55s" } as React.CSSProperties}
        aria-hidden
      >
        {reviews.map((r, i) => <Card key={`b${i}`} r={r} />)}
      </div>
    </div>
  );
}

export function Reviews() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-sm uppercase tracking-[0.3em] text-primary mb-3">Members say</div>
          <h2 className="font-display text-5xl md:text-6xl">Real reviews. Real results.</h2>
        </motion.div>
      </div>
      <div className="space-y-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
