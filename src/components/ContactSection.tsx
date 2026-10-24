import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ContactSection: React.FC = () => {
  const { settings } = useShop();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Send formatted message via WhatsApp
    const formatted = `Hello KHAN SHOP!\nMy Name: ${name}\nPhone: ${phone || 'N/A'}\nMessage: ${message}`;
    const url = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(formatted)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 animate-fadeIn">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          We're Here to Help You 24/7
        </h1>
        <p className="text-slate-500 text-sm">
          Have an inquiry about a product, custom order, digital service, or bKash/Nagad payment? Contact our team directly.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <a
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 hover:border-emerald-400 shadow-sm transition-all text-center space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow group-hover:scale-110 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">WhatsApp Chat</h4>
            <p className="text-xs text-emerald-700 font-bold mt-1">
              {settings.phone}
            </p>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Instant reply within minutes
            </span>
          </div>
        </a>

        <a
          href={`tel:${settings.phone}`}
          className="p-6 rounded-3xl bg-sky-50/70 border border-sky-200 hover:border-sky-400 shadow-sm transition-all text-center space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center mx-auto shadow group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">Direct Phone Call</h4>
            <p className="text-xs text-sky-700 font-bold mt-1">
              {settings.phone}
            </p>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              9:00 AM - 10:00 PM Daily
            </span>
          </div>
        </a>

        <a
          href={`mailto:${settings.email}`}
          className="p-6 rounded-3xl bg-indigo-50/70 border border-indigo-200 hover:border-indigo-400 shadow-sm transition-all text-center space-y-3 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">Official Email</h4>
            <p className="text-xs text-indigo-700 font-bold mt-1">
              {settings.email}
            </p>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Wholesale & Corporate Inquiries
            </span>
          </div>
        </a>

        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-black text-slate-900 text-sm">Store Location</h4>
            <p className="text-xs text-slate-700 font-bold mt-1">
              {settings.address}
            </p>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Bogura, Dhunat
            </span>
          </div>
        </div>
      </div>

      {/* Contact Form & Location Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-2">
            Send an Instant Message
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Fill out the form below and click submit to send directly to our WhatsApp support agent.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="01307355567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Your Inquiry / Order Details *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Write your questions about products, availability, or custom digital orders..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-colors shadow-md shadow-emerald-600/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to WhatsApp</span>
            </button>

            {submitted && (
              <p className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 mt-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                <span>Message opened in WhatsApp! Our agent will reply shortly.</span>
              </p>
            )}
          </form>
        </div>

        {/* Operating Hours & Physical Details */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 className="text-lg font-black text-white">Visit Our Store</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Customers in Bogura and Dhunat are welcome to visit our retail pickup station to inspect smartphones, test laptops, or collect online orders directly.
          </p>

          <div className="space-y-4 pt-2 text-xs">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Support & Store Hours:</span>
                <span className="text-slate-400">Saturday – Thursday: 9:00 AM – 10:00 PM</span>
                <span className="text-slate-400 block">Friday: 2:30 PM – 10:00 PM</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Store Address:</span>
                <span className="text-slate-400">KHAN SHOP Retail Center, Dhunat Bazar, Bogura District, Rajshahi Division</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=Assalamu+Alaikum+KHAN+SHOP`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
