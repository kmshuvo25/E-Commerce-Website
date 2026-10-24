export type ProductCategory =
  | 'All Products'
  | 'Mobiles'
  | 'Laptops'
  | 'Accessories'
  | 'Fashion'
  | 'Home & Living'
  | 'Digital Products'
  | 'Services';

export type ProductBadge = 'New' | 'Hot' | 'Sale' | 'Digital' | 'Service' | 'Affiliate';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: ProductBadge;
  description: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  isAffiliate?: boolean;
  affiliateUrl?: string;
  affiliatePlatform?: string;
  inStock: boolean;
  stockCount: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  startingPrice: number;
  deliveryTime: string;
  description: string;
  features: string[];
  image: string;
  badge?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export type PaymentMethod = 'bkash' | 'nagad' | 'cod';

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: string;
  city: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentNumber?: string;
  transactionId?: string;
  status: 'Pending' | 'Payment Verified' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  notes?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'customer' | 'admin';
}

export interface ShopSettings {
  shopName: string;
  shopSubtitle: string;
  logoText: string;
  logoSubtext: string;
  logoUrl?: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  bkashNumber: string;
  nagadNumber: string;
  freeShippingThreshold: number;
  currencySymbol: string;
  primaryColor: string;
}
