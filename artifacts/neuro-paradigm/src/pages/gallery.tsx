import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Category = "platform" | "behavioral" | "mri" | "spectrogram";

const categories: { id: Category; label: string }[] = [
  { id: "platform", label: "Platform UI" },
  { id: "behavioral", label: "Behavioral Observation" },
  { id: "mri", label: "MRI Analysis" },
  { id: "spectrogram", label: "Audio Spectrograms" },
];

function PlatformCard({ index }: { index: number }) {
  const labels = [
    "Signal Dashboard",
    "Patient Timeline",
    "Fusion Report",
    "Biomarker Grid",
    "Pose Analysis View",
    "Clinical Export",
  ];
  const colors = [
    "from-slate-800 to-blue-900",
    "from-blue-900 to-slate-900",
    "from-slate-900 to-indigo-900",
    "from-indigo-900 to-slate-800",
    "from-slate-800 to-sky-900",
    "from-sky-900 to-slate-900",
  ];
  return (
    <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${colors[index % colors.length]} aspect-video relative border border-white/5`} data-testid={`gallery-platform-${index}`}>
      <div className="absolute inset-0 p-4 flex flex-col gap-2">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
          <div className="w-2 h-2 rounded-full bg-green-400/60" />
        </div>
        <div className="flex gap-2 mt-1">
          <div className="w-24 h-3 rounded bg-white/10" />
          <div className="w-16 h-3 rounded bg-white/5" />
          <div className="w-20 h-3 rounded bg-white/5" />
        </div>
        <div className="flex-1 grid grid-cols-3 gap-2 mt-2">
          <div className="col-span-2 space-y-1.5">
            <div className="h-1.5 rounded bg-cyan-400/30 w-full" />
            <div className="h-1.5 rounded bg-blue-400/20 w-3/4" />
            <div className="h-1.5 rounded bg-violet-400/25 w-5/6" />
            <div className="h-16 rounded bg-white/5 mt-2 p-2">
              {[0.3, 0.7, 0.5, 0.9, 0.4, 0.6, 0.8, 0.3, 0.5].map((h, i) => (
                <div key={i} className="inline-block mx-0.5 rounded-sm bg-cyan-400/50" style={{ width: 4, height: `${h * 48}px`, verticalAlign: "bottom" }} />
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            {[70, 45, 85, 60].map((w, i) => (
              <div key={i} className="h-2 rounded" style={{ width: `${w}%`, background: "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
        </div>
        <div className="text-xs text-white/30 font-mono mt-1">{labels[index % labels.length]}</div>
      </div>
    </div>
  );
}

function BehavioralCard({ index }: { index: number }) {
  const joints = [
    { x: 50, y: 15 }, { x: 50, y: 28 },
    { x: 38, y: 24 }, { x: 30, y: 34 }, { x: 24, y: 44 },
    { x: 62, y: 24 }, { x: 70, y: 34 }, { x: 76, y: 44 },
    { x: 44, y: 38 }, { x: 56, y: 38 },
    { x: 40, y: 52 }, { x: 36, y: 64 }, { x: 32, y: 76 },
    { x: 60, y: 52 }, { x: 64, y: 64 }, { x: 68, y: 76 },
  ];
  const bones = [
    [0,1],[1,2],[2,3],[3,4],[1,5],[5,6],[6,7],[1,8],[8,9],[8,10],[10,11],[11,12],[9,13],[13,14],[14,15]
  ];
  const offsets = [0, 3, -3, 2, -2, 4, -4, 1];
  const off = offsets[index % offsets.length];

  const palettes = [
    { stroke: "#22d3ee", dot: "#06b6d4", bg: "from-slate-950 to-slate-900" },
    { stroke: "#818cf8", dot: "#6366f1", bg: "from-indigo-950 to-slate-900" },
    { stroke: "#34d399", dot: "#10b981", bg: "from-emerald-950 to-slate-900" },
    { stroke: "#f472b6", dot: "#ec4899", bg: "from-pink-950 to-slate-900" },
    { stroke: "#fb923c", dot: "#f97316", bg: "from-orange-950 to-slate-900" },
    { stroke: "#a78bfa", dot: "#7c3aed", bg: "from-violet-950 to-slate-900" },
  ];
  const pal = palettes[index % palettes.length];

  return (
    <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${pal.bg} aspect-video relative border border-white/5`} data-testid={`gallery-behavioral-${index}`}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, ${pal.stroke}20 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }} />
      </div>
      <svg viewBox="0 0 100 90" className="absolute inset-0 w-full h-full p-4">
        {bones.map(([a, b], i) => (
          <line
            key={i}
            x1={joints[a].x + off}
            y1={joints[a].y}
            x2={joints[b].x + off}
            y2={joints[b].y}
            stroke={pal.stroke}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
        ))}
        {joints.map((j, i) => (
          <circle key={i} cx={j.x + off} cy={j.y} r="2" fill={pal.dot} fillOpacity="0.9" />
        ))}
        <circle cx={joints[0].x + off} cy={joints[0].y} r="4" fill="none" stroke={pal.stroke} strokeWidth="1" strokeOpacity="0.5" />
        <text x="4" y="85" fill={pal.stroke} fontSize="4" fontFamily="monospace" fillOpacity="0.5">
          POSE_CONF: {(0.87 + index * 0.01).toFixed(2)}
        </text>
      </svg>
    </div>
  );
}

