import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/services")({ component: ServicesAdmin });

const ICON_SUGGESTIONS: Record<string, string> = {
  droplets: "https://images.unsplash.com/photo-1548611716-3000815a5803?w=800&q=80",
  sun: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
  cpu: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  server: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80",
  gauge: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  wrench: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&q=80",
  zap: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
};

function ServicesAdmin() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function add() {
    const { error } = await supabase.from("services").insert({ title: "New Service", icon: "zap", sort_order: items.length + 1 });
    if (error) toast.error(error.message); else load();
  }

  async function update(id: string, patch: any) {
    const { error } = await supabase.from("services").update(patch).eq("id", id);
    if (error) toast.error(error.message); else load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl uppercase">Services</h1>
        <button onClick={add} className="bg-cta text-brand-navy px-4 py-2 rounded font-bold uppercase text-sm flex items-center gap-2 self-start"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="space-y-4">
        {items.map((s) => (
          <div key={s.id} className="bg-white p-4 sm:p-5 rounded shadow-card">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="sm:w-40 shrink-0">
                {s.image_url ? (
                  <img src={s.image_url} alt={s.title} className="w-full h-32 sm:h-28 object-cover rounded" />
                ) : (
                  <div className="w-full h-32 sm:h-28 bg-secondary rounded flex items-center justify-center text-xs text-muted-foreground">No image</div>
                )}
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input defaultValue={s.title} placeholder="Title" onBlur={(e) => update(s.id, { title: e.target.value })} className="border rounded p-2" />
                <input defaultValue={s.tagline} placeholder="Tagline" onBlur={(e) => update(s.id, { tagline: e.target.value })} className="border rounded p-2" />
                <select defaultValue={s.icon} onChange={(e) => update(s.id, { icon: e.target.value })} className="border rounded p-2">
                  {Object.keys(ICON_SUGGESTIONS).map((i) => <option key={i}>{i}</option>)}
                </select>
                <input type="number" defaultValue={s.sort_order} onBlur={(e) => update(s.id, { sort_order: Number(e.target.value) })} className="border rounded p-2" placeholder="Sort order" />
                <input
                  defaultValue={s.image_url}
                  placeholder="Image URL (https://...)"
                  onBlur={(e) => update(s.id, { image_url: e.target.value })}
                  className="border rounded p-2 sm:col-span-2"
                />
                <textarea defaultValue={s.description} placeholder="Description" onBlur={(e) => update(s.id, { description: e.target.value })} className="border rounded p-2 sm:col-span-2 min-h-[80px]" />
                <div className="sm:col-span-2 flex flex-wrap gap-2 items-center">
                  <button
                    type="button"
                    onClick={() => update(s.id, { image_url: ICON_SUGGESTIONS[s.icon] ?? ICON_SUGGESTIONS.zap })}
                    className="text-xs px-3 py-1.5 rounded border hover:bg-secondary"
                  >
                    Use suggested photo for "{s.icon}"
                  </button>
                  <button onClick={() => remove(s.id)} className="ml-auto text-destructive p-2 flex items-center gap-1 text-sm"><Trash2 className="w-4 h-4" /> Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
