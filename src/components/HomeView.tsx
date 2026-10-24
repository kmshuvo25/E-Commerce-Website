import React from 'react';
import { ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { HeroSlider } from './HeroSlider';
import { ValueProps } from './ValueProps';
import { CategoryNav } from './CategoryNav';
import { ProductCard } from './ProductCard';
import { PromoBanner } from './PromoBanner';
import { ServicesSection } from './ServicesSection';

export const HomeView: React.FC = () => {
  const { products, setActivePage, setSelectedCategory } = useShop();

  // Top 8 featured products
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="space-y-4">
      {/* Hero Banner Carousel */}
      <HeroSlider />

      {/* Trust & Guarantee Strip */}
      <ValueProps />

      {/* Categories Bar */}
      <CategoryNav />

      {/* Featured Products Section */}
      <section className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Handpicked Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Featured Products
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Top quality gadgets, phones, laptops, and essentials at the best price.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All Products');
              setActivePage('products');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Offer Promotional Banner */}
      <PromoBanner />

      {/* Showcase Grid of User Assets */}
      <section className="py-8 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => {
              setSelectedCategory('Mobiles');
              setActivePage('products');
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md border border-slate-200 aspect-[16/9] bg-slate-900"
          >
            <img
              src="/assets/aistudio/KHAN_SHOP_Modern_E-Commerce_Showcase_d0f0c156.png"
              alt="KHAN SHOP Showcase"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-sky-400">
                  New Arrival Deals
                </span>
                <h3 className="text-xl font-black text-white">Smart Gadgets & Audio</h3>
                <span className="text-xs font-bold text-sky-300 flex items-center gap-1 mt-1">
                  Shop Catalog ➔
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => {
              setSelectedCategory('Fashion');
              setActivePage('products');
            }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md border border-slate-200 aspect-[16/9] bg-slate-900"
          >
            <img
              src="/assets/aistudio/Khan_Shop_Blue_E-Commerce_Catalog_889c4484.png"
              alt="KHAN SHOP Catalog"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400">
                  Trending Collection
                </span>
                <h3 className="text-xl font-black text-white">Fashion & Lifestyle Gear</h3>
                <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 mt-1">
                  Explore Now ➔
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview on Homepage */}
      <ServicesSection />
    </div>
  );
};
