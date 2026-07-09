import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import logo from "@/assets/tfac-logo.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 bg-navy text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="" className="h-12 w-12 rounded-full object-cover" width={48} height={48} />
            <span className="font-display text-xl font-semibold">Travel, Fun &amp; Active Community</span>
          </div>
          <p className="mt-5 max-w-md text-cream/70">
            A Canadian non-profit strengthening communities through travel, cultural exchange, outdoor recreation,
            leadership, and skills-building.
          </p>
          <div className="mt-6 max-w-md">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber">Newsletter</p>
            <NewsletterForm />
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">Explore</p>
          <ul className="space-y-2 text-cream/80">
            <li><Link to="/about" className="hover:text-cream">About</Link></li>
            <li><Link to="/programs" className="hover:text-cream">Programs</Link></li>
            <li><Link to="/events" className="hover:text-cream">Events</Link></li>
            <li><Link to="/blog" className="hover:text-cream">Blog</Link></li>
            <li><Link to="/get-involved" className="hover:text-cream">Get Involved</Link></li>
            <li><Link to="/donate" className="hover:text-cream">Donate</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber">Contact</p>
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
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-sm text-cream/60 lg:flex-row lg:px-10">
          <p>© {new Date().getFullYear()} Travel, Fun and Active Community. All rights reserved.</p>
          <p>
            <Link to="/auth" className="hover:text-cream">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
