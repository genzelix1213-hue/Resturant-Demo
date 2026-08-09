import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { validateConfigJson } from '../config/restaurantConfig';
import { Settings, X, Save, RotateCcw, Download, Upload, Eye, EyeOff, ShieldAlert, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DemoCustomizerPanel: React.FC = () => {
  const {
    config,
    updateConfig,
    resetConfig,
    isCustomizerOpen,
    setIsCustomizerOpen,
    isPresentationMode,
    setIsPresentationMode,
    showToast,
  } = useApp();

  const [formData, setFormData] = useState(config);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sync state when panel opens
  const handleOpen = () => {
    setFormData(config);
    setJsonError(null);
    setIsCustomizerOpen(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev as any)[keys[0]],
            [keys[1]]: value,
          },
        };
      } else if (keys.length === 3) {
        return {
          ...prev,
          [keys[0]]: {
            ...(prev as any)[keys[0]],
            [keys[1]]: {
              ...(prev as any)[keys[0]][keys[1]],
              [keys[2]]: value,
            },
          },
        };
      }
      return prev;
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
    setIsCustomizerOpen(false);
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `${formData.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_config.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Restaurant configuration exported as JSON!', 'success');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const validation = validateConfigJson(content);
      if (validation.valid && validation.data) {
        setFormData(validation.data);
        updateConfig(validation.data);
        setJsonError(null);
        showToast('Configuration imported successfully!', 'success');
      } else {
        setJsonError(validation.error || 'Invalid configuration JSON format.');
        showToast('Failed to import JSON configuration.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <>
      {/* Discreet Gear Trigger Button (Hidden when Presentation Mode is ON) */}
      {!isPresentationMode && (
        <div className="fixed bottom-6 left-6 z-40 group">
          <button
            onClick={handleOpen}
            className="w-11 h-11 bg-white/5 border border-white/10 text-white/50 rounded-full flex items-center justify-center backdrop-blur hover:text-[#D9A441] hover:border-[#D9A441] hover:scale-110 transition-all shadow-xl"
            title="Proposal Demo Customizer (Agency Developer Tool)"
          >
            <Settings className="w-5 h-5 animate-spin-slow" />
          </button>
        </div>
      )}

      {/* Slide-out Customizer Drawer */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md">
            <div className="absolute inset-0" onClick={() => setIsCustomizerOpen(false)} />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="pointer-events-auto w-screen max-w-lg bg-[#151311] border-l border-[#D9A441]/30 shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-[#1c1a18] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-[#D9A441]" />
                      <h3 className="font-serif text-lg font-medium text-[#FFFDF8]">
                        Proposal Customizer Tool
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#8D8984]">
                      Edit restaurant branding &amp; proposal details in real-time.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsCustomizerOpen(false)}
                    className="p-2 text-[#8D8984] hover:text-white rounded-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Presentation Mode Toggle Banner */}
                <div className="bg-[#7A1F2B]/30 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#D9A441]" />
                    <span className="text-xs font-semibold text-[#F7F1E7]">
                      Presentation Mode
                    </span>
                  </div>
                  <button
                    onClick={() => setIsPresentationMode(!isPresentationMode)}
                    className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 transition-colors ${
                      isPresentationMode
                        ? 'bg-[#25D366] text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {isPresentationMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isPresentationMode ? 'ACTIVE (Hidden)' : 'Turn ON'}</span>
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
                  {jsonError && (
                    <div className="p-3 bg-red-950/60 border border-red-500/40 rounded text-xs text-red-200">
                      {jsonError}
                    </div>
                  )}

                  {/* Section 1: Basic Info */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-serif text-[#D9A441] uppercase tracking-wider font-semibold border-b border-white/10 pb-1">
                      1. Brand Identity
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Restaurant Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Tagline</label>
                        <input
                          type="text"
                          value={formData.tagline}
                          onChange={(e) => handleInputChange('tagline', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-[#8D8984]">Cuisine</label>
                          <input
                            type="text"
                            value={formData.cuisine}
                            onChange={(e) => handleInputChange('cuisine', e.target.value)}
                            className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase text-[#8D8984]">Location City</label>
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Contact & Location */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-serif text-[#D9A441] uppercase tracking-wider font-semibold border-b border-white/10 pb-1">
                      2. Contact &amp; Hours
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Full Address</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-[#8D8984]">Phone Number</label>
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase text-[#8D8984]">WhatsApp Number</label>
                          <input
                            type="text"
                            value={formData.whatsapp}
                            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                            className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Weekday Hours</label>
                        <input
                          type="text"
                          value={formData.openingHours.weekdays}
                          onChange={(e) => handleInputChange('openingHours.weekdays', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Weekend Hours</label>
                        <input
                          type="text"
                          value={formData.openingHours.weekends}
                          onChange={(e) => handleInputChange('openingHours.weekends', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Hero & Marketing Copy */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-serif text-[#D9A441] uppercase tracking-wider font-semibold border-b border-white/10 pb-1">
                      3. Hero &amp; Offer Copy
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Top Announcement Bar</label>
                        <input
                          type="text"
                          value={formData.announcementText}
                          onChange={(e) => handleInputChange('announcementText', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Hero Headline</label>
                        <input
                          type="text"
                          value={formData.heroHeading}
                          onChange={(e) => handleInputChange('heroHeading', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Special Offer Title</label>
                        <input
                          type="text"
                          value={formData.specialOffer.title}
                          onChange={(e) => handleInputChange('specialOffer.title', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-[#8D8984]">Special Offer Price</label>
                        <input
                          type="text"
                          value={formData.specialOffer.price}
                          onChange={(e) => handleInputChange('specialOffer.price', e.target.value)}
                          className="w-full bg-[#1c1a18] border border-white/10 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#7A1F2B] hover:brightness-110 text-white font-semibold text-xs uppercase tracking-widest rounded flex items-center justify-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Apply Live Changes</span>
                    </button>
                  </div>
                </form>

                {/* Footer Controls (Export/Import/Reset) */}
                <div className="p-4 border-t border-white/10 bg-[#1c1a18] flex items-center justify-between text-xs">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-[#D9A441] text-[#FFFDF8] rounded flex items-center gap-1.5"
                      title="Export Config JSON"
                    >
                      <Download className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>Export</span>
                    </button>

                    <label className="px-2.5 py-1.5 bg-white/5 border border-white/10 hover:border-[#D9A441] text-[#FFFDF8] rounded flex items-center gap-1.5 cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-[#D9A441]" />
                      <span>Import</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJson}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetConfig();
                      setIsCustomizerOpen(false);
                    }}
                    className="text-red-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Defaults</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
