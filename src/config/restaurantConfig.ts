import { RestaurantConfig } from '../types';

export const DEFAULT_RESTAURANT_CONFIG: RestaurantConfig = {
  name: "Saffron & Flame",
  tagline: "Where Every Meal Becomes a Memory",
  cuisine: "Pakistani, Continental, BBQ & Fine Dining",
  location: "Lahore, Pakistan",
  address: "MM Alam Road, Gulberg III, Lahore",
  city: "Lahore",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  email: "hello@saffronandflame.com",
  openingHours: {
    weekdays: "Monday – Thursday: 12:00 PM – 11:00 PM",
    weekends: "Friday – Sunday: 12:00 PM – 12:30 AM",
  },
  announcementText: "Free delivery on orders above Rs. 3,000 within selected areas. • Special Family Feast Deal: Starting from Rs. 5,999",
  heroEyebrow: "Authentic Flavours • Exceptional Experience",
  heroHeading: "Where Every Meal Becomes a Memory.",
  heroDescription: "Experience premium Pakistani, Continental and BBQ cuisine prepared with fresh ingredients, timeless recipes and modern presentation in the heart of Lahore.",
  specialOffer: {
    title: "Royal Family Feast Deal",
    description: "Enjoy a complete luxury feast including signature BBQ platter, chicken dum biryani, fresh naan, mint margarita drinks & chocolate lava cake.",
    price: "Starting from Rs. 5,999",
    badge: "Limited Time Offer",
  },
  currency: "Rs.",
  deliveryFee: 200,
  freeDeliveryThreshold: 3000,
  rating: 4.8,
  totalReviews: 1250,
  happyGuestsCount: "2,500+",
  experienceYears: 12,
  colors: {
    deepCharcoal: "#151311",
    warmCream: "#F7F1E7",
    richBurgundy: "#7A1F2B",
    goldenAmber: "#D9A441",
    softWhite: "#FFFDF8",
    mutedGray: "#8D8984",
  },
  socialLinks: {
    facebook: "https://facebook.com/saffronflame",
    instagram: "https://instagram.com/saffronandflame.lahore",
    twitter: "https://twitter.com/saffronflame",
    youtube: "https://youtube.com/c/saffronflame",
    tripadvisor: "https://tripadvisor.com",
  },
};

const STORAGE_KEY = 'saffron_flame_config_v1';

export const getStoredConfig = (): RestaurantConfig => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_RESTAURANT_CONFIG, ...parsed };
    }
  } catch (err) {
    console.error('Failed to parse restaurant config from localStorage:', err);
  }
  return DEFAULT_RESTAURANT_CONFIG;
};

export const saveConfigToStorage = (config: RestaurantConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save config to localStorage:', err);
  }
};

export const resetConfigInStorage = (): RestaurantConfig => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to reset config in localStorage:', err);
  }
  return DEFAULT_RESTAURANT_CONFIG;
};

export const validateConfigJson = (jsonString: string): { valid: boolean; data?: RestaurantConfig; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { valid: false, error: 'JSON payload must be a valid object.' };
    }
    if (!parsed.name || typeof parsed.name !== 'string') {
      return { valid: false, error: 'Missing required string field: "name"' };
    }
    if (!parsed.phone || typeof parsed.phone !== 'string') {
      return { valid: false, error: 'Missing required string field: "phone"' };
    }
    if (!parsed.whatsapp || typeof parsed.whatsapp !== 'string') {
      return { valid: false, error: 'Missing required string field: "whatsapp"' };
    }
    return { valid: true, data: { ...DEFAULT_RESTAURANT_CONFIG, ...parsed } };
  } catch (e: any) {
    return { valid: false, error: `Invalid JSON format: ${e.message}` };
  }
};
