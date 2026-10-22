import React, { useEffect, useState } from 'react';
import { AndroidFrame } from './components/AndroidFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { ImportExportModal } from './components/ImportExportModal';
import { LoggerModal } from './components/LoggerModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { SearchFilterSheet } from './components/SearchFilterSheet';
import { ShareStoryModal } from './components/ShareStoryModal';
import { TopAppBar } from './components/TopAppBar';
import { WidgetsModal } from './components/WidgetsModal';
import { AppProvider, useApp } from './context/AppContext';
import { AnimeDetailView } from './views/AnimeDetailView';
import { DiscoverView } from './views/DiscoverView';
import { HomeFeedView } from './views/HomeFeedView';
import { ListsCommunityView } from './views/ListsCommunityView';
import { NotificationCenterView } from './views/NotificationCenterView';
import { OnboardingView } from './views/OnboardingView';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    selectedAnimeId,
    setSelectedAnimeId,
    isSearchOpen,
    setIsSearchOpen,
    isOnboardingOpen,
    setIsOnboardingOpen,
    isAuthenticated,
    theme
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Listen for custom events dispatched from TopAppBar / Drawer
  useEffect(() => {
    const handleOpenNotifs = () => setIsNotificationsOpen(true);
    const handleOpenSettings = () => setIsSettingsOpen(true);

    window.addEventListener('hoshime_open_notifications', handleOpenNotifs);
    window.addEventListener('hoshime_open_settings', handleOpenSettings);

    return () => {
      window.removeEventListener('hoshime_open_notifications', handleOpenNotifs);
      window.removeEventListener('hoshime_open_settings', handleOpenSettings);
    };
  }, []);

  // Login First: Force authentication gate if user has no active session
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-full flex flex-col transition-colors ${
          theme === 'starry'
            ? 'bg-black text-slate-100'
            : theme === 'light'
            ? 'bg-slate-900 text-slate-100'
            : 'bg-[#0B0E14] text-slate-100'
        }`}
      >
        <AndroidFrame>
          <OnboardingView
            isOpen={true}
            onClose={() => {}}
            isMandatoryAuth={true}
          />
        </AndroidFrame>
      </div>
    );
  }

  return (
    <div
      className={`min-h-full flex flex-col transition-colors ${
        theme === 'starry'
          ? 'bg-black text-slate-100'
          : theme === 'light'
          ? 'bg-slate-900 text-slate-100'
          : 'bg-[#0B0E14] text-slate-100'
      }`}
    >
      <AndroidFrame>
        {/* Top Action Bar */}
        <TopAppBar />

        {/* Main Content Area */}
        <main className="flex-1 w-full overflow-y-auto">
          {selectedAnimeId ? (
            <AnimeDetailView
              animeId={selectedAnimeId}
              onBack={() => setSelectedAnimeId(null)}
            />
          ) : (
            <>
              {activeTab === 'home' && <HomeFeedView />}
              {activeTab === 'discover' && <DiscoverView />}
              {activeTab === 'lists' && <ListsCommunityView />}
              {activeTab === 'profile' && <ProfileView />}
            </>
          )}
        </main>

        {/* Android Bottom Navigation Bar (5 tabs with center glowing Star FAB) */}
        <BottomNavBar />

        {/* Modals, Overlays & Sheets */}
        <NavigationDrawer />
        <LoggerModal />
        <ShareStoryModal />
        <WidgetsModal />
        <ImportExportModal />
        <SearchFilterSheet
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectAnime={(id) => setSelectedAnimeId(id)}
        />
        <NotificationCenterView
          isOpen={isNotificationsOpen}
          onClose={() => setIsNotificationsOpen(false)}
        />
        <SettingsView
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        <OnboardingView
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
        />
      </AndroidFrame>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
