import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Inbox, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Eleve Studio" }] }),
  component: Admin,
});

interface Inquiry { id: string; name: string; email: string; phone: string | null; message: string; created_at: string; }
interface Booking { id: string; name: string; email: string; phone: string; class_type: string; preferred_date: string; status: string; created_at: string; }

function Admin() {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setAllowed(false); return; }
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
      setAllowed(!!data);
    })();
  }, []);

  const { data: inquiries = [] } = useQuery({
    queryKey: ["admin-inquiries"],
    enabled: allowed === true,
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as Inquiry[];
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["admin-bookings"],
    enabled: allowed === true,
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return data as Booking[];
    },
  });

  if (allowed === null) return <div className="pt-40 text-center text-muted-foreground">Loading…</div>;
  if (!allowed) {
    return (
      <section className="pt-40 pb-20 text-center">
        <div className="font-display text-4xl">Admin access only</div>
        <p className="text-muted-foreground mt-3">You don't have permission to view this page.</p>
        <button onClick={() => navigate({ to: "/dashboard" })} className="mt-6 rounded-full bg-gradient-ember text-primary-foreground px-6 py-3 text-xs uppercase tracking-widest">
          Back to dashboard
        </button>
      </section>
    );
  }

  return (
    <section className="pt-28 pb-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" /> Dashboard
          </Link>
          <h1 className="font-display text-6xl mt-3">Admin</h1>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          <Stat icon={<Inbox className="size-5" />} label="Inquiries" value={inquiries.length} />
          <Stat icon={<Calendar className="size-5" />} label="Bookings" value={bookings.length} />
          <Stat icon={<Users className="size-5" />} label="Pending" value={bookings.filter(b => b.status === "pending").length} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Section title="Recent inquiries">
            {inquiries.length === 0 ? <p className="text-sm text-muted-foreground">No inquiries yet.</p> : (
              <ul className="space-y-3">
                {inquiries.map((i) => (
                  <li key={i.id} className="glass rounded-xl p-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{i.name} · {i.email}</span>
                      <span>{new Date(i.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm mt-2">{i.message}</p>
                    {i.phone && <div className="text-xs text-primary mt-2">{i.phone}</div>}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section title="Recent bookings">
            {bookings.length === 0 ? <p className="text-sm text-muted-foreground">No bookings yet.</p> : (
              <ul className="space-y-3">
                {bookings.map((b) => (
                  <li key={b.id} className="glass rounded-xl p-4">
                    <div className="flex justify-between">
                      <div className="font-semibold">{b.class_type}</div>
                      <span className="text-xs uppercase tracking-widest text-primary">{b.status}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{b.name} · {b.phone} · {b.preferred_date}</div>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-primary">{icon}</div>
      </div>
      <div className="font-display text-4xl text-gradient-ember mt-2">{value}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-7">
      <h3 className="font-display text-2xl mb-4">{title}</h3>
      {children}
    </div>
  );
}
