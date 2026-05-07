import { motion } from "framer-motion";
import { CheckCircle2, FlaskConical, FileText, Handshake, ShieldCheck, Users, Rocket } from "lucide-react";

const milestones = [
  {
    date: "Q1 2023",
    icon: Rocket,
    title: "Research Inception",
    description:
      "Foundational research initiated at the intersection of clinical neuroscience and machine learning. Core signal processing pipeline scoped across behavioral, biological, and cognitive domains.",
    color: "text-sky-500",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    date: "Q3 2023",
    icon: FlaskConical,
    title: "Prototype: Multi-Signal Fusion Pipeline",
    description:
      "First working prototype developed, integrating pose estimation, EEG artifact rejection, and speech prosody analysis into a unified signal fusion framework. Internal testing demonstrated cross-modal correlations.",
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    date: "Q4 2023",
    icon: ShieldCheck,
    title: "IRB Approval — Pilot Study",
    description:
      "Institutional Review Board approval granted for a prospective pilot study at a partner psychiatric facility. Study protocol covers ASD screening and schizophrenia cognitive profiling.",
    color: "text-violet-500",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    date: "Q1 2024",
    icon: Handshake,
    title: "MoU — Academic Institution",
    description:
      "Memorandum of Understanding signed with a leading neuroscience research institute. Partnership enables access to annotated clinical datasets and collaborative model development.",
    color: "text-teal-500",
    bg: "bg-teal-500/10 border-teal-500/20",
  },
  {
    date: "Q2 2024",
    icon: FileText,
    title: "First Clinical Pilot Deployment",
    description:
      "Platform deployed in a real clinical setting for the first time. Fifty patients enrolled across two diagnostic categories. Clinician feedback integrated into report generation and UI workflows.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    date: "Q3 2024",
    icon: FileText,
    title: "Research Publication — Neural Biomarkers",
    description:
      "Peer-reviewed paper submitted on multi-modal neural biomarker extraction in paediatric ASD. Results indicate statistically significant differentiation from neurotypical cohorts across all three signal layers.",
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    date: "Q4 2024",
    icon: Users,
    title: "Team Expansion & Seed Funding",
    description:
      "Core team expanded to include clinical psychologists, neuroimaging specialists, and ML engineers. Seed funding secured to accelerate multicenter study enrollment and platform development.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
  {
    date: "2025 →",
    icon: CheckCircle2,
    title: "Multicenter Study & Regulatory Pathway",
    description:
      "Scaling clinical validation across multiple hospital systems. Engaging with regulatory consultants to define a pathway toward CE/FDA clearance for AI-assisted psychiatric decision support.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
];

export default function Achievements() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 clinical-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Milestones
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              From Signal to<br />
              <span className="text-primary">Clinical Reality</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A documented record of our progress from research inception to active clinical deployment.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border/60 sm:left-8" />

            <div className="space-y-10">
              {milestones.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: i * 0.05, ease: "easeOut" }}
                    data-testid={`milestone-${i}`}
                    className="relative flex gap-6 sm:gap-8"
                  >
                    <div className="relative flex-shrink-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 ${m.bg} flex items-center justify-center z-10 relative`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${m.color}`} />
                      </div>
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-xs font-semibold tracking-widest uppercase ${m.color}`}>
                          {m.date}
                        </span>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">
                        {m.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
