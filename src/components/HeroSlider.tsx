import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, Headphones, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HeroSlider: React.FC = () => {
  const { setActivePage, setSelectedCategory, language } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: '★ Welcome to KHAN SHOP',
      title: 'Your Trusted Online',
      titleHighlight: 'Shopping Partner',
      subtitle:
        'Get the best smartphones, laptops, fashion, digital products & services all in one place. Shop Smart, Live Better!',
      ctaText: 'Shop Now ➔',
      ctaAction: () => setActivePage('products'),
      secondaryText: 'Explore Services',
      secondaryAction: () => setActivePage('services'),
      bgGradient: 'from-slate-950 via-emerald-950 to-slate-900',
      accentGlow: 'rgba(16, 185, 129, 0.25)',
      imageSrc: '/assets/aistudio/KHAN_SHOP_Modern_E-Commerce_Homepage_74a9bdaf.png',
      tagline: 'Best Quality • Fast Delivery • 24/7 Support',
    },
    {
      badge: '🔥 Exclusive Tech Deals',
      title: 'Next-Gen Laptops &',
      titleHighlight: 'Smart Gadgets',
      subtitle:
        'Latest Samsung S24, HP Laptops, Smartwatches & JBL Audio at guaranteed authentic wholesale prices.',
      ctaText: 'View Tech Deals ➔',
      ctaAction: () => {
        setSelectedCategory('Laptops');
        setActivePage('products');
      },
      secondaryText: 'Affiliate Specials',
      secondaryAction: () => setActivePage('products'),
      bgGradient: 'from-slate-950 via-sky-950 to-slate-900',
      accentGlow: 'rgba(14, 165, 233, 0.25)',
      imageSrc: '/assets/aistudio/KHAN_SHOP_Modern_E-Commerce_Showcase_d0f0c156.png',
      tagline: 'Official Warranty • Easy bKash & Nagad Checkout',
    },
    {
      badge: '✨ Lifestyle & Services',
      title: 'Premium Fashion &',
      titleHighlight: 'Creative Services',
      subtitle:
        'Explore winter jackets, Nike sneakers, backpacks, or hire us for Logo Design & E-Commerce Web Development.',
      ctaText: 'Explore Catalog ➔',
      ctaAction: () => setActivePage('products'),
      secondaryText: 'Order via WhatsApp',
      secondaryAction: () => setActivePage('contact'),
      bgGradient: 'from-slate-950 via-indigo-950 to-slate-900',
      accentGlow: 'rgba(99, 102, 241, 0.25)',
      imageSrc: '/assets/aistudio/Khan_Shop_Blue_E-Commerce_Catalog_889c4484.png',
      tagline: 'Custom Design • Instant Delivery • 100% Satisfaction',
    },
  ];

  // Auto rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[520px] lg:min-h-[580px] flex items-center transition-all duration-700">
      {/* Background Glow Overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 70% 50%, ${slide.accentGlow} 0%, transparent 60%)`,
        }}
      />

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{slide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {slide.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                {slide.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              {slide.subtitle}
            </p>

            {/* Quick Guarantees Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Best Quality</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <Truck className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>Fast & Secure</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                <Headphones className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={slide.ctaAction}
                className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{slide.ctaText}</span>
              </button>

              <button
                onClick={slide.secondaryAction}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 backdrop-blur-sm transition-all"
              >
                {slide.secondaryText}
              </button>
            </div>
          </div>

          {/* Right Column: Visual Product Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl backdrop-blur-md p-4 group">
              {/* Product preview / showcase photo */}
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-950">
                <img
                  src={slide.imageSrc}
                  alt="KHAN SHOP Banner"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Tags */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700/50">
                  <span className="font-semibold text-emerald-400">KHAN SHOP Official</span>
                  <span className="text-[11px] text-slate-300">Bogura, Dhunat</span>
                </div>
              </div>

              {/* Mini Features Footer */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
                <span>{slide.tagline}</span>
                <span className="text-emerald-400 font-bold">100% Genuine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators & Next/Prev */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-900 mt-8">
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx
                    ? 'w-8 bg-emerald-500'
                    : 'w-2 bg-slate-700 hover:bg-slate-600'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors border border-slate-800"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
