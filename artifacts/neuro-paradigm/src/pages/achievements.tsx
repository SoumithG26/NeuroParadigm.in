import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FlaskConical,
  FileText,
  Handshake,
  ShieldCheck,
  Users,
  Rocket,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  FileDown,
  ZoomIn,
} from "lucide-react";

// ── Attachment type ──────────────────────────────────────────────
// type: "image" → renders as a clickable thumbnail that opens in a lightbox
// type: "doc"   → renders as a styled download link (PDF, DOCX, etc.)
// src:  path relative to the public folder, e.g. "/achievements/mou-signed.jpg"
// label: display name shown below the thumbnail or beside the download icon
type Attachment = {
  type: "image" | "doc";
  src: string;
  label: string;
};

type Milestone = {
  date: string;
  icon: typeof Handshake;
  title: string;
  description: string;
  color: string;
  bg: string;
  attachments?: Attachment[];
};

// ── Milestones data ──────────────────────────────────────────────
// To add attachments, drop files in:  public/achievements/
// Then reference them here with src: "/achievements/your-file-name.ext"
const milestones: Milestone[] = [
  {
    date: "2026",
    icon: Handshake,
    title: "MoU with Total Solution Rehabilitation Society",
    description:
      "MoU signed with Total Solution Rehabilitation Society. Signed by Dr. Pooja Jha Nair, General Secretary, enabling access to annotated clinical datasets and collaborative model development.",
    color: "text-teal-500",
    bg: "bg-teal-500/10 border-teal-500/20",
    attachments: [
    ],
  },
  /*  {
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
    },*/
];

// ── Lightbox component ───────────────────────────────────────────
function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: Attachment[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/25"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-xs text-white/60 font-medium tracking-wider">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Image */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.img
          key={images[current].src}
          custom={direction}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
            center: { x: 0, opacity: 1, scale: 1 },
            exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          src={images[current].src}
          alt={images[current].label}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
        />
      </AnimatePresence>

      {/* Caption */}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 text-sm text-white/70 font-medium max-w-md text-center truncate">
        {images[current].label}
      </p>
    </motion.div>
  );
}

// ── Attachments strip ────────────────────────────────────────────
function AttachmentsStrip({
  attachments,
  color,
}: {
  attachments: Attachment[];
  color: string;
}) {
  const [lightbox, setLightbox] = useState<{ images: Attachment[]; index: number } | null>(null);

  const imageAttachments = attachments.filter((a) => a.type === "image");
  const docAttachments = attachments.filter((a) => a.type === "doc");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-4 space-y-3"
      >
        {/* Image thumbnails */}
        {imageAttachments.length > 0 && (
          <div className="flex flex-wrap gap-2.5">
            {imageAttachments.map((att, idx) => (
              <button
                key={att.src}
                onClick={() => setLightbox({ images: imageAttachments, index: idx })}
                className="group relative overflow-hidden rounded-lg border border-border/50 bg-card shadow-sm transition-all hover:shadow-md hover:border-border hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                title={att.label}
              >
                <img
                  src={att.src}
                  alt={att.label}
                  className="h-20 w-28 sm:h-24 sm:w-32 object-cover"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
                  <ZoomIn className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {/* Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                  <span className="text-[10px] sm:text-xs text-white/90 font-medium leading-tight line-clamp-1">
                    {att.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Document links */}
        {docAttachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {docAttachments.map((att) => {
              const ext = att.src.split(".").pop()?.toUpperCase() || "FILE";
              return (
                <a
                  key={att.src}
                  href={att.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all hover:shadow-md hover:border-border hover:bg-accent/50 group`}
                  title={`Open ${att.label}`}
                >
                  <FileDown className={`h-4 w-4 flex-shrink-0 ${color} transition-transform group-hover:scale-110`} />
                  <span className="truncate max-w-[180px] sm:max-w-[240px]">{att.label}</span>
                  <span className="ml-auto flex-shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground tracking-wide">
                    {ext}
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={lightbox.images}
            startIndex={lightbox.index}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────
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

                      {/* Attachments */}
                      {m.attachments && m.attachments.length > 0 && (
                        <AttachmentsStrip attachments={m.attachments} color={m.color} />
                      )}
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
