import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/plans", label: "Plans" },
  { to: "/book", label: "Book Trial" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between rounded-2xl transition-all",
          scrolled ? "glass shadow-gold" : "bg-transparent",
        )}
      >
        <Link to="/" className="flex items-center gap-3 py-2">
          <img src="/logo.png" alt="Eleve Studio" className="h-10 w-10 rounded-md ring-1 ring-primary/40" />
          <div className="leading-none">
            <div className="font-display text-xl tracking-widest text-gradient-ember">ELEVE</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">STUDIO</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="relative px-4 py-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {authed ? (
            <Link to="/dashboard">
              <Button variant="default" className="bg-gradient-ember text-primary-foreground hover:opacity-90">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button variant="default" className="bg-gradient-ember text-primary-foreground hover:opacity-90">Join Now</Button>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-4 mt-2 glass rounded-2xl p-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-3 text-sm uppercase tracking-wider text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <Link to={authed ? "/dashboard" : "/auth"} className="mt-2">
            <Button className="w-full bg-gradient-ember text-primary-foreground">{authed ? "Dashboard" : "Join Now"}</Button>
          </Link>
        </div>
      )}
    </header>
  );
}
