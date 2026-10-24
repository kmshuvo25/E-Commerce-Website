import React from 'react';
import { useShop } from '../context/ShopContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'auto',
  showSubtitle = true,
}) => {
  const { settings } = useShop();

  if (settings.logoUrl) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <img
          src={settings.logoUrl}
          alt={settings.shopName}
          className={`${
            size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-10'
          } object-contain`}
        />
        <div>
          <span
            className={`font-black tracking-tight ${
              size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl'
            } ${variant === 'light' ? 'text-white' : 'text-slate-900'}`}
          >
            {settings.shopName}
          </span>
          {showSubtitle && (
            <p className="text-[10px] tracking-wider uppercase text-emerald-500 font-bold">
              {settings.shopSubtitle}
            </p>
          )}
        </div>
      </div>
    );
  }

  const iconSizes = {
    sm: { width: 34, height: 26, stroke: 2.2 },
    md: { width: 44, height: 34, stroke: 2.5 },
    lg: { width: 56, height: 42, stroke: 2.8 },
  };

  const currentIcon = iconSizes[size];

  return (
    <div className={`logo-container flex items-center gap-3 cursor-pointer select-none ${className}`}>
      {/* Dynamic Modern Speed Shopping Cart SVG matching user showcase */}
      <div className="relative flex items-center justify-center p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 shadow-sm">
        <svg
          width={currentIcon.width}
          height={currentIcon.height}
          viewBox="0 0 60 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 hover:scale-105"
        >
          {/* Speed Streaks */}
          <line x1="2" y1="12" x2="16" y2="12" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />
          <line x1="6" y1="19" x2="20" y2="19" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <line x1="2" y1="26" x2="14" y2="26" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" />

          {/* Cart Basket Body */}
          <path
            d="M17 10H23.5L28.5 32H50.5L56 14H24.5"
            stroke={variant === 'light' ? '#38bdf8' : '#0284c7'}
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Cart Wheels */}
          <circle cx="31" cy="38" r="4" fill="#10b981" />
          <circle cx="48" cy="38" r="4" fill="#0ea5e9" />
        </svg>
      </div>

      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1 font-black tracking-tight text-xl">
          <span className={variant === 'light' ? 'text-white' : 'text-slate-900'}>
            KHAN
          </span>
          <span className="text-emerald-500 font-extrabold">SHOP.</span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[10px] tracking-widest font-semibold uppercase ${
              variant === 'light' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {settings.shopSubtitle || 'Smart Shopping, Better Life'}
          </span>
        )}
      </div>
    </div>
  );
};
