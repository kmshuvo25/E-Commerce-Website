import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  Check,
  CreditCard,
  MessageSquare,
  Truck,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    settings,
    placeOrder,
    setActivePage,
  } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState(settings.phone || '01307355567');
  const [address, setAddress] = useState('Bogura, Dhunat');
  const [city, setCity] = useState('Bogura');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [paymentNumber, setPaymentNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const shippingFee = cartTotal >= settings.freeShippingThreshold ? 0 : 60;
  const grandTotal = cartTotal + shippingFee;

  const handleCopyNumber = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out all required customer details.');
      return;
    }

    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId.trim()) {
      alert(`Please enter your ${paymentMethod.toUpperCase()} Transaction ID (TrxID).`);
      return;
    }

    const order = placeOrder({
      customerName: name,
      customerPhone: phone,
      address,
      city,
      items: cart,
      totalAmount: grandTotal,
      paymentMethod,
      paymentNumber: paymentNumber || phone,
      transactionId: transactionId || (paymentMethod === 'cod' ? 'COD-PENDING' : 'TRX-DEFAULT'),
      notes,
    });

    setCompletedOrder(order);
  };

  const handleSendWhatsAppConfirmation = () => {
    if (!completedOrder) return;

    const message = [
      `Assalamu Alaikum KHAN SHOP!`,
      `I have just placed an order on the website:`,
      `Order ID: ${completedOrder.id}`,
      `Customer Name: ${completedOrder.customerName}`,
      `Phone: ${completedOrder.customerPhone}`,
      `Delivery Address: ${completedOrder.address}, ${completedOrder.city}`,
      `Payment Method: ${completedOrder.paymentMethod.toUpperCase()}`,
      completedOrder.transactionId ? `TrxID: ${completedOrder.transactionId}` : '',
      `Total Amount: ৳${completedOrder.totalAmount.toLocaleString()}`,
      `Please confirm receipt and dispatch my parcel. Thank you!`
    ]
      .filter(Boolean)
      .join('\n');

    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="font-bold text-slate-800 text-lg">
              {completedOrder ? 'Order Confirmed!' : 'Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCompletedOrder(null);
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {completedOrder ? (
            /* Order Success State */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Thank You For Your Order!
                </h3>
                <p className="text-slate-500 text-sm mt-1">
                  Your order has been received and is being processed by KHAN SHOP.
                </p>
              </div>

              {/* Order ID Pill */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-800 font-bold text-base">
                <span>Order ID:</span>
                <span className="text-emerald-600 font-black tracking-wide">
                  {completedOrder.id}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Recipient:</span>
                  <span>{completedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Phone:</span>
                  <span>{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Address:</span>
                  <span>
                    {completedOrder.address}, {completedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Payment Method:</span>
                  <span className="uppercase font-bold text-emerald-700">
                    {completedOrder.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between border-t border-emerald-200/60 pt-2 font-bold text-sm text-slate-900">
                  <span>Total Paid/Payable:</span>
                  <span>৳{completedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp Notification Button */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <button
                  onClick={handleSendWhatsAppConfirmation}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Send Confirmation to Shop WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setCompletedOrder(null);
                    setActivePage('tracking');
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                >
                  Track Order Status
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Delivery Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  1. Delivery Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="01307355567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="House, Road, Area (e.g. Dhunat Bazar, Bogura)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District / City
                    </label>
                    <input
                      type="text"
                      placeholder="Bogura"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, delivery in afternoon"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 bg-slate-50"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                  2. Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-2.5">
                  {/* bKash */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'bkash'
                        ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-black text-xs">
                      bK
                    </div>
                    <span className="text-xs font-bold text-slate-800">bKash</span>
                  </button>

                  {/* Nagad */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'nagad'
                        ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-xs">
                      NG
                    </div>
                    <span className="text-xs font-bold text-slate-800">Nagad</span>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">Cash on Delivery</span>
                  </button>
                </div>

                {/* bKash instructions */}
                {paymentMethod === 'bkash' && (
                  <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-200 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        bKash Personal / Merchant Number:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(settings.bkashNumber)}
                        className="flex items-center gap-1 text-pink-700 font-bold bg-pink-100 hover:bg-pink-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{settings.bkashNumber}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Please send <strong>৳{grandTotal.toLocaleString()}</strong> via "Send Money" to the number above, then enter your Transaction ID (TrxID) below:
                    </p>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BK9X2491A"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-white focus:outline-none focus:border-pink-500 uppercase font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* Nagad instructions */}
                {paymentMethod === 'nagad' && (
                  <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        Nagad Personal Number:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyNumber(settings.nagadNumber)}
                        className="flex items-center gap-1 text-orange-700 font-bold bg-orange-100 hover:bg-orange-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {copiedNumber ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{settings.nagadNumber}</span>
                      </button>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Please send <strong>৳{grandTotal.toLocaleString()}</strong> via "Send Money" to the number above, then enter your Transaction ID below:
                    </p>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. NG882103F"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-orange-200 bg-white focus:outline-none focus:border-orange-500 uppercase font-mono font-bold"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                    <p className="font-bold">Pay when you receive the products.</p>
                    <p className="text-[11px] text-emerald-700">
                      Our representative will call your number ({phone}) before delivery. Please keep exact cash ready.
                    </p>
                  </div>
                )}
              </div>

              {/* Total & Submit Button */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-600">Total Payable Amount:</span>
                  <span className="text-xl font-black text-slate-900">
                    ৳{grandTotal.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20"
                >
                  <span>Confirm Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
