import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout, PageHeader } from "@/components/site/Layout";
import { fetchGallery } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Shreyam Engineering" }, { name: "description", content: "Project gallery showcasing power, solar, and automation work." }] }),
  component: Gallery,
});

function Gallery() {
  const { data: images = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });
  return (
    <SiteLayout>
      <PageHeader title="Gallery" subtitle="Projects and installations across Nepal." />
      <section className="py-16 max-w-7xl mx-auto px-6">
        {images.length === 0 ? (
          <p className="text-center text-muted-foreground">No images yet. Admins can add images from the admin panel.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img: any) => (
              <figure key={img.id} className="overflow-hidden rounded-lg shadow-card group">
                <img src={img.image_url} alt={img.caption} className="w-full h-64 object-cover group-hover:scale-105 transition" loading="lazy" />
                {img.caption && <figcaption className="p-3 bg-brand-navy text-white text-sm">{img.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
