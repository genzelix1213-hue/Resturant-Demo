export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tripadvisor?: string;
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  cuisine: string;
  location: string;
  address: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
  };
  announcementText: string;
  heroEyebrow: string;
  heroHeading: string;
  heroDescription: string;
  specialOffer: {
    title: string;
    description: string;
    price: string;
    badge: string;
  };
  currency: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  rating: number;
  totalReviews: number;
  happyGuestsCount: string;
  experienceYears: number;
  colors: {
    deepCharcoal: string;
    warmCream: string;
    richBurgundy: string;
    goldenAmber: string;
    softWhite: string;
    mutedGray: string;
  };
  socialLinks: SocialLinks;
}

export interface MenuItem {
  id: string;
  name: string;
  nameUrdu?: string;
  category: 'bbq' | 'pakistani' | 'continental' | 'burgers' | 'desserts' | 'beverages';
  description: string;
  descriptionUrdu?: string;
  price: number;
  image: string;
  dietaryLabels?: ('Vegetarian' | 'Gluten-Free' | 'Chef Special' | 'Halal' | 'Contains Nuts' | 'Popular')[];
  spiceLevel: 0 | 1 | 2 | 3; // 0: Mild, 1: Medium, 2: Spicy, 3: Extra Spicy
  prepTime: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  discount?: number; // percentage
  ingredients?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  instructions: string;
}

export interface Reservation {
  id: string;
  referenceNo: string;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference: 'indoor' | 'outdoor' | 'family' | 'private' | 'no_preference';
  occasion: 'regular' | 'birthday' | 'anniversary' | 'business' | 'family' | 'other';
  specialRequest?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  text: string;
  textUrdu?: string;
  visitType: string;
  date: string;
}
