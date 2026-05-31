import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({ component: GalleryAdmin });

function GalleryAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ image_url: "", caption: "" });

  async function load() {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image_url) return;
    const { error } = await supabase.from("gallery_images").insert({ ...form, sort_order: items.length + 1 });
    if (error) return toast.error(error.message);
    setForm({ image_url: "", caption: "" });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete image?")) return;
    await supabase.from("gallery_images").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase mb-6">Gallery</h1>
      <form onSubmit={add} className="bg-white p-5 rounded shadow-card grid sm:grid-cols-[2fr_1fr_auto] gap-3 mb-6">
        <input required placeholder="Image URL (https://...)" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="border rounded p-2" />
        <input placeholder="Caption" value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} className="border rounded p-2" />
        <button className="bg-cta text-brand-navy px-4 py-2 rounded font-bold uppercase text-sm flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
      </form>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((img) => (
          <div key={img.id} className="bg-white rounded shadow-card overflow-hidden">
            <img src={img.image_url} alt={img.caption} className="w-full h-48 object-cover" />
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm">{img.caption || "Untitled"}</span>
              <button onClick={() => remove(img.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
