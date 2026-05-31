import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutDashboard, FileText, Wrench, Image as ImageIcon, Mail, Settings as SettingsIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Shreyam Engineering" }, { name: "robots", content: "noindex" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function check() {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", sess.session.user.id);
      if (mounted) {
        setIsAdmin((roles ?? []).some((r: any) => r.role === "admin"));
        setChecking(false);
      }
    }
    check();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/admin/login" });
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, [navigate]);

  // Login page is also under /admin — let it render without guard
  if (typeof window !== "undefined" && window.location.pathname === "/admin/login") {
    return <Outlet />;
  }

  if (checking) return <div className="p-10 text-center">Loading…</div>;
  if (!isAdmin) return <div className="p-10 text-center">Not authorized. <Link to="/admin/login" className="underline">Sign in</Link></div>;

  return (
    <div className="min-h-screen flex bg-secondary">
      <aside className="w-60 bg-brand-navy text-white flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="font-display text-lg text-brand-yellow">SHREYAM</div>
          <div className="text-xs uppercase tracking-wider text-white/60">Admin Panel</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 text-sm">
          <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/admin/content" icon={FileText} label="Site Content" />
          <NavItem to="/admin/services" icon={Wrench} label="Services" />
          <NavItem to="/admin/gallery" icon={ImageIcon} label="Gallery" />
          <NavItem to="/admin/messages" icon={Mail} label="Messages" />
        </nav>
        <button
          onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/admin/login" }); }}
          className="m-3 flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 text-sm"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto"><Outlet /></main>
    </div>
  );
}

function NavItem({ to, icon: Icon, label }: any) {
  return (
    <Link to={to} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10" activeOptions={{ exact: true }} activeProps={{ className: "flex items-center gap-2 px-3 py-2 rounded bg-brand-yellow text-brand-navy font-semibold" }}>
      <Icon className="w-4 h-4" /> {label}
    </Link>
  );
}
