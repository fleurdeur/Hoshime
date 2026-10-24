import {
  Battery,
  Maximize2,
  Minimize2,
  Smartphone,
  Sparkles,
  Wifi
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const { deviceMode, setDeviceMode } = useApp();
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://'));

  if (deviceMode === 'responsive' || isStandalone) {
    return (
      <div className="min-h-screen bg-[#0B0E14] text-white flex flex-col">
        {/* Floating Toggle to switch to Android Mockup Frame on desktop only */}
        {!isStandalone && (
          <div className="fixed top-3 right-4 z-50 hidden sm:block">
            <button
              onClick={() => setDeviceMode('android-frame')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs font-semibold text-amber-400 hover:bg-slate-800 shadow-xl transition-all"
              title="Switch to Android Pixel Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Pixel Frame View</span>
            </button>
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070B] flex flex-col items-center justify-center p-0 sm:py-6 sm:px-4 select-none">
      {/* Top Controls Bar for Desktop Browser users */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-2 px-2 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Google Pixel 9 Pro · Android 15</span>
        </div>
        <button
          onClick={() => setDeviceMode('responsive')}
          className="flex items-center gap-1 text-slate-400 hover:text-white underline cursor-pointer"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Fullscreen</span>
        </button>
      </div>

      {/* Android Device Body (Pixel 9 Pro Aesthetic) */}
      <div className="relative w-full sm:max-w-[420px] h-screen sm:h-[880px] bg-[#0B0E14] sm:rounded-[44px] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(255,193,7,0.15)] sm:border-[8px] sm:border-[#1F2637] flex flex-col overflow-hidden">
        {/* Android Status Bar */}
        <div className="h-7 w-full px-5 pt-1.5 flex items-center justify-between bg-[#0B0E14] text-slate-300 text-[11px] font-mono z-40 select-none shrink-0">
          {/* Clock */}
          <span className="font-bold tracking-tight text-white">{currentTime}</span>

          {/* Centered Camera Punch-hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 mx-auto" />

          {/* Icons: 5G, Wi-Fi, Battery */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[9px] font-bold">5G</span>
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 fill-slate-300 text-slate-300" />
          </div>
        </div>

        {/* Inner App Content Screen */}
        <div className="flex-1 w-full overflow-hidden relative flex flex-col bg-[#0B0E14]">
          {children}
        </div>

        {/* Android Navigation Gesture Pill Bar */}
        <div className="h-4 w-full bg-[#0B0E14] flex items-center justify-center shrink-0 z-40 pb-1">
          <div className="w-32 h-1 bg-slate-600 rounded-full" />
        </div>
      </div>
    </div>
  );
};
