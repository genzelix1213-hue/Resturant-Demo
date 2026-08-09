import React from 'react';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';

export const TermsPage: React.FC = () => {
  const { config } = useApp();

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead title="Terms &amp; Conditions" />
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-8">
        <h1 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">Terms &amp; Conditions</h1>
        <p className="text-xs text-[#8D8984]">Last updated: August 2026</p>

        <div className="space-y-6 text-xs text-[#8D8984] leading-relaxed border-t border-white/10 pt-6">
          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">1. Table Reservation Verification</h3>
            <p>
              Submitting an online table reservation request through this website generates a pending booking request. Reservations must be verified by restaurant staff or confirmed via WhatsApp to guarantee real-time seating availability during peak hours.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">2. Menu Pricing &amp; Item Availability</h3>
            <p>
              Menu prices, dish availability, seasonal specials, and delivery fees are subject to market conditions and kitchen supply. All prices are listed in Pakistani Rupees ({config.currency}).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">3. Food Allergies &amp; Dietary Guidance</h3>
            <p>
              Guests are responsible for communicating any severe food allergies, nut sensitivity, or specific dietary restrictions directly to their serving captain or in order notes.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-sm font-serif text-[#D9A441] font-semibold">4. Proposal Demonstration Notice</h3>
            <p>
              This website serves as a client proposal demonstration showcasing the design, customizer tools, and functionality for {config.name}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
