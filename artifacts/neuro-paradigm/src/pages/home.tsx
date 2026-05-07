import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Activity, Scan, Brain, Eye, Zap } from "lucide-react";
import { Link } from "wouter";

const signals = [
  {
    id: "motion",
    icon: Activity,
    label: "Motion",
    title: "Behavioral Signal Analysis",
    focus: "ASD Focus",
    description:
      "Computer vision-driven pose estimation captures body kinematics, gait irregularities, and repetitive motion patterns. Quantified behavioral biomarkers enable early ASD screening and longitudinal tracking without observer bias.",
    tags: ["Pose Estimation", "Kinematic Profiling", "Behavioral Markers"],
    color: "from-sky-500 to-blue-600",
    border: "border-sky-500/30",
    glow: "shadow-sky-500/20",
  },
  {
    id: "mri",
    icon: Scan,
    label: "MRI",
    title: "Biological / Structural Analysis",
    focus: "Neuroimaging",
    description:
      "Advanced neuroimaging pipelines extract cortical thickness profiles, volumetric biomarkers, and white matter tractography. Structural and functional MRI data drive AI models validated on annotated clinical cohorts.",
    tags: ["Cortical Thickness", "Tractography", "Volumetric Biomarkers"],
    color: "from-violet-500 to-purple-600",
    border: "border-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  {
    id: "speech",
    icon: Brain,
    label: "Speech",
    title: "Cognitive & Thought Pattern Analysis",
    focus: "Schizophrenia Focus",
    description:
      "Prosodic analysis, semantic coherence scoring, and speech rate profiling construct a cognitive speech fingerprint. Disorganized thought patterns and language markers are extracted with NLP pipelines calibrated for psychiatric use.",
    tags: ["Prosody Analysis", "Semantic Coherence", "NLP Profiling"],
    color: "from-teal-500 to-emerald-600",
    border: "border-teal-500/30",
    glow: "shadow-teal-500/20",
  },
  {
    id: "eyetracking",
    icon: Eye,
    label: "Eye-Tracking",
    title: "Early-Stage Cognitive Markers",
    focus: "Cognitive Screening",
    description:
      "Saccadic velocity, fixation duration, and visual attention mapping reveal subtle cognitive anomalies invisible to clinical observation. Early-stage biomarkers derived from eye-tracking correlate with neurodevelopmental trajectories.",
    tags: ["Saccadic Velocity", "Fixation Mapping", "Attention Profiling"],
    color: "from-amber-500 to-orange-600",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
  },
  {
    id: "eeg",
    icon: Zap,
    label: "EEG",
    title: "Neural Oscillation Profiling",
    focus: "Electrophysiology",
    description:
      "Alpha/beta band synchrony, P300 event-related potentials, and functional connectivity metrics quantify real-time neural dynamics. EEG signals are artifact-rejected and processed through validated psychiatric biomarker pipelines.",
    tags: ["P300 Response", "Band Synchrony", "Connectivity Metrics"],
    color: "from-cyan-500 to-blue-500",
    border: "border-cyan-500/30",
    glow: "shadow-cyan-500/20",
  },
];

const stats = [
  { value: "1 in 36", label: "children diagnosed with ASD", sublabel: "CDC 2023 Surveillance Report" },
  { value: "~24M", label: "people affected by Schizophrenia worldwide", sublabel: "WHO Global Mental Health Report" },
  { value: "$1T+", label: "annual global economic loss", sublabel: "from neurological & psychiatric disorders" },
];

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const NODE_COUNT = 40;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      resize();
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 2 + 1,
        });
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.18;
            ctx.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = Math.sin(t * 2 + n.x * 0.01) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${0.5 * pulse})`;
        ctx.fill();
      }

      const signalY = canvas.height * 0.75;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.25)";
      ctx.lineWidth = 1.5;
      for (let x = 0; x < canvas.width; x += 2) {
        const y = signalY +
          Math.sin((x * 0.03) + t * 2) * 18 +
          Math.sin((x * 0.07) + t * 3.5) * 10 +
          Math.sin((x * 0.015) + t) * 28;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: "none" }}
    />
  );
}

function AnimatedStat({ value, label, sublabel }: typeof stats[0]) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center group"
      data-testid={`stat-${value.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="text-4xl sm:text-5xl font-display font-black text-primary mb-2 group-hover:scale-105 transition-transform">
        {value}
      </div>
      <p className="text-sm sm:text-base text-foreground font-medium mb-1">{label}</p>
      <p className="text-xs text-muted-foreground">{sublabel}</p>
    </motion.div>
  );
}

