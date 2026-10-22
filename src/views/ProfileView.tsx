import {
  BarChart3,
  Calendar,
  Camera,
  Check,
  Edit3,
  ExternalLink,
  Flame,
  Heart,
  Image as ImageIcon,
  Layers,
  Loader2,
  MessageSquare,
  PieChart,
  Plus,
  RotateCcw,
  Search,
  Share2,
  Sparkles,
  Star,
  Trash2,
  Tv,
  Upload,
  X,
  Archive,
  MoreVertical,
  AlertTriangle
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { AnimeImage } from '../components/AnimeImage';
import { StarRating } from '../components/StarRating';
import { UserAvatar } from '../components/UserAvatar';
import { useApp } from '../context/AppContext';
import { searchAnimeApi } from '../services/animeApi';
import { Anime, WatchStatus } from '../types/anime';

const AVATAR_PRESETS = [
  { name: 'Frieren', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png' },
  { name: 'Denji', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b130138-sA07b9h2H7nO.png' },
  { name: 'Gojo', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b127993-zC7a3d1b9e0f.png' },
  { name: 'Bocchi', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b192806-u7K0q8B2D0t3.png' },
  { name: 'Violet', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b124483-C9pL1n4k0f8j.png' },
  { name: 'Eren', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b40882-6p7q8r9s0t1u.png' }
];

const BANNER_PRESETS = [
  { name: 'Frieren Journey', url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg' },
  { name: 'Chainsaw City', url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg' },
  { name: 'Bocchi Live STARRY', url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/130003-5F90a7BtsPQN.jpg' },
  { name: 'Jujutsu Night', url: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg' }
];

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    userLibrary,
    animeList,
    addAnimeToDatabase,
    logs,
    customLists,
    updateStar4,
    setSelectedAnimeId,
    setSelectedListId,
    openShareStory,
    getAnimeTitle,
    profileTab,
    setProfileTab,
    isGuest,
    requireAuth,
    openLogger,
    archiveLog,
    deleteLog
  } = useApp();

  const [watchlistFilter, setWatchlistFilter] = useState<WatchStatus>('Watching');
  const [activeMenuLogId, setActiveMenuLogId] = useState<string | null>(null);
  const [deleteConfirmLogId, setDeleteConfirmLogId] = useState<string | null>(null);

  // Edit Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editTab, setEditTab] = useState<'info' | 'avatar' | 'banner'>('info');
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);
  const [editBanner, setEditBanner] = useState(userProfile.banner);
  const [editWebsite, setEditWebsite] = useState(userProfile.website || '');
  const [editPronouns, setEditPronouns] = useState(userProfile.pronouns || '');

  // File upload refs
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // Top 3 Favorite Swap Modal State
  const [isSwapStar4Open, setIsSwapStar4Open] = useState(false);
  const [swapSlotIndex, setSwapSlotIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSearchResults, setApiSearchResults] = useState<Anime[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Sync edit fields when profile updates
  useEffect(() => {
    setEditName(userProfile.name);
    setEditBio(userProfile.bio);
    setEditAvatar(userProfile.avatar);
    setEditBanner(userProfile.banner);
    setEditWebsite(userProfile.website || '');
    setEditPronouns(userProfile.pronouns || '');
  }, [userProfile]);

  // Debounced API search for Top 3 Picker
  useEffect(() => {
    if (!isSwapStar4Open) return;
    const clean = searchQuery.trim();
    if (!clean) {
      setApiSearchResults([]);
      setIsSearchingApi(false);
      return;
    }

    setIsSearchingApi(true);
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchAnimeApi(clean, 15);
        setApiSearchResults(results);
      } catch (e) {
        console.warn('Top 3 search error:', e);
      } finally {
        setIsSearchingApi(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isSwapStar4Open]);

  const libraryEntries = Object.values(userLibrary);
  const completedEntries = libraryEntries.filter((e) => e.status === 'Completed');
  const totalEpisodesWatched = libraryEntries.reduce((acc, curr) => acc + curr.episodesWatched, 0);
  const daysSpent = ((totalEpisodesWatched * 24) / (60 * 24)).toFixed(1);

  // My active logs (all logs by user that are not archived)
  const myActiveLogs = logs.filter((l) => l.userId === userProfile.id && !l.isArchived);
  // My active reviews (non-archived logs with review text)
  const myReviews = logs.filter((l) => l.userId === userProfile.id && !l.isArchived && !!l.reviewText);
  // My archived logs
  const myArchived = logs.filter((l) => l.userId === userProfile.id && l.isArchived);

  // My Custom Lists
  const myLists = customLists.filter((l) => l.author.handle === userProfile.handle);

  // Watchlist filtered
  const filteredWatchlist = libraryEntries
    .filter((e) => e.status === watchlistFilter)
    .map((entry) => ({
      entry,
      anime: animeList.find((a) => a.id === entry.animeId)
    }))
    .filter((item) => item.anime !== undefined);

  // Visualizations stats
  const genreCounts: Record<string, number> = {};
  completedEntries.forEach((e) => {
    const a = animeList.find((x) => x.id === e.animeId);
    if (a) {
      a.genres.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      });
    }
  });

  const ratingCounts: Record<string, number> = {
    '5.0': 0,
    '4.5': 0,
    '4.0': 0,
    '3.5': 0,
    '3.0': 0,
    '2.5': 0,
    '2.0': 0
  };
  myReviews.forEach((r) => {
    const key = r.rating.toFixed(1);
    if (ratingCounts[key] !== undefined) ratingCounts[key]++;
    else ratingCounts[key] = 1;
  });

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditBanner(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    updateUserProfile({
      name: editName.trim() || userProfile.name,
      bio: editBio.trim(),
      avatar: editAvatar,
      banner: editBanner,
      website: editWebsite.trim(),
      pronouns: editPronouns.trim()
    });
    setIsEditingProfile(false);
  };

  const handleSelectTopAnime = (anime: Anime) => {
    if (swapSlotIndex === null) return;
    addAnimeToDatabase(anime);

    const newStar4 = [...(userProfile.star4 || [])];
    while (newStar4.length < 3) {
      newStar4.push('');
    }
    newStar4[swapSlotIndex] = anime.id;
    updateStar4(newStar4);

    setIsSwapStar4Open(false);
    setSwapSlotIndex(null);
    setSearchQuery('');
  };

  const handleRemoveTopAnime = (slotIdx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStar4 = [...(userProfile.star4 || [])];
    newStar4[slotIdx] = '';
    updateStar4(newStar4);
  };

  // Top 3 slot ranks metadata
  const TOP_SLOTS = [
    { rank: 1, label: '#1 Favorite', badge: 'bg-amber-400 text-slate-950', ring: 'ring-amber-400/60' },
    { rank: 2, label: '#2 Favorite', badge: 'bg-slate-300 text-slate-950', ring: 'ring-slate-300/60' },
    { rank: 3, label: '#3 Favorite', badge: 'bg-amber-600 text-white', ring: 'ring-amber-600/60' }
  ];

  return (
    <div className="pb-28 max-w-4xl mx-auto text-white">
      {/* 1. COVER BANNER (EDITABLE) */}
      <div className="relative w-full h-36 sm:h-48 overflow-hidden bg-slate-900 group">
        <AnimeImage
          src={userProfile.banner}
          alt="Profile Banner"
          aspectRatio="banner"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/40 pointer-events-none" />

        {/* Change Banner Button */}
        <button
          onClick={() => {
            if (!requireAuth('edit your banner')) return;
            setEditTab('banner');
            setIsEditingProfile(true);
          }}
          className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-xs font-semibold text-white flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Edit Banner</span>
        </button>
      </div>

      {/* 2. USER HEADER SECTION */}
      <div className="px-4 -mt-14 relative z-10 space-y-4">
        <div className="flex items-end justify-between">
          {/* Avatar with Camera Overlay (EDITABLE) */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-amber-300 shadow-[0_0_20px_rgba(255,193,7,0.4)] flex items-center justify-center overflow-hidden">
              <UserAvatar
                src={userProfile.avatar}
                name={userProfile.name}
                className="w-full h-full"
              />
            </div>

            {/* Quick Click to Edit Avatar */}
            <button
              onClick={() => {
                if (!requireAuth('edit your profile')) return;
                setEditTab('avatar');
                setIsEditingProfile(true);
              }}
              className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-amber-400/40"
              title="Change Profile Picture"
            >
              <Camera className="w-5 h-5 text-amber-300" />
              <span className="text-[10px] font-bold text-white mt-0.5">Edit</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (!requireAuth('edit your profile')) return;
                setEditTab('info');
                setIsEditingProfile(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
            <button
              onClick={() => {
                if (myReviews[0]) {
                  openShareStory(myReviews[0]);
                }
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-slate-200 shadow-sm"
              title="Share profile card"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Identity Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h1 className="font-display font-extrabold text-2xl text-white">
              {userProfile.name}
            </h1>
            {userProfile.isVip && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                STAR VIP
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="text-amber-300/90 font-semibold">@{userProfile.handle}</span>
            {userProfile.pronouns && <span>· {userProfile.pronouns}</span>}
            <span>· {userProfile.joinedDate}</span>
          </div>
          {userProfile.bio ? (
            <p className="text-sm text-slate-200 pt-1 leading-relaxed max-w-lg">
              {userProfile.bio}
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic pt-1">
              No bio yet. Tap "Edit Profile" to share your anime tastes!
            </p>
          )}
        </div>

        {/* Stats Counter Bar */}
        <div className="grid grid-cols-5 gap-2 p-3.5 rounded-2xl bg-[#111622] border border-slate-800 text-center shadow-md">
          <div>
            <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
              {completedEntries.length}
            </span>
            <span className="text-xs text-slate-400 block font-medium mt-0.5">Anime</span>
          </div>
          <div>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {totalEpisodesWatched}
            </span>
            <span className="text-xs text-slate-400 block font-medium mt-0.5">Episodes</span>
          </div>
          <div>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {daysSpent}d
            </span>
            <span className="text-xs text-slate-400 block font-medium mt-0.5 truncate">Days</span>
          </div>
          <div>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {userProfile.followersCount}
            </span>
            <span className="text-xs text-slate-400 block font-medium mt-0.5 truncate">Followers</span>
          </div>
          <div>
            <span className="font-mono text-base font-bold text-white tabular-nums">
              {userProfile.followingCount}
            </span>
            <span className="text-xs text-slate-400 block font-medium mt-0.5 truncate">Following</span>
          </div>
        </div>

        {/* 3. FAVORITES */}
        <section className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <h3 className="font-display font-bold text-sm text-white">
                Favorites
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Tap to select anime</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {TOP_SLOTS.map((slot, index) => {
              const animeId = userProfile.star4?.[index];
              const anime = animeId ? animeList.find((x) => x.id === animeId) : null;

              return (
                <div
                  key={index}
                  onClick={() => {
                    if (!requireAuth('customize favorite anime')) return;
                    setSwapSlotIndex(index);
                    setSearchQuery('');
                    setApiSearchResults([]);
                    setIsSwapStar4Open(true);
                  }}
                  className={`group relative aspect-[2/3] rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 cursor-pointer shadow-lg transition-all bg-slate-900 ${
                    anime ? slot.ring : ''
                  }`}
                >
                  {anime ? (
                    <>
                      <AnimeImage
                        src={anime.coverImage}
                        fallbackSrc={anime.bannerImage}
                        alt={getAnimeTitle(anime)}
                        aspectRatio="poster"
                        containerClassName="w-full h-full"
                        className="group-hover:scale-105 transition-transform"
                      />

                      {/* Rank Badge */}
                      <div className="absolute top-2 left-2 z-10">
                        <span className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold shadow-md ${slot.badge}`}>
                          #{slot.rank}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!requireAuth('customize favorite anime')) return;
                          handleRemoveTopAnime(index, e);
                        }}
                        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Bottom Info Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-2.5 pointer-events-none">
                        <span className="font-bold text-xs text-white truncate drop-shadow">
                          {getAnimeTitle(anime)}
                        </span>
                        <div className="flex items-center justify-between text-[10px] text-amber-300 font-mono mt-0.5 font-bold">
                          <span>★ {anime.score.toFixed(1)}</span>
                          <span className="text-slate-400 font-normal">{anime.year}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Empty Slot Card */
                    <div className="w-full h-full p-3 border-2 border-dashed border-slate-800 group-hover:border-amber-400/60 rounded-2xl flex flex-col items-center justify-center text-center transition-colors">
                      <div className="w-9 h-9 rounded-full bg-slate-800/80 group-hover:bg-amber-400/20 text-slate-400 group-hover:text-amber-400 flex items-center justify-center mb-1.5 transition-colors">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-xs text-slate-300 group-hover:text-amber-300">
                        Top #{slot.rank}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                        Pick Anime (API)
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. PROFILE TABS */}
        <div className="border-b border-slate-800 flex items-center gap-4 text-sm font-semibold overflow-x-auto no-scrollbar pt-2">
          {[
            { id: 'diary', label: `Diary (${myActiveLogs.length})` },
            { id: 'reviews', label: `Reviews (${myReviews.length})` },
            { id: 'watchlist', label: `Watchlist (${libraryEntries.length})` },
            { id: 'lists', label: `Lists (${myLists.length})` },
            { id: 'stats', label: 'Stats' },
            { id: 'archived', label: `Archived (${myArchived.length})` }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setProfileTab(t.id as any)}
              className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                profileTab === t.id
                  ? 'text-amber-400 border-b-2 border-amber-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: WATCH DIARY */}
        {profileTab === 'diary' && (
          <div className="space-y-3">
            {myActiveLogs.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
                <Sparkles className="w-6 h-6 text-amber-400/60 mx-auto mb-2" />
                <p className="font-semibold text-slate-300">Your diary is empty</p>
                <p className="text-slate-500 mt-0.5">Rate or review an anime to start your journey!</p>
              </div>
            ) : (
              myActiveLogs.map((log) => {
                const isOP = !isGuest && (log.userId === userProfile.id || log.userHandle === userProfile.handle);
                return (
                  <div
                    key={log.id}
                    className="p-3 rounded-2xl bg-[#111622] border border-slate-800 hover:border-slate-700 flex items-center justify-between gap-3 text-xs relative"
                  >
                    <div
                      onClick={() => setSelectedAnimeId(log.animeId)}
                      className="flex items-center gap-3 overflow-hidden flex-1 cursor-pointer"
                    >
                      <img
                        src={log.animeCover}
                        alt={getAnimeTitle(log.animeTitle)}
                        referrerPolicy="no-referrer"
                        className="w-10 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="font-bold text-white text-sm truncate">
                          {getAnimeTitle(log.animeTitle)}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {log.dateWatched} · {log.animeFormat}
                          {log.episodeLogged ? ` · Ep ${log.episodeLogged}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-amber-400 block">
                          ★ {log.rating.toFixed(1)}
                        </span>
                        {log.isRewatch && (
                          <span className="text-[10px] text-purple-400 font-mono">Rewatch</span>
                        )}
                      </div>

                      {/* OP Action Menu */}
                      {isOP && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuLogId(activeMenuLogId === log.id ? null : log.id);
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Post options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuLogId === log.id && (
                            <div className="absolute right-0 top-8 z-30 w-36 rounded-2xl bg-[#0E121B] border border-slate-800 p-1.5 shadow-xl space-y-1">
                              <button
                                onClick={() => {
                                  setActiveMenuLogId(null);
                                  openLogger(log.animeId, log);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-300 transition-colors"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveMenuLogId(null);
                                  archiveLog(log.id);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-300 transition-colors"
                              >
                                <Archive className="w-3.5 h-3.5 text-amber-400" />
                                <span>Archive</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveMenuLogId(null);
                                  setDeleteConfirmLogId(log.id);
                                }}
                                className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS */}
        {profileTab === 'reviews' && (
          <div className="space-y-3">
            {myReviews.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
                <MessageSquare className="w-6 h-6 text-amber-400/60 mx-auto mb-2" />
                <p className="font-semibold text-slate-300">No written reviews yet</p>
                <p className="text-slate-500 mt-0.5">Use the Star button to log an entry with a review!</p>
              </div>
            ) : (
              myReviews.map((r) => {
                const isOP = !isGuest && (r.userId === userProfile.id || r.userHandle === userProfile.handle);
                return (
                  <div
                    key={r.id}
                    className="p-4 rounded-3xl bg-[#111622] border border-slate-800 space-y-3 text-xs relative"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        onClick={() => setSelectedAnimeId(r.animeId)}
                        className="font-bold text-white text-sm hover:text-amber-300 cursor-pointer transition-colors"
                      >
                        {getAnimeTitle(r.animeTitle)}
                      </span>
                      <div className="flex items-center gap-2">
                        <StarRating rating={r.rating} size="sm" />
                        {isOP && (
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuLogId(activeMenuLogId === r.id ? null : r.id);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                              title="Post options"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {activeMenuLogId === r.id && (
                              <div className="absolute right-0 top-8 z-30 w-36 rounded-2xl bg-[#0E121B] border border-slate-800 p-1.5 shadow-xl space-y-1">
                                <button
                                  onClick={() => {
                                    setActiveMenuLogId(null);
                                    openLogger(r.animeId, r);
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-300 transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuLogId(null);
                                    archiveLog(r.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-amber-300 transition-colors"
                                >
                                  <Archive className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Archive</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setActiveMenuLogId(null);
                                    setDeleteConfirmLogId(r.id);
                                  }}
                                  className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {r.reviewText && (
                      <p className="text-slate-300 leading-relaxed">{r.reviewText}</p>
                    )}
                    <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-800/80">
                      <span>{r.dateWatched}</span>
                      <button
                        onClick={() => openShareStory(r)}
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold text-xs"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 3: WATCHLIST */}
        {profileTab === 'watchlist' && (
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {(['Watching', 'Plan to Watch', 'Completed', 'On Hold', 'Dropped'] as WatchStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setWatchlistFilter(status)}
                    className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                      watchlistFilter === status
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-800 text-slate-300'
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            {filteredWatchlist.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">
                No titles in {watchlistFilter}
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {filteredWatchlist.map(({ entry, anime }) => (
                  <div
                    key={anime!.id}
                    onClick={() => setSelectedAnimeId(anime!.id)}
                    className="p-2 rounded-2xl bg-[#111622] border border-slate-800 hover:border-amber-400/50 cursor-pointer text-xs group"
                  >
                    <div className="aspect-[2/3] rounded-xl overflow-hidden mb-2">
                      <img
                        src={anime!.coverImage}
                        alt={getAnimeTitle(anime!)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h4 className="font-bold text-white truncate">{getAnimeTitle(anime!)}</h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>Ep {entry.episodesWatched}/{anime!.episodes}</span>
                      {entry.score > 0 && (
                        <span className="font-mono text-amber-400 font-bold">
                          ★ {entry.score.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: LISTS */}
        {profileTab === 'lists' && (
          <div className="space-y-3">
            {myLists.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-400">
                No lists created yet. Head over to Lists to build one!
              </p>
            ) : (
              myLists.map((l) => (
                <div
                  key={l.id}
                  onClick={() => setSelectedListId(l.id)}
                  className="p-3.5 rounded-2xl bg-[#111622] border border-slate-800 hover:border-purple-400 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{l.title}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {l.items.length} titles · ♥ {l.likes}
                    </p>
                  </div>
                  <span className="text-amber-400 text-xs font-semibold">View</span>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 5: STATS */}
        {profileTab === 'stats' && (
          <div className="space-y-6 text-xs">
            <div className="p-4 rounded-3xl bg-[#111622] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                <h4 className="font-display font-bold text-sm text-white">
                  Favorite Genres
                </h4>
              </div>
              <div className="space-y-2">
                {Object.entries(genreCounts).length === 0 ? (
                  <p className="text-slate-500 text-xs">Complete anime watches to view your genre breakdown.</p>
                ) : (
                  Object.entries(genreCounts).map(([genre, count]) => {
                    const total = completedEntries.length || 1;
                    const percent = Math.round((count / total) * 100);
                    return (
                      <div key={genre} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>{genre}</span>
                          <span className="font-mono text-amber-400">{count} titles ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ARCHIVED */}
        {profileTab === 'archived' && (
          <div className="space-y-3">
            {myArchived.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 rounded-2xl bg-slate-900/40 border border-slate-800">
                <Archive className="w-6 h-6 text-amber-400/60 mx-auto mb-2" />
                <p className="font-semibold text-slate-300">No archived posts</p>
                <p className="text-slate-500 mt-0.5">Posts you archive will be kept safe here and hidden from public feeds.</p>
              </div>
            ) : (
              myArchived.map((log) => {
                const isOP = !isGuest && (log.userId === userProfile.id || log.userHandle === userProfile.handle);
                return (
                  <div
                    key={log.id}
                    className="p-3.5 rounded-2xl bg-[#111622] border border-slate-800 space-y-2.5 text-xs"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div
                        onClick={() => setSelectedAnimeId(log.animeId)}
                        className="flex items-center gap-3 overflow-hidden flex-1 cursor-pointer"
                      >
                        <img
                          src={log.animeCover}
                          alt={getAnimeTitle(log.animeTitle)}
                          referrerPolicy="no-referrer"
                          className="w-10 h-14 rounded-lg object-cover shrink-0 opacity-80"
                        />
                        <div className="truncate">
                          <h4 className="font-bold text-white text-sm truncate">
                            {getAnimeTitle(log.animeTitle)}
                          </h4>
                          <p className="text-[11px] text-slate-400">
                            {log.dateWatched} · {log.animeFormat}
                          </p>
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="font-mono text-sm font-bold text-amber-400 block">
                          ★ {log.rating.toFixed(1)}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                          Archived
                        </span>
                      </div>
                    </div>

                    {log.reviewText && (
                      <p className="text-slate-400 text-xs italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60 line-clamp-2">
                        "{log.reviewText}"
                      </p>
                    )}

                    {isOP && (
                      <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800/80">
                        <button
                          onClick={() => archiveLog(log.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Archive className="w-3.5 h-3.5 text-amber-400" />
                          <span>Unarchive</span>
                        </button>
                        <button
                          onClick={() => openLogger(log.animeId, log)}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmLogId(log.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-medium text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                          <span>Delete</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* MODAL 1: PICK TOP 3 ANIME VIA LIVE API */}
      {isSwapStar4Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsSwapStar4Open(false)}
          />
          <div className="relative z-10 w-full max-w-md max-h-[85vh] bg-[#10141E] border border-amber-400/50 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden text-xs">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Pick Favorite #{((swapSlotIndex ?? 0) + 1)}
                  </h3>
                  <p className="text-[10px] text-slate-400">Search any anime across live AniList API</p>
                </div>
              </div>
              <button
                onClick={() => setIsSwapStar4Open(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live API Search Input */}
            <div className="pt-3 pb-2 shrink-0">
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search title (e.g. Frieren, Naruto, Bleach, Attack on Titan)..."
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  autoFocus
                />
                {isSearchingApi ? (
                  <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
                ) : searchQuery ? (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
            </div>

            {/* Results List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 py-2 pr-1">
              {searchQuery.trim() ? (
                apiSearchResults.length > 0 ? (
                  apiSearchResults.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => handleSelectTopAnime(a)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl bg-slate-900 hover:bg-slate-800/90 text-left transition-colors border border-transparent hover:border-amber-400/30 group"
                    >
                      <img
                        src={a.coverImage}
                        alt={getAnimeTitle(a)}
                        referrerPolicy="no-referrer"
                        className="w-10 h-14 object-cover rounded-lg shrink-0 border border-slate-800"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-xs truncate group-hover:text-amber-300 transition-colors">
                          {getAnimeTitle(a)}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {a.year} · {a.format} · {a.episodes} Ep
                        </p>
                        <span className="inline-block mt-1 font-mono text-[10px] text-amber-400 font-bold">
                          ★ {a.score.toFixed(1)} / 5.0
                        </span>
                      </div>
                    </button>
                  ))
                ) : !isSearchingApi ? (
                  <div className="py-8 text-center text-slate-500">
                    No anime found matching "{searchQuery}"
                  </div>
                ) : null
              ) : (
                /* Curated Quick Picks from Local Cache */
                <div>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2 px-1">
                    Quick Curated Picks
                  </span>
                  <div className="space-y-1.5">
                    {animeList.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => handleSelectTopAnime(a)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-left transition-colors group"
                      >
                        <img
                          src={a.coverImage}
                          alt={getAnimeTitle(a)}
                          referrerPolicy="no-referrer"
                          className="w-9 h-12 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-white text-xs truncate group-hover:text-amber-300">
                            {getAnimeTitle(a)}
                          </p>
                          <p className="text-[10px] text-slate-400">{a.year} · {a.format}</p>
                        </div>
                        <span className="font-mono text-xs text-amber-400 font-bold">
                          ★ {a.score.toFixed(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Slot Option */}
            {swapSlotIndex !== null && userProfile.star4?.[swapSlotIndex] && (
              <div className="pt-2 border-t border-slate-800 shrink-0">
                <button
                  onClick={(e) => {
                    handleRemoveTopAnime(swapSlotIndex, e);
                    setIsSwapStar4Open(false);
                  }}
                  className="w-full py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Slot #{swapSlotIndex + 1}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PROFILE & AVATAR & BANNER */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsEditingProfile(false)}
          />
          <div className="relative z-10 w-full max-w-md max-h-[88vh] bg-[#10141E] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <h3 className="font-bold text-sm text-white">Edit Profile & Imagery</h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-Tabs: Info / Avatar / Banner */}
            <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 my-3 shrink-0">
              <button
                type="button"
                onClick={() => setEditTab('info')}
                className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
                  editTab === 'info' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Profile Info
              </button>
              <button
                type="button"
                onClick={() => setEditTab('avatar')}
                className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
                  editTab === 'avatar' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Avatar Picture
              </button>
              <button
                type="button"
                onClick={() => setEditTab('banner')}
                className={`flex-1 py-1.5 font-bold rounded-lg transition-colors ${
                  editTab === 'banner' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Cover Banner
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {/* TAB A: PROFILE INFO */}
              {editTab === 'info' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Display Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Pronouns</label>
                    <input
                      type="text"
                      value={editPronouns}
                      onChange={(e) => setEditPronouns(e.target.value)}
                      placeholder="e.g. they/them, she/her, he/him"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Bio & Tastes</label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="What kinds of anime do you love? Favorite directors or studios?"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Website / Link</label>
                    <input
                      type="text"
                      value={editWebsite}
                      onChange={(e) => setEditWebsite(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* TAB B: AVATAR PICTURE EDITING */}
              {editTab === 'avatar' && (
                <div className="space-y-4">
                  {/* Live Avatar Preview */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
                    <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 to-purple-500 mb-2 shadow-lg">
                      <UserAvatar
                        src={editAvatar}
                        name={editName}
                        size="xl"
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-xs text-slate-300 font-bold">Avatar Preview</span>
                  </div>

                  {/* Upload from Local Device */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1.5">
                      Upload from Computer / Phone
                    </label>
                    <input
                      ref={avatarFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => avatarFileInputRef.current?.click()}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Choose Image File...</span>
                    </button>
                  </div>

                  {/* Preset Avatars */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-2">
                      Or Choose Anime Character Preset
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {AVATAR_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setEditAvatar(p.url)}
                          className={`aspect-square rounded-full overflow-hidden border-2 transition-transform ${
                            editAvatar === p.url
                              ? 'border-amber-400 scale-110 shadow-md ring-2 ring-amber-400/40'
                              : 'border-slate-700 opacity-70 hover:opacity-100'
                          }`}
                          title={p.name}
                        >
                          <img
                            src={p.url}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Image URL */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">
                      Or Paste Image URL
                    </label>
                    <input
                      type="url"
                      value={editAvatar}
                      onChange={(e) => setEditAvatar(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {/* TAB C: BANNER EDITING */}
              {editTab === 'banner' && (
                <div className="space-y-4">
                  {/* Live Banner Preview */}
                  <div className="rounded-2xl overflow-hidden border border-slate-800 h-28 bg-slate-900 relative">
                    <img
                      src={editBanner}
                      alt="Banner Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5 pointer-events-none">
                      <span className="text-[11px] font-bold text-white drop-shadow">Banner Preview</span>
                    </div>
                  </div>

                  {/* Upload Banner */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1.5">
                      Upload from Computer / Phone
                    </label>
                    <input
                      ref={bannerFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBannerFileUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => bannerFileInputRef.current?.click()}
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload className="w-4 h-4 text-amber-400" />
                      <span>Choose Banner File...</span>
                    </button>
                  </div>

                  {/* Preset Banners */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-2">
                      Or Choose Anime Preset Banner
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {BANNER_PRESETS.map((b) => (
                        <button
                          key={b.name}
                          type="button"
                          onClick={() => setEditBanner(b.url)}
                          className={`h-14 rounded-xl overflow-hidden border-2 relative transition-all ${
                            editBanner === b.url
                              ? 'border-amber-400 ring-2 ring-amber-400/40'
                              : 'border-slate-800 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={b.url}
                            alt={b.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-black/70 px-1 rounded">
                            {b.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Banner URL */}
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">
                      Or Paste Banner Image URL
                    </label>
                    <input
                      type="url"
                      value={editBanner}
                      onChange={(e) => setEditBanner(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmLogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setDeleteConfirmLogId(null)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#10141E] border border-rose-500/30 rounded-3xl p-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Delete Post?</h3>
            <p className="text-xs text-slate-400 mb-5">
              This action cannot be undone. Your rating and review will be permanently removed.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmLogId(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteLog(deleteConfirmLogId);
                  setDeleteConfirmLogId(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-lg shadow-rose-900/30"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
