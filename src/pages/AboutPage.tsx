import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';
import { Award, ShieldCheck, Heart, Sparkles, Flame, Clock, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { config } = useApp();

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead
        title="Our Culinary Story &amp; Heritage"
        description={`Learn about the history, executive chef philosophy, organic ingredient sourcing, and fine-dining standards of ${config.name} in Lahore.`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.35em]">
            Culinary Heritage &amp; Passion
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            The Story of {config.name}
          </h1>
          <p className="text-sm sm:text-base text-[#8D8984] leading-relaxed">
            Founded with a vision to elevate Pakistani charcoal BBQ and Continental fine dining in Lahore, combining centuries-old royal Mughlai recipes with modern culinary precision.
          </p>
        </div>

        {/* Origin & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-[#D9A441]">
              Food Crafted with Honor &amp; Authenticity
            </h2>
            <p className="text-xs sm:text-sm text-[#8D8984] leading-relaxed">
              At {config.name}, we believe that dining is not merely about sustenance—it is a sacred ritual of gathering, savoring, and celebrating life with family and friends.
            </p>
            <p className="text-xs sm:text-sm text-[#8D8984] leading-relaxed">
              Every spice blend used in our charcoal grills and handis is stone-ground by hand in our kitchen. We never use artificial flavor enhancers, synthetic colors, or frozen pre-cooked meats.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-[#1c1a18] rounded-xl border border-white/5 space-y-1">
                <Flame className="w-5 h-5 text-[#D9A441]" />
                <h4 className="font-serif text-[#FFFDF8] text-sm font-medium">Live Wood Coals</h4>
                <p className="text-[11px] text-[#8D8984]">Smoked using natural wood coals.</p>
              </div>
              <div className="p-4 bg-[#1c1a18] rounded-xl border border-white/5 space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#D9A441]" />
                <h4 className="font-serif text-[#FFFDF8] text-sm font-medium">100% Halal Verified</h4>
                <p className="text-[11px] text-[#8D8984]">Strict compliance &amp; organic farm meats.</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative h-96">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000"
              alt="Restaurant Dining Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Chef Introduction */}
        <div className="bg-[#181614] border border-white/10 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-1 rounded-xl overflow-hidden h-72 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=600"
              alt="Master Chef"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <span className="text-xs text-[#D9A441] uppercase tracking-wider font-semibold">
              Meet Our Executive Chef
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-[#FFFDF8]">
              Chef Tariq Mahmood Al-Mughal
            </h3>
            <p className="text-xs sm:text-sm text-[#8D8984] leading-relaxed">
              "Cooking for guests is an art form of hospitality. We preserve the original heritage of Mughlai saffron marinades, while introducing delicate Western steakhouse techniques to present dishes that delight both tradition-seekers and modern gourmets."
            </p>

            <div className="flex gap-6 pt-2 text-xs text-[#D9A441] font-semibold">
              <span>• 25+ Years Culinary Mastery</span>
              <span>• Specialist in Live BBQ &amp; Steaks</span>
            </div>
          </div>
        </div>

        {/* Milestone Timeline */}
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Our Journey
            </span>
            <h2 className="text-3xl font-serif text-[#FFFDF8]">Milestones of Growth</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-2">
              <span className="text-2xl font-serif text-[#D9A441] font-bold">2014</span>
              <h4 className="font-serif text-[#FFFDF8] text-sm">Founded in Lahore</h4>
              <p className="text-xs text-[#8D8984]">Opened our flagship location on MM Alam Road.</p>
            </div>
            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-2">
              <span className="text-2xl font-serif text-[#D9A441] font-bold">2018</span>
              <h4 className="font-serif text-[#FFFDF8] text-sm">Best BBQ Award</h4>
              <p className="text-xs text-[#8D8984]">Recognized as Lahore's top charcoal dining spot.</p>
            </div>
            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-2">
              <span className="text-2xl font-serif text-[#D9A441] font-bold">2022</span>
              <h4 className="font-serif text-[#FFFDF8] text-sm">Private Fine Dining Expansion</h4>
              <p className="text-xs text-[#8D8984]">Added VIP corporate and private event suites.</p>
            </div>
            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-2">
              <span className="text-2xl font-serif text-[#D9A441] font-bold">2026</span>
              <h4 className="font-serif text-[#FFFDF8] text-sm">Online Order &amp; Delivery</h4>
              <p className="text-xs text-[#8D8984]">Launched seamless WhatsApp dining &amp; home ordering.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#7A1F2B] to-[#401016] p-10 sm:p-14 rounded-2xl text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">
            Experience {config.name} Today
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Book your table for an unforgettable dining experience with family and friends.
          </p>
          <Link
            to="/reservations"
            className="px-8 py-3.5 bg-[#D9A441] text-[#151311] text-xs font-bold uppercase tracking-widest rounded hover:bg-white transition-colors inline-block"
          >
            Reserve Your Table Now
          </Link>
        </div>
      </div>
    </div>
  );
};
