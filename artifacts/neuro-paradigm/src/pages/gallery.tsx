import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "all" | "events" | "team" | "research";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All Photos" },
  { id: "events", label: "Events & Workshops" },
  { id: "team", label: "Behind the Scenes" },
  { id: "research", label: "Research & Labs" },
];



export default function Gallery() {
  const [active, setActive] = useState<Category>("all");

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 clinical-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Gallery
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Inside<br />
              <span className="text-primary">Neuro Paradigm</span>
            </h1>
            <p className="text-muted-foreground">
              A glimpse into our team, events, and the real-world impact of our research.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                data-testid={`tab-gallery-${cat.id}`}
                onClick={() => setActive(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  active === cat.id
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center min-h-[300px] border border-dashed border-border/50 rounded-2xl bg-card/30"
            >
              <p className="text-xl font-medium text-muted-foreground">Coming Soon</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
