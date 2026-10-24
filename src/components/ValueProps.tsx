import React from 'react';
import { Wallet, RefreshCw, ShieldCheck, Headphones, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ValueProps: React.FC = () => {
  const { language } = useShop();

  const props = [
    {
      icon: Wallet,
      title: language === 'bn' ? 'ক্যাশ অন ডেলিভারি' : 'Cash on Delivery',
      subtitle: language === 'bn' ? 'বিকাশ ও নগদ পেমেন্ট সুবিধা' : 'Available (bKash & Nagad)',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: RefreshCw,
      title: language === 'bn' ? 'সহজ রিটার্ন' : 'Easy Return',
      subtitle: language === 'bn' ? '৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি' : 'Within 7 Days',
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
    },
    {
      icon: ShieldCheck,
      title: language === 'bn' ? 'নিরাপদ পেমেন্ট' : 'Secure Payment',
      subtitle: language === 'bn' ? '১০০% সুরক্ষিত ও নির্ভরযোগ্য' : '100% Secure & Safe',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      icon: Headphones,
      title: language === 'bn' ? '২৪/৭ কাস্টমার সাপোর্ট' : '24/7 Support',
      subtitle: language === 'bn' ? 'সবসময় আপনার সেবায় নিয়োজিত' : 'Always Here for You',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
    },
    {
      icon: Truck,
      title: language === 'bn' ? 'দ্রুত ডেলিভারি' : 'Fast Shipping',
      subtitle: language === 'bn' ? 'সমগ্র বাংলাদেশে দ্রুত হোম ডেলিভারি' : 'Across Bangladesh',
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200/80 py-6 px-4 sm:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        {props.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div
                className={`w-11 h-11 rounded-xl ${p.bgColor} ${p.color} flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="leading-snug min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate">{p.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
