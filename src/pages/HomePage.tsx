import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { INITIAL_MENU_ITEMS } from '../data/menuItems';
import { SAMPLE_REVIEWS } from '../data/reviews';
import { SeoHead } from '../components/SeoHead';
import {
  Sparkles,
  ChevronDown,
  Flame,
  Clock,
  Utensils,
  Award,
  Users,
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Send,
  MapPin,
  Calendar,
  Check,
  Plus,
  Eye,
  ShoppingBag,
} from 'lucide-react';
import { motion } from 'motion/react';

export const HomePage: React.FC = () => {
  const { config, t, formatPrice, addToCart, setSelectedItemModal, language } = useApp();

  // Signature Dishes (6 items)
  const signatureDishes = INITIAL_MENU_ITEMS.slice(0, 6);

  // Interactive Menu Preview State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuSearch, setMenuSearch] = useState<string>('');

  const filteredPreviewItems = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  }).slice(0, 8);

  // Reviews Slider State
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? SAMPLE_REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev === SAMPLE_REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const currentReview = SAMPLE_REVIEWS[currentReviewIndex];

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7]">
      <SeoHead />

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden">
        {/* Dark Background Overlay & Grid Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#151311] via-[#151311]/90 to-[#151311]/60 z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-center gap-12 relative z-20 my-auto">
          {/* Hero Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-12 bg-[#D9A441]" />
              <span className="uppercase tracking-[0.35em] text-[10px] sm:text-xs text-[#D9A441] font-semibold">
                {config.heroEyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.05] font-light text-[#FFFDF8]">
              {config.heroHeading.split('.')[0]}.{' '}
              <br className="hidden sm:inline" />
              <span className="italic font-medium text-[#D9A441]">
                {config.heroHeading.split('.')[1] || 'a Memory.'}
              </span>
            </h1>

            <p className="text-[#8D8984] text-sm sm:text-base leading-relaxed max-w-lg">
              {config.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/menu"
                className="px-8 py-4 bg-[#7A1F2B] text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:brightness-110 shadow-lg shadow-[#7A1F2B]/20 transition-all flex items-center gap-2"
              >
                <span>{t('hero.exploreMenu')}</span>
              </Link>

              <Link
                to="/reservations"
                className="px-8 py-4 border border-white/20 text-white text-xs uppercase tracking-widest font-semibold rounded-sm hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <span>{t('hero.reserveTable')}</span>
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 mt-4 max-w-md">
              <div>
                <div className="text-2xl font-serif text-[#D9A441] font-bold">
                  {config.rating} <span className="text-xs text-[#8D8984]">/ 5</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8D8984] mt-0.5">
                  {t('hero.ratingLabel')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-serif text-[#D9A441] font-bold">
                  {config.happyGuestsCount}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8D8984] mt-0.5">
                  {t('hero.happyGuests')}
                </div>
              </div>
              <div>
                <div className="text-2xl font-serif text-[#D9A441] font-bold">
                  {config.experienceYears}+
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[#8D8984] mt-0.5">
                  {t('hero.experienceYears')}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Cards Collage */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="space-y-4">
                <div className="bg-[#1c1a18] rounded-xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col h-64">
                  <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3 bg-[#25221f]">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-serif italic text-[#D9A441]">Flame-Grilled Steak</h3>
                      <span className="text-[10px] text-[#8D8984]">{formatPrice(2799)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c1a18] rounded-xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col h-56">
                  <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3 bg-[#25221f]">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-serif italic text-[#D9A441]">Dum Biryani</h3>
                      <span className="text-[10px] text-[#8D8984]">{formatPrice(899)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="bg-[#1c1a18] rounded-xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col h-56">
                  <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3 bg-[#25221f]">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-serif italic text-[#D9A441]">Royal BBQ Platter</h3>
                      <span className="text-[10px] text-[#8D8984]">{formatPrice(4499)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c1a18] rounded-xl overflow-hidden border border-white/10 shadow-2xl group flex flex-col h-64">
                  <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center group-hover:scale-105 transition-transform duration-500" />
                  <div className="p-3 bg-[#25221f]">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xs font-serif italic text-[#D9A441]">Saffron Burger</h3>
                      <span className="text-[10px] text-[#8D8984]">{formatPrice(1299)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-20 flex justify-center pt-8">
          <a
            href="#signature-dishes"
            className="flex flex-col items-center text-[10px] uppercase tracking-widest text-[#8D8984] hover:text-[#D9A441] transition-colors"
          >
            <span>Scroll To Discover</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#D9A441]" />
          </a>
        </div>
      </section>

      {/* 2. SIGNATURE DISHES SECTION */}
      <section id="signature-dishes" className="py-24 px-6 sm:px-10 lg:px-16 bg-[#181614] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Chef's Masterpieces
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">
              {t('sections.signatureDishes')}
            </h2>
            <p className="text-sm text-[#8D8984]">
              {t('sections.signatureSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#1c1a18] border border-white/10 rounded-xl overflow-hidden shadow-xl hover:border-[#D9A441]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 overflow-hidden bg-black/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#D9A441] text-[#151311] text-[10px] uppercase font-bold px-2.5 py-1 rounded">
                        {dish.category.toUpperCase()}
                      </span>
                      {dish.spiceLevel > 0 && (
                        <span className="bg-black/70 text-amber-500 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-amber-500" />
                          <span>{['Mild', 'Medium', 'Spicy', 'Extra Spicy'][dish.spiceLevel]}</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedItemModal(dish)}
                      className="absolute bottom-3 right-3 bg-black/70 text-white p-2 rounded-full hover:bg-[#D9A441] hover:text-[#151311] transition-colors"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-xl text-[#FFFDF8] font-medium group-hover:text-[#D9A441] transition-colors">
                        {dish.name}
                      </h3>
                      <span className="text-lg font-serif font-bold text-[#D9A441]">
                        {formatPrice(dish.price)}
                      </span>
                    </div>

                    <p className="text-xs text-[#8D8984] leading-relaxed line-clamp-2">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3 border-t border-white/5">
                  <button
                    onClick={() => setSelectedItemModal(dish)}
                    className="text-xs text-[#8D8984] hover:text-[#D9A441] transition-colors underline underline-offset-4"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="px-4 py-2 bg-[#7A1F2B] hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center gap-1.5 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add To Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link
              to="/menu"
              className="px-8 py-3.5 border border-[#D9A441] text-[#D9A441] hover:bg-[#D9A441] hover:text-[#151311] text-xs font-semibold uppercase tracking-widest rounded transition-all"
            >
              {t('sections.viewFullMenu')}
            </Link>
          </div>
        </div>
      </section>

      {/* 3. RESTAURANT STORY SECTION */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#151311]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000"
                alt="Executive Chef preparing food"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#7A1F2B] rounded-2xl p-6 flex flex-col justify-center text-white z-20 shadow-2xl hidden sm:flex">
              <span className="font-serif text-4xl font-bold text-[#D9A441]">12+</span>
              <span className="text-xs uppercase tracking-wider font-semibold mt-1">
                Years of Culinary Heritage
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-0.5 w-10 bg-[#D9A441]" />
              <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
                Our Culinary Philosophy
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">
              {t('sections.ourStoryTitle')}
            </h2>

            <p className="text-sm text-[#8D8984] leading-relaxed">
              At {config.name}, every dish combines authentic recipes, quality ingredients and the creativity of experienced chefs. From intimate candle-lit dinners on MM Alam Road to grand family celebrations, we create dining experiences worth remembering.
            </p>

            <p className="text-sm text-[#8D8984] leading-relaxed">
              We source our spices directly from traditional growers and handpick farm-fresh organic produce daily. Every charcoal grill is cooked over live wood coals to ensure deep, unforgettable flavor.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-1">
                <h4 className="font-serif text-[#D9A441] text-lg">100% Halal &amp; Hygienic</h4>
                <p className="text-xs text-[#8D8984]">Strict kitchen sanitation standards.</p>
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-[#D9A441] text-lg">Master Charcoal Chefs</h4>
                <p className="text-xs text-[#8D8984]">Decades of specialized BBQ mastery.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="px-8 py-3.5 bg-[#7A1F2B] text-white text-xs font-semibold uppercase tracking-widest rounded hover:brightness-110 transition-all inline-block"
              >
                Discover Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="py-20 px-6 sm:px-10 lg:px-16 bg-[#181614] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Excellence Standard
            </span>
            <h2 className="text-3xl font-serif text-[#FFFDF8]">{t('sections.whyChooseUs')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-4 hover:border-[#D9A441]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#FFFDF8]">Fresh Daily Ingredients</h3>
              <p className="text-xs text-[#8D8984] leading-relaxed">
                Organically sourced meats and vegetables prepared fresh every morning.
              </p>
            </div>

            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-4 hover:border-[#D9A441]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#FFFDF8]">Master Executive Chefs</h3>
              <p className="text-xs text-[#8D8984] leading-relaxed">
                Award-winning chefs preserving traditional recipes with modern finesse.
              </p>
            </div>

            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-4 hover:border-[#D9A441]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#FFFDF8]">Luxury Family Dining</h3>
              <p className="text-xs text-[#8D8984] leading-relaxed">
                Spacious indoor hall, private dining rooms, and cozy outdoor seating.
              </p>
            </div>

            <div className="p-6 bg-[#1c1a18] border border-white/5 rounded-xl space-y-4 hover:border-[#D9A441]/40 transition-all">
              <div className="w-12 h-12 rounded-lg bg-[#D9A441]/10 text-[#D9A441] flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-[#FFFDF8]">Fast Delivery &amp; Takeaway</h3>
              <p className="text-xs text-[#8D8984] leading-relaxed">
                Piping hot delivery to your doorstep within selected areas of Lahore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE MENU PREVIEW */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#151311]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
                Live Culinary Catalog
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#FFFDF8]">
                {t('sections.interactiveMenu')}
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {['all', 'bbq', 'pakistani', 'continental', 'burgers', 'desserts', 'beverages'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                    activeCategory === cat
                      ? 'bg-[#D9A441] text-[#151311] shadow-lg'
                      : 'bg-[#1c1a18] border border-white/10 text-[#8D8984] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search menu items..."
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              className="w-full bg-[#1c1a18] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
            />
          </div>

          {/* Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPreviewItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#1c1a18] border border-white/5 rounded-xl overflow-hidden shadow-lg hover:border-[#D9A441]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-black/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base text-[#FFFDF8] font-medium">
                        {dish.name}
                      </h4>
                      <span className="text-xs font-bold text-[#D9A441]">
                        {formatPrice(dish.price)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8D8984] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="w-full py-2 bg-[#7A1F2B] hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add To Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPECIAL OFFER BANNER */}
      <section className="py-16 px-6 sm:px-10 lg:px-16 bg-gradient-to-r from-[#7A1F2B] to-[#54141d] relative overflow-hidden text-white shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="bg-[#D9A441] text-[#151311] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              {config.specialOffer.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FFFDF8]">
              {config.specialOffer.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {config.specialOffer.description}
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4 shrink-0">
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#D9A441]">
              {config.specialOffer.price}
            </div>
            <div className="flex gap-3">
              <Link
                to="/menu"
                className="px-6 py-3 bg-[#D9A441] text-[#151311] text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors"
              >
                View Deal
              </Link>
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${config.name}, I would like to order the ${config.specialOffer.title}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/40 text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RESTAURANT EXPERIENCE SECTION */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#151311]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Atmosphere &amp; Ambience
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#FFFDF8]">
              {t('sections.experience')}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative rounded-xl overflow-hidden group h-72 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
                alt="Fine Dining Atmosphere"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl text-[#FFFDF8]">Fine Dining &amp; Lighting</h3>
                <p className="text-xs text-[#8D8984] mt-1">Warm romantic candlelit seating.</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden group h-72 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800"
                alt="Family Gatherings"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl text-[#FFFDF8]">Family Gatherings</h3>
                <p className="text-xs text-[#8D8984] mt-1">Spacious halls for all celebrations.</p>
              </div>
            </div>

            <div className="relative rounded-xl overflow-hidden group h-72 border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
                alt="Live Charcoal BBQ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                <h3 className="font-serif text-xl text-[#FFFDF8]">Live Wood BBQ Pit</h3>
                <p className="text-xs text-[#8D8984] mt-1">Authentic flame-grilled aromas.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS SLIDER */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#181614] border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Verified Guest Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FFFDF8]">
              {t('sections.reviewsTitle')}
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="bg-[#1c1a18] border border-white/10 rounded-2xl p-8 sm:p-12 relative shadow-2xl">
            <div className="flex items-center gap-1 text-[#D9A441] mb-6">
              {[...Array(currentReview.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#D9A441]" />
              ))}
            </div>

            <p className="font-serif text-lg sm:text-2xl text-[#F7F1E7] italic leading-relaxed mb-8">
              "{language === 'ur' && currentReview.textUrdu ? currentReview.textUrdu : currentReview.text}"
            </p>

            <div className="flex items-center justify-between border-t border-white/5 pt-6">
              <div>
                <h4 className="font-serif font-semibold text-[#FFFDF8] text-base">
                  {currentReview.name}
                </h4>
                <p className="text-xs text-[#8D8984] mt-0.5">
                  {currentReview.visitType} • {currentReview.date}
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex gap-2">
                <button
                  onClick={prevReview}
                  className="p-3 rounded-full border border-white/10 text-white hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextReview}
                  className="p-3 rounded-full border border-white/10 text-white hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. RESERVATION CTA SECTION */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#151311] relative text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
            Online Table Booking
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            {t('sections.reservationTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#8D8984] leading-relaxed max-w-xl mx-auto">
            {t('sections.reservationSubtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link
              to="/reservations"
              className="px-8 py-4 bg-[#7A1F2B] text-white text-xs font-semibold uppercase tracking-widest rounded hover:brightness-110 shadow-lg transition-all"
            >
              {t('sections.bookTableNow')}
            </Link>
            <a
              href={`tel:${config.phone.replace(/\s+/g, '')}`}
              className="px-8 py-4 border border-white/20 text-white text-xs font-semibold uppercase tracking-widest rounded hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D9A441]" />
              <span>{t('sections.callRestaurant')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 10. LOCATION AND OPENING HOURS */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 bg-[#181614] border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Find Us In Lahore
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#FFFDF8]">
              {t('sections.locationAndHours')}
            </h2>

            <div className="space-y-4 text-xs text-[#8D8984] pt-2">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[#FFFDF8] text-sm">Restaurant Address</h4>
                  <p className="mt-0.5">{config.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[#FFFDF8] text-sm">Opening Hours</h4>
                  <p className="mt-0.5">{config.openingHours.weekdays}</p>
                  <p>{config.openingHours.weekends}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-[#FFFDF8] text-sm">Direct Phone &amp; WhatsApp</h4>
                  <p className="mt-0.5">{config.phone} • WhatsApp: {config.whatsapp}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(config.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#D9A441] text-[#151311] text-xs font-bold uppercase tracking-wider rounded hover:bg-white transition-colors"
              >
                {t('sections.getDirections')}
              </a>
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="px-5 py-2.5 border border-white/20 text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-white/5 transition-colors"
              >
                {t('sections.callNow')}
              </a>
              <a
                href={`https://wa.me/${config.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-black text-xs font-bold uppercase tracking-wider rounded hover:brightness-110 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 fill-black" />
                <span>{t('sections.whatsappUs')}</span>
              </a>
            </div>
          </div>

          {/* Responsive Google Maps Embed */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-80 lg:h-[400px] bg-[#1c1a18]">
            <iframe
              title="Restaurant Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.373400612745!2d74.34688!3d31.5126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190459c5555555%3A0x123456789abcdef!2sMM%20Alam%20Rd%2C%20Gulberg%20III%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
