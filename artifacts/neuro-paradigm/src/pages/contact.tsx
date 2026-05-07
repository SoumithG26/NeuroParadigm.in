import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  institution: z.string().min(2, "Institution name is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

function GlobeGraphic() {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full opacity-60">
      <defs>
        <radialGradient id="globeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(215, 30%, 40%)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="hsl(215, 30%, 40%)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="120" fill="url(#globeGrad)" />
      <circle cx="150" cy="150" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.2" />
      {[30, 60, 90, 120].map((r, i) => (
        <ellipse key={i} cx="150" cy="150" rx={r} ry={r * 0.4} fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.15" />
      ))}
      {[0, 30, 60, 90, 120, 150].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x2 = 150 + 120 * Math.cos(rad);
        const y2 = 150 + 120 * Math.sin(rad);
        const x1 = 150 - 120 * Math.cos(rad);
        const y1 = 150 - 120 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.1" />;
      })}
      {[
        { cx: 180, cy: 110, r: 3, label: "Mumbai" },
        { cx: 240, cy: 130, r: 2.5, label: "Delhi" },
        { cx: 160, cy: 155, r: 3, label: "Bangalore" },
        { cx: 90, cy: 100, r: 2, label: "London" },
        { cx: 60, cy: 120, r: 2, label: "Boston" },
        { cx: 200, cy: 180, r: 2, label: "Chennai" },
      ].map((node) => (
        <g key={node.label}>
          <circle cx={node.cx} cy={node.cy} r={node.r} fill="currentColor" fillOpacity="0.6" />
          <circle cx={node.cx} cy={node.cy} r={node.r + 3} fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
        </g>
      ))}
      {[
        [180, 110, 90, 100],
        [180, 110, 240, 130],
        [180, 110, 160, 155],
        [160, 155, 200, 180],
        [90, 100, 60, 120],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="3,4" />
      ))}
    </svg>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", institution: "", message: "" },
  });

  function onSubmit(_values: FormValues) {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
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
                  { icon: Mail, label: "Email", value: "neuroparadigm@gmail.com" },
                  { icon: MapPin, label: "Location", value: "Uppal, Hyderabad, India" },
                  // { icon: Phone, label: "Phone", value: "+91 98765 43210" },
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

              <div className="w-full aspect-square max-w-sm mx-auto lg:mx-0 text-primary/40">
                <GlobeGraphic />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center gap-6 p-12 rounded-2xl border border-border/50 bg-card"
                data-testid="contact-success"
              >
                <CheckCircle2 className="w-16 h-16 text-primary" />
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">Message Sent</h3>
                  <p className="text-muted-foreground">
                    Thank you for reaching out. We'll get back to you within 1-2 business days.
                  </p>
                </div>
                <button
                  data-testid="button-send-another"
                  onClick={() => { setSubmitted(false); form.reset(); }}
                  className="px-4 py-2 rounded-lg text-sm text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
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
                              <Input data-testid="input-email" type="email" placeholder="jane@hospital.org" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="institution"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input data-testid="input-institution" placeholder="Apollo Neurology Centre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              data-testid="input-message"
                              placeholder="Tell us about your clinical setting, research interests, or partnership inquiry..."
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
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition-opacity"
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </Form>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
