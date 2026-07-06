import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = Array.from({ length: 7 }, (_, index) => ({
  src: `/images/img_${index + 1}.jpeg`,
  alt: `Neuro Paradigm gallery photo ${index + 1}`,
}));

export default function Gallery() {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  const showNextImage = () => {
    setDirection(1);
    setCurrentImage((current) => (current + 1) % images.length);
  };

  const showPreviousImage = () => {
    setDirection(-1);
    setCurrentImage((current) => (current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg aspect-[4/3] sm:aspect-video">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={images[currentImage].src}
                custom={direction}
                variants={{
                  enter: (slideDirection: number) => ({ x: slideDirection > 0 ? "100%" : "-100%", opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (slideDirection: number) => ({ x: slideDirection > 0 ? "-100%" : "100%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                src={images[currentImage].src}
                alt={images[currentImage].alt}
                className="absolute inset-0 h-full w-full object-contain bg-black/95"
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={showPreviousImage}
              aria-label="Show previous image"
              className="absolute left-3 sm:left-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 sm:p-3 text-white backdrop-blur-sm transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
            <button
              type="button"
              onClick={showNextImage}
              aria-label="Show next image"
              className="absolute right-3 sm:right-5 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-2.5 sm:p-3 text-white backdrop-blur-sm transition hover:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/45 px-3 py-2 backdrop-blur-sm">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => {
                    setDirection(index > currentImage ? 1 : -1);
                    setCurrentImage(index);
                  }}
                  aria-label={`Show image ${index + 1}`}
                  aria-current={index === currentImage ? "true" : undefined}
                  className={`h-2 rounded-full transition-all ${index === currentImage ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`}
                />
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground" aria-live="polite">
            {currentImage + 1} / {images.length}
          </p>
        </div>
      </section>
    </div>
  );
}
