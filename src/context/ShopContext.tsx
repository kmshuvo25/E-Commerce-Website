import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ServiceItem, CartItem, Order, ShopSettings, UserProfile, ProductCategory } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SERVICES, INITIAL_ORDERS, INITIAL_SHOP_SETTINGS } from '../data/mockData';

interface ShopContextType {
  products: Product[];
  services: ServiceItem[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  settings: ShopSettings;
  activePage: string;
  selectedCategory: ProductCategory;
  searchQuery: string;
  language: 'en' | 'bn';
  user: UserProfile | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isAuthOpen: boolean;
  selectedProduct: Product | null;
  cardTheme: 'professional-slate' | 'ocean-blue' | 'emerald-green';
  setCardTheme: (theme: 'professional-slate' | 'ocean-blue' | 'emerald-green') => void;
  setActivePage: (page: string) => void;
  setSelectedCategory: (cat: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setLanguage: (lang: 'en' | 'bn') => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  placeOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateSettings: (newSettings: Partial<ShopSettings>) => void;
  login: (email: string, name?: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('khan_shop_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('khan_shop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('khan_shop_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('khan_shop_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [settings, setSettings] = useState<ShopSettings>(() => {
    const saved = localStorage.getItem('khan_shop_settings');
    return saved ? JSON.parse(saved) : INITIAL_SHOP_SETTINGS;
  });

  const [cardTheme, setCardTheme] = useState<'professional-slate' | 'ocean-blue' | 'emerald-green'>(() => {
    const saved = localStorage.getItem('khan_shop_card_theme');
    return (saved as any) || 'professional-slate';
  });

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'bn'>('en');

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('khan_shop_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // LocalStorage syncing
  useEffect(() => {
    localStorage.setItem('khan_shop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('khan_shop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('khan_shop_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('khan_shop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('khan_shop_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('khan_shop_card_theme', cardTheme);
  }, [cardTheme]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('khan_shop_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('khan_shop_user');
    }
  }, [user]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: color || (product.colors ? product.colors[0] : undefined),
          selectedSize: size || (product.sizes ? product.sizes[0] : undefined),
        },
      ];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `KS-${randomNum}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: orderData.paymentMethod === 'cod' ? 'Pending' : 'Payment Verified',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // Product Management (Admin)
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const id = productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
    const newProduct: Product = { ...productData, id };
    setProducts((prev) => [newProduct, ...prev]);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const updateSettings = (newSettings: Partial<ShopSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const login = (email: string, name = 'Valued Customer', role: 'customer' | 'admin' = 'customer') => {
    setUser({
      email,
      name,
      phone: settings.phone,
      address: settings.address,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        services,
        cart,
        wishlist,
        orders,
        settings,
        activePage,
        selectedCategory,
        searchQuery,
        language,
        user,
        isCartOpen,
        isCheckoutOpen,
        isAuthOpen,
        selectedProduct,
        cardTheme,
        setCardTheme,
        setActivePage,
        setSelectedCategory,
        setSearchQuery,
        setLanguage,
        setIsCartOpen,
        setIsCheckoutOpen,
        setIsAuthOpen,
        setSelectedProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        placeOrder,
        updateOrderStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        updateSettings,
        login,
        logout,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
