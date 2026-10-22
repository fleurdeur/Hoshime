import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_ANIME_DATABASE,
  INITIAL_CUSTOM_LISTS,
  INITIAL_LOG_ENTRIES,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER_PROFILE
} from '../data/animeDatabase';
import {
  AccentColor,
  Anime,
  AnimeTitle,
  AppTheme,
  CustomList,
  LogEntry,
  NotificationItem,
  TitleFormat,
  UserAnimeEntry,
  UserProfile,
  WatchStatus
} from '../types/anime';
import { fetchLiveAnimeCatalog } from '../services/animeApi';

interface DraftLog {
  animeId: string;
  rating: number;
  reviewText: string;
  isRewatch: boolean;
  hasSpoilers: boolean;
  tags: string[];
  dateWatched: string;
}

interface AppContextType {
  animeList: Anime[];
  isLoadingAnime: boolean;
  userProfile: UserProfile;
  userLibrary: Record<string, UserAnimeEntry>;
  logs: LogEntry[];
  customLists: CustomList[];
  notifications: NotificationItem[];
  titleFormat: TitleFormat;
  theme: AppTheme;
  accentColor: AccentColor;
  adultFilter: boolean;
  deviceMode: 'android-frame' | 'responsive';
  activeTab: 'home' | 'discover' | 'lists' | 'profile';
  selectedAnimeId: string | null;
  selectedListId: string | null;
  selectedUserProfile: UserProfile | null;
  isSearchOpen: boolean;
  isLoggerOpen: boolean;
  loggerAnimeId: string | null;
  isDrawerOpen: boolean;
  isShareStoryOpen: boolean;
  shareTargetLog: LogEntry | null;
  isWidgetsOpen: boolean;
  isImportExportOpen: boolean;
  isOnboardingOpen: boolean;
  currentDraft: DraftLog | null;

  // Setters & Navigation
  setActiveTab: (tab: 'home' | 'discover' | 'lists' | 'profile') => void;
  setSelectedAnimeId: (id: string | null) => void;
  setSelectedListId: (id: string | null) => void;
  setSelectedUserProfile: (profile: UserProfile | null) => void;
  setIsSearchOpen: (open: boolean) => void;
  openLogger: (animeId?: string | null) => void;
  closeLogger: () => void;
  setIsDrawerOpen: (open: boolean) => void;
  openShareStory: (log: LogEntry) => void;
  closeShareStory: () => void;
  setIsWidgetsOpen: (open: boolean) => void;
  setIsImportExportOpen: (open: boolean) => void;
  setIsOnboardingOpen: (open: boolean) => void;
  setDeviceMode: (mode: 'android-frame' | 'responsive') => void;
  setTitleFormat: (format: TitleFormat) => void;
  setTheme: (theme: AppTheme) => void;
  setAccentColor: (color: AccentColor) => void;
  setAdultFilter: (enabled: boolean) => void;
  loadMoreAnime: (params?: { search?: string; genre?: string; page?: number }) => Promise<void>;

  // Domain Actions
  getAnimeTitle: (animeOrTitle: Anime | AnimeTitle | undefined) => string;
  updateWatchStatus: (animeId: string, status: WatchStatus, ep?: number, score?: number) => void;
  toggleStarFavorite: (animeId: string) => void;
  updateStar4: (animeIds: string[]) => void;
  updateUserProfile: (profileUpdates: Partial<UserProfile>) => void;
  logAnime: (entry: {
    animeId: string;
    rating: number;
    isLike: boolean;
    episodeLogged?: number;
    isRewatch: boolean;
    rewatchCount: number;
    dateWatched: string;
    reviewText?: string;
    hasSpoilers: boolean;
    tags: string[];
    syncAniList?: boolean;
    syncMAL?: boolean;
    postToFeed?: boolean;
  }) => void;
  saveDraftLog: (draft: DraftLog) => void;
  clearDraftLog: () => void;
  likeLog: (logId: string) => void;
  repostLog: (logId: string) => void;
  bookmarkLog: (logId: string) => void;
  addCommentToLog: (logId: string, text: string) => void;
  createCustomList: (data: {
    title: string;
    description: string;
    isRanked: boolean;
    privacy: 'public' | 'unlisted' | 'private';
    bannerCover?: string;
    items: { animeId: string; rank?: number; commentary?: string }[];
  }) => void;
  updateCustomList: (listId: string, updates: Partial<CustomList>) => void;
  likeCustomList: (listId: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  importLibrary: (source: string, count: number, overwrite: boolean) => void;
  exportLibrary: (format: 'json' | 'csv') => void;
  clearCache: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animeList, setAnimeList] = useState<Anime[]>(() => {
    // Always start with official curated titles
    return INITIAL_ANIME_DATABASE;
  });

