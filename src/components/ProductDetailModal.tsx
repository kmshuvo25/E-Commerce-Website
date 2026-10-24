import React, { useState } from 'react';
import { X, Star, ShoppingCart, MessageSquare, ShieldCheck, Truck, RefreshCw, Check, ExternalLink } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    setIsCheckoutOpen,
    settings,
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProduct) return null;

  const currentColor = selectedColor || (selectedProduct.colors ? selectedProduct.colors[0] : '');
  const currentSize = selectedSize || (selectedProduct.sizes ? selectedProduct.sizes[0] : '');

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentColor, currentSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, currentColor, currentSize);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleWhatsAppOrder = () => {
    const details = [
      `Product: ${selectedProduct.name}`,
      `Quantity: ${quantity}`,
      currentColor ? `Color: ${currentColor}` : '',
      currentSize ? `Size: ${currentSize}` : '',
      `Total Price: ৳${(selectedProduct.price * quantity).toLocaleString()}`,
    ]
      .filter(Boolean)
      .join('\n');

    const message = `Hello KHAN SHOP! I would like to order this item directly:\n\n${details}\n\nPlease confirm delivery address and bKash/Nagad/COD steps.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-slate-50 rounded-2xl p-6 flex items-center justify-center border border-slate-100 overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500 pt-2">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>100% Authentic</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <Truck className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                  <span>Fast Delivery</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <RefreshCw className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <span>7 Days Return</span>
                </div>
              </div>
            </div>

            {/* Right: Info & Actions */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                  {selectedProduct.category}
                </span>

                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 leading-snug">
                  {selectedProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating)
                            ? 'fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {selectedProduct.rating}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({selectedProduct.reviewsCount} customer reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ৳{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                {selectedProduct.discountPercent && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">
                    Save {selectedProduct.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Features List */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Key Specifications:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {selectedProduct.features.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-slate-700 font-medium"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700">
                    Select Color: <span className="text-emerald-600">{currentColor}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                          currentColor === c
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700">
                    Select Size: <span className="text-emerald-600">{currentSize}</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`w-9 h-9 text-xs font-bold rounded-lg border flex items-center justify-center transition-all ${
                          currentSize === s
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              {!selectedProduct.isAffiliate ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-base font-bold transition-colors"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 text-sm font-bold text-slate-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-2 text-slate-600 hover:bg-slate-200 text-base font-bold transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{addedNotice ? 'Added to Cart!' : 'Add to Cart'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleBuyNow}
                      className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm text-center"
                    >
                      Buy Now (bKash / Nagad)
                    </button>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-600" />
                      <span>WhatsApp Order</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-3">
                  <a
                    href={selectedProduct.affiliateUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <span>Proceed to Partner Store ({selectedProduct.affiliatePlatform})</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
