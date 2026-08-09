import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FloatingActions: React.FC = () => {
  const { config } = useApp();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prefilledMsg = encodeURIComponent(
    `Hello ${config.name}, I visited your website and would like more information.`
  );
  const cleanWhatsappPhone = config.whatsapp.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsappPhone}?text=${prefilledMsg}`;
  const callUrl = `tel:${config.phone.replace(/\s+/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 items-end pointer-events-none">
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 bg-[#1c1a18]/90 border border-white/10 text-[#D9A441] rounded-full flex items-center justify-center shadow-lg hover:bg-[#D9A441] hover:text-[#151311] transition-all"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Direct Call Floating Button */}
      <a
        href={callUrl}
        className="pointer-events-auto w-11 h-11 bg-[#7A1F2B] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
        aria-label="Call Restaurant"
        title={`Call ${config.name}`}
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform relative group"
        aria-label="WhatsApp Inquiry"
        title="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z" />
        </svg>

        {/* Tooltip */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#151311] text-[#FFFDF8] border border-white/10 text-xs px-3 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};
