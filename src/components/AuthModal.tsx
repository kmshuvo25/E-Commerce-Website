import React, { useState } from 'react';
import { X, User, Lock, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login } = useShop();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || 'Valued Shopper', 'customer');
    setIsAuthOpen(false);
  };

  const handleAdminDemoLogin = () => {
    login('admin@khanshop.com', 'Store Admin', 'admin');
    setIsAuthOpen(false);
  };

  const handleCustomerDemoLogin = () => {
    login('customer@gmail.com', 'Sujan Khan', 'customer');
    setIsAuthOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex border-b border-slate-100 mb-6 pb-2">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 pb-2 text-sm font-black transition-colors ${
              !isRegister
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Customer Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 pb-2 text-sm font-black transition-colors ${
              isRegister
                ? 'text-emerald-600 border-b-2 border-emerald-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Register Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sujan Khan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address / Phone
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="name@example.com or 01307355567"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
          >
            {isRegister ? 'Create Account' : 'Sign In to Account'}
          </button>
        </form>

        {/* Demo 1-Click Logins */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Quick 1-Click Access
          </span>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCustomerDemoLogin}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Demo Customer
            </button>
            <button
              onClick={handleAdminDemoLogin}
              className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
