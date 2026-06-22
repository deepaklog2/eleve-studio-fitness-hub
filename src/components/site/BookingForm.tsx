import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Calendar, Loader2 } from "lucide-react";

const CLASSES = ["Trial Session", "Gym / Strength", "Cardio", "Crossfit", "Zumba", "Personal Training"] as const;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(5).max(30),
  class_type: z.string().min(1).max(50),
  preferred_date: z.string().min(1),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", class_type: "Trial Session", preferred_date: "", notes: "",
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from("bookings").insert({
      user_id: user?.id ?? null,
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      class_type: parsed.data.class_type,
      preferred_date: parsed.data.preferred_date,
      notes: parsed.data.notes || null,
    });
    setLoading(false);
    if (error) {
      toast.error("Booking failed. Try again or WhatsApp us.");
      return;
    }
    toast.success("Booked! We'll confirm your slot shortly.");
    setForm({ name: "", email: "", phone: "", class_type: "Trial Session", preferred_date: "", notes: "" });
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-3xl p-7 md:p-9 space-y-4"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
        <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
        <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
        <div>
          <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Class</label>
          <select
            value={form.class_type}
            onChange={(e) => setForm({ ...form, class_type: e.target.value })}
            className="w-full rounded-xl bg-input/60 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
          >
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <Field label="Preferred date" type="date" min={today} value={form.preferred_date} onChange={(v) => setForm({ ...form, preferred_date: v })} required />
      <div>
        <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">Notes (optional)</label>
        <textarea
          rows={3}
          maxLength={500}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full rounded-xl bg-input/60 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
        />
      </div>
      <button
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-ember text-primary-foreground py-3.5 text-sm uppercase tracking-widest font-semibold shadow-ember disabled:opacity-60"
      >
        {loading ? <Loader2 className="size-4 animate-spin" /> : <Calendar className="size-4" />}
        Confirm booking
      </button>
    </motion.form>
  );
}

function Field(props: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean; min?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{props.label}</label>
      <input
        type={props.type || "text"}
        required={props.required}
        min={props.min}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-xl bg-input/60 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
      />
    </div>
  );
}
