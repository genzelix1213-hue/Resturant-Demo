import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';
import { Reservation } from '../types';
import { Calendar, Clock, Users, Utensils, Send, CheckCircle2, AlertCircle, Phone, Info } from 'lucide-react';
import { motion } from 'motion/react';

const RESERVATION_STORAGE_KEY = 'saffron_flame_reservations_v1';

export const ReservationsPage: React.FC = () => {
  const { config, t, showToast } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [seatingPreference, setSeatingPreference] = useState<Reservation['seatingPreference']>('family');
  const [occasion, setOccasion] = useState<Reservation['occasion']>('regular');
  const [specialRequest, setSpecialRequest] = useState('');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!phone.trim() || phone.trim().length < 8) errs.phone = 'Valid phone number required.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address required.';
    if (!date || date < todayStr) errs.date = 'Reservation date cannot be in the past.';
    if (!time) errs.time = 'Please select a reservation time.';
    if (guests < 1 || guests > 30) errs.guests = 'Guests count must be between 1 and 30.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please fix the errors in the reservation form.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const refNo = `SF-RES-${Math.floor(10000 + Math.random() * 90000)}`;
      const newReservation: Reservation = {
        id: Math.random().toString(36).substring(2, 9),
        referenceNo: refNo,
        fullName,
        phone,
        email,
        date,
        time,
        guests,
        seatingPreference,
        occasion,
        specialRequest,
        createdAt: new Date().toISOString(),
        status: 'pending',
      };

      // Save to local storage
      try {
        const saved = localStorage.getItem(RESERVATION_STORAGE_KEY);
        const list: Reservation[] = saved ? JSON.parse(saved) : [];
        list.unshift(newReservation);
        localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(list));
      } catch (err) {
        console.error(err);
      }

      setConfirmedReservation(newReservation);
      setLoading(false);
      showToast('Table reservation request created successfully!', 'success');
    }, 800);
  };

  const handleWhatsAppConfirm = () => {
    if (!confirmedReservation) return;

    let msg = `🍷 *TABLE RESERVATION REQUEST - ${config.name}*\n`;
    msg += `----------------------------------------\n`;
    msg += `🏷️ *Ref No:* ${confirmedReservation.referenceNo}\n`;
    msg += `👤 *Name:* ${confirmedReservation.fullName}\n`;
    msg += `📞 *Phone:* ${confirmedReservation.phone}\n`;
    msg += `📅 *Date:* ${confirmedReservation.date}\n`;
    msg += `⏰ *Time:* ${confirmedReservation.time}\n`;
    msg += `👥 *Guests:* ${confirmedReservation.guests} Person(s)\n`;
    msg += `🪑 *Seating:* ${confirmedReservation.seatingPreference.toUpperCase()}\n`;
    msg += `🎉 *Occasion:* ${confirmedReservation.occasion.toUpperCase()}\n`;
    if (confirmedReservation.specialRequest) {
      msg += `📝 *Notes:* ${confirmedReservation.specialRequest}\n`;
    }
    msg += `----------------------------------------\n`;
    msg += `Please verify table availability for our party.`;

    const encoded = encodeURIComponent(msg);
    const cleanPhone = config.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead
        title="Reserve a Table"
        description={`Book your dining table online at ${config.name} on MM Alam Road. Enjoy luxury family dining, private corporate suites, and authentic Pakistani BBQ.`}
      />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
            Online Booking System
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            {t('reservation.title')}
          </h1>
          <p className="text-sm text-[#8D8984] max-w-xl mx-auto">
            {t('reservation.subtitle')}
          </p>
        </div>

        {/* Confirmation State */}
        {confirmedReservation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1c1a18] border border-[#D9A441]/40 rounded-2xl p-8 sm:p-12 space-y-6 shadow-2xl text-center"
          >
            <CheckCircle2 className="w-16 h-16 text-[#D9A441] mx-auto" />
            
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif text-[#FFFDF8]">
                {t('reservation.successTitle')}
              </h2>
              <p className="text-xs text-[#8D8984]">
                Your reservation request reference number is:
              </p>
              <div className="text-2xl font-mono font-bold text-[#D9A441] bg-[#151311] py-2 px-6 rounded-lg inline-block border border-white/10">
                {confirmedReservation.referenceNo}
              </div>
            </div>

            <div className="bg-[#151311] p-6 rounded-xl border border-white/5 text-left text-xs space-y-2 max-w-md mx-auto text-[#8D8984]">
              <div className="flex justify-between">
                <span>Guest Name:</span>
                <span className="text-[#FFFDF8] font-semibold">{confirmedReservation.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date &amp; Time:</span>
                <span className="text-[#FFFDF8] font-semibold">{confirmedReservation.date} at {confirmedReservation.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Party Size:</span>
                <span className="text-[#FFFDF8] font-semibold">{confirmedReservation.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span>Seating Area:</span>
                <span className="text-[#FFFDF8] font-semibold uppercase">{confirmedReservation.seatingPreference}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-4 bg-[#7A1F2B]/20 border border-[#7A1F2B]/40 rounded-xl text-left text-xs text-[#F7F1E7]">
              <Info className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
              <p>{t('reservation.demoNote')}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={handleWhatsAppConfirm}
                className="px-8 py-3.5 bg-[#25D366] text-black font-bold text-xs uppercase tracking-widest rounded-lg flex items-center gap-2 shadow-lg hover:brightness-110"
              >
                <Send className="w-4 h-4 fill-black" />
                <span>{t('reservation.confirmWhatsapp')}</span>
              </button>
              <button
                onClick={() => setConfirmedReservation(null)}
                className="px-6 py-3.5 border border-white/20 text-white text-xs uppercase tracking-widest rounded-lg hover:bg-white/5"
              >
                Make Another Reservation
              </button>
            </div>
          </motion.div>
        ) : (
          /* Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-[#1c1a18] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.fullName')} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mian Hamza"
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                />
                {errors.fullName && <p className="text-[11px] text-red-400">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.phone')} *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +92 300 1234567"
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                />
                {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.email')} *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. hamza@example.com"
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                />
                {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
              </div>

              {/* Guests Count */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.guests')} (1 - 30) *
                </label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                />
                {errors.guests && <p className="text-[11px] text-red-400">{errors.guests}</p>}
              </div>

              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.date')} *
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                />
                {errors.date && <p className="text-[11px] text-red-400">{errors.date}</p>}
              </div>

              {/* Time */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.time')} *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                >
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">01:30 PM (Lunch)</option>
                  <option value="19:00">07:00 PM (Dinner)</option>
                  <option value="19:30">07:30 PM (Dinner)</option>
                  <option value="20:30">08:30 PM (Dinner Prime)</option>
                  <option value="21:30">09:30 PM (Late Dinner)</option>
                  <option value="22:30">10:30 PM (Late Night)</option>
                </select>
                {errors.time && <p className="text-[11px] text-red-400">{errors.time}</p>}
              </div>

              {/* Seating Preference */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.seating')}
                </label>
                <select
                  value={seatingPreference}
                  onChange={(e: any) => setSeatingPreference(e.target.value)}
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                >
                  <option value="family">Family Dining Hall</option>
                  <option value="indoor">Main Indoor Hall</option>
                  <option value="outdoor">Outdoor Terrace</option>
                  <option value="private">Private VIP Room</option>
                  <option value="no_preference">No Preference</option>
                </select>
              </div>

              {/* Occasion */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                  {t('reservation.occasion')}
                </label>
                <select
                  value={occasion}
                  onChange={(e: any) => setOccasion(e.target.value)}
                  className="w-full bg-[#151311] border border-white/10 rounded-lg px-4 py-3 text-xs text-white focus:border-[#D9A441] focus:outline-none"
                >
                  <option value="regular">Regular Dining</option>
                  <option value="birthday">Birthday Celebration</option>
                  <option value="anniversary">Anniversary</option>
                  <option value="business">Business Meeting</option>
                  <option value="family">Family Gathering</option>
                  <option value="other">Other Event</option>
                </select>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#D9A441] font-semibold block">
                {t('reservation.request')}
              </label>
              <textarea
                rows={3}
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                placeholder="e.g. High chair needed for toddler, candlelit setup, dietary restrictions..."
                className="w-full bg-[#151311] border border-white/10 rounded-lg p-3 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#7A1F2B] hover:brightness-110 disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-widest rounded-lg shadow-lg transition-all"
            >
              {loading ? 'Preparing Booking Request...' : t('reservation.submitBtn')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
