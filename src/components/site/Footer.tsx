import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const YEAR = 2026;

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white mt-20">
      <div className="bg-bar h-1" />
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-brand-yellow font-display text-xl mb-3">SHREYAM ENGINEERING</h3>
          <p className="text-sm text-white/70">Powering Nepal, Building Tomorrow. Complete power and automation solutions for industry.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-yellow">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/about" className="hover:text-brand-yellow">About Us</Link></li>
            <li><Link to="/services" className="hover:text-brand-yellow">Services</Link></li>
            <li><Link to="/gallery" className="hover:text-brand-yellow">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-brand-yellow">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-yellow">Reach Us</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="w-4 h-4 text-brand-yellow mt-0.5" /><span>Powerhouse Chowk, Birgunj-13, Parsa, Nepal</span></li>
            <li className="flex gap-2"><Phone className="w-4 h-4 text-brand-yellow mt-0.5" /><span>980566056 / 9865406769</span></li>
            <li className="flex gap-2"><Mail className="w-4 h-4 text-brand-yellow mt-0.5" /><span>shreaym.engg@gmail.com</span></li>
            <li className="flex gap-2"><Globe className="w-4 h-4 text-brand-yellow mt-0.5" /><span>shreyamEngg.Co.Np</span></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-brand-yellow">Executive Director</h4>
          <p className="text-sm">Nirajan Kumar</p>
          <p className="text-sm text-white/80 mt-1">📞 981522666</p>
          <p className="text-sm text-white/80">✉ nirajan.seaps@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {YEAR} Shreyam Engineering and Power Solution Pvt. Ltd. | VAT 622436115 | Regd 474294/82/83
      </div>
    </footer>
  );
}
