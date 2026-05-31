import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/services")({ component: ServicesAdmin });

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
    if (error) toast.error(error.message);
  }

  async function remove(id: string) {
    if (!confirm("Delete this service?")) return;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) toast.error(error.message); else load();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl uppercase">Services</h1>
        <button onClick={add} className="bg-cta text-brand-navy px-4 py-2 rounded font-bold uppercase text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="space-y-4">
        {items.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded shadow-card grid sm:grid-cols-[1fr_1fr_120px_80px_auto] gap-3 items-center">
            <input defaultValue={s.title} placeholder="Title" onBlur={(e) => update(s.id, { title: e.target.value })} className="border rounded p-2" />
            <input defaultValue={s.tagline} placeholder="Tagline" onBlur={(e) => update(s.id, { tagline: e.target.value })} className="border rounded p-2" />
            <select defaultValue={s.icon} onChange={(e) => update(s.id, { icon: e.target.value })} className="border rounded p-2">
              {["droplets","sun","cpu","server","gauge","wrench","zap"].map((i) => <option key={i}>{i}</option>)}
            </select>
            <input type="number" defaultValue={s.sort_order} onBlur={(e) => update(s.id, { sort_order: Number(e.target.value) })} className="border rounded p-2 w-20" />
            <button onClick={() => remove(s.id)} className="text-destructive p-2"><Trash2 className="w-4 h-4" /></button>
            <textarea defaultValue={s.description} placeholder="Description (optional)" onBlur={(e) => update(s.id, { description: e.target.value })} className="border rounded p-2 sm:col-span-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
