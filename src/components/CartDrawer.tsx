import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare, Tag, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    settings,
    setIsCheckoutOpen,
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'KHAN20' || code === 'SPECIAL20') {
      setDiscountPercent(20);
      setPromoMessage('20% discount applied successfully!');
    } else if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoMessage('10% welcome discount applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try: KHAN20');
      setDiscountPercent(0);
    }
  };

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const isFreeShipping = cartTotal >= settings.freeShippingThreshold || cartTotal === 0;
  const shippingFee = isFreeShipping ? 0 : 60;
  const finalTotal = cartTotal - discountAmount + shippingFee;

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const itemsSummary = cart
      .map(
        (item) =>
          `• ${item.product.name}${
            item.selectedColor ? ` [${item.selectedColor}]` : ''
          }${item.selectedSize ? ` [${item.selectedSize}]` : ''} x ${
            item.quantity
          } = ৳${(item.product.price * item.quantity).toLocaleString()}`
      )
      .join('\n');

    const message = [
      'আসসালামু আলাইকুম, KHAN SHOP!',
      'আমি ওয়েবসাইট থেকে নিচের পণ্যগুলো অর্ডার করতে চাই:',
      '',
      itemsSummary,
      '',
      `সাবটোটাল: ৳${cartTotal.toLocaleString()}`,
      discountAmount > 0 ? `ডিসকাউন্ট: -৳${discountAmount.toLocaleString()}` : '',
      `ডেলিভারি চার্জ: ${shippingFee === 0 ? 'ফ্রি' : `৳${shippingFee}`}`,
      `মোট প্রদেয়: ৳${finalTotal.toLocaleString()}`,
      '',
      'দয়া করে আমার অর্ডারটি নিশ্চিত করার নিয়ম ও ডেলিভারি বিবরণ পাঠান।'
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-slate-800 text-lg">Your Shopping Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {cart.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-base">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore our top products!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-all shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-contain rounded-xl bg-slate-50 p-1 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        {item.selectedColor && (
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-slate-100 px-1.5 py-0.5 rounded">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/70 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon (use KHAN20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-emerald-500 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] font-semibold ${
                    discountPercent > 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {promoMessage}
                </p>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">
                    ৳{cartTotal.toLocaleString()}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `৳${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-700 text-base">
                    ৳{finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Checkout (bKash / Nagad / COD)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>Order on WhatsApp with Invoice</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <button
                  onClick={clearCart}
                  className="hover:text-rose-500 transition-colors"
                >
                  Clear Cart
                </button>
                <span>100% Buyer Protection Guaranteed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
