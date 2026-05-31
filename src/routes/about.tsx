import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { fetchContent } from "@/lib/site";
import { ShieldCheck, Leaf, Lightbulb, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — Shreyam Engineering" }, { name: "description", content: "Learn about Shreyam Engineering and Power Solution Pvt. Ltd. — Nepal's trusted power and automation partner." }] }),
  component: About,
});

function About() {
  const { data: content } = useQuery({ queryKey: ["content"], queryFn: fetchContent });
  const about = content?.about ?? {};
  return (
    <SiteLayout>
      <PageHeader title="About Us" subtitle="Powering Nepal, Building Tomorrow" />
      <section className="py-16 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-display text-3xl uppercase">{about.heading ?? "About Shreyam Engineering"}</h2>
          <div className="mt-3 h-1 w-20 bg-brand-yellow" />
          <p className="mt-6 text-muted-foreground leading-relaxed">{about.body}</p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Stat n="100+" l="Projects Delivered" />
            <Stat n="24/7" l="Service Support" />
            <Stat n="10+" l="Years Experience" />
            <Stat n="50+" l="Industrial Clients" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: ShieldCheck, t: "Reliable", d: "Engineered for uptime" },
            { icon: CheckCircle2, t: "Safe", d: "Compliant systems" },
            { icon: Leaf, t: "Sustainable", d: "Clean energy first" },
            { icon: Lightbulb, t: "Innovative", d: "Smart automation" },
          ].map((v) => (
            <div key={v.t} className="bg-secondary p-5 rounded-lg border-l-4 border-brand-blue">
              <v.icon className="w-7 h-7 text-brand-red" />
              <div className="font-display text-lg uppercase mt-3">{v.t}</div>
              <div className="text-sm text-muted-foreground">{v.d}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="bg-hero text-white p-5 rounded">
      <div className="font-display text-3xl text-brand-yellow">{n}</div>
      <div className="text-sm uppercase tracking-wider">{l}</div>
    </div>
  );
}
