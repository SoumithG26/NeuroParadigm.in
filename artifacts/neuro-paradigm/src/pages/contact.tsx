import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Mail, MapPin, ChevronDown } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AFFILIATION_OPTIONS = [
  "University",
  "Hospital / Clinic",
  "Company",
  "NGO / Non-Profit",
  "Independent Researcher",
  "Student",
  "Other",
] as const;

const NEURO_EMAIL = "admin@neuroparadigm.in";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  affiliation: z.string().min(1, "Please select your affiliation"),
  affiliationOther: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
}).refine(
  (data) => data.affiliation !== "Other" || (data.affiliationOther && data.affiliationOther.trim().length >= 2),
  { message: "Please specify your affiliation", path: ["affiliationOther"] }
);

type FormValues = z.infer<typeof schema>;

export default function Contact() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", affiliation: "", affiliationOther: "", message: "" },
  });

  const selectedAffiliation = form.watch("affiliation");

  function onSubmit(values: FormValues) {
    const affLabel = values.affiliation === "Other"
      ? values.affiliationOther || "Other"
      : values.affiliation;

    const subject = encodeURIComponent(
      `Inquiry from ${values.name} — Neuro Paradigm`
    );

    const body = encodeURIComponent(
      `Hi Neuro Paradigm,\n\n` +
      `I'd like to reach out regarding the following:\n\n` +
      `────────────────────────\n` +
      `Name: ${values.name}\n` +
      `Email: ${values.email}\n` +
      `Affiliation: ${affLabel}\n` +
      `────────────────────────\n\n` +
      `Message:\n${values.message}\n\n` +
      `────────────────────────\n` +
      `Looking forward to hearing from you.\n\n` +
      `Best regards,\n${values.name}`
    );

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${NEURO_EMAIL}&su=${subject}&body=${body}`,
      "_blank"
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <section className="py-24 px-4 sm:px-6 lg:px-8 clinical-gradient-bg">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full mb-6">
              Contact
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Let's Build<br />
              <span className="text-primary">Clinical Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Research collaborations, clinical partnerships, or general inquiries — we'd love to connect.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-8">
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: NEURO_EMAIL },
                  { icon: MapPin, label: "Location", value: "Teleparadigm Towers, SY No 32/A & 32/E2, Near NGIT College, Uppal, Hyderabad, Telangana – 500088" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4" data-testid={`contact-info-${label.toLowerCase()}`}>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                      <p className="text-sm text-foreground font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div
                  className="overflow-hidden border border-border/50"
                  style={{ borderRadius: "8px" }}
                >
                  <iframe
                    title="Neuro Paradigm Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1903.2!2d78.6214986!3d17.3941203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9fcca00e1c7f%3A0xf4e90cf1634579fa!2sTeleparadigm%20Towers!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="250"
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="p-8 rounded-2xl border border-border/50 bg-card">
              <h2 className="font-display text-xl font-bold text-foreground mb-6">Send a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input data-testid="input-name" placeholder="Dr. Jane Smith" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input data-testid="input-email" type="email" placeholder="jane@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Affiliation dropdown */}
                  <FormField
                    control={form.control}
                    name="affiliation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affiliation</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <select
                              data-testid="select-affiliation"
                              {...field}
                              className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-10 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                            >
                              <option value="" disabled>Select your affiliation</option>
                              {AFFILIATION_OPTIONS.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* "Other" custom input — shown only when "Other" is selected */}
                  {selectedAffiliation === "Other" && (
                    <FormField
                      control={form.control}
                      name="affiliationOther"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please specify</FormLabel>
                          <FormControl>
                            <Input
                              data-testid="input-affiliation-other"
                              placeholder="e.g., Freelance Consultant, Government Body..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            data-testid="input-message"
                            placeholder="Tell us about your research interests, partnership inquiry, or anything else..."
                            className="min-h-[140px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <button
                    type="submit"
                    data-testid="button-submit-contact"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                    Send via Gmail
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Clicking "Send via Gmail" will open Gmail with your message pre-filled.
                  </p>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
