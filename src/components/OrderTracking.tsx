import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle2, Truck, AlertCircle, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const OrderTracking: React.FC = () => {
  const { orders, settings } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(orders[0] || null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const query = searchTerm.trim().toUpperCase();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === query ||
        o.customerPhone.includes(query) ||
        (o.transactionId && o.transactionId.toUpperCase() === query)
    );

    setSearchedOrder(found || null);
  };

  const steps = [
    { title: 'Order Placed', desc: 'Received in system' },
    { title: 'Payment Verified', desc: 'TrxID confirmed' },
    { title: 'Processing', desc: 'Packing & QA check' },
    { title: 'Shipped', desc: 'With courier partner' },
    { title: 'Delivered', desc: 'Arrived at your door' },
  ];

  const getStepIndex = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 0;
      case 'Payment Verified':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.status) : 0;

  const handleWhatsAppInquiry = () => {
    if (!searchedOrder) return;
    const message = `Hello KHAN SHOP! I am inquiring about Order #${searchedOrder.id} placed under ${searchedOrder.customerName}. Please update me on delivery ETA.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900">Track Your Order</h2>
        <p className="text-slate-500 text-sm">
          Enter your Order ID (e.g. <span className="font-mono font-bold text-emerald-600">KS-8942</span>) or Phone Number to check live shipment status.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSearch}
        className="flex items-center max-w-xl mx-auto rounded-2xl border-2 border-slate-200 focus-within:border-emerald-500 bg-white shadow-md p-1.5 transition-colors"
      >
        <Search className="w-5 h-5 text-slate-400 ml-3" />
        <input
          type="text"
          placeholder="Enter Order ID (e.g. KS-8942) or Phone Number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 py-2.5 px-3 text-sm focus:outline-none text-slate-800"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
        >
          Track Order
        </button>
      </form>

      {/* Results Box */}
      {searchedOrder ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xl space-y-8">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Order ID
                </span>
                <span className="font-mono font-black text-lg text-emerald-700">
                  #{searchedOrder.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Placed on: {searchedOrder.date}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                Status: {searchedOrder.status}
              </span>

              <button
                onClick={handleWhatsAppInquiry}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div>
            <div className="relative flex justify-between items-center max-w-2xl mx-auto">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />

              {steps.map((st, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-colors shadow-sm ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] font-bold mt-2 whitespace-nowrap ${
                        isPassed ? 'text-slate-900' : 'text-slate-400'
                      }`}
                    >
                      {st.title}
                    </span>
                    <span className="text-[10px] text-slate-400 hidden sm:block">
                      {st.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Items Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            {/* Delivery Details */}
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Shipping Information</h4>
              <p>
                <strong>Customer:</strong> {searchedOrder.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {searchedOrder.customerPhone}
              </p>
              <p>
                <strong>Address:</strong> {searchedOrder.address}, {searchedOrder.city}
              </p>
              <p>
                <strong>Payment Method:</strong>{' '}
                <span className="uppercase font-bold text-emerald-700">
                  {searchedOrder.paymentMethod}
                </span>{' '}
                ({searchedOrder.transactionId})
              </p>
            </div>

            {/* Order Items */}
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Ordered Items</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {searchedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="truncate pr-2">
                      {it.product.name} x {it.quantity}
                    </span>
                    <span className="font-bold text-slate-800">
                      ৳{(it.product.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-sm text-slate-900">
                <span>Total Paid:</span>
                <span className="text-emerald-700">
                  ৳{searchedOrder.totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="font-bold text-slate-800 text-lg">No Order Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            We couldn't locate any order with "<span className="font-mono">{searchTerm}</span>". Please verify your Order ID or contact KHAN SHOP on WhatsApp.
          </p>
        </div>
      ) : null}
    </div>
  );
};
