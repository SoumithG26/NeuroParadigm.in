import { motion } from "framer-motion";
import { Building2, Stethoscope, GraduationCap, ArrowRight } from "lucide-react";

const partnerCategories = [
  {
    icon: Building2,
    label: "Hospitals",
    description: "Leading tertiary care hospitals integrating AI-assisted psychiatric decision support into clinical workflows.",
    color: "text-blue-500",
    border: "border-blue-500/20",
    bg: "from-blue-500/5 to-transparent",
    partners: [
      { name: "Sunrise Neuro Institute", location: "Mumbai, India" },
      { name: "Apollo Neurology Centre", location: "Hyderabad, India" },
      { name: "Fortis Brain & Spine", location: "Delhi, India" },
      { name: "Kokilaben Hospital", location: "Mumbai, India" },
    ],
  },
  {
    icon: Stethoscope,
    label: "Clinics",
    description: "Specialized psychiatric and neurodevelopmental clinics serving as primary deployment sites for early ASD and schizophrenia screening.",
    color: "text-teal-500",
    border: "border-teal-500/20",
    bg: "from-teal-500/5 to-transparent",
    partners: [
      { name: "MindBridge Clinic", location: "Bangalore, India" },
      { name: "Synapse Psychiatry", location: "Pune, India" },
      { name: "NeuroPath Child Centre", location: "Chennai, India" },
      { name: "ClearMind Institute", location: "Kolkata, India" },
    ],
  },
  {
    icon: GraduationCap,
    label: "Academic Research",
    description: "University research labs and academic institutions providing annotated clinical datasets, validation pipelines, and collaborative AI research.",
    color: "text-violet-500",
    border: "border-violet-500/20",
    bg: "from-violet-500/5 to-transparent",
    partners: [
      { name: "IIT Bombay — Healthcare AI Lab", location: "Mumbai, India" },
      { name: "AIIMS Neurology Division", location: "New Delhi, India" },
      { name: "NIMHANS Research Centre", location: "Bangalore, India" },
      { name: "BITS Pilani Bioinformatics", location: "Goa, India" },
    ],
  },
];

const marqueeItems = [
  "Sunrise Neuro Institute",
  "Apollo Neurology",
  "Fortis Brain & Spine",
  "MindBridge Clinic",
  "IIT Bombay AI Lab",
  "AIIMS Neurology",
  "NIMHANS Research",
  "NeuroPath Child Centre",
  "Synapse Psychiatry",
  "Kokilaben Hospital",
  "ClearMind Institute",
  "BITS Pilani Bioinformatics",
];

function Marquee() {
  return (
    <div className="overflow-hidden py-4 border-y border-border/40 bg-card/30" data-testid="marquee-partners">
      <div className="flex gap-10 items-center" style={{ animation: "marquee 30s linear infinite", whiteSpace: "nowrap" }}>
        {[...marqueeItems, ...marqueeItems].map((name, i) => (
          <span key={i} className="flex items-center gap-3 text-sm text-muted-foreground flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Partners() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>

      <section className="py-24 px-4 sm:px-6 lg:px-8 clinical-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Strategic Partners
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Expanding Clinical<br />
              <span className="text-primary">Reach</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Building a network of clinical and academic partnerships to validate, deploy, and scale AI-assisted psychiatric decision support across India and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      <Marquee />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Partnership Categories
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each partner plays a distinct role in the clinical validation and deployment pipeline.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {partnerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.label}
                  variants={item}
                  data-testid={`card-partner-category-${cat.label.toLowerCase()}`}
                  className={`rounded-2xl border ${cat.border} bg-gradient-to-b ${cat.bg} p-8`}
                >
                  <div className={`w-12 h-12 rounded-xl border ${cat.border} bg-background/40 flex items-center justify-center mb-6`}>
                    <Icon className={`w-6 h-6 ${cat.color}`} />
                  </div>
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${cat.color}`}>
                    {cat.label}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{cat.description}</p>
                  <ul className="space-y-3">
                    {cat.partners.map((p) => (
                      <li key={p.name} className="flex items-start gap-2" data-testid={`partner-${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
                        <ArrowRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${cat.color}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.location}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30 border-t border-border/40">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Interested in Partnering?
            </h2>
            <p className="text-muted-foreground mb-8">
              We are actively seeking clinical and academic collaborators to expand our multicenter validation network.
            </p>
            <a
              href="/contact"
              data-testid="button-partner-contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
