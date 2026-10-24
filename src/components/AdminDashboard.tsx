import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Settings,
  MessageSquare,
  ShieldCheck,
  Save,
  Palette,
  ExternalLink,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, ProductCategory, ProductBadge, Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    cardTheme,
    setCardTheme,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');

  // New / Edit Product Form State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Mobiles' as ProductCategory,
    price: 1000,
    originalPrice: 1200,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 15,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
    badge: 'New' as ProductBadge,
    description: '',
    isAffiliate: false,
    affiliateUrl: '',
    affiliatePlatform: '',
    inStock: true,
    stockCount: 20,
  });

  // Settings Form State
  const [brandSettings, setBrandSettings] = useState(settings);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  // Metric computations
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const verifiedOrders = orders.filter((o) => o.status === 'Payment Verified').length;

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Mobiles',
      price: 1000,
      originalPrice: 1200,
      discountPercent: 15,
      rating: 4.8,
      reviewsCount: 10,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80',
      badge: 'New',
      description: 'High quality authentic product with warranty.',
      isAffiliate: false,
      affiliateUrl: '',
      affiliatePlatform: '',
      inStock: true,
      stockCount: 25,
    });
    setIsEditingProduct(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      discountPercent: p.discountPercent || 0,
      rating: p.rating,
      reviewsCount: p.reviewsCount,
      image: p.image,
      badge: p.badge || 'New',
      description: p.description,
      isAffiliate: !!p.isAffiliate,
      affiliateUrl: p.affiliateUrl || '',
      affiliatePlatform: p.affiliatePlatform || '',
      inStock: p.inStock,
      stockCount: p.stockCount,
    });
    setIsEditingProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingId) {
      updateProduct({
        ...formData,
        id: editingId,
      });
    } else {
      addProduct(formData);
    }
    setIsEditingProduct(false);
  };

  const handleSaveBrandSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(brandSettings);
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 3000);
  };

  const handleWhatsAppCustomer = (order: Order) => {
    const message = `Hello ${order.customerName}! This is KHAN SHOP regarding your order #${order.id}. Current status is: ${order.status}.`;
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const fullPhone = cleanPhone.startsWith('880') ? cleanPhone : `88${cleanPhone}`;
    const url = `https://wa.me/${fullPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-8 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Admin Control Center
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your catalog, customer orders, bKash/Nagad transactions, and brand settings.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2">
          {(['overview', 'products', 'orders', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Total Sales</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  ৳{totalRevenue.toLocaleString()}
                </h3>
                <span className="text-[11px] text-emerald-600 font-bold">
                  +12% from last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Total Orders</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {orders.length}
                </h3>
                <span className="text-[11px] text-sky-600 font-bold">
                  {verifiedOrders} Verified
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Live Products</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {products.length}
                </h3>
                <span className="text-[11px] text-slate-500">
                  Across 7 Categories
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-400">Pending Actions</span>
                <h3 className="text-2xl font-black text-amber-600 mt-1">
                  {pendingOrders}
                </h3>
                <span className="text-[11px] text-slate-500">
                  COD or TrxID review
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Orders preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-base">Recent Customer Orders</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {orders.slice(0, 4).map((ord) => (
                  <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">
                        {ord.id} • {ord.customerName}
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        {ord.date} • {ord.paymentMethod.toUpperCase()} (TrxID: {ord.transactionId})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-slate-900">
                        ৳{ord.totalAmount.toLocaleString()}
                      </div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Controls Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base">Quick Shortcuts</h3>
              <div className="space-y-2.5">
                <button
                  onClick={handleOpenAdd}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Customize Logo & Store Details</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              Store Catalog ({products.length} Products)
            </h2>
            <button
              onClick={handleOpenAdd}
              className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Badge</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 border border-slate-100"
                        />
                        <span className="font-bold text-slate-800 max-w-[200px] truncate">
                          {p.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-600">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        ৳{p.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {p.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">
                            {p.badge}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {p.isAffiliate ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                            Affiliate
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                            Direct Sale
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-black text-slate-900">
            Customer Orders Management ({orders.length})
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Payment & TrxID</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Direct Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">#{ord.id}</div>
                        <div className="text-[10px] text-slate-400">{ord.date}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-800">{ord.customerName}</div>
                        <div className="text-[11px] text-slate-500">{ord.customerPhone}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[150px]">
                          {ord.address}, {ord.city}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="truncate max-w-[160px]">
                            {it.product.name} x{it.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        ৳{ord.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {ord.paymentMethod}
                        </span>
                        {ord.transactionId && (
                          <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                            Trx: {ord.transactionId}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) =>
                            updateOrderStatus(ord.id, e.target.value as Order['status'])
                          }
                          className="py-1 px-2 rounded-lg border border-slate-200 text-xs font-semibold bg-white focus:outline-none focus:border-emerald-500"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Payment Verified">Payment Verified</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleWhatsAppCustomer(ord)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900">Store & Logo Settings</h2>
            <p className="text-xs text-slate-500 mt-1">
              Customize shop brand name, logo image URL, contact details, and payment account numbers.
            </p>
          </div>

          <form onSubmit={handleSaveBrandSettings} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={brandSettings.shopName}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, shopName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={brandSettings.shopSubtitle}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, shopSubtitle: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Custom Logo URL */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Custom Logo URL (Leave blank to use default modern speed-cart logo)
              </label>
              <input
                type="url"
                placeholder="https://example.com/my-custom-logo.png"
                value={brandSettings.logoUrl || ''}
                onChange={(e) =>
                  setBrandSettings({ ...brandSettings, logoUrl: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={brandSettings.phone}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Number (with country code e.g. 8801307355567)
                </label>
                <input
                  type="text"
                  value={brandSettings.whatsappNumber}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, whatsappNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  bKash Payment Number
                </label>
                <input
                  type="text"
                  value={brandSettings.bkashNumber}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, bkashNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 bg-pink-50/30 focus:outline-none focus:border-pink-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nagad Payment Number
                </label>
                <input
                  type="text"
                  value={brandSettings.nagadNumber}
                  onChange={(e) =>
                    setBrandSettings({ ...brandSettings, nagadNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-orange-200 bg-orange-50/30 focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Shop Address
              </label>
              <input
                type="text"
                value={brandSettings.address}
                onChange={(e) =>
                  setBrandSettings({ ...brandSettings, address: e.target.value })
                }
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>

            {savedSettingsNotice && (
              <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings updated successfully!</span>
              </p>
            )}
          </form>
        </div>
      )}

      {/* Product Add / Edit Modal */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 mb-4">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as ProductCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="Mobiles">Mobiles</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Digital Products">Digital Products</option>
                    <option value="Services">Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge
                  </label>
                  <select
                    value={formData.badge}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        badge: e.target.value as ProductBadge,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <option value="New">New</option>
                    <option value="Hot">Hot</option>
                    <option value="Sale">Sale</option>
                    <option value="Digital">Digital</option>
                    <option value="Service">Service</option>
                    <option value="Affiliate">Affiliate</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Selling Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price (৳)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discount %
                  </label>
                  <input
                    type="number"
                    value={formData.discountPercent}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPercent: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              {/* Affiliate fields */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAffiliate}
                    onChange={(e) =>
                      setFormData({ ...formData, isAffiliate: e.target.checked })
                    }
                    className="rounded text-emerald-600"
                  />
                  <span>Is Affiliate / External Partner Product?</span>
                </label>

                {formData.isAffiliate && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Platform (e.g. Daraz Partner)"
                      value={formData.affiliatePlatform}
                      onChange={(e) =>
                        setFormData({ ...formData, affiliatePlatform: e.target.value })
                      }
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                    <input
                      type="url"
                      placeholder="Affiliate Link"
                      value={formData.affiliateUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, affiliateUrl: e.target.value })
                      }
                      className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="py-2 px-4 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  {editingId ? 'Update Product' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
