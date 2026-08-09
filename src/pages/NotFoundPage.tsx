import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { SeoHead } from '../components/SeoHead';
import { Utensils, Home, Calendar } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { config } = useApp();

  return (
    <div className="min-h-screen bg-[#151311] text-[#F7F1E7] flex items-center justify-center p-6 text-center pt-28 pb-24">
      <SeoHead title="404 - Page Not Found" />

      <div className="max-w-md w-full space-y-6 bg-[#1c1a18] border border-white/10 p-8 sm:p-12 rounded-2xl shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#7A1F2B]/30 border border-[#7A1F2B] text-[#D9A441] flex items-center justify-center mx-auto">
          <Utensils className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest text-[#D9A441] font-bold">
            Error 404
          </span>
          <h1 className="text-3xl font-serif text-[#FFFDF8]">Dish Not Found</h1>
          <p className="text-xs text-[#8D8984] leading-relaxed">
            The page or recipe you are looking for seems to have been moved or does not exist on {config.name}.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-4">
          <Link
            to="/"
            className="w-full py-3 bg-[#7A1F2B] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow"
          >
            <Home className="w-4 h-4" />
            <span>Return To Home</span>
          </Link>

          <Link
            to="/menu"
            className="w-full py-3 border border-[#D9A441] text-[#D9A441] hover:bg-[#D9A441] hover:text-[#151311] font-semibold text-xs uppercase tracking-widest rounded transition-colors"
          >
            Explore Full Menu
          </Link>
        </div>
      </div>
    </div>
  );
};
