import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/tfac-logo.asset.json";

export function Footer() {
  return (
    <footer id="contact" className="mt-24 bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-3 lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-12 w-12 rounded-full object-cover" width={48} height={48} />
            <span className="font-display text-xl font-semibold">Travel, Fun &amp; Active Community</span>
          </div>
          <p className="mt-5 max-w-md text-cream/70">
            A Canadian non-profit strengthening communities through travel, cultural exchange, outdoor recreation,
            leadership development, and skills-building.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">Connect With Us</p>
          <ul className="space-y-3 text-cream/80">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0 text-sunset" /> Toronto, Canada</li>
            <li className="flex items-start gap-2"><Mail size={16} className="mt-1 shrink-0 text-sunset" />
              <a href="mailto:travelfunandactivecommunity@gmail.com" className="hover:text-cream break-all">travelfunandactivecommunity@gmail.com</a>
            </li>
            <li className="flex items-start gap-2"><Phone size={16} className="mt-1 shrink-0 text-sunset" />
              <a href="tel:+14168392209" className="hover:text-cream">+1 (416) 839-2209</a>
            </li>
            <li className="flex items-start gap-2"><Instagram size={16} className="mt-1 shrink-0 text-sunset" />
              <a href="https://www.instagram.com/travelfunandactivecommunity/" target="_blank" rel="noopener noreferrer" className="hover:text-cream">@travelfunandactivecommunity</a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">Website</p>
          <a href="https://travelfunandactivecommunity.com" className="text-cream/80 hover:text-cream break-all">travelfunandactivecommunity.com</a>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-sm text-cream/60 lg:px-10">
          <p>© {new Date().getFullYear()} Travel, Fun and Active Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
