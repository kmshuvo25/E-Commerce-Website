import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, ChevronDown, ShieldCheck, Truck, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Logo } from './Logo';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    cartCount,
    cartTotal,
    wishlist,
    setIsCartOpen,
    setIsAuthOpen,
    user,
    logout,
    language,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories: ProductCategory[] = [
    'All Products',
    'Mobiles',
    'Laptops',
    'Accessories',
    'Fashion',
    'Home & Living',
    'Digital Products',
    'Services',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActivePage('products');
  };

  const navItems = [
    { id: 'home', label: language === 'bn' ? 'হোম' : 'Home' },
    { id: 'products', label: language === 'bn' ? 'পণ্য' : 'Products', hasDropdown: true },
    { id: 'services', label: language === 'bn' ? 'সার্ভিসেস' : 'Services' },
    { id: 'tracking', label: language === 'bn' ? 'অর্ডার ট্র্যাকিং' : 'Order Tracking' },
    { id: 'about', label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
    { id: 'contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100 transition-all">
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <div onClick={() => setActivePage('home')}>
          <Logo size="md" />
        </div>

        {/* Center Search Input */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:flex flex-1 max-w-2xl items-center rounded-xl border-2 border-slate-200 focus-within:border-emerald-500 overflow-hidden bg-slate-50 transition-colors shadow-inner"
        >
          {/* Category Dropdown */}
          <div className="relative border-r border-slate-200 bg-slate-100/70">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as ProductCategory);
                setActivePage('products');
              }}
              className="py-2.5 pl-3 pr-7 text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-3.5 pointer-events-none" />
          </div>

          <input
            type="text"
            placeholder={
              language === 'bn'
                ? 'পণ্য বা সার্ভিস খুঁজুন (যেমন: Laptop, S24, Backpack)...'
                : 'Search for products, services, gadgets...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2.5 px-4 text-sm bg-transparent focus:outline-none text-slate-800 placeholder-slate-400"
          />

          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 transition-colors flex items-center justify-center font-medium"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Action Buttons: Wishlist, Cart, User / Admin */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Wishlist */}
          <button
            onClick={() => {
              setActivePage('products');
            }}
            className="relative p-2 text-slate-700 hover:text-emerald-600 hover:bg-slate-50 rounded-xl transition-colors hidden sm:flex items-center"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Icon & Total */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all group"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="hidden sm:flex flex-col items-start leading-none text-left">
              <span className="text-[10px] text-emerald-700 font-semibold uppercase">Cart</span>
              <span className="text-xs font-bold text-slate-900">৳{cartTotal.toLocaleString()}</span>
            </div>
          </button>

          {/* User Account / Admin Badge */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePage(user.role === 'admin' ? 'admin' : 'tracking')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
              >
                {user.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ) : (
                  <UserIcon className="w-4 h-4 text-slate-600" />
                )}
                <span className="hidden md:inline max-w-[90px] truncate">{user.name}</span>
              </button>
              <button
                onClick={logout}
                title="Log Out"
                className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-emerald-500 text-xs font-bold text-slate-700 hover:text-emerald-600 transition-all"
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden sm:inline">
                {language === 'bn' ? 'লগইন / রেজিস্টার' : 'Login / Register'}
              </span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-3">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
        >
          <input
            type="text"
            placeholder={language === 'bn' ? 'পণ্য খুঁজুন...' : 'Search for products, services...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 py-2 px-3 text-sm bg-transparent focus:outline-none text-slate-800"
          />
          <button type="submit" className="bg-emerald-600 text-white p-2.5">
            <Search className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Desktop Navigation Links Strip */}
      <nav className="hidden lg:block border-t border-slate-100 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <div className="flex items-center gap-8 py-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => {
                    setActivePage(item.id);
                  }}
                  className={`flex items-center gap-1 text-sm font-semibold py-1 transition-colors ${
                    activePage === item.id
                      ? 'text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-slate-700 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />}
                </button>

                {/* Categories Dropdown for Products */}
                {item.hasDropdown && (
                  <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fadeIn">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setActivePage('products');
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-colors flex items-center justify-between ${
                          selectedCategory === cat ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Admin Dashboard Quick Link Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activePage === 'admin'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-left text-sm font-semibold transition-colors ${
                  activePage === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Category Chips */}
          <div className="pt-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Product Categories
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActivePage('products');
                    setMobileMenuOpen(false);
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    selectedCategory === cat
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                setActivePage('admin');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-800 bg-slate-100 px-3 py-2 rounded-lg"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Admin Dashboard
            </button>
            <button
              onClick={() => {
                setIsAuthOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-emerald-600"
            >
              {user ? user.name : 'Login / Register'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
