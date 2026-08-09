import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-md shadow-2xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-[#1c1a18]/95 border-[#D9A441]/40 text-[#FFFDF8]'
                : toast.type === 'error'
                ? 'bg-[#7A1F2B]/95 border-red-500/40 text-white'
                : 'bg-[#151311]/95 border-white/20 text-[#F7F1E7]'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#8D8984] shrink-0 mt-0.5" />}
            
            <p className="text-sm font-medium leading-snug flex-1">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
