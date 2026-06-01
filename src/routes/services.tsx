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
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((s: any) => {
            const Icon = ICONS[s.icon] ?? Server;
            return (
              <div key={s.id} className="bg-white rounded-lg shadow-card border-t-4 border-brand-blue hover:border-brand-yellow transition overflow-hidden flex flex-col">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.title} loading="lazy" className="w-full h-44 sm:h-48 object-cover" />
                ) : (
                  <div className="w-full h-44 sm:h-48 bg-hero flex items-center justify-center">
                    <Icon className="w-12 h-12 text-brand-yellow" />
                  </div>
                )}
                <div className="p-5 sm:p-6 flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-hero flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-brand-yellow" />
                    </div>
                    <h3 className="font-display text-lg sm:text-xl uppercase leading-tight">{s.title}</h3>
                  </div>
                  {s.tagline && <p className="text-sm text-brand-red font-semibold">{s.tagline}</p>}
                  {s.description && <p className="text-sm text-muted-foreground mt-2">{s.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
