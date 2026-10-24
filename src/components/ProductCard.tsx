import React from 'react';
import { Star, ShoppingCart, Heart, ExternalLink, Check, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    cart,
    addToCart,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    settings,
    cardTheme,
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  // Professional Theme Styling based on theme
  const themeClasses = {
    'professional-slate': {
      card: 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-xl hover:shadow-slate-200/60',
      badgeBg: 'bg-slate-900 text-white',
      accentText: 'text-slate-900',
      btnPrimary: 'bg-slate-900 hover:bg-slate-800 text-white',
      btnWa: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200',
      price: 'text-slate-950 font-black',
    },
    'ocean-blue': {
      card: 'bg-white border-sky-100 hover:border-sky-300 shadow-sm hover:shadow-xl hover:shadow-sky-100/70',
      badgeBg: 'bg-sky-600 text-white',
      accentText: 'text-sky-600',
      btnPrimary: 'bg-sky-600 hover:bg-sky-700 text-white',
      btnWa: 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200',
      price: 'text-sky-950 font-black',
    },
    'emerald-green': {
      card: 'bg-white border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-xl hover:shadow-emerald-100/70',
      badgeBg: 'bg-emerald-600 text-white',
      accentText: 'text-emerald-600',
      btnPrimary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      btnWa: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200',
      price: 'text-slate-950 font-black',
    },
  }[cardTheme];

  // Badges color mapping
  const badgeColors: Record<string, string> = {
    Hot: 'bg-rose-500 text-white',
    New: 'bg-emerald-500 text-white',
    Sale: 'bg-amber-500 text-slate-950',
    Digital: 'bg-teal-500 text-white',
    Service: 'bg-purple-600 text-white',
    Affiliate: 'bg-blue-600 text-white',
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hello KHAN SHOP! I would like to order: ${product.name} (Price: ৳${product.price.toLocaleString()}). Please confirm delivery details.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <article
      onClick={() => setSelectedProduct(product)}
      className={`group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${themeClasses.card}`}
    >
      {/* Top Header Badge & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5">
          {product.badge && (
            <span
              className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-sm ${
                badgeColors[product.badge] || themeClasses.badgeBg
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.discountPercent && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2 rounded-full transition-all shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-500 scale-110'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Showcase */}
      <div className="relative w-full aspect-[4/3] bg-slate-50 flex items-center justify-center overflow-hidden p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
        />
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-800 text-sm sm:text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Pills if available */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.features.slice(0, 2).map((feat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
                >
                  {feat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-lg sm:text-xl ${themeClasses.price}`}>
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart or Affiliate Button */}
            {product.isAffiliate ? (
              <a
                href={product.affiliateUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Buy via {product.affiliatePlatform || 'Partner'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    inCartQty > 0
                      ? 'bg-emerald-600 text-white'
                      : themeClasses.btnPrimary
                  }`}
                >
                  {inCartQty > 0 ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added ({inCartQty})</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>+ Cart</span>
                    </>
                  )}
                </button>

                {/* WhatsApp Quick Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className={`flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold border transition-colors ${themeClasses.btnWa}`}
                  title="Direct WhatsApp Order"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate">WhatsApp</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
