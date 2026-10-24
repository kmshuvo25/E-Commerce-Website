import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Tag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ProductCategory, ProductBadge } from '../types';

export const ProductsCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    language,
  } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(80000);

  const categories: ProductCategory[] = [
    'All Products',
    'Mobiles',
    'Laptops',
    'Accessories',
    'Fashion',
    'Home & Living',
    'Digital Products',
  ];

  const badges = ['All', 'Hot', 'New', 'Sale', 'Digital', 'Affiliate'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All Products' && p.category !== selectedCategory) {
          return false;
        }
        // Badge filter
        if (selectedBadge !== 'All') {
          if (selectedBadge === 'Affiliate' && !p.isAffiliate) return false;
          if (selectedBadge !== 'Affiliate' && p.badge !== selectedBadge) return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedBadge, maxPrice, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All Products');
    setSelectedBadge('All');
    setSearchQuery('');
    setMaxPrice(80000);
    setSortBy('featured');
  };

  return (
    <div className="py-10 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
            Store Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {selectedCategory === 'All Products' ? 'All Products & Gadgets' : selectedCategory}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing {filteredProducts.length} results
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort By:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="py-2 px-3 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 shadow-sm"
          >
            <option value="featured">Featured / Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none flex-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Badge Filter */}
        <div className="flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
          <div className="flex gap-1">
            {badges.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBadge(b)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                  selectedBadge === b
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Search & Reset Chips */}
      {(searchQuery || selectedCategory !== 'All Products' || selectedBadge !== 'All') && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Active filters:</span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
              Query: "{searchQuery}"
              <X
                className="w-3 h-3 cursor-pointer hover:text-rose-500"
                onClick={() => setSearchQuery('')}
              />
            </span>
          )}
          {selectedCategory !== 'All Products' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
              {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer hover:text-rose-500"
                onClick={() => setSelectedCategory('All Products')}
              />
            </span>
          )}
          {selectedBadge !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-medium">
              {selectedBadge}
              <X
                className="w-3 h-3 cursor-pointer hover:text-rose-500"
                onClick={() => setSelectedBadge('All')}
              />
            </span>
          )}
          <button
            onClick={resetFilters}
            className="text-rose-600 hover:underline font-bold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Filter className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-800 text-lg">No Products Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            No products matched your active filters. Try adjusting your search keyword or clearing the filters.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
