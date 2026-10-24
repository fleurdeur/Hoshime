import { Download, Smartphone } from 'lucide-react';
import React from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenAndroidModal?: () => void;
  className?: string;
  variant?: 'pill' | 'compact' | 'sidebar';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenAndroidModal,
  className = '',
  variant = 'pill',
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  // If already running in standalone PWA/APK mode, hide the button
  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else if (onOpenAndroidModal) {
      onOpenAndroidModal();
    }
  };

  if (variant === 'sidebar') {
    return (
      <button
        onClick={onOpenAndroidModal || handleClick}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 text-amber-300 hover:from-amber-500/30 hover:to-amber-600/20 transition-all shadow-md group ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
              Install Android App
            </div>
            <div className="text-[10px] text-slate-400">WebAPK · Standalone</div>
          </div>
        </div>
        <Download className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={onOpenAndroidModal || handleClick}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-300 hover:bg-amber-400/25 text-xs font-semibold transition-all ${className}`}
        title="Install Android App / APK"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Get App</span>
      </button>
    );
  }

  return (
    <button
      onClick={onOpenAndroidModal || handleClick}
      className={`flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-md active:scale-95 transition-all ${className}`}
    >
      <Smartphone className="w-4 h-4" />
      <span>Install Android App</span>
    </button>
  );
};
