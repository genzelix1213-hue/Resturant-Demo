import React from 'react';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';

export const PrivacyPage: React.FC = () => {
  const { config } = useApp();

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead title="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <h1 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">Privacy Policy</h1>
        <p className="text-xs text-[#8D8984]">Last updated: August 2026</p>

        <div className="space-y-6 text-xs text-[#8D8984] leading-relaxed border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">1. Data Collection &amp; Purpose</h3>
            <p>
              At {config.name}, we collect basic customer information (such as your name, phone number, email address, and delivery address) strictly for table reservations, WhatsApp order processing, and guest inquiries.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">2. Demo Environment Notice</h3>
            <p>
              This website is a proposal demonstration for {config.name}. Table reservation requests and ordering details stored locally on your device or transmitted through WhatsApp are used solely to showcase website features. No sensitive payment information is collected online in this demo mode.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">3. Third-Party Services</h3>
            <p>
              We integrate third-party communications tools such as WhatsApp for instant order confirmation and Google Maps for restaurant location directions. We do not sell or trade guest information to advertising brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">4. Contact Us</h3>
            <p>
              For questions regarding privacy practices, please contact our restaurant management at {config.email} or call {config.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
