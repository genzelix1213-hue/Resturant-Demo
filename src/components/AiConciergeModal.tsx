import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_MENU_ITEMS } from '../data/menuItems';
import { MenuItem } from '../types';
import { Sparkles, X, Send, Bot, AlertTriangle, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RecommendedCombo {
  items: MenuItem[];
  totalCost: number;
  reasoning: string;
}

export const AiConciergeModal: React.FC = () => {
  const { isConciergeOpen, setIsConciergeOpen, config, formatPrice, addToCart, t } = useApp();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendedCombo | null>(null);

  if (!isConciergeOpen) return null;

  const starterPrompts = [
    'What can 2 people order under Rs. 3,000?',
    'Suggest a mild family feast deal.',
    'Which vegetarian dishes do you recommend?',
    'Recommend a signature BBQ dinner for 4 people.',
  ];

  const handleRecommend = (inputQuery: string) => {
    setLoading(true);
    setRecommendation(null);

    const q = inputQuery.toLowerCase();

    setTimeout(() => {
      let matchedItems: MenuItem[] = [];
      let reasoning = '';

      if (q.includes('3,000') || q.includes('3000') || q.includes('two people') || q.includes('2 people')) {
        const biryani = INITIAL_MENU_ITEMS.find((i) => i.id === 'pak-1')!;
        const boti = INITIAL_MENU_ITEMS.find((i) => i.id === 'bbq-2')!;
        const drink = INITIAL_MENU_ITEMS.find((i) => i.id === 'bev-1')!;
        matchedItems = [biryani, boti, drink];
        reasoning = 'For 2 people under Rs. 3,000, we paired our bestselling Saffron Malai Boti with Chicken Dum Biryani and 2 refreshing Mint Margaritas!';
      } else if (q.includes('mild') || q.includes('family')) {
        const platter = INITIAL_MENU_ITEMS.find((i) => i.id === 'bbq-1')!;
        const handi = INITIAL_MENU_ITEMS.find((i) => i.id === 'pak-3')!;
        const dessert = INITIAL_MENU_ITEMS.find((i) => i.id === 'des-2')!;
        matchedItems = [platter, handi, dessert];
        reasoning = 'Our recommended mild family menu includes the non-spicy Mughlai Handi, tender BBQ Platter, and traditional Zafrani Kheer.';
      } else if (q.includes('veg') || q.includes('vegetarian')) {
        const dal = INITIAL_MENU_ITEMS.find((i) => i.id === 'pak-4')!;
        const drink = INITIAL_MENU_ITEMS.find((i) => i.id === 'bev-2')!;
        const cake = INITIAL_MENU_ITEMS.find((i) => i.id === 'des-1')!;
        matchedItems = [dal, drink, cake];
        reasoning = 'Here are our top vegetarian choices: Slow-cooked Lahori Dal Makhani served with Saffron Mango Lassi and Belgian Lava Cake.';
      } else if (q.includes('bbq') || q.includes('4 people') || q.includes('four')) {
        const platter = INITIAL_MENU_ITEMS.find((i) => i.id === 'bbq-1')!;
        const bihari = INITIAL_MENU_ITEMS.find((i) => i.id === 'bbq-3')!;
        const karahi = INITIAL_MENU_ITEMS.find((i) => i.id === 'pak-2')!;
        matchedItems = [platter, bihari, karahi];
        reasoning = 'For a feast of 4 BBQ enthusiasts, we combine the Royal BBQ Platter, Spicy Beef Bihari Kebab, and Desi Ghee Mutton Karahi!';
      } else {
        // Fallback default selection
        const item1 = INITIAL_MENU_ITEMS.find((i) => i.isPopular)!;
        const item2 = INITIAL_MENU_ITEMS.find((i) => i.category === 'continental')!;
        const item3 = INITIAL_MENU_ITEMS.find((i) => i.category === 'beverages')!;
        matchedItems = [item1, item2, item3];
        reasoning = `Based on your request, our Food Concierge selects these signature culinary creations from ${config.name}!`;
      }

      const totalCost = matchedItems.reduce((sum, item) => sum + item.price, 0);
      setRecommendation({ items: matchedItems, totalCost, reasoning });
      setLoading(false);
    }, 600);
  };

  const addAllToCart = () => {
    if (!recommendation) return;
    recommendation.items.forEach((item) => addToCart(item, 1));
    setIsConciergeOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#1c1a18] border border-white/10 rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl relative flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-[#151311] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D9A441]/10 border border-[#D9A441]/40 flex items-center justify-center text-[#D9A441]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg text-[#FFFDF8] font-medium">
                    {t('concierge.title')}
                  </h3>
                  <span className="text-[9px] bg-[#D9A441] text-[#151311] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {t('concierge.badge')}
                  </span>
                </div>
                <p className="text-xs text-[#8D8984]">
                  Personalized dining &amp; menu recommendation engine for {config.name}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsConciergeOpen(false)}
              className="p-2 text-[#8D8984] hover:text-white rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Starter Prompts */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                Suggested Questions
              </span>
              <div className="flex flex-wrap gap-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(prompt);
                      handleRecommend(prompt);
                    }}
                    className="text-xs bg-[#151311] border border-white/10 hover:border-[#D9A441] hover:text-[#D9A441] text-[#F7F1E7]/90 px-3 py-1.5 rounded-full transition-colors text-left"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) handleRecommend(query);
              }}
              className="relative"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('concierge.placeholder')}
                className="w-full bg-[#151311] border border-white/15 rounded-xl px-4 py-3 text-xs text-[#FFFDF8] placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none pr-12"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 px-3 bg-[#7A1F2B] disabled:opacity-50 text-white rounded-lg hover:brightness-110 flex items-center justify-center transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Loading Indicator */}
            {loading && (
              <div className="py-8 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-[#D9A441] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs text-[#8D8984] animate-pulse">
                  Analyzing flavors, spice levels, and menu combinations...
                </p>
              </div>
            )}

            {/* Recommendation Result */}
            {recommendation && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#151311] border border-[#D9A441]/30 rounded-xl p-5 space-y-4 shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif text-[#D9A441] font-semibold text-sm">
                      Chef Concierge Recommendation
                    </h4>
                    <p className="text-xs text-[#F7F1E7]/90 leading-relaxed mt-1">
                      {recommendation.reasoning}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-3">
                  {recommendation.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-2.5 bg-[#1c1a18] rounded-lg border border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h5 className="text-xs font-serif text-[#FFFDF8] font-medium">
                            {item.name}
                          </h5>
                          <span className="text-[10px] text-[#8D8984]">
                            {item.category.toUpperCase()} • {item.prepTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#D9A441]">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="text-xs">
                    <span className="text-[#8D8984]">Total Package: </span>
                    <span className="text-[#D9A441] font-bold text-sm">
                      {formatPrice(recommendation.totalCost)}
                    </span>
                  </div>

                  <button
                    onClick={addAllToCart}
                    className="px-4 py-2.5 bg-[#7A1F2B] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 shadow"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All To Basket</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 p-3 bg-[#151311] rounded-lg border border-white/5 text-[10px] text-[#8D8984]">
              <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p>{t('concierge.disclaimer')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
