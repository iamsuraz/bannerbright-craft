import { Link } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-white shadow-lg">
      <div className="bg-bar h-1" />
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 text-xs bg-black/30">
        <span>VAT: 622436115 | Regd: 474294/82/83</span>
        <span className="flex items-center gap-2"><Phone className="w-3 h-3 text-brand-yellow" /> 980566056 / 9865406769</span>
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Shreyam Engineering" width={48} height={48} className="w-12 h-12 object-contain" />
          <div className="leading-tight">
            <div className="font-display text-lg sm:text-xl tracking-wide">SHREYAM ENGINEERING</div>
            <div className="text-[10px] sm:text-xs text-brand-yellow uppercase tracking-widest">Powering Nepal, Building Tomorrow</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:text-brand-yellow transition"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold uppercase tracking-wider text-brand-yellow" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="ml-3 bg-cta text-brand-navy px-5 py-2 rounded font-bold text-sm uppercase hover:opacity-90">
            Get Quote
          </Link>
        </nav>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden flex flex-col px-4 pb-4 gap-1 bg-brand-navy">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="px-3 py-2 hover:text-brand-yellow">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
