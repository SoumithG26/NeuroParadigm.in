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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                href="mailto:admin@neuroparadigm.in"
                data-testid="link-footer-email"
                className="w-8 h-8 rounded-md bg-accent flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/neuroparadigmpvtltd/"
                target="_blank"
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
            <p className="text-xs text-muted-foreground">admin@neuroparadigm.in</p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-widest">Address</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Teleparadigm Towers,<br />
              SY No 32/A & 32/E2,<br />
              Near NGIT College,<br />
              Uppal, Hyderabad,<br />
              Telangana – 500088
            </p>
            <div
              className="overflow-hidden border border-border/50"
              style={{ borderRadius: "8px" }}
            >
              <iframe
                title="Neuro Paradigm Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.2!2d78.6214986!3d17.3941203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9fcca00e1c7f%3A0xf4e90cf1634579fa!2sTeleparadigm%20Towers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/fimKfCuwB3XYnK8F7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Open in Google Maps ↗
            </a>
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
