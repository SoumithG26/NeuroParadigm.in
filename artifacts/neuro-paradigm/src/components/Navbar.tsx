import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "@/lib/theme";
import { Menu, X, Moon, Sun, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = location === "/";
  const heroMode = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Gradient veil behind the bar on the dark hero — fades to nothing */}
      <AnimatePresence>
        {heroMode && (
          <motion.div
            key="hero-veil"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(4,10,24,0.85) 0%, rgba(4,10,24,0.4) 60%, transparent 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Glass panel when scrolled */}
      <motion.div
        animate={
          scrolled
            ? { backdropFilter: "blur(20px)", backgroundColor: "rgba(var(--background-rgb, 248 250 252) / 0.80)" }
            : { backdropFilter: "blur(0px)", backgroundColor: "transparent" }
        }
        transition={{ duration: 0.25 }}
        className={`relative transition-shadow duration-300 ${
          scrolled ? "border-b border-border/50 shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" data-testid="link-logo">
              <div className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    heroMode
                      ? "bg-cyan-400/15 border border-cyan-400/30 group-hover:bg-cyan-400/25"
                      : "bg-primary/10 border border-primary/20 group-hover:bg-primary/20"
                  }`}
                >
                  <Brain
                    className={`w-4 h-4 transition-colors ${
                      heroMode ? "text-cyan-400" : "text-primary"
                    }`}
                  />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">
                  <span className={heroMode ? "text-white" : "text-foreground"}>
                    Neuro
                  </span>
                  <span
                    className={
                      heroMode
                        ? "text-cyan-400"
                        : "text-cyan-500 dark:text-cyan-400"
                    }
                  >
                    {" "}Paradigm
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5" data-testid="nav-desktop">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <span
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                        isActive
                          ? heroMode
                            ? "text-cyan-300 bg-white/10"
                            : "text-primary bg-primary/10"
                          : heroMode
                          ? "text-white/70 hover:text-white hover:bg-white/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1">
              <button
                data-testid="button-theme-toggle"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  heroMode
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <button
                data-testid="button-mobile-menu"
                className={`md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                  heroMode
                    ? "text-white/60 hover:text-white hover:bg-white/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-b border-border/50 backdrop-blur-xl ${
              heroMode
                ? "bg-slate-950/90"
                : "bg-background/95"
            }`}
            data-testid="nav-mobile"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  <span
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                      location === link.href
                        ? "text-cyan-400 bg-cyan-400/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