  const [isLoadingAnime, setIsLoadingAnime] = useState<boolean>(false);

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('hoshime_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.avatar?.includes('unsplash.com') || parsed.banner?.includes('unsplash.com')) {
          return INITIAL_USER_PROFILE;
        }
        return parsed;
      } catch {
        return INITIAL_USER_PROFILE;
      }
    }
    return INITIAL_USER_PROFILE;
  });

  const [userLibrary, setUserLibrary] = useState<Record<string, UserAnimeEntry>>(() => {
    const saved = localStorage.getItem('hoshime_user_library');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.frieren || parsed['bocchi-the-rock']) {
          // Old schema with slug IDs, reset to official AniList IDs
          return {
            '154587': {
              animeId: '154587',
              status: 'Completed',
              episodesWatched: 28,
              score: 5.0,
              isFavorite: true,
              rewatchCount: 1,
              finishDate: '2026-10-18',
              updatedAt: '2026-10-18'
            },
            '9253': {
              animeId: '9253',
              status: 'Completed',
              episodesWatched: 24,
              score: 5.0,
              isFavorite: true,
              rewatchCount: 2,
              updatedAt: '2026-09-12'
            }
          };
        }
        return parsed;
      } catch {
        // Fallback
      }
    }
    return {
      '154587': {
        animeId: '154587',
        status: 'Completed',
        episodesWatched: 28,
        score: 5.0,
        isFavorite: true,
        rewatchCount: 1,
        finishDate: '2026-10-18',
        updatedAt: '2026-10-18'
      },
      '9253': {
        animeId: '9253',
        status: 'Completed',
        episodesWatched: 24,
        score: 5.0,
        isFavorite: true,
        rewatchCount: 2,
        updatedAt: '2026-09-12'
      }
    };
  });

  // Remove ALL pre-made dummy logs so the user has an authentic clean slate
  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem('hoshime_logs');
    if (!saved) return [];
    try {
      const parsed: LogEntry[] = JSON.parse(saved);
      // Filter out previous dummy mock logs (log_1, log_2, log_3) and unsplash references
      const realUserLogs = parsed.filter(
        (l) =>
          l.id !== 'log_1' &&
          l.id !== 'log_2' &&
          l.id !== 'log_3' &&
          !l.id.startsWith('mock_') &&
          !l.animeCover?.includes('unsplash.com')
      );
      return realUserLogs;
    } catch {
      return [];
    }
  });

  const [customLists, setCustomLists] = useState<CustomList[]>(() => {
    const saved = localStorage.getItem('hoshime_custom_lists');
    if (saved) {
      try {
        const parsed: CustomList[] = JSON.parse(saved);
        if (parsed.some((l) => l.bannerCover?.includes('unsplash.com'))) {
          return INITIAL_CUSTOM_LISTS;
        }
        return parsed;
      } catch {
        return INITIAL_CUSTOM_LISTS;
      }
    }
    return INITIAL_CUSTOM_LISTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('hoshime_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [titleFormat, setTitleFormatState] = useState<TitleFormat>(() => {
    return (localStorage.getItem('hoshime_title_format') as TitleFormat) || 'english';
  });

  const [theme, setThemeState] = useState<AppTheme>(() => {
    return (localStorage.getItem('hoshime_theme') as AppTheme) || 'dark';
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    return (localStorage.getItem('hoshime_accent_color') as AccentColor) || 'gold';
  });

  const [adultFilter, setAdultFilterState] = useState<boolean>(() => {
    return localStorage.getItem('hoshime_adult_filter') === 'true';
  });

  const [deviceMode, setDeviceModeState] = useState<'android-frame' | 'responsive'>(() => {
    return (localStorage.getItem('hoshime_device_mode') as any) || 'android-frame';
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'home' | 'discover' | 'lists' | 'profile'>('home');
  const [selectedAnimeId, setSelectedAnimeId] = useState<string | null>(null);
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedUserProfile, setSelectedUserProfile] = useState<UserProfile | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [loggerAnimeId, setLoggerAnimeId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isShareStoryOpen, setIsShareStoryOpen] = useState(false);
  const [shareTargetLog, setShareTargetLog] = useState<LogEntry | null>(null);
  const [isWidgetsOpen, setIsWidgetsOpen] = useState(false);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const [currentDraft, setCurrentDraft] = useState<DraftLog | null>(() => {
    const saved = localStorage.getItem('hoshime_draft_log');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('hoshime_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('hoshime_user_library', JSON.stringify(userLibrary));
  }, [userLibrary]);

  useEffect(() => {
    localStorage.setItem('hoshime_logs', JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem('hoshime_custom_lists', JSON.stringify(customLists));
  }, [customLists]);

  useEffect(() => {
    localStorage.setItem('hoshime_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Fetch live official catalog from AniList to list ALL anime
  const loadMoreAnime = async (params?: { search?: string; genre?: string; page?: number }) => {
    setIsLoadingAnime(true);
    try {
      const res = await fetchLiveAnimeCatalog({
        page: params?.page || 1,
        perPage: 35,
        search: params?.search,
        genre: params?.genre
      });
      if (res.anime && res.anime.length > 0) {
        setAnimeList((prev) => {
          const map = new Map<string, Anime>();
          // Preserve curated anime at top, merge fetched
          prev.forEach((a) => map.set(a.id, a));
          res.anime.forEach((a) => {
            if (!map.has(a.id)) {
              map.set(a.id, a);
            }
          });
          return Array.from(map.values());
        });
      }
    } catch (e) {
      console.warn('Live anime fetch error:', e);
    } finally {
      setIsLoadingAnime(false);
    }
  };

  useEffect(() => {
    loadMoreAnime();
  }, []);

  const setTitleFormat = (format: TitleFormat) => {
    setTitleFormatState(format);
    localStorage.setItem('hoshime_title_format', format);
  };

  const setTheme = (t: AppTheme) => {
    setThemeState(t);
    localStorage.setItem('hoshime_theme', t);
  };

  const setAccentColor = (col: AccentColor) => {
    setAccentColorState(col);
    localStorage.setItem('hoshime_accent_color', col);
  };

  const setAdultFilter = (val: boolean) => {
    setAdultFilterState(val);
    localStorage.setItem('hoshime_adult_filter', String(val));
  };

  const setDeviceMode = (mode: 'android-frame' | 'responsive') => {
    setDeviceModeState(mode);
    localStorage.setItem('hoshime_device_mode', mode);
  };

  const getAnimeTitle = (animeOrTitle: Anime | AnimeTitle | undefined): string => {
    if (!animeOrTitle) return '';
    const titleObj = 'title' in animeOrTitle ? animeOrTitle.title : animeOrTitle;
    if (titleFormat === 'romaji' && titleObj.romaji) return titleObj.romaji;
    if (titleFormat === 'native' && titleObj.native) return titleObj.native;
    return titleObj.english || titleObj.romaji || titleObj.native;
  };

  const openLogger = (animeId?: string | null) => {
    setLoggerAnimeId(animeId || null);
    setIsLoggerOpen(true);
  };

  const closeLogger = () => {
    setIsLoggerOpen(false);
    setLoggerAnimeId(null);
  };

  const openShareStory = (log: LogEntry) => {
    setShareTargetLog(log);
    setIsShareStoryOpen(true);
  };

  const closeShareStory = () => {
    setIsShareStoryOpen(false);
    setShareTargetLog(null);
  };

  const updateWatchStatus = (animeId: string, status: WatchStatus, ep?: number, score?: number) => {
    const anime = animeList.find(a => a.id === animeId);
    const existing = userLibrary[animeId] || {
      animeId,
      status,
      episodesWatched: 0,
      score: 0,
      isFavorite: false,
      rewatchCount: 0,
      updatedAt: new Date().toISOString()
    };

    const newEpisodes = ep !== undefined ? ep : (status === 'Completed' && anime ? anime.episodes : existing.episodesWatched);
    const newScore = score !== undefined ? score : existing.score;

    setUserLibrary(prev => ({
      ...prev,
      [animeId]: {
        ...existing,
        status,
        episodesWatched: newEpisodes,
        score: newScore,
        finishDate: status === 'Completed' ? new Date().toISOString().split('T')[0] : existing.finishDate,
        updatedAt: new Date().toISOString()
      }
    }));
  };

  const toggleStarFavorite = (animeId: string) => {
    setUserLibrary(prev => {
      const existing = prev[animeId] || {
        animeId,
        status: 'Plan to Watch',
        episodesWatched: 0,
        score: 0,
        isFavorite: false,
        rewatchCount: 0,
        updatedAt: new Date().toISOString()
      };
      return {
        ...prev,
        [animeId]: {
          ...existing,
          isFavorite: !existing.isFavorite,
          updatedAt: new Date().toISOString()
        }
      };
    });
  };

  const updateStar4 = (animeIds: string[]) => {
    setUserProfile(prev => ({
      ...prev,
      star4: animeIds.slice(0, 4)
    }));
  };

  const updateUserProfile = (profileUpdates: Partial<UserProfile>) => {
    setUserProfile(prev => ({
      ...prev,
      ...profileUpdates
    }));
  };

  const logAnime = (entryData: {
    animeId: string;
    rating: number;
    isLike: boolean;
    episodeLogged?: number;
    isRewatch: boolean;
    rewatchCount: number;
    dateWatched: string;
    reviewText?: string;
    hasSpoilers: boolean;
    tags: string[];
    syncAniList?: boolean;
    syncMAL?: boolean;
    postToFeed?: boolean;
  }) => {
    const anime = animeList.find(a => a.id === entryData.animeId);
    if (!anime) return;

    // 1. Update User Library
    setUserLibrary(prev => {
      const existing = prev[entryData.animeId] || {
        animeId: entryData.animeId,
        status: entryData.episodeLogged ? 'Watching' : 'Completed',
        episodesWatched: entryData.episodeLogged || anime.episodes,
        score: entryData.rating,
        isFavorite: entryData.isLike,
        rewatchCount: entryData.rewatchCount,
        updatedAt: new Date().toISOString()
      };
      return {
        ...prev,
        [entryData.animeId]: {
          ...existing,
          status: entryData.episodeLogged && entryData.episodeLogged < anime.episodes ? 'Watching' : 'Completed',
          episodesWatched: entryData.episodeLogged !== undefined ? entryData.episodeLogged : anime.episodes,
          score: entryData.rating,
          rewatchCount: entryData.rewatchCount,
          updatedAt: new Date().toISOString()
        }
      };
    });

    // 2. Add Log Entry if posting to feed (default true)
    if (entryData.postToFeed !== false) {
      const newLog: LogEntry = {
        id: `log_${Date.now()}`,
        userId: userProfile.id,
        userName: userProfile.name,
        userHandle: userProfile.handle,
        userAvatar: userProfile.avatar,
        isVip: userProfile.isVip,
        animeId: anime.id,
        animeTitle: anime.title,
        animeCover: anime.coverImage,
        animeFormat: anime.format,
        rating: entryData.rating,
        isLike: entryData.isLike,
        episodeLogged: entryData.episodeLogged,
        isRewatch: entryData.isRewatch,
        rewatchCount: entryData.rewatchCount,
        dateWatched: entryData.dateWatched,
        reviewText: entryData.reviewText,
        hasSpoilers: entryData.hasSpoilers,
        tags: entryData.tags,
        likesCount: 1,
        commentsCount: 0,
        repostsCount: 0,
        isLikedByMe: true,
        createdAt: 'Just now'
      };

      setLogs(prev => [newLog, ...prev]);
    }

    // Clear draft if it matches
    clearDraftLog();
    closeLogger();
  };

  const saveDraftLog = (draft: DraftLog) => {
    setCurrentDraft(draft);
    localStorage.setItem('hoshime_draft_log', JSON.stringify(draft));
  };

  const clearDraftLog = () => {
    setCurrentDraft(null);
    localStorage.removeItem('hoshime_draft_log');
  };

  const likeLog = (logId: string) => {
    setLogs(prev =>
      prev.map(item => {
        if (item.id === logId) {
          const wasLiked = !!item.isLikedByMe;
          return {
            ...item,
            isLikedByMe: !wasLiked,
            likesCount: wasLiked ? item.likesCount - 1 : item.likesCount + 1
          };
        }
        return item;
      })
    );
  };

  const repostLog = (logId: string) => {
    setLogs(prev =>
      prev.map(item => {
        if (item.id === logId) {
          return {
            ...item,
            repostsCount: item.repostsCount + 1
          };
        }
        return item;
      })
    );
  };

  const bookmarkLog = (logId: string) => {
    setLogs(prev =>
      prev.map(item => {
        if (item.id === logId) {
          return {
            ...item,
            isBookmarked: !item.isBookmarked
          };
        }
        return item;
      })
    );
  };

  const addCommentToLog = (logId: string, text: string) => {
    if (!text.trim()) return;
    setLogs(prev =>
      prev.map(item => {
        if (item.id === logId) {
          const newComment = {
            id: `c_${Date.now()}`,
            userHandle: userProfile.handle,
            userName: userProfile.name,
            userAvatar: userProfile.avatar,
            text: text.trim(),
            createdAt: 'Just now',
            likes: 0
          };
          return {
            ...item,
            commentsCount: item.commentsCount + 1,
            comments: [...(item.comments || []), newComment]
          };
        }
        return item;
      })
    );
  };

  const createCustomList = (data: {
    title: string;
    description: string;
    isRanked: boolean;
    privacy: 'public' | 'unlisted' | 'private';
    bannerCover?: string;
    items: { animeId: string; rank?: number; commentary?: string }[];
  }) => {
    const newList: CustomList = {
      id: `list_${Date.now()}`,
      title: data.title,
      description: data.description,
      isRanked: data.isRanked,
      privacy: data.privacy,
      bannerCover: data.bannerCover || animeList.find(a => a.id === data.items[0]?.animeId)?.bannerImage,
      author: {
        name: userProfile.name,
        handle: userProfile.handle,
        avatar: userProfile.avatar,
        isVip: userProfile.isVip
      },
      items: data.items,
      likes: 1,
      isLikedByMe: true,
      createdAt: 'Just now'
    };
    setCustomLists(prev => [newList, ...prev]);
  };

  const updateCustomList = (listId: string, updates: Partial<CustomList>) => {
    setCustomLists(prev =>
      prev.map(list => (list.id === listId ? { ...list, ...updates } : list))
    );
  };

  const likeCustomList = (listId: string) => {
    setCustomLists(prev =>
      prev.map(list => {
        if (list.id === listId) {
          const wasLiked = !!list.isLikedByMe;
          return {
            ...list,
            isLikedByMe: !wasLiked,
            likes: wasLiked ? list.likes - 1 : list.likes + 1
          };
        }
        return list;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const importLibrary = (source: string, count: number, overwrite: boolean) => {
    // Generate mock realistic entries for library
    const updated = { ...(overwrite ? {} : userLibrary) };
    animeList.slice(0, count).forEach(anime => {
      if (!updated[anime.id]) {
        updated[anime.id] = {
          animeId: anime.id,
          status: 'Completed',
          episodesWatched: anime.episodes,
          score: Math.min(5.0, Math.max(3.5, Math.round(anime.score * 2) / 2)),
          isFavorite: anime.score >= 4.8,
          rewatchCount: 0,
          updatedAt: new Date().toISOString()
        };
      }
    });
    setUserLibrary(updated);
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        type: 'system',
        title: `${source} Sync Complete`,
        description: `Successfully imported ${count} anime records.`,
        timestamp: 'Just now',
        isRead: false
      },
      ...prev
    ]);
  };

  const exportLibrary = (format: 'json' | 'csv') => {
    const data = Object.values(userLibrary).map(entry => {
      const anime = animeList.find(a => a.id === entry.animeId);
      return {
        title: anime?.title.english || entry.animeId,
        status: entry.status,
        episodesWatched: entry.episodesWatched,
        totalEpisodes: anime?.episodes || 0,
        starRating: entry.score,
        isFavorite: entry.isFavorite,
        rewatches: entry.rewatchCount,
        lastUpdated: entry.updatedAt
      };
    });

    let blob: Blob;
    let filename: string;
    if (format === 'json') {
      blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      filename = `hoshime_export_${Date.now()}.json`;
    } else {
      const headers = ['Title', 'Status', 'Episodes Watched', 'Total Episodes', 'Star Rating', 'Favorite', 'Rewatches', 'Last Updated'];
      const csvRows = [
        headers.join(','),
        ...data.map(r => `"${r.title}","${r.status}",${r.episodesWatched},${r.totalEpisodes},${r.starRating},${r.isFavorite},${r.rewatches},"${r.lastUpdated}"`)
      ];
      blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      filename = `hoshime_export_${Date.now()}.csv`;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const clearCache = () => {
    localStorage.removeItem('hoshime_anime_list');
    localStorage.removeItem('hoshime_user_library');
    localStorage.removeItem('hoshime_logs');
    localStorage.removeItem('hoshime_notifications');
    window.location.reload();
  };

  return (
    <AppContext.Provider
      value={{
        animeList,
        isLoadingAnime,
        loadMoreAnime,
        userProfile,
        userLibrary,
        logs,
        customLists,
        notifications,
        titleFormat,
        theme,
        accentColor,
        adultFilter,
        deviceMode,
        activeTab,
        selectedAnimeId,
        selectedListId,
        selectedUserProfile,
        isSearchOpen,
        isLoggerOpen,
        loggerAnimeId,
        isDrawerOpen,
        isShareStoryOpen,
        shareTargetLog,
        isWidgetsOpen,
        isImportExportOpen,
        isOnboardingOpen,
        currentDraft,
        setActiveTab,
        setSelectedAnimeId,
        setSelectedListId,
        setSelectedUserProfile,
        setIsSearchOpen,
        openLogger,
        closeLogger,
        setIsDrawerOpen,
        openShareStory,
        closeShareStory,
        setIsWidgetsOpen,
        setIsImportExportOpen,
        setIsOnboardingOpen,
        setDeviceMode,
        setTitleFormat,
        setTheme,
        setAccentColor,
        setAdultFilter,
        getAnimeTitle,
        updateWatchStatus,
        toggleStarFavorite,
        updateStar4,
        updateUserProfile,
        logAnime,
        saveDraftLog,
        clearDraftLog,
        likeLog,
        repostLog,
        bookmarkLog,
        addCommentToLog,
        createCustomList,
        updateCustomList,
        likeCustomList,
        markNotificationRead,
        markAllNotificationsRead,
        importLibrary,
        exportLibrary,
        clearCache
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
