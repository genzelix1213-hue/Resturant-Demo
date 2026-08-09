import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: string;
  category: 'food' | 'interior' | 'events' | 'kitchen' | 'guests';
  title: string;
  caption: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    category: 'food',
    title: 'Royal Charcoal BBQ Platter',
    caption: 'Assorted charcoal grilled tikka and seekh kebabs served hot over live embers.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-2',
    category: 'food',
    title: 'Flame-Grilled Prime Tenderloin',
    caption: 'Aged beef tenderloin steak garnished with rosemary butter and wild mushroom reduction.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-3',
    category: 'interior',
    title: 'Warm Candlelit Dining Hall',
    caption: 'Spacious main dining hall with intimate warm lighting and soft luxury seating.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-4',
    category: 'interior',
    title: 'Private VIP Executive Suite',
    caption: 'Exclusive private dining section reserved for corporate dinners and family gatherings.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-5',
    category: 'food',
    title: 'Chicken Dum Biryani',
    caption: 'Fragrant Basmati rice cooked with saffron milk and caramelized onions on dum.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-6',
    category: 'kitchen',
    title: 'Master Chef at Live Grill Pit',
    caption: 'Our executive chef basting tender chicken boti with organic desi ghee over coals.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-7',
    category: 'events',
    title: 'Anniversary Dinner Setup',
    caption: 'Custom candlelit table decoration with fresh flower arrangements for special occasions.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-8',
    category: 'guests',
    title: 'Happy Family Celebration',
    caption: 'Generations coming together over our signature Family Feast Deal.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'g-9',
    category: 'food',
    title: 'Belgian Chocolate Lava Cake',
    caption: 'Freshly baked molten dark chocolate cake served with Madagascar vanilla ice cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=1000',
  },
];

export const GalleryPage: React.FC = () => {
  const { config } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => (prev === 0 ? filteredItems.length - 1 : (prev as number) - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => (prev === filteredItems.length - 1 ? 0 : (prev as number) + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead
        title="Food &amp; Ambience Gallery"
        description={`Browse high-resolution photography of ${config.name}'s luxury dining interior, live BBQ pits, signature dishes, and private event celebrations.`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
            Visual Experience
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            Restaurant Gallery
          </h1>
          <p className="text-sm text-[#8D8984]">
            Take a visual tour of our fine-dining atmosphere, live kitchen grills, signature dishes, and memorable guest moments.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {['all', 'food', 'interior', 'events', 'kitchen', 'guests'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveTab(cat);
                setSelectedImageIndex(null);
              }}
              className={`px-5 py-2 text-xs uppercase tracking-wider font-semibold rounded-full transition-all ${
                activeTab === cat
                  ? 'bg-[#D9A441] text-[#151311] font-bold shadow-lg'
                  : 'bg-[#1c1a18] border border-white/10 text-[#8D8984] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setSelectedImageIndex(index)}
              className="bg-[#1c1a18] border border-white/10 rounded-xl overflow-hidden shadow-xl cursor-pointer group relative h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold">
                  {item.category.toUpperCase()}
                </span>
                <h3 className="font-serif text-lg text-[#FFFDF8] font-medium mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8D8984] line-clamp-1 mt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-6 right-6 z-20 p-3 text-white/70 hover:text-white bg-white/10 rounded-full"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous Control */}
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === 0 ? filteredItems.length - 1 : (prev as number) - 1
                )
              }
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white bg-white/10 rounded-full"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Control */}
            <button
              onClick={() =>
                setSelectedImageIndex((prev) =>
                  prev === filteredItems.length - 1 ? 0 : (prev as number) + 1
                )
              }
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 text-white/70 hover:text-white bg-white/10 rounded-full"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            >
              <img
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <div className="mt-4 text-center max-w-xl space-y-1">
                <h3 className="font-serif text-xl text-[#D9A441]">
                  {filteredItems[selectedImageIndex].title}
                </h3>
                <p className="text-xs text-[#8D8984]">
                  {filteredItems[selectedImageIndex].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
