import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromoBanner: React.FC = () => {
  const { setActivePage, setSelectedCategory } = useShop();

  return (
    <section className="py-6 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Main Special Offer Banner matching user image */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left Title & Tagline */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <span className="text-2xl sm:text-3xl font-black italic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Special Offer!
            </span>
            <div className="h-6 w-px bg-slate-700 hidden sm:block" />
            <span className="text-sm sm:text-base font-semibold text-slate-200">
              Get up to 20% Off on Selected Laptops & Smart Gadgets
            </span>
          </div>

          {/* Center CTA button */}
          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setActivePage('products');
            }}
            className="px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 shadow-md flex items-center gap-2 transition-transform hover:scale-105"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Right: Trusted Payment Badges (bKash & Nagad) */}
          <div className="flex items-center gap-4 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-700/60 backdrop-blur-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
              Trusted Payment:
            </span>

            {/* bKash badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-700/50">
              <span className="w-5 h-5 rounded-full bg-pink-600 text-white font-black text-[10px] flex items-center justify-center">
                bK
              </span>
              <span className="text-xs font-bold text-pink-300">bKash</span>
            </div>

            {/* Nagad badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-950/60 border border-orange-700/50">
              <span className="w-5 h-5 rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center">
                NG
              </span>
              <span className="text-xs font-bold text-orange-300">Nagad</span>
            </div>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};