function MRICard({ index }: { index: number }) {
  const palettes = [
    { outer: "#1e3a5f", mid: "#2563eb", inner: "#60a5fa", glow: "#3b82f6" },
    { outer: "#1a1a4e", mid: "#4f46e5", inner: "#818cf8", glow: "#6366f1" },
    { outer: "#0f2d2d", mid: "#0d9488", inner: "#2dd4bf", glow: "#14b8a6" },
    { outer: "#2d1a4e", mid: "#7c3aed", inner: "#a78bfa", glow: "#8b5cf6" },
    { outer: "#1a3320", mid: "#15803d", inner: "#4ade80", glow: "#22c55e" },
    { outer: "#2d2020", mid: "#b91c1c", inner: "#f87171", glow: "#ef4444" },
  ];
  const pal = palettes[index % palettes.length];

  return (
    <div className="rounded-xl overflow-hidden bg-black aspect-video relative border border-white/5" data-testid={`gallery-mri-${index}`}>
      <svg viewBox="0 0 160 90" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id={`brain-${index}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={pal.inner} stopOpacity="0.9" />
            <stop offset="40%" stopColor={pal.mid} stopOpacity="0.7" />
            <stop offset="70%" stopColor={pal.outer} stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id={`glow-${index}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <ellipse cx="80" cy="45" rx="50" ry="35" fill={`url(#brain-${index})`} />
        <ellipse cx="80" cy="45" rx="50" ry="35" fill="none" stroke={pal.glow} strokeWidth="0.5" strokeOpacity="0.4" />
        <path d="M 30 45 Q 50 20 80 22 Q 110 20 130 45" fill="none" stroke={pal.mid} strokeWidth="0.8" strokeOpacity="0.6" />
        <path d="M 35 50 Q 55 30 80 32 Q 105 30 125 50" fill="none" stroke={pal.inner} strokeWidth="0.5" strokeOpacity="0.4" />
        <path d="M 55 25 Q 65 15 80 14 Q 95 15 105 25" fill="none" stroke={pal.mid} strokeWidth="0.6" strokeOpacity="0.5" />
        <line x1="80" y1="14" x2="80" y2="76" stroke={pal.glow} strokeWidth="0.4" strokeDasharray="2,3" strokeOpacity="0.3" />
        <text x="4" y="8" fill={pal.inner} fontSize="4" fontFamily="monospace" fillOpacity="0.6">T1w MPRAGE</text>
        <text x="4" y="85" fill={pal.inner} fontSize="3.5" fontFamily="monospace" fillOpacity="0.5">
          VOL: {(1.24 + index * 0.03).toFixed(2)}L / THK: {(2.8 + index * 0.1).toFixed(1)}mm
        </text>
      </svg>
    </div>
  );
}

function SpectrogramCard({ index }: { index: number }) {
  const palettes = [
    { bg: "from-slate-950 to-blue-950", bar: "#22d3ee", accent: "#0ea5e9" },
    { bg: "from-slate-950 to-violet-950", bar: "#a78bfa", accent: "#7c3aed" },
    { bg: "from-slate-950 to-teal-950", bar: "#34d399", accent: "#059669" },
    { bg: "from-slate-950 to-pink-950", bar: "#f472b6", accent: "#db2777" },
    { bg: "from-slate-950 to-orange-950", bar: "#fb923c", accent: "#ea580c" },
    { bg: "from-slate-950 to-emerald-950", bar: "#4ade80", accent: "#16a34a" },
  ];
  const pal = palettes[index % palettes.length];
  const seed = index * 17;
  const bars = Array.from({ length: 40 }, (_, i) => {
    const v = Math.sin((i + seed) * 0.8) * 0.4 + Math.sin((i + seed) * 0.3) * 0.3 + Math.random() * 0.3 + 0.1;
    return Math.max(0.05, Math.min(1, v));
  });

  return (
    <div className={`rounded-xl overflow-hidden bg-gradient-to-br ${pal.bg} aspect-video relative border border-white/5`} data-testid={`gallery-spectrogram-${index}`}>
      <div className="absolute inset-0 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/30 text-xs font-mono">AUDIO_STREAM_{(index + 1).toString().padStart(3, "0")}</span>
        </div>
        <div className="flex-1 flex items-end gap-0.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm opacity-80"
              style={{ height: `${h * 100}%`, background: `linear-gradient(to top, ${pal.accent}, ${pal.bar})` }}
            />
          ))}
        </div>
        <div className="flex justify-between text-white/20 text-xs font-mono">
          <span>0Hz</span><span>500Hz</span><span>1kHz</span><span>4kHz</span>
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex gap-4 text-xs font-mono text-white/30">
          <span>PITCH_VAR: {(0.42 + index * 0.08).toFixed(2)}</span>
          <span>COHERENCE: {(0.71 + index * 0.04).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

const CARDS_PER_CATEGORY: Record<Category, number> = {
  platform: 6,
  behavioral: 6,
  mri: 6,
  spectrogram: 6,
};

export default function Gallery() {
  const [active, setActive] = useState<Category>("platform");

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 clinical-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Gallery
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Platform in<br />
              <span className="text-primary">Signal Space</span>
            </h1>
            <p className="text-muted-foreground">
              Visual outputs from each clinical signal modality integrated within the Neuro Paradigm platform.
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {Array.from({ length: CARDS_PER_CATEGORY[active] }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group hover:scale-[1.01] transition-transform"
                >
                  {active === "platform" && <PlatformCard index={i} />}
                  {active === "behavioral" && <BehavioralCard index={i} />}
                  {active === "mri" && <MRICard index={i} />}
                  {active === "spectrogram" && <SpectrogramCard index={i} />}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
