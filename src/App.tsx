import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ProductsCatalog } from './components/ProductsCatalog';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { OrderTracking } from './components/OrderTracking';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activePage } = useShop();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'products':
        return <ProductsCatalog />;
      case 'services':
        return <ServicesSection />;
      case 'about':
        return <AboutSection />;
      case 'contact':
        return <ContactSection />;
      case 'tracking':
        return <OrderTracking />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Notification Bar */}
      <TopBar />

      {/* Main Header & Nav */}
      <Navbar />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
};

export default App;
