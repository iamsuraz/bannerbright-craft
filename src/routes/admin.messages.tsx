import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({ component: MessagesAdmin });

function MessagesAdmin() {
  const [items, setItems] = useState<any[]>([]);
  async function load() {
    const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
    setItems(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm("Delete message?")) return;
    await supabase.from("contact_messages").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase mb-6">Messages</h1>
      {items.length === 0 ? <p className="text-muted-foreground">No messages yet.</p> : (
        <div className="space-y-3">
          {items.map((m) => (
            <div key={m.id} className="bg-white p-5 rounded shadow-card">
              <div className="flex justify-between gap-3">
                <div>
                  <div className="font-semibold">{m.name} <span className="text-muted-foreground text-sm">· {m.email} · {m.phone}</span></div>
                  <div className="text-sm text-brand-red font-semibold mt-1">{m.subject}</div>
                  <p className="mt-2 whitespace-pre-wrap">{m.message}</p>
                  <div className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</div>
                </div>
                <button onClick={() => remove(m.id)} className="text-destructive p-2"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