export default function Home() {
  const [activeSignal, setActiveSignal] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => setActiveSignal((v) => (v + 1) % signals.length), 4000);
    return () => clearInterval(id);
  }, [autoPlay]);

  function prev() {
    setAutoPlay(false);
    setActiveSignal((v) => (v - 1 + signals.length) % signals.length);
  }

  function next() {
    setAutoPlay(false);
    setActiveSignal((v) => (v + 1) % signals.length);
  }

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubscribed(true);
  }

  const signal = signals[activeSignal];
  const SignalIcon = signal.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <NeuralBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Healthcare AI — Psychiatry &amp; Neurodevelopmental Care
            </span>

            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.95] tracking-tight mb-8">
              <span className="block">Neuro</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400">
                Paradigm
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300/80 max-w-2xl mx-auto leading-relaxed mb-10">
              AI-assisted clinical decision support for psychiatry and neurodevelopmental care. Structured signal layers — Behavioral, Biological, and Cognitive — to augment specialist-led evaluation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/about" data-testid="button-hero-learn">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 text-sm font-bold cursor-pointer hover:bg-cyan-400 transition-colors"
                >
                  Explore the Platform
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/contact" data-testid="button-hero-contact">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-semibold cursor-pointer hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  Partner With Us
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-400/50">
          <span className="text-xs tracking-widest uppercase font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-slate-400/40 to-transparent"
          />
        </div>
      </section>

      {/* SIGNAL SLIDER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden" data-testid="section-signals">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              Multi-Signal Fusion
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Five Clinical Signal Layers
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {signals.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  data-testid={`tab-signal-${s.id}`}
                  onClick={() => { setAutoPlay(false); setActiveSignal(i); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    activeSignal === i
                      ? `bg-gradient-to-r ${s.color} text-white border-transparent shadow-lg ${s.glow}`
                      : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSignal}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`rounded-2xl border ${signal.border} bg-gradient-to-br from-card to-background p-8 sm:p-12 shadow-xl ${signal.glow}`}
                data-testid={`slide-signal-${signal.id}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="space-y-6">
                    <div>
                      <span className={`inline-block px-2 py-0.5 text-xs font-semibold tracking-widest uppercase rounded-md bg-gradient-to-r ${signal.color} text-white mb-4`}>
                        {signal.focus}
                      </span>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${signal.color} flex items-center justify-center`}>
                          <SignalIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{signal.label}</p>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">{signal.title}</h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{signal.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {signal.tags.map((tag) => (
                        <span key={tag} className={`px-2.5 py-1 rounded-md text-xs font-medium border ${signal.border} text-foreground/70`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className={`w-64 h-64 rounded-2xl border ${signal.border} bg-card/50 flex items-center justify-center relative overflow-hidden`}>
                      <div className={`absolute inset-0 opacity-5 bg-gradient-to-br ${signal.color}`} />
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <SignalIcon className={`w-24 h-24 bg-gradient-to-br ${signal.color} bg-clip-text`} style={{ opacity: 0.4 }} />
                      </motion.div>
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 256 256">
                        {[40, 70, 100].map((r, i) => (
                          <motion.circle
                            key={i}
                            cx="128" cy="128" r={r}
                            fill="none"
                            strokeWidth="0.5"
                            stroke="currentColor"
                            strokeOpacity={0.15 - i * 0.04}
                            strokeDasharray="4 6"
                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                            transition={{ duration: 12 + i * 4, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "128px 128px" }}
                          />
                        ))}
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-6">
              <button
                data-testid="button-signal-prev"
                onClick={prev}
                className="w-10 h-10 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                {signals.map((_, i) => (
                  <button
                    key={i}
                    data-testid={`dot-signal-${i}`}
                    onClick={() => { setAutoPlay(false); setActiveSignal(i); }}
                    className={`rounded-full transition-all ${activeSignal === i ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-primary/50"}`}
                  />
                ))}
              </div>
              <button
                data-testid="button-signal-next"
                onClick={next}
                className="w-10 h-10 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-card/40 border-y border-border/40" data-testid="section-impact">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-4">
              The Challenge
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              The Scale of the Problem
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Neuropsychiatric disorders represent one of the largest unmet clinical challenges globally. The tools haven't kept pace with the burden.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {stats.map((stat) => (
              <AnimatedStat key={stat.value} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" data-testid="section-newsletter">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Stay Updated
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Follow Our Research
            </h2>
            <p className="text-muted-foreground mb-10">
              Get updates on clinical publications, platform milestones, and partnership announcements. No marketing noise — only signal.
            </p>

            <AnimatePresence mode="wait">
              {subscribed ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-6 py-4 rounded-xl border border-primary/30 bg-primary/5 text-primary font-medium"
                  data-testid="newsletter-success"
                >
                  You're subscribed. We'll be in touch.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubscribe}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                  data-testid="form-newsletter"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@institution.edu"
                    required
                    data-testid="input-newsletter-email"
                    className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition"
                  />
                  <button
                    type="submit"
                    data-testid="button-newsletter-subscribe"
                    className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
