import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    cartDeliveryFee,
    cartTotal,
    config,
    t,
    formatPrice,
    showToast,
  } = useApp();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryDiff = config.freeDeliveryThreshold - cartSubtotal;
  const isFreeDelivery = cartSubtotal >= config.freeDeliveryThreshold;
  const progressPercent = Math.min(100, (cartSubtotal / config.freeDeliveryThreshold) * 100);

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!customerName.trim() || !customerPhone.trim()) {
      showToast('Please enter your Name and Phone Number to complete WhatsApp checkout.', 'error');
      return;
    }

    if (orderType === 'delivery' && !address.trim()) {
      showToast('Please enter your delivery address.', 'error');
      return;
    }

    // Build WhatsApp message
    let message = `🍽️ *NEW ORDER REQUEST - ${config.name}*\n`;
    message += `----------------------------------------\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📞 *Phone:* ${customerPhone}\n`;
    message += `🚚 *Order Type:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'delivery') {
      message += `📍 *Delivery Address:* ${address}\n`;
    }
    if (notes.trim()) {
      message += `📝 *Order Notes:* ${notes}\n`;
    }
    message += `\n🛒 *ITEMS ORDERED:*\n`;

    cart.forEach((ci, idx) => {
      const itemPrice = ci.menuItem.discount
        ? ci.menuItem.price * (1 - ci.menuItem.discount / 100)
        : ci.menuItem.price;
      const itemSubtotal = itemPrice * ci.quantity;
      message += `${idx + 1}. *${ci.menuItem.name}* x ${ci.quantity} = ${formatPrice(itemSubtotal)}\n`;
      if (ci.instructions) {
        message += `   ↳ Note: _${ci.instructions}_\n`;
      }
    });

    message += `\n----------------------------------------\n`;
    message += `💵 *Subtotal:* ${formatPrice(cartSubtotal)}\n`;
    message += `🚛 *Delivery Fee:* ${orderType === 'pickup' ? 'Rs. 0 (Pickup)' : formatPrice(cartDeliveryFee)}\n`;
    message += `💰 *TOTAL AMOUNT:* ${formatPrice(orderType === 'pickup' ? cartSubtotal : cartTotal)}\n`;
    message += `----------------------------------------\n`;
    message += `Thank you! Please verify table/delivery slot availability.`;

    const encoded = encodeURIComponent(message);
    const cleanPhone = config.whatsapp.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    window.open(whatsappUrl, '_blank');
    showToast('Redirecting to WhatsApp with prefilled order details...', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="pointer-events-auto w-screen max-w-md bg-[#1c1a18] border-l border-white/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#151311]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#D9A441]" />
                <h3 className="font-serif text-xl font-medium text-[#FFFDF8]">
                  {t('cart.title')}
                </h3>
                <span className="text-xs bg-[#7A1F2B] text-white px-2 py-0.5 rounded-full font-bold">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#8D8984] hover:text-white rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {cart.length > 0 && (
              <div className="bg-[#151311] px-6 py-3 border-b border-white/5 space-y-1.5">
                <div className="text-[11px] text-[#F7F1E7]/90 flex justify-between font-medium">
                  {isFreeDelivery ? (
                    <span className="text-[#D9A441] font-bold">{t('cart.freeDeliveryApplied')}</span>
                  ) : (
                    <span>{t('cart.freeDeliveryNotice', { amount: Math.round(freeDeliveryDiff) })}</span>
                  )}
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full bg-[#25221f] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D9A441] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Item List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#8D8984]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-[#8D8984]">{t('cart.empty')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-[#8D8984]">
                    <span>Items in your order</span>
                    <button
                      onClick={clearCart}
                      className="text-red-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  </div>

                  {cart.map((ci) => {
                    const price = ci.menuItem.discount
                      ? ci.menuItem.price * (1 - ci.menuItem.discount / 100)
                      : ci.menuItem.price;
                    return (
                      <div
                        key={ci.menuItem.id}
                        className="p-3 bg-[#151311] border border-white/5 rounded-lg flex gap-3 items-center"
                      >
                        <img
                          src={ci.menuItem.image}
                          alt={ci.menuItem.name}
                          className="w-16 h-16 object-cover rounded bg-black/40"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-serif text-[#FFFDF8] truncate">
                            {ci.menuItem.name}
                          </h4>
                          <div className="text-xs text-[#D9A441] font-semibold mt-0.5">
                            {formatPrice(price * ci.quantity)}
                          </div>
                          {ci.instructions && (
                            <p className="text-[10px] text-[#8D8984] italic truncate mt-0.5">
                              "{ci.instructions}"
                            </p>
                          )}
                        </div>

                        {/* Quantity Adjuster */}
                        <div className="flex items-center border border-white/10 rounded overflow-hidden bg-[#1c1a18]">
                          <button
                            onClick={() => updateCartQuantity(ci.menuItem.id, ci.quantity - 1)}
                            className="p-1.5 text-xs hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#FFFDF8]">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(ci.menuItem.id, ci.quantity + 1)}
                            className="p-1.5 text-xs hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Order Type Toggle */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                      Order Option
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 bg-[#151311] rounded-lg border border-white/10">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 text-xs font-semibold rounded ${
                          orderType === 'delivery'
                            ? 'bg-[#7A1F2B] text-white shadow'
                            : 'text-[#8D8984] hover:text-white'
                        }`}
                      >
                        Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`py-2 text-xs font-semibold rounded ${
                          orderType === 'pickup'
                            ? 'bg-[#7A1F2B] text-white shadow'
                            : 'text-[#8D8984] hover:text-white'
                        }`}
                      >
                        Self Pickup
                      </button>
                    </div>

                    {/* Customer Inputs */}
                    <div className="space-y-2 pt-2">
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#151311] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp / Phone Number *"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#151311] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
                      />
                      {orderType === 'delivery' && (
                        <input
                          type="text"
                          placeholder="Complete Delivery Address (Sector, Block, Street) *"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#151311] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
                        />
                      )}
                      <input
                        type="text"
                        placeholder="Additional notes for kitchen/rider..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-[#151311] border border-white/10 rounded px-3 py-2 text-xs text-white placeholder:text-[#8D8984]/60 focus:border-[#D9A441] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Summary & Checkout Button */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#151311] space-y-4">
                <div className="space-y-1.5 text-xs text-[#8D8984]">
                  <div className="flex justify-between">
                    <span>{t('cart.subtotal')}</span>
                    <span className="text-[#FFFDF8] font-medium">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('cart.deliveryFee')}</span>
                    <span className="text-[#FFFDF8] font-medium">
                      {orderType === 'pickup'
                        ? 'Free Pickup'
                        : isFreeDelivery
                        ? 'FREE'
                        : formatPrice(cartDeliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-[#D9A441] pt-2 border-t border-white/10">
                    <span>{t('cart.total')}</span>
                    <span>{formatPrice(orderType === 'pickup' ? cartSubtotal : cartTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 fill-black" />
                  <span>{t('cart.whatsappCheckout')}</span>
                </button>

                <div className="flex items-start gap-2 p-2.5 bg-[#1c1a18] rounded border border-white/5 text-[10px] text-[#8D8984]">
                  <AlertCircle className="w-3.5 h-3.5 text-[#D9A441] shrink-0 mt-0.5" />
                  <p>{t('cart.demoNotice')}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
