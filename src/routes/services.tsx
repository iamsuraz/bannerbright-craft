import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { fetchServices } from "@/lib/site";
import { Droplets, Sun, Cpu, Server, Gauge, Wrench } from "lucide-react";

const ICONS: Record<string, any> = { droplets: Droplets, sun: Sun, cpu: Cpu, server: Server, gauge: Gauge, wrench: Wrench };

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Services — Shreyam Engineering" }, { name: "description", content: "Hydropower, Solar, Industrial Automation, PCC/MCC panels, VFD drives and maintenance services." }] }),
  component: Services,
});

function Services() {
  const { data: services = [] } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  return (
    <SiteLayout>
      <PageHeader title="Our Services" subtitle="Complete power and automation solutions for industry." />
      <section className="py-16 max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any) => {
            const Icon = ICONS[s.icon] ?? Server;
            return (
              <div key={s.id} className="bg-white p-7 rounded-lg shadow-card border-t-4 border-brand-blue hover:border-brand-yellow transition">
                <div className="w-14 h-14 rounded-lg bg-hero flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-brand-yellow" />
                </div>
                <h3 className="font-display text-xl uppercase">{s.title}</h3>
                <p className="text-sm text-brand-red font-semibold mt-1">{s.tagline}</p>
                {s.description && <p className="text-sm text-muted-foreground mt-3">{s.description}</p>}
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
