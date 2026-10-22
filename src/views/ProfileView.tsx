import {
  BarChart3,
  Calendar,
  Check,
  Edit3,
  ExternalLink,
  Flame,
  Heart,
  Layers,
  MessageSquare,
  PieChart,
  Plus,
  RotateCcw,
  Share2,
  Sparkles,
  Star,
  Tv,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AnimeImage } from '../components/AnimeImage';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';
import { WatchStatus } from '../types/anime';

export const ProfileView: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    userLibrary,
    animeList,
    logs,
    customLists,
    updateStar4,
    setSelectedAnimeId,
    setSelectedListId,
    openShareStory,
    getAnimeTitle
  } = useApp();

  const [activeTab, setActiveTab] = useState<'diary' | 'reviews' | 'watchlist' | 'lists' | 'stats'>('diary');
  const [watchlistFilter, setWatchlistFilter] = useState<WatchStatus>('Watching');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(userProfile.name);
  const [editBio, setEditBio] = useState(userProfile.bio);
  const [isSwapStar4Open, setIsSwapStar4Open] = useState(false);
  const [swapSlotIndex, setSwapSlotIndex] = useState<number | null>(null);

  // Listen to external tab switch events from Navigation Drawer
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    window.addEventListener('hoshime_profile_tab', handler);
    return () => window.removeEventListener('hoshime_profile_tab', handler);
  }, []);

  const libraryEntries = Object.values(userLibrary);
  const completedEntries = libraryEntries.filter((e) => e.status === 'Completed');
  const totalEpisodesWatched = libraryEntries.reduce((acc, curr) => acc + curr.episodesWatched, 0);
  const daysSpent = ((totalEpisodesWatched * 24) / (60 * 24)).toFixed(1);

  // My reviews
  const myReviews = logs.filter((l) => l.userId === userProfile.id);

  // My Custom Lists
  const myLists = customLists.filter((l) => l.author.handle === userProfile.handle);

  // Star 4 anime objects
  const star4Anime = userProfile.star4.map((id) => animeList.find((a) => a.id === id)).filter(Boolean);

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

  const handleSaveProfile = () => {
    updateUserProfile({ name: editName, bio: editBio });
    setIsEditingProfile(false);
  };

  const handleSwapStar4 = (animeId: string) => {
    if (swapSlotIndex === null) return;
    const newStar4 = [...userProfile.star4];
    newStar4[swapSlotIndex] = animeId;
    updateStar4(newStar4);
    setIsSwapStar4Open(false);
    setSwapSlotIndex(null);
  };

  return (
    <div className="pb-28 max-w-4xl mx-auto text-white">
      {/* 1. COVER BANNER */}
      <div className="relative w-full h-36 sm:h-48 overflow-hidden bg-slate-900">
        <AnimeImage
          src={userProfile.banner}
          alt="Profile Banner"
          aspectRatio="banner"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-black/40 pointer-events-none" />
      </div>

      {/* 2. USER HEADER SECTION */}
      <div className="px-4 -mt-14 relative z-10 space-y-4">
        <div className="flex items-end justify-between">
          {/* Avatar with Star Frame */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-purple-500 to-amber-300 shadow-[0_0_20px_rgba(255,193,7,0.4)]">
              <AnimeImage
                src={userProfile.avatar}
                alt={userProfile.name}
                aspectRatio="square"
                containerClassName="w-full h-full rounded-full"
                className="rounded-full"
              />
            </div>
            {userProfile.isVip && (
              <div className="absolute bottom-1 right-1 bg-amber-400 p-1 rounded-full text-slate-950 shadow">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingProfile(true)}
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
          <p className="text-sm text-slate-200 pt-1 leading-relaxed max-w-lg">
            {userProfile.bio}
          </p>
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

        {/* 3. "THE STAR 4" (FAVORITE ANIME SHOWCASE) */}
        <section className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <h3 className="font-display font-bold text-sm text-white">
                The Star 4 (Ultimate Favorites)
              </h3>
            </div>
            <span className="text-[10px] text-slate-400">Tap poster to swap</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {userProfile.star4.map((id, index) => {
              const a = animeList.find((x) => x.id === id);

              return (
                <div
                  key={index}
                  onClick={() => {
                    setSwapSlotIndex(index);
                    setIsSwapStar4Open(true);
                  }}
                  className="group relative aspect-[2/3] rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-400 cursor-pointer shadow-lg transition-all bg-slate-900"
                >
                  {a ? (
                    <>
                      <AnimeImage
                        src={a.coverImage}
                        fallbackSrc={a.bannerImage}
                        alt={getAnimeTitle(a)}
                        aspectRatio="poster"
                        containerClassName="w-full h-full"
                        className="group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-2 pointer-events-none">
                        <span className="font-bold text-xs text-white truncate">
                          {getAnimeTitle(a)}
                        </span>
                        <span className="font-mono text-xs text-amber-300 font-bold">
                          ★ {a.score.toFixed(1)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-slate-600">
                      <Plus className="w-6 h-6" />
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
            { id: 'diary', label: `Watch Diary (${logs.length})` },
            { id: 'reviews', label: `Reviews (${myReviews.length})` },
            { id: 'watchlist', label: `Watchlist (${libraryEntries.length})` },
            { id: 'lists', label: `Lists (${myLists.length})` },
            { id: 'stats', label: 'Stats & Charts' }
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === t.id
                  ? 'border-amber-400 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* TAB 1: DIARY (Chronological watch log) */}
        {activeTab === 'diary' && (
          <div className="space-y-3">
            {logs.length === 0 ? (
              <div className="py-12 px-4 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <Sparkles className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
                <h4 className="font-display font-bold text-base text-white">Your Viewing Diary is Empty</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Start logging your watched episodes and ratings to create your anime timeline.
                </p>
              </div>
            ) : (
              logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-2xl bg-[#111622] border border-slate-800 flex items-center justify-between gap-3 text-xs shadow-sm hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div
                      onClick={() => setSelectedAnimeId(log.animeId)}
                      className="w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800 cursor-pointer bg-slate-900"
                    >
                      <AnimeImage
                        src={log.animeCover}
                        alt={getAnimeTitle(log.animeTitle)}
                        aspectRatio="poster"
                        containerClassName="w-full h-full"
                      />
                    </div>

                    <div className="overflow-hidden">
                      <h4
                        onClick={() => setSelectedAnimeId(log.animeId)}
                        className="font-bold text-white text-sm hover:text-amber-300 cursor-pointer truncate"
                      >
                        {getAnimeTitle(log.animeTitle)}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>{log.dateWatched}</span>
                        <span aria-hidden="true">·</span>
                        <span>{log.episodeLogged ? `Ep ${log.episodeLogged}` : 'Completed'}</span>
                        {log.isRewatch && <span className="text-purple-300 font-semibold">· Rewatch</span>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <StarRating rating={log.rating} size="sm" showScoreText={true} />
                    {log.isLike && <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {myReviews.length === 0 ? (
              <div className="py-12 px-4 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2">
                <Star className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
                <h4 className="font-display font-bold text-base text-white">No Written Reviews Yet</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  When you log an anime review, your full critique and star rating will be featured here.
                </p>
              </div>
            ) : (
              myReviews.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-[#111622] border border-slate-800 space-y-2 text-xs shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4
                      onClick={() => setSelectedAnimeId(r.animeId)}
                      className="font-bold text-white hover:text-amber-300 cursor-pointer text-base"
                    >
                      {getAnimeTitle(r.animeTitle)}
                    </h4>
                    <StarRating rating={r.rating} size="sm" showScoreText={true} />
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{r.reviewText}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                    <span>Logged {r.dateWatched}</span>
                    <button
                      onClick={() => openShareStory(r)}
                      className="text-amber-400 hover:underline flex items-center gap-1 font-semibold text-xs"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Card</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: WATCHLIST */}
        {activeTab === 'watchlist' && (
          <div className="space-y-4">
            {/* Watchlist Status Filter Chips */}
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
        {activeTab === 'lists' && (
          <div className="space-y-3">
            {myLists.map((l) => (
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
            ))}
          </div>
        )}

        {/* TAB 5: STATS & ANALYTICS VISUALIZATIONS */}
        {activeTab === 'stats' && (
          <div className="space-y-6 text-xs">
            {/* Genre Breakdown */}
            <div className="p-4 rounded-3xl bg-[#111622] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                <h4 className="font-display font-bold text-sm text-white">
                  Favorite Genres Distribution
                </h4>
              </div>

              <div className="space-y-2 font-mono">
                {Object.entries(genreCounts)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([genre, count]) => {
                    const percent = Math.round((count / (completedEntries.length || 1)) * 100);

                    return (
                      <div key={genre} className="space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>{genre}</span>
                          <span className="text-amber-400 font-bold">{count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-purple-500 rounded-full"
                            style={{ width: `${Math.min(100, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Score Habit Bar Chart */}
            <div className="p-4 rounded-3xl bg-[#111622] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h4 className="font-display font-bold text-sm text-white">
                  Rating Distribution & Habits
                </h4>
              </div>

              <div className="flex items-end justify-between h-32 pt-4 px-2">
                {Object.entries(ratingCounts).map(([star, count]) => {
                  const maxCount = Math.max(...Object.values(ratingCounts), 1);
                  const heightPercent = Math.round((count / maxCount) * 100);

                  return (
                    <div key={star} className="flex flex-col items-center gap-1.5 flex-1">
                      <span className="font-mono text-[10px] text-amber-400 font-bold">
                        {count}
                      </span>
                      <div className="w-6 bg-slate-800 rounded-t-lg overflow-hidden flex flex-col justify-end h-20">
                        <div
                          className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-lg transition-all"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {star}★
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Decades Breakdown */}
            <div className="p-4 rounded-3xl bg-[#111622] border border-slate-800 space-y-2">
              <h4 className="font-display font-bold text-sm text-white">
                Release Decades Explored
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center font-mono">
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-amber-400 font-bold block">1980-90s</span>
                  <span className="text-slate-400 text-[10px]">1 title</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-amber-400 font-bold block">2000s</span>
                  <span className="text-slate-400 text-[10px]">2 titles</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-amber-400 font-bold block">2010s</span>
                  <span className="text-slate-400 text-[10px]">3 titles</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-amber-400 font-bold block">2020s</span>
                  <span className="text-slate-400 text-[10px]">5 titles</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SWAP STAR 4 MODAL */}
      {isSwapStar4Open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsSwapStar4Open(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#111622] border border-amber-400/40 rounded-3xl p-5 shadow-2xl space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">
                Swap Star 4 Slot #{(swapSlotIndex || 0) + 1}
              </h3>
              <button
                onClick={() => setIsSwapStar4Open(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-400">Select which anime to showcase:</p>

            <div className="space-y-1.5 max-h-60 overflow-y-auto">
              {animeList.map((a) => (
                <button
                  key={a.id}
                  onClick={() => handleSwapStar4(a.id)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-left transition-colors"
                >
                  <img
                    src={a.coverImage}
                    alt={getAnimeTitle(a)}
                    referrerPolicy="no-referrer"
                    className="w-8 h-11 object-cover rounded"
                  />
                  <div>
                    <p className="font-bold text-white text-xs">{getAnimeTitle(a)}</p>
                    <p className="text-[10px] text-amber-400 font-mono">★ {a.score.toFixed(1)}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROFILE MODAL */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsEditingProfile(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#111622] border border-slate-800 rounded-3xl p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white">Edit Profile</h3>
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
              <label className="text-slate-400 font-semibold block mb-1">Bio</label>
              <textarea
                rows={3}
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-3 py-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
