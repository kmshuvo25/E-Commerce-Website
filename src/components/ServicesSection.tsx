import React from 'react';
import { Check, MessageSquare, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { services, settings, addToCart, setIsCheckoutOpen } = useShop();

  const handleWhatsAppBooking = (service: ServiceItem) => {
    const message = `Hello KHAN SHOP! I am interested in hiring you for:\n\n*Service:* ${service.title}\n*Price:* ৳${service.startingPrice.toLocaleString()}\n*Delivery:* ${service.deliveryTime}\n\nPlease share further details and requirements.`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOrderService = (service: ServiceItem) => {
    // Add as service item to cart
    addToCart({
      id: service.id,
      name: service.title,
      category: 'Services',
      price: service.startingPrice,
      rating: 5.0,
      reviewsCount: 30,
      image: service.image,
      badge: 'Service',
      description: service.description,
      inStock: true,
      stockCount: 99,
    });
    setIsCheckoutOpen(true);
  };

  return (
    <section className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Professional IT & Creative Solutions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Digital & Creative Services
        </h2>
        <p className="text-slate-500 text-sm">
          Expand your online presence with custom logo design, high-converting websites, and digital marketing managed by experts.
        </p>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="group rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {service.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-white shadow">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Service Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{service.deliveryTime}</span>
                  </div>
                </div>

                <h3 className="font-black text-slate-800 text-base group-hover:text-emerald-600 transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="pt-2 space-y-1.5 border-t border-slate-100">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 font-medium">Starting from:</span>
                <span className="text-lg font-black text-slate-900">
                  ৳{service.startingPrice.toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOrderService(service)}
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm text-center"
                >
                  Order Service
                </button>

                <button
                  onClick={() => handleWhatsAppBooking(service)}
                  className="py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
