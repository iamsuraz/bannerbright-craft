import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/content")({ component: ContentEditor });

const SECTIONS: { key: string; label: string; fields: { k: string; label: string; textarea?: boolean }[] }[] = [
  { key: "company", label: "Company", fields: [{ k: "name", label: "Name" }, { k: "tagline", label: "Tagline" }, { k: "short", label: "Short slogan" }, { k: "vat", label: "VAT No." }, { k: "regd", label: "Regd No." }] },
  { key: "hero", label: "Hero Section", fields: [{ k: "title", label: "Title" }, { k: "subtitle", label: "Subtitle", textarea: true }, { k: "cta", label: "CTA Button" }] },
  { key: "about", label: "About Section", fields: [{ k: "heading", label: "Heading" }, { k: "body", label: "Body", textarea: true }] },
  { key: "contact", label: "Contact Info", fields: [{ k: "address", label: "Address" }, { k: "phone1", label: "Phone 1" }, { k: "phone2", label: "Phone 2" }, { k: "email", label: "Email" }, { k: "website", label: "Website" }, { k: "director", label: "Director Name" }, { k: "director_phone", label: "Director Phone" }, { k: "director_email", label: "Director Email" }] },
];

function ContentEditor() {
  const [data, setData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    supabase.from("site_content").select("key, value").then(({ data }) => {
      const map: Record<string, any> = {};
      (data ?? []).forEach((r: any) => (map[r.key] = r.value));
      setData(map);
    });
  }, []);

  async function save(key: string) {
    setSaving(key);
    const { error } = await supabase.from("site_content").upsert({ key, value: data[key] ?? {}, updated_at: new Date().toISOString() });
    setSaving(null);
    if (error) return toast.error(error.message);
    toast.success(`${key} updated`);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl uppercase">Site Content</h1>
      {SECTIONS.map((sec) => (
        <div key={sec.key} className="bg-white rounded-lg p-6 shadow-card">
          <h2 className="font-display text-xl uppercase mb-4">{sec.label}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {sec.fields.map((f) => (
              <div key={f.k} className={f.textarea ? "sm:col-span-2" : ""}>
                <label className="text-sm font-semibold">{f.label}</label>
                {f.textarea ? (
                  <textarea
                    className="w-full mt-1 border rounded p-2 min-h-24"
                    value={data[sec.key]?.[f.k] ?? ""}
                    onChange={(e) => setData({ ...data, [sec.key]: { ...(data[sec.key] ?? {}), [f.k]: e.target.value } })}
                  />
                ) : (
                  <input
                    className="w-full mt-1 border rounded p-2"
                    value={data[sec.key]?.[f.k] ?? ""}
                    onChange={(e) => setData({ ...data, [sec.key]: { ...(data[sec.key] ?? {}), [f.k]: e.target.value } })}
                  />
                )}
              </div>
            ))}
          </div>
          <button onClick={() => save(sec.key)} disabled={saving === sec.key} className="mt-4 bg-cta text-brand-navy px-5 py-2 rounded font-bold uppercase text-sm disabled:opacity-50">
            {saving === sec.key ? "Saving..." : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
}
