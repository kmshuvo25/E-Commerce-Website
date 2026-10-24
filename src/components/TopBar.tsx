import React from 'react';
import { Truck, Phone, Mail, MapPin, Globe, Palette } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const TopBar: React.FC = () => {
  const { settings, language, setLanguage, cardTheme, setCardTheme, setActivePage } = useShop();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const cycleTheme = () => {
    if (cardTheme === 'professional-slate') setCardTheme('ocean-blue');
    else if (cardTheme === 'ocean-blue') setCardTheme('emerald-green');
    else setCardTheme('professional-slate');
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Side: Free Shipping info */}
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-emerald-400" />
          <span>
            {language === 'bn'
              ? `৳${settings.freeShippingThreshold}+ অর্ডারে ফ্রি ডেলিভারি সারা বাংলাদেশে!`
              : `Free Shipping for orders over ৳${settings.freeShippingThreshold} Across Bangladesh`}
          </span>
        </div>

        {/* Right Side: Phone, Email, Location, Theme Switcher, Language Toggle */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <a
            href={`tel:${settings.phone}`}
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{settings.phone}</span>
          </a>

          <a
            href={`mailto:${settings.email}`}
            className="hidden md:flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>{settings.email}</span>
          </a>

          <div
            onClick={() => setActivePage('contact')}
            className="hidden sm:flex items-center gap-1.5 cursor-pointer hover:text-emerald-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Bogura, Dhunat</span>
          </div>

          {/* Theme Palette Switcher */}
          <button
            onClick={cycleTheme}
            title="Switch Card Theme (Professional / Ocean / Emerald)"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
          >
            <Palette className="w-3 h-3 text-amber-400" />
            <span className="capitalize text-[11px] hidden sm:inline">
              Theme: {cardTheme.replace('-', ' ')}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition-colors"
          >
            <Globe className="w-3 h-3" />
            <span className="font-semibold text-[11px]">
              {language === 'en' ? 'বাংলা' : 'English'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
