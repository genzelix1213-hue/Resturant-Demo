import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Flame, Clock, Plus, Minus, ShoppingBag, Heart, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FoodDetailModal: React.FC = () => {
  const { selectedItemModal, setSelectedItemModal, addToCart, formatPrice, favorites, toggleFavorite, language } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    setQuantity(1);
    setInstructions('');
  }, [selectedItemModal]);

  // Trap Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItemModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedItemModal]);

  if (!selectedItemModal) return null;

  const item = selectedItemModal;
  const isFav = favorites.includes(item.id);
  const finalUnitPrice = item.discount
    ? item.price * (1 - item.discount / 100)
    : item.price;
  const totalPrice = finalUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(item, quantity, instructions);
    setSelectedItemModal(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#1c1a18] border border-white/10 rounded-xl overflow-hidden max-w-2xl w-full shadow-2xl relative my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedItemModal(null)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/10 hover:bg-[#7A1F2B] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(item.id)}
            className={`absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center border border-white/10 transition-colors ${
              isFav ? 'text-red-500 fill-red-500' : 'text-white hover:text-red-400'
            }`}
            aria-label="Favorite"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {/* Large Image Header */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#151311]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a18] via-transparent to-transparent" />

            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest bg-[#D9A441] text-[#151311] font-bold px-2.5 py-1 rounded">
                  {item.category.toUpperCase()}
                </span>
                {item.isPopular && (
                  <span className="ml-2 text-[10px] uppercase tracking-widest bg-[#7A1F2B] text-white font-bold px-2.5 py-1 rounded">
                    Popular
                  </span>
                )}
              </div>
              <div className="text-right">
                {item.discount && (
                  <span className="text-xs text-[#8D8984] line-through mr-2">
                    {formatPrice(item.price)}
                  </span>
                )}
                <span className="text-2xl font-serif text-[#D9A441] font-bold">
                  {formatPrice(finalUnitPrice)}
                </span>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex justify-between items-start gap-4">
                <h3 className="text-2xl sm:text-3xl font-serif font-medium text-[#FFFDF8]">
                  {item.name}
                </h3>
                {item.nameUrdu && (
                  <span className="font-serif text-lg text-[#D9A441] text-right dir-rtl">
                    {item.nameUrdu}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-xs text-[#8D8984] mt-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D9A441]" />
                  <span>Prep: {item.prepTime}</span>
                </div>
                {item.spiceLevel > 0 && (
                  <div className="flex items-center gap-1 text-amber-500 font-medium">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>
                      Spice: {['Mild', 'Medium', 'Spicy', 'Extra Spicy'][item.spiceLevel]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-[#8D8984] leading-relaxed">
              {language === 'ur' && item.descriptionUrdu ? item.descriptionUrdu : item.description}
            </p>

            {/* Ingredients */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold">
                  Key Ingredients &amp; Recipe Highlights
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-[#151311] border border-white/5 text-[11px] text-[#F7F1E7]/80"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                Special Preparation Requests
              </label>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="e.g., Less spicy, extra mint chutney, no mayonnaise..."
                rows={2}
                className="w-full bg-[#151311] border border-white/10 rounded-lg p-3 text-xs text-[#FFFDF8] focus:border-[#D9A441] focus:outline-none placeholder:text-[#8D8984]/50"
              />
            </div>

            {/* Quantity Selector & Add Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-[#151311]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-[#F7F1E7] hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#D9A441]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-[#F7F1E7] hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#7A1F2B] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add To Order Basket • {formatPrice(totalPrice)}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
