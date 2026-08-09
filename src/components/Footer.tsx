import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, t, showToast } = useApp();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Thank you for subscribing! You will receive exclusive gourmet offers.', 'success');
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#11100e] text-[#F7F1E7] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 border border-[#D9A441] flex items-center justify-center rounded-full bg-[#151311]">
                <span className="text-[#D9A441] font-serif font-bold text-base italic">SF</span>
              </div>
              <span className="font-serif text-2xl tracking-tight text-[#FFFDF8]">
                {config.name}
              </span>
            </Link>
            <p className="text-xs text-[#8D8984] leading-relaxed">
              {config.tagline}. Experience the finest Pakistani charcoal BBQ, Continental steakhouse specialties, and authentic gourmet dining in {config.city}.
            </p>
            <div className="flex gap-3 pt-2">
              {config.socialLinks.facebook && (
                <a
                  href={config.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8D8984] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {config.socialLinks.instagram && (
                <a
                  href={config.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8D8984] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {config.socialLinks.twitter && (
                <a
                  href={config.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8D8984] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {config.socialLinks.youtube && (
                <a
                  href={config.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8D8984] hover:border-[#D9A441] hover:text-[#D9A441] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-[#D9A441] text-base mb-4 tracking-wide font-medium">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#8D8984]">
              <li><Link to="/" className="hover:text-[#D9A441] transition-colors">Home Page</Link></li>
              <li><Link to="/menu" className="hover:text-[#D9A441] transition-colors">Gourmet Menu &amp; Specials</Link></li>
              <li><Link to="/about" className="hover:text-[#D9A441] transition-colors">Our Culinary Story</Link></li>
              <li><Link to="/gallery" className="hover:text-[#D9A441] transition-colors">Food &amp; Ambience Gallery</Link></li>
              <li><Link to="/reservations" className="hover:text-[#D9A441] transition-colors">Reserve a Table</Link></li>
              <li><Link to="/contact" className="hover:text-[#D9A441] transition-colors">Contact &amp; Location</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div>
            <h4 className="font-serif text-[#D9A441] text-base mb-4 tracking-wide font-medium">Visit &amp; Contact</h4>
            <ul className="space-y-3 text-xs text-[#8D8984]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D9A441] shrink-0" />
                <span>{config.email}</span>
              </li>
              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p>{config.openingHours.weekdays}</p>
                  <p>{config.openingHours.weekends}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-serif text-[#D9A441] text-base mb-4 tracking-wide font-medium">
              {t('footer.newsletterTitle')}
            </h4>
            <p className="text-xs text-[#8D8984] mb-3">
              Receive secret chef specials, birthday feast vouchers, and seasonal menu announcements.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-2 text-xs text-[#FFFDF8] focus:border-[#D9A441] focus:outline-none placeholder:text-[#8D8984]/60"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#7A1F2B] text-white rounded text-xs hover:brightness-110 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8D8984]">
          <p>© {currentYear} {config.name}. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-[#D9A441] transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-[#D9A441] transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
