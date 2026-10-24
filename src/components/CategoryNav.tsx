import React from 'react';
import {
  LayoutGrid,
  Smartphone,
  Laptop,
  Headphones,
  Shirt,
  Home,
  CloudDownload,
  Wrench,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const CategoryNav: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActivePage } = useShop();

  const categories: { name: ProductCategory; icon: React.ElementType }[] = [
    { name: 'All Products', icon: LayoutGrid },
    { name: 'Mobiles', icon: Smartphone },
    { name: 'Laptops', icon: Laptop },
    { name: 'Accessories', icon: Headphones },
    { name: 'Fashion', icon: Shirt },
    { name: 'Home & Living', icon: Home },
    { name: 'Digital Products', icon: CloudDownload },
    { name: 'Services', icon: Wrench },
  ];

  const handleSelect = (category: ProductCategory) => {
    setSelectedCategory(category);
    if (category === 'Services') {
      setActivePage('services');
    } else {
      setActivePage('products');
    }
  };

  return (
    <div className="bg-slate-50/80 py-6 border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => handleSelect(cat.name)}
                className={`flex flex-col items-center gap-2 min-w-[90px] py-3 px-3 rounded-2xl transition-all duration-200 flex-shrink-0 group ${
                  isSelected
                    ? 'bg-white shadow-md border-2 border-emerald-500 scale-105'
                    : 'bg-white/60 hover:bg-white hover:shadow-sm border border-slate-200/70'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span
                  className={`text-xs font-bold text-center leading-tight whitespace-nowrap ${
                    isSelected ? 'text-emerald-700' : 'text-slate-700 group-hover:text-emerald-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
