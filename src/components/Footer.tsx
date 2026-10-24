import React from 'react';
import { Phone, Mail, MapPin, ChevronUp, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { settings, setActivePage, setSelectedCategory } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div onClick={() => setActivePage('home')}>
              <Logo size="md" variant="light" />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              KHAN SHOP is your trusted online shopping partner in Bangladesh. We bring you authentic smartphones, laptops, fashion, gadgets, and digital services with express home delivery and guaranteed bKash & Nagad secure checkout.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { name: 'Facebook', url: 'https://facebook.com', letter: 'f' },
                { name: 'YouTube', url: 'https://youtube.com', letter: 'yt' },
                { name: 'Instagram', url: 'https://instagram.com', letter: 'ig' },
                { name: 'TikTok', url: 'https://tiktok.com', letter: 'tk' },
              ].map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-slate-900 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center text-xs font-bold transition-colors border border-slate-800"
                  title={soc.name}
                >
                  {soc.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActivePage('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('All Products');
                    setActivePage('products');
                  }}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Products Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('services')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Digital Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('about')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setActivePage('tracking')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('contact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  bKash & Nagad Payment Guide
                </button>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  7-Day Replacement Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Privacy Policy & Terms
                </span>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('admin')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                >
                  Admin Portal ➔
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{settings.phone}</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />
                <span>{settings.email}</span>
              </a>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
            </div>

            {/* Payment Partners */}
            <div className="pt-3 border-t border-slate-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Accepted Payment Methods
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-pink-950 text-pink-300 font-bold text-[10px] border border-pink-800">
                  bKash
                </span>
                <span className="px-2 py-0.5 rounded bg-orange-950 text-orange-300 font-bold text-[10px] border border-orange-800">
                  Nagad
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold text-[10px] border border-emerald-800">
                  Cash on Delivery
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Scroll-to-top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings.shopName} All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[11px]">
              Designed with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> in Bogura, Bangladesh
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors"
              title="Scroll to Top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
