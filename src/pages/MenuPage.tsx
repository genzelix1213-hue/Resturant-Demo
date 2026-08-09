import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MENU_ITEMS } from '../data/menuItems';
import { MenuItem } from '../types';
import { SeoHead } from '../components/SeoHead';
import {
  Search,
  Filter,
  Flame,
  Clock,
  ShoppingBag,
  Eye,
  X,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'motion/react';

export const MenuPage: React.FC = () => {
  const { config, t, formatPrice, addToCart, setSelectedItemModal, language } = useApp();

  // Filters State
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyVegetarian, setOnlyVegetarian] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'bbq', label: 'BBQ Special' },
    { id: 'pakistani', label: 'Pakistani' },
    { id: 'continental', label: 'Continental' },
    { id: 'burgers', label: 'Burgers' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'beverages', label: 'Beverages' },
  ];

  // Filtering Logic
  const filteredItems = INITIAL_MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      (item.nameUrdu && item.nameUrdu.includes(search));

    const matchesVeg = !onlyVegetarian || item.isVegetarian;
    const matchesSpicy = !onlySpicy || (item.spiceLevel > 0);
    const matchesPopular = !onlyPopular || item.isPopular;

    return matchesCategory && matchesSearch && matchesVeg && matchesSpicy && matchesPopular;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0;
  });

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setOnlyVegetarian(false);
    setOnlySpicy(false);
    setOnlyPopular(false);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead
        title="Full Menu &amp; Specials"
        description={`Explore ${config.name}'s complete gourmet menu including Pakistani charcoal BBQ, Mutton Karahi, Flame-grilled steaks, and handcrafted desserts.`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
            Culinary Craftsmanship
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            Full Dining Menu
          </h1>
          <p className="text-sm text-[#8D8984]">
            All dishes prepared fresh to order using premium ingredients, authentic recipes, and live charcoal embers.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="bg-[#1c1a18] border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="w-4 h-4 text-[#8D8984] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by dish name or ingredient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#151311] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8D8984] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown & Mobile Filter Button */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="md:hidden px-4 py-2.5 bg-[#151311] border border-white/10 text-xs font-semibold text-[#D9A441] rounded-xl flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filter Dishes</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-[#8D8984]">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-[#151311] border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                >
                  <option value="featured">Featured / Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Desktop Category Pills */}
          <div className="hidden md:flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#D9A441] text-[#151311] font-bold shadow-md'
                    : 'bg-[#151311] text-[#8D8984] hover:text-white hover:border-[#D9A441]/40 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Desktop Toggles */}
          <div className="hidden md:flex items-center gap-6 pt-2 text-xs text-[#8D8984]">
            <label className="flex items-center gap-2 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={onlyVegetarian}
                onChange={(e) => setOnlyVegetarian(e.target.checked)}
                className="accent-[#D9A441] rounded"
              />
              <span>Vegetarian Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={onlySpicy}
                onChange={(e) => setOnlySpicy(e.target.checked)}
                className="accent-[#D9A441] rounded"
              />
              <span>Spicy Items</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-white">
              <input
                type="checkbox"
                checked={onlyPopular}
                onChange={(e) => setOnlyPopular(e.target.checked)}
                className="accent-[#D9A441] rounded"
              />
              <span>Bestsellers Only</span>
            </label>

            {(search || selectedCategory !== 'all' || onlyVegetarian || onlySpicy || onlyPopular) && (
              <button
                onClick={resetFilters}
                className="text-[#D9A441] hover:underline text-xs flex items-center gap-1 ml-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-[#8D8984]">
          <span>Showing {filteredItems.length} menu items</span>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#1c1a18] border border-white/10 rounded-2xl p-16 text-center space-y-4">
            <Filter className="w-12 h-12 text-[#8D8984] mx-auto" />
            <h3 className="font-serif text-xl text-[#FFFDF8]">No menu items found</h3>
            <p className="text-xs text-[#8D8984] max-w-sm mx-auto">
              No dishes match your active search and filter criteria. Try adjusting your filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#7A1F2B] text-white text-xs uppercase font-semibold rounded hover:brightness-110"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((dish) => (
              <div
                key={dish.id}
                className="bg-[#1c1a18] border border-white/10 rounded-xl overflow-hidden shadow-xl hover:border-[#D9A441]/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span className="bg-[#D9A441] text-[#151311] text-[9px] uppercase font-bold px-2 py-0.5 rounded">
                        {dish.category.toUpperCase()}
                      </span>
                      {dish.spiceLevel > 0 && (
                        <span className="bg-black/80 text-amber-500 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Flame className="w-3 h-3 fill-amber-500" />
                          <span>{dish.spiceLevel}</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedItemModal(dish)}
                      className="absolute bottom-2.5 right-2.5 bg-black/70 text-white p-2 rounded-full hover:bg-[#D9A441] hover:text-[#151311] transition-colors"
                      title="Quick View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-serif text-lg text-[#FFFDF8] font-medium group-hover:text-[#D9A441] transition-colors">
                        {dish.name}
                      </h3>
                    </div>
                    {dish.nameUrdu && (
                      <p className="text-xs text-[#D9A441] font-serif dir-rtl">{dish.nameUrdu}</p>
                    )}

                    <div className="text-sm font-bold text-[#D9A441] pt-1">
                      {formatPrice(dish.price)}
                    </div>

                    <p className="text-xs text-[#8D8984] line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => setSelectedItemModal(dish)}
                    className="px-3 py-2 border border-white/10 text-xs text-[#8D8984] hover:text-white rounded transition-colors"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => addToCart(dish, 1)}
                    className="flex-1 py-2 bg-[#7A1F2B] hover:brightness-110 text-white text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-all"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-[#1c1a18] border-l border-white/10 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-lg text-[#FFFDF8]">Filter Menu</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-[#8D8984] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase text-[#D9A441] font-semibold block">Category</label>
                <div className="flex flex-col gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setMobileFiltersOpen(false);
                      }}
                      className={`py-2 px-3 text-left text-xs rounded ${
                        selectedCategory === cat.id
                          ? 'bg-[#D9A441] text-[#151311] font-bold'
                          : 'text-[#8D8984] hover:text-white'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-[#8D8984]">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyVegetarian}
                    onChange={(e) => setOnlyVegetarian(e.target.checked)}
                    className="accent-[#D9A441]"
                  />
                  <span>Vegetarian Only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlySpicy}
                    onChange={(e) => setOnlySpicy(e.target.checked)}
                    className="accent-[#D9A441]"
                  />
                  <span>Spicy Items</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyPopular}
                    onChange={(e) => setOnlyPopular(e.target.checked)}
                    className="accent-[#D9A441]"
                  />
                  <span>Bestsellers Only</span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-[#7A1F2B] text-white text-xs font-semibold uppercase tracking-wider rounded"
            >
              Apply &amp; View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
