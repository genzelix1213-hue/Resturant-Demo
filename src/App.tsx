import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { AiConciergeModal } from './components/AiConciergeModal';
import { DemoCustomizerPanel } from './components/DemoCustomizerPanel';
import { FloatingActions } from './components/FloatingActions';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically when navigation path changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#151311] text-[#F7F1E7] flex flex-col font-sans selection:bg-[#D9A441] selection:text-[#151311]">
          <Header />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/reservations" element={<ReservationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          {/* Interactive Modals & Drawers */}
          <FoodDetailModal />
          <CartDrawer />
          <AiConciergeModal />
          <DemoCustomizerPanel />
          <FloatingActions />
          <ToastContainer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
