import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Droplets, Sun, Cpu, Server, Gauge, Wrench, ShieldCheck, Leaf, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { fetchContent, fetchServices } from "@/lib/site";
import hero from "@/assets/hero.jpg";

const ICONS: Record<string, any> = { droplets: Droplets, sun: Sun, cpu: Cpu, server: Server, gauge: Gauge, wrench: Wrench };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shreyam Engineering — Powering Nepal, Building Tomorrow" },
      { name: "description", content: "Hydropower, Solar Energy, PLC/SCADA Automation, PCC/MCC Panels, VFD Drives and 24/7 Service across Nepal." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: content } = useQuery({ queryKey: ["content"], queryFn: fetchContent });
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const company = content?.company ?? {};
  const heroC = content?.hero ?? {};

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img src={hero} alt="Power infrastructure" width={1920} height={1080} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/40" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-40">
          <div className="inline-block bg-brand-yellow text-brand-navy px-3 py-1 text-xs font-bold uppercase tracking-widest mb-5">{company.short ?? "We Ensure Continuous Power"}</div>
          <h1 className="font-display text-4xl md:text-6xl text-white uppercase max-w-3xl leading-tight">
            {heroC.title ?? "Powering Nepal, Building Tomorrow"}
          </h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">{heroC.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="bg-cta text-brand-navy px-6 py-3 rounded font-bold uppercase text-sm inline-flex items-center gap-2 hover:opacity-90">
              {heroC.cta ?? "Get a Consultation"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="border-2 border-white text-white px-6 py-3 rounded font-bold uppercase text-sm hover:bg-white hover:text-brand-navy transition">Our Services</Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-6">
            {[
              { icon: ShieldCheck, label: "Reliable" },
              { icon: CheckCircle2, label: "Safe" },
              { icon: Leaf, label: "Sustainable" },
              { icon: Lightbulb, label: "Innovative" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 text-white">
                <div className="w-10 h-10 rounded-full bg-brand-yellow/20 border border-brand-yellow flex items-center justify-center">
                  <b.icon className="w-5 h-5 text-brand-yellow" />
                </div>
                <span className="font-semibold uppercase text-sm tracking-wide">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-brand-red font-bold uppercase text-xs tracking-widest">What we do</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase mt-2">Our Services</h2>
            <div className="mx-auto mt-3 h-1 w-24 bg-bar" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s: any) => {
              const Icon = ICONS[s.icon] ?? Server;
              return (
                <div key={s.id} className="group bg-white p-6 rounded-lg shadow-card hover:shadow-glow transition border-t-4 border-brand-blue hover:border-brand-yellow">
                  <div className="w-14 h-14 rounded-lg bg-hero flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <Icon className="w-7 h-7 text-brand-yellow" />
                  </div>
                  <h3 className="font-display text-xl uppercase">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.tagline}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-hero text-white py-14">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl md:text-3xl uppercase">Service Repairing and Maintenance</h3>
            <p className="text-white/80 mt-1">Preventive Maintenance · Breakdown Support · System Upgradation · 24/7 Support</p>
          </div>
          <Link to="/contact" className="bg-cta text-brand-navy px-6 py-3 rounded font-bold uppercase text-sm">Request Support</Link>
        </div>
      </section>

      {/* QUALITY */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
          {["Quality Products", "Expert Engineers", "Innovative Solutions", "Sustainable Future"].map((t) => (
            <div key={t} className="p-6 border-l-4 border-brand-yellow bg-secondary">
              <div className="font-display text-lg uppercase">{t}</div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
