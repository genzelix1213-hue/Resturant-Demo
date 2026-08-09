import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { RestaurantConfig, MenuItem, CartItem } from '../types';
import { getStoredConfig, saveConfigToStorage, resetConfigInStorage } from '../config/restaurantConfig';
import { translations } from '../i18n/translations';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  config: RestaurantConfig;
  updateConfig: (newConfig: RestaurantConfig) => void;
  resetConfig: () => void;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: (keyPath: string, params?: Record<string, string | number>) => string;
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, instructions?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedItemModal: MenuItem | null;
  setSelectedItemModal: (item: MenuItem | null) => void;
  isCustomizerOpen: boolean;
  setIsCustomizerOpen: (open: boolean) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: (mode: boolean) => void;
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  formatPrice: (amount: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'saffron_flame_cart_v1';
const FAV_STORAGE_KEY = 'saffron_flame_favs_v1';
const LANG_STORAGE_KEY = 'saffron_flame_lang_v1';
const PRESENTATION_STORAGE_KEY = 'saffron_flame_presentation_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [config, setConfigState] = useState<RestaurantConfig>(getStoredConfig());
  const [language, setLanguageState] = useState<'en' | 'ur'>(() => {
    return (localStorage.getItem(LANG_STORAGE_KEY) as 'en' | 'ur') || 'en';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAV_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isPresentationMode, setIsPresentationModeState] = useState<boolean>(() => {
    return localStorage.getItem(PRESENTATION_STORAGE_KEY) === 'true';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemModal, setSelectedItemModal] = useState<MenuItem | null>(null);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Update HTML dir attribute for Urdu RTL support
  useEffect(() => {
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Save favorites to local storage
  useEffect(() => {
    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const updateConfig = (newConfig: RestaurantConfig) => {
    setConfigState(newConfig);
    saveConfigToStorage(newConfig);
    showToast('Restaurant settings updated live!', 'success');
  };

  const resetConfig = () => {
    const fresh = resetConfigInStorage();
    setConfigState(fresh);
    showToast('Settings reset to default proposal configuration.', 'info');
  };

  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
  };

  const setIsPresentationMode = (mode: boolean) => {
    setIsPresentationModeState(mode);
    localStorage.setItem(PRESENTATION_STORAGE_KEY, String(mode));
    if (mode) setIsCustomizerOpen(false);
    showToast(mode ? 'Presentation Mode ON: Developer controls hidden.' : 'Presentation Mode OFF.', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (item: MenuItem, quantity = 1, instructions = '') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.instructions === instructions
      );
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { menuItem: item, quantity, instructions }];
      }
    });
    const itemName = language === 'ur' && item.nameUrdu ? item.nameUrdu : item.name;
    showToast(`Added ${quantity}x "${itemName}" to order basket.`, 'success');
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.menuItem.id !== itemId));
    showToast('Item removed from basket.', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.menuItem.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const cartSubtotal = cart.reduce((sum, ci) => {
    const price = ci.menuItem.discount
      ? ci.menuItem.price * (1 - ci.menuItem.discount / 100)
      : ci.menuItem.price;
    return sum + price * ci.quantity;
  }, 0);

  const cartDeliveryFee = cartSubtotal >= config.freeDeliveryThreshold || cartSubtotal === 0 ? 0 : config.deliveryFee;
  const cartTotal = cartSubtotal + cartDeliveryFee;
  const cartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const t = (keyPath: string, params?: Record<string, string | number>): string => {
    const keys = keyPath.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        // Fallback to English
        let fallback: any = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object' && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return keyPath;
          }
        }
        result = fallback;
        break;
      }
    }
    if (typeof result === 'string' && params) {
      Object.entries(params).forEach(([pK, pV]) => {
        result = result.replace(new RegExp(`\\{${pK}\\}`, 'g'), String(pV));
      });
    }
    return typeof result === 'string' ? result : keyPath;
  };

  const formatPrice = (amount: number): string => {
    const formattedNum = Math.round(amount).toLocaleString('en-US');
    return `${config.currency} ${formattedNum}`;
  };

  return (
    <AppContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        language,
        setLanguage,
        t,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartDeliveryFee,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        selectedItemModal,
        setSelectedItemModal,
        isCustomizerOpen,
        setIsCustomizerOpen,
        isPresentationMode,
        setIsPresentationMode,
        favorites,
        toggleFavorite,
        isConciergeOpen,
        setIsConciergeOpen,
        toasts,
        showToast,
        formatPrice,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
