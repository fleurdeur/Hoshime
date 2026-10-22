import {
  Bell,
  Check,
  Globe,
  HardDrive,
  Laptop,
  LogOut,
  Moon,
  Palette,
  RotateCcw,
  Shield,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  User,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { UserAvatar } from '../components/UserAvatar';
import { useApp } from '../context/AppContext';
import { AccentColor, AppTheme, TitleFormat } from '../types/anime';

interface SettingsViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ isOpen, onClose }) => {
  const {
    titleFormat,
    setTitleFormat,
    theme,
    setTheme,
    accentColor,
    setAccentColor,
    adultFilter,
    setAdultFilter,
    deviceMode,
    setDeviceMode,
    clearCache,
    clearAllData,
    logout,
    userProfile
  } = useApp();

  const [notifLikes, setNotifLikes] = useState(true);
  const [notifEpisodes, setNotifEpisodes] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState('gold');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Settings Modal */}
      <div className="relative z-10 w-full max-w-lg max-h-[85vh] bg-[#0E121B] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden text-white text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-base">Settings & Preferences</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1">
          {/* 1. DEVICE PREVIEW MODE */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Smartphone className="w-4 h-4" />
              <span>Android Presentation Mode</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Switch between an authentic Android Pixel 9 frame or full responsive viewport:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeviceMode('android-frame')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                  deviceMode === 'android-frame'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Pixel Frame</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('responsive')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
                  deviceMode === 'responsive'
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>Full Responsive</span>
              </button>
            </div>
          </div>

          {/* 2. TITLE FORMAT PREFERENCE */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Preferred Anime Title Display</span>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'english', label: 'English (e.g. Attack on Titan)' },
                { id: 'romaji', label: 'Romaji (e.g. Shingeki no Kyojin)' },
                { id: 'native', label: 'Native Japanese Kanji (進撃の巨人)' }
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    titleFormat === opt.id
                      ? 'bg-amber-400/10 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-800/80 border-slate-700/60 text-slate-300'
                  }`}
                >
                  <span>{opt.label}</span>
                  <input
                    type="radio"
                    name="titleFormat"
                    checked={titleFormat === opt.id}
                    onChange={() => setTitleFormat(opt.id as TitleFormat)}
                    className="text-amber-400"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* 3. THEME & ACCENT COLOR */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <Palette className="w-4 h-4 text-purple-400" />
              <span>Theme & Accent Colors</span>
            </div>

            {/* Themes */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'dark', label: 'Dark Sky', icon: Moon },
                { id: 'starry', label: 'Starry OLED', icon: Sparkles },
                { id: 'light', label: 'Light', icon: Sun }
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTheme(t.id as AppTheme)}
                    className={`py-2 rounded-xl flex items-center justify-center gap-1.5 border font-semibold transition-colors ${
                      theme === t.id
                        ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Accent Color Chooser */}
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5">
                Accent Glow
              </span>
              <div className="flex items-center gap-3">
                {[
                  { id: 'gold', bg: 'bg-amber-400', label: 'Stellar Gold' },
                  { id: 'purple', bg: 'bg-purple-500', label: 'Cosmic Purple' },
                  { id: 'pink', bg: 'bg-pink-500', label: 'Nebula Pink' },
                  { id: 'emerald', bg: 'bg-emerald-400', label: 'Aurora Green' }
                ].map((col) => (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => setAccentColor(col.id as AccentColor)}
                    className={`w-7 h-7 rounded-full ${col.bg} flex items-center justify-center transition-transform ${
                      accentColor === col.id ? 'scale-125 ring-2 ring-white' : 'opacity-80'
                    }`}
                    title={col.label}
                  >
                    {accentColor === col.id && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. CUSTOM LAUNCHER ICONS (VIP feature) */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-200 block">Custom Android App Icon</span>
            <div className="flex items-center gap-3">
              {[
                { id: 'gold', label: 'Classic Star Gold', bg: 'from-amber-400 to-amber-600' },
                { id: 'violet', label: 'Neon Void', bg: 'from-purple-600 to-violet-900' },
                { id: 'monochrome', label: 'AMOLED Minimal', bg: 'from-slate-700 to-slate-950' }
              ].map((icon) => (
                <button
                  key={icon.id}
                  onClick={() => setSelectedIcon(icon.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    selectedIcon === icon.id
                      ? 'border-amber-400 bg-amber-400/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${icon.bg} flex items-center justify-center shadow`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[10px] text-slate-400">{icon.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. CONTENT FILTERS & CACHE */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Adult / 18+ Content Filter</span>
                <span className="text-[10px] text-slate-400">Blur sensitive covers and synopsis</span>
              </div>
              <input
                type="checkbox"
                checked={adultFilter}
                onChange={(e) => setAdultFilter(e.target.checked)}
                className="rounded text-amber-400"
              />
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Clear Storage & Cache</span>
                <span className="text-[10px] text-slate-400">Reset local offline drafts & image cache</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear local cache and reload?')) clearCache();
                }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 font-semibold text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Cache</span>
              </button>
            </div>
          </div>

          {/* 6. ACCOUNT & SESSION */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-200 font-bold">
              <User className="w-4 h-4 text-amber-400" />
              <span>Account & Session</span>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <UserAvatar src={userProfile.avatar} name={userProfile.name} size="md" />
              <div className="truncate flex-1">
                <span className="font-bold text-white text-xs block truncate">{userProfile.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">@{userProfile.handle}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  logout();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-rose-400 font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure? This will wipe all data and return to a fresh start.')) {
                    clearAllData();
                  }
                }}
                className="py-2.5 px-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Factory Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
