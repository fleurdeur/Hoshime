import {
  Archive,
  BarChart3,
  Bookmark,
  Calendar,
  Compass,
  Download,
  FileText,
  HelpCircle,
  Home,
  Layers,
  LogIn,
  LogOut,
  MessageSquare,
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
    setProfileTab,
    setSelectedAnimeId,
    setSelectedListId,
    setSelectedUserProfile,
    setIsImportExportOpen,
    setIsWidgetsOpen,
    setIsOnboardingOpen,
    setIsSettingsOpen,
    isGuest,
    openLoginPrompt,
    logout,
    currentDraft,
    openLogger
  } = useApp();

  if (!isDrawerOpen) return null;

  const libraryEntries = Object.values(userLibrary);
  const completedCount = libraryEntries.filter((e) => e.status === 'Completed').length;
  const writtenReviewsCount = logs.filter((l) => l.userId === userProfile.id && l.reviewText).length;
  const archivedCount = logs.filter((l) => l.userId === userProfile.id && l.isArchived).length;
  const totalDaysWatched = (
    libraryEntries.reduce((acc, curr) => acc + curr.episodesWatched * 24, 0) /
    (60 * 24)
  ).toFixed(1);

  const navigateTo = (action: () => void) => {
    setIsDrawerOpen(false);
    action();
  };

  const handleGoToProfile = (subTab?: 'diary' | 'reviews' | 'watchlist' | 'lists' | 'stats' | 'archived') => {
    navigateTo(() => {
      setSelectedAnimeId(null);
      setSelectedListId(null);
      setSelectedUserProfile(null);
      setActiveTab('profile');
      if (subTab) {
        setProfileTab(subTab);
      }
    });
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
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* User Profile Info */}
          <div
            onClick={() => handleGoToProfile('diary')}
            className="flex items-center gap-3 mb-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-purple-500 to-amber-300 shadow-[0_0_12px_rgba(255,193,7,0.4)] flex items-center justify-center overflow-hidden">
                <UserAvatar
                  src={userProfile.avatar}
                  name={userProfile.name}
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
                <span className="font-display font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                  {userProfile.name}
                </span>
                {isGuest ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700">
                    Guest
                  </span>
                ) : userProfile.isVip ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                    VIP
                  </span>
                ) : null}
              </div>
              <span className="text-xs text-slate-400 font-mono">
                @{userProfile.handle}
              </span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-4 gap-1 pt-3 border-t border-slate-800/80 text-center">
            <button
              onClick={() => handleGoToProfile('watchlist')}
              className="flex flex-col hover:bg-slate-800/40 p-1 rounded-lg transition-colors"
            >
              <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                {completedCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Watched</span>
            </button>
            <button
              onClick={() => handleGoToProfile('stats')}
              className="flex flex-col hover:bg-slate-800/40 p-1 rounded-lg transition-colors"
            >
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {totalDaysWatched}d
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Time</span>
            </button>
            <button
              onClick={() => handleGoToProfile('reviews')}
              className="flex flex-col hover:bg-slate-800/40 p-1 rounded-lg transition-colors"
            >
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {writtenReviewsCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Reviews</span>
            </button>
            <button
              onClick={() => handleGoToProfile('diary')}
              className="flex flex-col hover:bg-slate-800/40 p-1 rounded-lg transition-colors"
            >
              <span className="font-mono text-sm font-bold text-white tabular-nums">
                {userProfile.followersCount}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Followers</span>
            </button>
          </div>
        </div>

        {/* Drawer Menu Navigation */}
        <div className="flex-1 py-3 px-3 space-y-1 text-sm text-slate-300 font-medium">
          {/* Feed */}
          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setSelectedUserProfile(null);
                setActiveTab('home');
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Home className="w-4 h-4 text-amber-400" />
            <span>Feed</span>
          </button>

          {/* Explore */}
          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setSelectedUserProfile(null);
                setActiveTab('discover');
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Explore</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => handleGoToProfile('diary')}
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <User className="w-4 h-4 text-amber-400" />
            <span>Profile</span>
          </button>

          {/* Watchlist */}
          <button
            onClick={() => handleGoToProfile('watchlist')}
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Watchlist</span>
          </button>

          {/* Diary */}
          <button
            onClick={() => handleGoToProfile('diary')}
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Diary</span>
          </button>

          {/* Reviews */}
          <button
            onClick={() => handleGoToProfile('reviews')}
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span>Reviews</span>
          </button>

          {/* Custom Lists */}
          <button
            onClick={() =>
              navigateTo(() => {
                setSelectedAnimeId(null);
                setSelectedListId(null);
                setActiveTab('lists');
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Lists</span>
          </button>

          {/* Stats */}
          <button
            onClick={() => handleGoToProfile('stats')}
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Stats</span>
          </button>

          {/* Archived Posts */}
          <button
            onClick={() => handleGoToProfile('archived')}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Archive className="w-4 h-4 text-amber-500" />
              <span>Archived</span>
            </div>
            {archivedCount > 0 && (
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300">
                {archivedCount}
              </span>
            )}
          </button>

          <div className="h-px bg-slate-800/80 my-2" />

          {/* Import / Export */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsImportExportOpen(true);
              })
            }
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Download className="w-4 h-4 text-amber-400" />
              <span>Import & Export</span>
            </div>
          </button>

          {/* Widgets */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsWidgetsOpen(true);
              })
            }
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Widgets</span>
            </div>
          </button>

          {/* Drafts */}
          {currentDraft && (
            <button
              onClick={() =>
                navigateTo(() => {
                  openLogger(currentDraft.animeId);
                })
              }
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-400/10 text-amber-300 border border-amber-400/20 hover:bg-amber-400/20 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Draft</span>
              </div>
              <span className="text-[10px] font-bold underline">Resume</span>
            </button>
          )}

          <div className="h-px bg-slate-800/80 my-2" />

          {/* Theme Switcher */}
          <div className="px-3 py-2">
            <span className="text-xs text-slate-500 font-medium block mb-2">Theme</span>
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded font-medium transition-colors ${
                  theme === 'dark' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
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



          {/* Settings */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsSettingsOpen(true);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </button>

          {/* Help */}
          <button
            onClick={() =>
              navigateTo(() => {
                setIsOnboardingOpen(true);
              })
            }
            className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl hover:bg-slate-800/60 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help</span>
          </button>

          {/* Sign Out or Log In */}
          {isGuest ? (
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                openLoginPrompt('access account features');
              }}
              className="w-full flex items-center justify-center gap-2 mt-2 px-3 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In or Sign Up</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsDrawerOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-500 font-mono">
            Hoshime v2.6
          </span>
        </div>
      </aside>
    </div>
  );
};
