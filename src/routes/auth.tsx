import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { Loader2, Mail, Lock, User } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or Join — Eleve Studio" },
      { name: "description", content: "Create your Eleve Studio account or sign in to manage your membership and bookings." },
    ],
  }),
  component: AuthPage,
});

const signInSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be 6+ characters").max(128),
});
const signUpSchema = signInSchema.extend({
  full_name: z.string().trim().min(1, "Name required").max(100),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    const schema = mode === "in" ? signInSchema : signUpSchema;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back!");
      navigate({ to: "/dashboard" });
    } else {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { full_name: (parsed.data as z.infer<typeof signUpSchema>).full_name },
        },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created! Welcome to Eleve.");
      navigate({ to: "/dashboard" });
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) {
      setLoading(false);
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/dashboard" });
  }

  return (
    <section className="min-h-screen pt-28 pb-16 grid lg:grid-cols-2">
      {/* Hero side */}
      <div className="relative hidden lg:flex items-center p-12 overflow-hidden">
        <img src="/gym-1.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 to-background/90" />
        <div className="relative max-w-md">
          <img src="/logo.png" alt="" className="size-16 rounded-xl mb-6 ring-1 ring-primary/40" />
          <h2 className="font-display text-5xl leading-tight">
            Train. Track. <span className="text-gradient-ember">Transform.</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Your member dashboard puts your plan, bookings, and progress in one place.
          </p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass rounded-3xl p-8"
        >
          <div className="flex bg-input/60 rounded-full p-1 mb-6">
            {(["in", "up"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-xs uppercase tracking-widest rounded-full transition ${
                  mode === m ? "bg-gradient-ember text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {m === "in" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="font-display text-3xl mb-1">
            {mode === "in" ? "Welcome back" : "Join Eleve"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "in" ? "Sign in to your account." : "Start your fitness journey."}
          </p>

          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-zinc-900 py-3 text-sm font-semibold hover:bg-zinc-100 transition disabled:opacity-60"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5 text-xs text-muted-foreground">
            <div className="flex-1 h-px bg-border" /> OR <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            {mode === "up" && (
              <Field icon={<User className="size-4" />} placeholder="Full name" value={form.full_name} onChange={(v) => setForm({ ...form, full_name: v })} />
            )}
            <Field icon={<Mail className="size-4" />} type="email" placeholder="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field icon={<Lock className="size-4" />} type="password" placeholder="Password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} />
            <button
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-ember text-primary-foreground py-3 text-sm uppercase tracking-widest font-semibold disabled:opacity-60"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : null}
              {mode === "in" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing you agree to our terms. <Link to="/" className="text-primary hover:underline">Back home</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Field(props: {
  icon: React.ReactNode; placeholder: string; type?: string;
  value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{props.icon}</span>
      <input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        required
        className="w-full rounded-xl bg-input/60 border border-border pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition"
      />
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
