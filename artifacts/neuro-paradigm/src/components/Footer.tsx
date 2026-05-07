import { Link } from "wouter";
import { Mail, Linkedin, Instagram } from "lucide-react";

const links = [
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Achievements", href: "/achievements" },
  { label: "Partners", href: "/partners" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Neuro Paradigm logo"
                className="w-7 h-7 rounded-lg object-contain"
              />
              <span className="font-display font-bold text-base">
                <span className="text-foreground">Neuro</span>
                <span className="text-primary"> Paradigm</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-assisted clinical decision support for psychiatry and neurodevelopmental care. Bridging signal science and clinical practice.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}>
                    <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Connect</h4>
            <div className="flex gap-3">
              <a
                href="mailto:neuroparadigm@gmail.com"
                data-testid="link-footer-email"
                className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="link-footer-linkedin"
                className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/neuroparadigm/"
                target="_blank"
                data-testid="link-footer-instagram"
                className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">neuroparadigm@gmail.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Neuro Paradigm. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Bridging Neuroscience &amp; Clinical Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
