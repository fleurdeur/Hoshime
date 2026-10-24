import { Bell, Menu, Search, Sparkles } from 'lucide-react';
import React from 'react';
import { useApp } from '../context/AppContext';
import { UserAvatar } from './UserAvatar';

export const TopAppBar: React.FC = () => {
  const {
    notifications,
    setIsSearchOpen,
    setIsDrawerOpen,
    setActiveTab,
    setSelectedAnimeId,
    setSelectedListId,
    setSelectedUserProfile,
    setIsNotificationsOpen,
    userProfile
  } = useApp();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogoClick = () => {
    setSelectedAnimeId(null);
    setSelectedListId(null);
    setSelectedUserProfile(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-800/80 px-3.5 flex items-center justify-between transition-colors">
      {/* Left Slot: Navigation Drawer Toggle & Brand */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition-all"
          aria-label="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand Lockup - Simple Name */}
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(255,193,7,0.4)] group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight text-white leading-tight">
              Hoshime
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              Anime Diary
            </span>
          </div>
        </button>
      </div>

      {/* Right Slot: Search & Notifications & Profile */}
      <div className="flex items-center gap-1">

        <button
          onClick={() => setIsSearchOpen(true)}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-95 transition-colors"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={() => {
            setIsNotificationsOpen(true);
          }}
          className="relative min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-amber-400 active:scale-95 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-2.5 right-2 min-w-[16px] h-4 px-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold flex items-center justify-center font-mono leading-none shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setSelectedAnimeId(null);
            setSelectedListId(null);
            setSelectedUserProfile(null);
            setActiveTab('profile');
          }}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center pl-1 group"
          aria-label="Profile"
        >
          <UserAvatar
            src={userProfile.avatar}
            name={userProfile.name}
            size="sm"
            className="group-hover:scale-105 transition-transform"
          />
        </button>
      </div>
    </header>
  );
};
