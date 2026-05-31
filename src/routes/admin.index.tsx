import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  return (
    <div>
      <h1 className="font-display text-3xl uppercase">Dashboard</h1>
      <p className="text-muted-foreground mt-2">Welcome to the admin panel. Use the menu to edit website content.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {[
          { to: "/admin/content", t: "Site Content", d: "Hero, About, Contact info" },
          { to: "/admin/services", t: "Services", d: "Manage service offerings" },
          { to: "/admin/gallery", t: "Gallery", d: "Project images" },
          { to: "/admin/messages", t: "Messages", d: "Contact form inbox" },
        ].map((c) => (
          <Link key={c.to} to={c.to} className="bg-white p-5 rounded-lg shadow-card border-t-4 border-brand-blue hover:border-brand-yellow transition">
            <div className="font-display text-lg uppercase">{c.t}</div>
            <div className="text-sm text-muted-foreground mt-1">{c.d}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
