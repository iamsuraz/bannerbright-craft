import { supabase } from "@/integrations/supabase/client";

export type ContentKey = "company" | "hero" | "about" | "contact";

export async function fetchContent() {
  const { data } = await supabase.from("site_content").select("key, value");
  const map: Record<string, any> = {};
  (data ?? []).forEach((r: any) => (map[r.key] = r.value));
  return map;
}

export async function fetchServices() {
  const { data } = await supabase.from("services").select("*").order("sort_order");
  return data ?? [];
}

export async function fetchGallery() {
  const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
  return data ?? [];
}
