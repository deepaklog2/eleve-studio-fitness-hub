import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { LogOut, Calendar, CreditCard, ShieldCheck, Inbox } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Eleve Studio" }],
  }),
  component: Dashboard,
});

interface Profile { id: string; full_name: string | null; phone: string | null; }
interface Membership { id: string; status: string; start_date: string | null; end_date: string | null; plans: { name: string; price_inr: number } | null; }
interface Booking { id: string; class_type: string; preferred_date: string; status: string; }

function Dashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      setIsAdmin((data || []).some((r: { role: string }) => r.role === "admin"));
    })();
  }, []);

  const { data: profile } = useQuery({
    queryKey: ["profile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId!).maybeSingle();
      if (error) throw error;
      return data as Profile | null;
    },
  });

  const { data: memberships = [] } = useQuery({
    queryKey: ["memberships", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("memberships")
        .select("id,status,start_date,end_date,plans(name,price_inr)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as Membership[];
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["my-bookings", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("id,class_type,preferred_date,status")
        .order("preferred_date", { ascending: false });
      if (error) throw error;
      return (data || []) as Booking[];
    },
  });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/", replace: true });
  }

  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 flex-wrap mb-10">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-primary mb-2">Dashboard</div>
            <h1 className="font-display text-5xl md:text-6xl">
              Hey, <span className="text-gradient-ember">{profile?.full_name?.split(" ")[0] || "athlete"}</span>
            </h1>
          </div>
          <div className="flex gap-2">
            {isAdmin && (
              <Link to="/admin" className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-xs uppercase tracking-widest hover:border-primary/60">
                <ShieldCheck className="size-4" /> Admin
              </Link>
            )}
            <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-xs uppercase tracking-widest hover:border-destructive/60">
              <LogOut className="size-4" /> Sign out
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card icon={<CreditCard className="size-5 text-primary" />} title="My membership">
            {memberships.length === 0 ? (
              <Empty>
                You don't have an active membership yet.
                <Link to="/plans" className="block mt-3 rounded-full bg-gradient-ember text-primary-foreground px-5 py-2 text-xs uppercase tracking-widest text-center">View plans</Link>
              </Empty>
            ) : (
              <ul className="space-y-3">
                {memberships.map((m) => (
                  <li key={m.id} className="glass rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{m.plans?.name}</div>
                      <div className="text-xs text-muted-foreground">{m.start_date || "Pending activation"}</div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-primary">{m.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card icon={<Calendar className="size-5 text-primary" />} title="My bookings">
            {bookings.length === 0 ? (
              <Empty>
                No bookings yet.
                <Link to="/book" className="block mt-3 rounded-full bg-gradient-ember text-primary-foreground px-5 py-2 text-xs uppercase tracking-widest text-center">Book a session</Link>
              </Empty>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b) => (
                  <li key={b.id} className="glass rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{b.class_type}</div>
                      <div className="text-xs text-muted-foreground">{b.preferred_date}</div>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-primary">{b.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

        <div className="mt-10 glass rounded-3xl p-7 flex items-center gap-4">
          <Inbox className="size-8 text-primary" />
          <div className="flex-1">
            <div className="font-semibold">Need anything?</div>
            <div className="text-sm text-muted-foreground">Reach out to your coach on WhatsApp or visit the front desk.</div>
          </div>
          <a href="https://wa.me/917200390099" target="_blank" rel="noreferrer" className="rounded-full bg-gradient-ember text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-widest">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-3xl p-7">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="font-display text-xl">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>;
}
