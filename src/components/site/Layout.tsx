import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-hero text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl uppercase">{title}</h1>
        {subtitle && <p className="mt-3 text-white/80 max-w-2xl">{subtitle}</p>}
        <div className="mt-4 h-1 w-24 bg-brand-yellow" />
      </div>
    </section>
  );
}
