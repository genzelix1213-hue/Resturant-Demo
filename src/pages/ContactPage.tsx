import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ContactPage: React.FC = () => {
  const { config, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your inquiry message has been submitted!', 'success');
  };

  const faqs = [
    {
      q: 'Do you offer valet parking on MM Alam Road?',
      a: `Yes! ${config.name} provides complimentary secure valet parking for all our guests right at the restaurant entrance.`,
    },
    {
      q: 'What is your free delivery coverage area in Lahore?',
      a: 'We offer free delivery on orders above Rs. 3,000 within Gulberg, DHA (Phases 1-6), Model Town, Garden Town, and Cantt.',
    },
    {
      q: 'Do you have private dining suites for corporate meetings?',
      a: 'Yes, we have 2 exclusive private dining suites equipped with smart screens, custom lighting, and dedicated service captains.',
    },
    {
      q: 'Is advance table reservation required for weekends?',
      a: 'While walk-in guests are welcome, we strongly recommend booking a table at least 4-6 hours in advance for Friday to Sunday evenings.',
    },
    {
      q: 'Are all meat products certified 100% Halal?',
      a: 'Absolutely. All our meats are 100% Halal certified, organically raised, and prepared under strict international food safety standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] pt-28 pb-24">
      <SeoHead
        title="Contact &amp; Location"
        description={`Contact ${config.name} on MM Alam Road, Gulberg III, Lahore. Get directions, call directly, or send an inquiry for private dining and corporate events.`}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#FFFDF8]">
            Contact &amp; Location
          </h1>
          <p className="text-sm text-[#8D8984]">
            Have a question about our menu, private catering, or table availability? We are here to assist you.
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1c1a18] border border-white/10 rounded-xl p-6 space-y-3">
            <MapPin className="w-6 h-6 text-[#D9A441]" />
            <h4 className="font-serif text-[#FFFDF8] text-base">Location</h4>
            <p className="text-xs text-[#8D8984] leading-relaxed">{config.address}</p>
          </div>

          <div className="bg-[#1c1a18] border border-white/10 rounded-xl p-6 space-y-3">
            <Phone className="w-6 h-6 text-[#D9A441]" />
            <h4 className="font-serif text-[#FFFDF8] text-base">Phone &amp; WhatsApp</h4>
            <p className="text-xs text-[#8D8984]">{config.phone}</p>
            <p className="text-xs text-[#8D8984]">WhatsApp: {config.whatsapp}</p>
          </div>

          <div className="bg-[#1c1a18] border border-white/10 rounded-xl p-6 space-y-3">
            <Mail className="w-6 h-6 text-[#D9A441]" />
            <h4 className="font-serif text-[#FFFDF8] text-base">Email Inquiry</h4>
            <p className="text-xs text-[#8D8984]">{config.email}</p>
          </div>

          <div className="bg-[#1c1a18] border border-white/10 rounded-xl p-6 space-y-3">
            <Clock className="w-6 h-6 text-[#D9A441]" />
            <h4 className="font-serif text-[#FFFDF8] text-base">Opening Hours</h4>
            <p className="text-xs text-[#8D8984]">{config.openingHours.weekdays}</p>
            <p className="text-xs text-[#8D8984]">{config.openingHours.weekends}</p>
          </div>
        </div>

        {/* Contact Form & Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div className="bg-[#1c1a18] border border-white/10 rounded-2xl p-6 sm:p-10 space-y-6 shadow-2xl">
            <h3 className="text-2xl font-serif text-[#FFFDF8]">Send Us a Message</h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#D9A441] mx-auto" />
                <h4 className="font-serif text-xl text-[#FFFDF8]">Thank You!</h4>
                <p className="text-xs text-[#8D8984] max-w-sm mx-auto">
                  Your message has been received. In this demo mode, your message was logged locally.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#7A1F2B] text-white text-xs font-semibold uppercase rounded"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase text-[#D9A441] font-semibold block mb-1">Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#151311] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-[#D9A441] font-semibold block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="w-full bg-[#151311] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase text-[#D9A441] font-semibold block mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full bg-[#151311] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase text-[#D9A441] font-semibold block mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="General Inquiry / Private Event"
                      className="w-full bg-[#151311] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase text-[#D9A441] font-semibold block mb-1">Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your question or reservation inquiry here..."
                    className="w-full bg-[#151311] border border-white/10 rounded-lg p-3.5 text-xs text-white placeholder:text-[#8D8984]/50 focus:border-[#D9A441] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#7A1F2B] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Map */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[420px] bg-[#1c1a18]">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.373400612745!2d74.34688!3d31.5126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190459c5555555%3A0x123456789abcdef!2sMM%20Alam%20Rd%2C%20Gulberg%20III%2C%20Lahore%2C%20Punjab!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-8 max-w-4xl mx-auto pt-8">
          <div className="text-center space-y-2">
            <span className="text-[#D9A441] text-xs font-semibold uppercase tracking-[0.3em]">
              Common Questions
            </span>
            <h2 className="text-3xl font-serif text-[#FFFDF8]">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#1c1a18] border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-serif text-[#FFFDF8] hover:text-[#D9A441] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D9A441] transition-transform ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-5 pb-5 text-xs text-[#8D8984] leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
