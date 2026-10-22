import {
  BarChart3,
  Bookmark,
  Calendar,
  Download,
  FileText,
  HelpCircle,
  Layers,
  LogOut,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
  X
} from 'lucide-react';
import React from 'react';
import { useApp } from '../context/AppContext';
import { UserAvatar } from './UserAvatar';

export const NavigationDrawer: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    userProfile,
    userLibrary,
    logs,
    theme,
    setTheme,
    setActiveTab,
    setSelectedAnimeId,
    setSelectedListId,
    setSelectedUserProfile,
    setIsImportExportOpen,
    setIsWidgetsOpen,
    setIsOnboardingOpen,
    logout,
    currentDraft,
    openLogger
  } = useApp();

  if (!isDrawerOpen) return null;

  const libraryEntries = Object.values(userLibrary);
  const completedCount = libraryEntries.filter((e) => e.status === 'Completed').length;
  const writtenReviewsCount = logs.filter((l) => l.userId === userProfile.id && l.reviewText).length;
  const totalDaysWatched = (
    libraryEntries.reduce((acc, curr) => acc + (curr.episodesWatched * 24), 0) / (60 * 24)
  ).toFixed(1);

  const navigateTo = (action: () => void) => {
    setIsDrawerOpen(false);
    action();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer Container */}
      <aside className="relative w-80 max-w-[85vw] h-full bg-[#0E121B] border-r border-slate-800 flex flex-col z-10 shadow-2xl overflow-y-auto">
        {/* Header User Box */}
        <div className="relative p-5 bg-gradient-to-b from-[#182030] to-[#0E121B] border-b border-slate-800">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            aria-label="Close Drawer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-500 to-amber-300 shadow-[0_0_12px_rgba(255,193,7,0.4)]">
                <UserAvatar
                  src={userProfile.avatar}
                  name={userProfile.name}
                  size="lg"
                  className="w-full h-full"
                />
              </div>
              {userProfile.isVip && (
                <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-white text-base">
                  {userProfile.name}
                </span>
                {userProfile.isVip && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                    VIP
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400 font-mono">
                @{userProfile.handle}
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-1 pt-3 border-t border-slate-800/80 text-center">
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                {completedCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Watched</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {totalDaysWatched}d
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Time</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {writtenReviewsCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Reviews</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {userProfile.followersCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Followers</span>
            </div>
          </div>
        </div>

        {/* Drawer Menu Navigation */}
        <div className="flex-1 py-3 px-3 space-y-1 text-sm text-slate-300 font-medium">
          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setSelectedUserProfile(null);
                setActiveTab('profile');
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>My Profile & The Star 4</span>
          </button>

          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setActiveTab('profile');
                // set tab to watchlist
                const evt = new CustomEvent('hoshime_profile_tab', { detail: 'watchlist' });
                window.dispatchEvent(evt);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>My Watchlist</span>
          </button>

          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setActiveTab('lists');
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>My Custom Lists</span>
          </button>

          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setActiveTab('profile');
                const evt = new CustomEvent('hoshime_profile_tab', { detail: 'diary' });
                window.dispatchEvent(evt);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Viewing Diary & Timeline</span>
          </button>

          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setActiveTab('profile');
                const evt = new CustomEvent('hoshime_profile_tab', { detail: 'stats' });
                window.dispatchEvent(evt);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Detailed Analytics & Stats</span>
          </button>

          <div className="h-px bg-slate-800/80 my-2" />

          {/* Import / Export */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsImportExportOpen(true);
              })
            }
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Download className="w-4 h-4 text-amber-400" />
              <span>Import / Export Data</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">MAL · AniList</span>
          </button>

          {/* Android Home Screen Widgets */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsWidgetsOpen(true);
              })
            }
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Android Glance Widgets</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded">
              3 Widgets
            </span>
          </button>

          {/* Drafts Manager */}
          {currentDraft && (
            <button
              onClick={() =>
                navigateTo(() => {
                  openLogger(currentDraft.animeId);
                })
              }
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Saved Draft</span>
              </div>
              <span className="text-[10px] font-bold underline">Resume</span>
            </button>
          )}

          <div className="h-px bg-slate-800/80 my-2" />

          {/* Theme Switcher */}
          <div className="px-3 py-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Theme Mode</span>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-colors ${
                  theme === 'dark' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Night</span>
              </button>
              <button
                onClick={() => setTheme('starry')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-colors ${
                  theme === 'starry' ? 'bg-black text-amber-400 border border-amber-400/30 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Starry</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-colors ${
                  theme === 'light' ? 'bg-slate-200 text-slate-900 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
            </div>
          </div>

          <div className="h-px bg-slate-800/80 my-2" />

          {/* Settings & Onboarding Demo */}
          <button
            onClick={() =>
              navigateTo(() => {
                const evt = new CustomEvent('hoshime_open_settings');
                window.dispatchEvent(evt);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings & Preferences</span>
          </button>

          <button
            onClick={() =>
              navigateTo(() => {
                setIsOnboardingOpen(true);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Onboarding Wizard / Help</span>
          </button>

          <button
            onClick={() => {
              setIsDrawerOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out & Switch Account</span>
          </button>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-500 font-mono">
            Hoshime for Android · v2.6.4 (Build 408)
          </span>
        </div>
      </aside>
    </div>
  );
};
