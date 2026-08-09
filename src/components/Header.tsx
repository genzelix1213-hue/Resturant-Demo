import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Sparkles, Menu as MenuIcon, X, Globe, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { config, language, setLanguage, t, cartCount, setIsCartOpen, setIsConciergeOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/menu', label: t('nav.menu') },
    { path: '/about', label: t('nav.about') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/reservations', label: t('nav.reservations') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex flex-col transition-all duration-300">
      {/* Announcement Bar */}
      {config.announcementText && (
        <div className="bg-[#7A1F2B] text-[#FFFDF8] py-1.5 px-4 text-center text-[10px] sm:text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 overflow-hidden">
          <span className="truncate">{config.announcementText}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <nav
        className={`px-4 sm:px-8 lg:px-12 py-3 sm:py-4 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#151311]/95 backdrop-blur-md border-white/10 shadow-xl'
            : 'bg-[#151311]/80 md:bg-transparent border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-[#D9A441] flex items-center justify-center rounded-full group-hover:scale-105 transition-transform bg-[#151311]">
              <span className="text-[#D9A441] font-serif font-bold text-lg italic">
                {getInitials(config.name)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-tight font-light text-[#FFFDF8]">
                {config.name.split('&')[0] || config.name}{' '}
                {config.name.includes('&') && (
                  <span className="text-[#D9A441] font-serif italic">&amp;</span>
                )}{' '}
                {config.name.split('&')[1] || ''}
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8D8984] font-medium hidden sm:inline">
                {config.location}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest font-medium text-[#F7F1E7]/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 relative hover:text-[#D9A441] ${
                    isActive ? 'text-[#D9A441] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D9A441]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons & Helpers */}
          <div className="flex items-center gap-3">
            {/* AI Concierge Trigger */}
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9A441]/40 bg-[#D9A441]/10 text-[#D9A441] text-[11px] font-medium uppercase tracking-wider hover:bg-[#D9A441] hover:text-[#151311] transition-all"
              title="Ask AI Concierge for Menu Guidance"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('nav.concierge')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 text-[11px] font-semibold uppercase tracking-wider text-[#F7F1E7]/80 hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#D9A441]" />
              <span>{language === 'en' ? 'اردو' : 'EN'}</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-white/10 text-[#FFFDF8] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
              aria-label="Shopping Basket"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#7A1F2B] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Online Desktop CTA */}
            <Link
              to="/menu"
              className="hidden md:inline-flex px-5 py-2.5 border border-[#D9A441] text-[#D9A441] text-[11px] uppercase tracking-widest font-semibold hover:bg-[#D9A441] hover:text-[#151311] transition-all rounded-sm shadow-sm"
            >
              {t('nav.orderOnline')}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-white/10 text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#151311] border-b border-white/10 px-6 py-6 shadow-2xl flex flex-col gap-4 overflow-hidden"
          >
            <div className="flex flex-col gap-3 text-sm uppercase tracking-wider font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-white/5 ${
                    location.pathname === link.path ? 'text-[#D9A441] font-bold' : 'text-[#F7F1E7]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConciergeOpen(true);
                }}
                className="w-full py-2.5 rounded border border-[#D9A441]/50 bg-[#D9A441]/10 text-[#D9A441] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('nav.concierge')}</span>
              </button>

              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#7A1F2B] text-white text-xs text-center uppercase tracking-widest font-semibold rounded"
              >
                {t('nav.orderOnline')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
