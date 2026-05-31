import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { fetchContent } from "@/lib/site";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Globe, User } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Shreyam Engineering" }, { name: "description", content: "Reach Shreyam Engineering and Power Solution in Birgunj, Nepal." }] }),
  component: Contact,
});

function Contact() {
  const { data: content } = useQuery({ queryKey: ["content"], queryFn: fetchContent });
  const c = content?.contact ?? {};
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setLoading(false);
    if (error) return toast.error("Could not send message");
    toast.success("Message sent! We'll reach out shortly.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  }

  return (
    <SiteLayout>
      <PageHeader title="Contact Us" subtitle="We'd love to hear about your project." />
      <section className="py-16 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <div className="space-y-4">
          <Info icon={MapPin} title="Address" value={c.address} />
          <Info icon={Phone} title="Phone" value={`${c.phone1 ?? ""} / ${c.phone2 ?? ""}`} />
          <Info icon={Mail} title="Email" value={c.email} />
          <Info icon={Globe} title="Website" value={c.website} />
          <Info icon={User} title={c.director ?? "Director"} value={`${c.director_phone ?? ""} · ${c.director_email ?? ""}`} />
        </div>
        <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-card space-y-4 border-t-4 border-brand-yellow">
          <h3 className="font-display text-2xl uppercase">Send a Message</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Input label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Input label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
          </div>
          <div>
            <label className="text-sm font-semibold">Message</label>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full mt-1 border rounded p-2 min-h-32" />
          </div>
          <button disabled={loading} className="bg-cta text-brand-navy px-6 py-3 rounded font-bold uppercase text-sm w-full disabled:opacity-50">
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Info({ icon: Icon, title, value }: any) {
  return (
    <div className="flex gap-4 p-5 bg-secondary rounded-lg border-l-4 border-brand-blue">
      <div className="w-12 h-12 rounded-full bg-hero flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand-yellow" />
      </div>
      <div>
        <div className="font-semibold uppercase text-sm tracking-wider">{title}</div>
        <div className="text-muted-foreground">{value}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required }: any) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="w-full mt-1 border rounded p-2" />
    </div>
  );
}
