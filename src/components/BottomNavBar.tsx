import { Compass, Home, Layers, Plus, Star, User } from 'lucide-react';
import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNavBar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openLogger,
    setSelectedAnimeId,
    setSelectedListId,
    setSelectedUserProfile
  } = useApp();

  const handleTabClick = (tab: 'home' | 'discover' | 'lists' | 'profile') => {
    setSelectedAnimeId(null);
    setSelectedListId(null);
    setSelectedUserProfile(null);
    setActiveTab(tab);
  };

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 h-16 shrink-0 bg-[#0B0E14]/95 backdrop-blur-md border-t border-slate-800/80 px-2 flex items-center justify-around w-full pb-safe">
      {/* 1. Home Feed */}
      <button
        onClick={() => handleTabClick('home')}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-all ${
          activeTab === 'home' ? 'text-amber-400' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Home Feed"
      >
        <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110' : ''}`} />
        <span className="text-[11px] font-semibold tracking-normal mt-1 whitespace-nowrap">
          Feed
        </span>
      </button>

      {/* 2. Discover & Explore */}
      <button
        onClick={() => handleTabClick('discover')}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-all ${
          activeTab === 'discover' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Discover"
      >
        <Compass className={`w-5 h-5 transition-transform ${activeTab === 'discover' ? 'scale-110' : ''}`} />
        <span className="text-[11px] font-semibold tracking-normal mt-1 whitespace-nowrap">
          Explore
        </span>
      </button>

      {/* 3. CENTER FLOATING ACTION BUTTON: Log / Rate FAB */}
      <div className="flex-1 flex items-center justify-center -translate-y-3">
        <button
          onClick={() => openLogger()}
          className="relative group min-w-[52px] min-h-[52px] w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-300 text-slate-950 flex items-center justify-center shadow-[0_4px_20px_rgba(255,193,7,0.45)] active:scale-95 transition-all hover:shadow-[0_6px_25px_rgba(255,193,7,0.6)]"
          aria-label="Log & Rate Anime"
        >
          <div className="relative flex items-center justify-center">
            <Star className="w-5 h-5 fill-slate-950 stroke-slate-950 transition-transform group-hover:rotate-45 duration-300" />
            <Plus className="w-3.5 h-3.5 stroke-[3] absolute -top-1 -right-1 text-slate-950" />
          </div>
        </button>
      </div>

      {/* 4. Lists & Community */}
      <button
        onClick={() => handleTabClick('lists')}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-all ${
          activeTab === 'lists' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Lists & Community"
      >
        <Layers className={`w-5 h-5 transition-transform ${activeTab === 'lists' ? 'scale-110' : ''}`} />
        <span className="text-[11px] font-semibold tracking-normal mt-1 whitespace-nowrap">
          Lists
        </span>
      </button>

      {/* 5. Profile & Diary */}
      <button
        onClick={() => handleTabClick('profile')}
        className={`flex-1 min-h-[44px] flex flex-col items-center justify-center py-1 transition-all ${
          activeTab === 'profile' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-label="Profile and Diary"
      >
        <User className={`w-5 h-5 transition-transform ${activeTab === 'profile' ? 'scale-110' : ''}`} />
        <span className="text-[11px] font-semibold tracking-normal mt-1 whitespace-nowrap">
          Profile
        </span>
      </button>
    </nav>
  );
};
