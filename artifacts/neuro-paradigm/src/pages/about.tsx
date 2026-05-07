import { motion } from "framer-motion";
import { Activity, Scan, Brain, Quote } from "lucide-react";

const pillars = [
  {
    icon: Activity,
    label: "Behavioral",
    subtitle: "Motion & Pose Signal Layer",
    description:
      "Computer vision-driven pose estimation captures kinematic patterns, gait irregularities, and micro-behavioral signals. These quantified behavioral biomarkers enable early detection and longitudinal tracking in ASD and related conditions.",
    color: "from-blue-500/10 to-sky-500/5",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: Scan,
    label: "Biological",
    subtitle: "Structural & Functional MRI Layer",
    description:
      "Advanced neuroimaging pipelines extract volumetric biomarkers, cortical thickness profiles, and white matter tractography. Structural and functional MRI data are processed through AI models trained on clinically annotated datasets.",
    color: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    icon: Brain,
    label: "Cognitive",
    subtitle: "Speech, EEG & Eye-Tracking Layer",
    description:
      "Cognitive signals—prosodic analysis, semantic coherence scoring, P300 event-related potentials, and saccadic eye movement profiling—are fused to construct a multi-dimensional cognitive signature for each patient.",
    color: "from-cyan-500/10 to-teal-500/5",
    border: "border-cyan-500/20",
    iconColor: "text-cyan-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden clinical-gradient-bg">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Our Mission
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight">
              Instrumented Intelligence<br />
              <span className="text-primary">for Psychiatry</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <Quote className="absolute -top-4 -left-4 w-8 h-8 text-primary/20" />
            <blockquote className="text-lg sm:text-xl text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-6 text-left">
              "Psychiatry remains one of the least instrumented domains in modern medicine. We are introducing structured signal layers—Behavioral, Biological, and Cognitive—to augment, not replace, specialist-led evaluation."
            </blockquote>
          </motion.div>
        </div>
      </section>

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
              Three Signal Layers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A multi-modal AI platform that fuses structured clinical signals across three complementary dimensions of neuropsychiatric evaluation.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  variants={item}
                  data-testid={`card-pillar-${pillar.label.toLowerCase()}`}
                  className={`relative rounded-2xl border ${pillar.border} bg-gradient-to-br ${pillar.color} p-8 group hover:shadow-lg transition-shadow`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-background/60 border ${pillar.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${pillar.iconColor}`} />
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className={`text-xs font-semibold tracking-widest uppercase ${pillar.iconColor}`}>
                      {pillar.label}
                    </p>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {pillar.subtitle}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Our Philosophy
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              {
                title: "Augment, Not Replace",
                desc: "Our platform serves as a decision-support layer. Clinical specialists remain at the center of every diagnosis and treatment pathway. AI provides structured evidence; clinicians provide judgment.",
              },
              {
                title: "Evidence-First",
                desc: "Every signal modality integrated into our platform is grounded in peer-reviewed research. We do not deploy models without rigorous clinical validation and IRB-approved studies.",
              },
              {
                title: "Signal Transparency",
                desc: "We generate explainable signal reports—not black-box scores. Clinicians see exactly which signals contributed to a recommendation and why.",
              },
              {
                title: "Longitudinal Tracking",
                desc: "Neuropsychiatric care is not episodic. Our platform tracks patient signal profiles over time, enabling clinicians to detect subtle changes invisible to unaided clinical observation.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`card-philosophy-${i}`}
                className="p-6 rounded-xl border border-border/50 bg-background hover:border-primary/30 transition-colors"
              >
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
