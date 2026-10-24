import React from 'react';
import { ShieldCheck, Truck, Users, Award, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AboutSection: React.FC = () => {
  const { settings, setActivePage } = useShop();

  const stats = [
    { value: '5,000+', label: 'Happy Customers Across Bangladesh' },
    { value: '100%', label: 'Genuine & Brand New Products' },
    { value: '99.4%', label: 'On-Time Express Delivery' },
    { value: '24/7', label: 'Instant WhatsApp Customer Care' },
  ];

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          About KHAN SHOP
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
          Smart Shopping, Better Life for Every Bangladeshi Shopper
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Headquartered in Dhunat, Bogura, <strong>KHAN SHOP</strong> is your modern one-stop destination for authentic smartphones, high-performance laptops, trending lifestyle fashion, and professional digital services.
        </p>
      </div>

      {/* Stats Counter */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center space-y-1"
          >
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
              {s.value}
            </div>
            <p className="text-xs text-slate-500 font-semibold">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story & Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900">
            Our Mission & Commitment
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We started KHAN SHOP with a single focused goal: to solve the trust deficit in e-commerce. Every customer deserves 100% authentic products at transparent fair prices, backed by responsive support right on WhatsApp without waiting days for an email reply.
          </p>

          <div className="space-y-3">
            {[
              'Direct partnerships with authentic distributors & brands',
              'Fast doorstep delivery with Cash on Delivery and bKash/Nagad verification',
              '7-Day hassle-free replacement warranty on electronics',
              'Creative service wing for Logo Design, Web Development & Marketing',
            ].map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{pt}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={() => setActivePage('products')}
              className="py-3 px-6 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-colors"
            >
              Explore Products
            </button>
            <button
              onClick={() => setActivePage('contact')}
              className="py-3 px-6 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Contact Our Team
            </button>
          </div>
        </div>

        {/* Location Showcase Card */}
        <div className="rounded-2xl bg-slate-950 text-white p-6 sm:p-8 space-y-6 relative overflow-hidden">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Store Headquarters
            </span>
            <h3 className="text-xl font-black">{settings.shopName}</h3>
            <p className="text-xs text-slate-400">
              Official retail showroom & distribution center in Bogura.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{settings.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{settings.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>{settings.email}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Operating Hours:</span>
            <span className="text-emerald-400 font-bold">9:00 AM - 10:00 PM (Daily)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
