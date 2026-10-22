import {
  ArrowLeft,
  Bookmark,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  Heart,
  Layers,
  MessageSquare,
  Play,
  Plus,
  Share2,
  Sparkles,
  Star,
  Tv,
  Users
} from 'lucide-react';
import React, { useState } from 'react';
import { AnimeImage } from '../components/AnimeImage';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';
import { WatchStatus } from '../types/anime';

interface AnimeDetailViewProps {
  animeId: string;
  onBack: () => void;
}

export const AnimeDetailView: React.FC<AnimeDetailViewProps> = ({ animeId, onBack }) => {
  const {
    animeList,
    userLibrary,
    updateWatchStatus,
    toggleStarFavorite,
    openLogger,
    customLists,
    updateCustomList,
    logs,
    openShareStory,
    getAnimeTitle,
    setSelectedAnimeId,
    setSelectedListId,
    userProfile
  } = useApp();

  const anime = animeList.find((a) => a.id === animeId);
  const userEntry = userLibrary[animeId];

  const [activeTab, setActiveTab] = useState<
    'overview' | 'episodes' | 'reviews' | 'characters' | 'lists' | 'recommendations'
  >('overview');

  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const [isAddToListOpen, setIsAddToListOpen] = useState(false);
  const [addedToListFeedback, setAddedToListFeedback] = useState<string | null>(null);

  if (!anime) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>Anime not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-white">
          Go Back
        </button>
      </div>
    );
  }

  // Filter reviews matching this anime
  const animeReviews = logs.filter((l) => l.animeId === anime.id);

  // Lists featuring this anime
  const listsFeaturingAnime = customLists.filter((l) =>
    l.items.some((i) => i.animeId === anime.id)
  );

  // Recommendations: Other anime in same genre
  const recommendations = animeList.filter(
    (a) => a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g))
  );

  const statuses: WatchStatus[] = ['Watching', 'Plan to Watch', 'Completed', 'On Hold', 'Dropped'];

  return (
    <div className="pb-32 max-w-4xl mx-auto text-white">
      {/* 1. HERO HEADER SECTION */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
        {/* Wide Promotional Backdrop with trailer/cover fallback */}
        <AnimeImage
          src={anime.bannerImage}
          fallbackSrc={anime.coverImage}
          alt={getAnimeTitle(anime)}
          aspectRatio="banner"
          containerClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/75 to-black/50 pointer-events-none" />

        {/* Back Button & Top Share */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-colors shadow-lg"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              const dummyLog = logs.find((l) => l.animeId === anime.id) || {
                id: `log_temp_${anime.id}`,
                userId: userProfile.id,
                userName: userProfile.name,
                userHandle: userProfile.handle,
                userAvatar: userProfile.avatar,
                animeId: anime.id,
                animeTitle: anime.title,
                animeCover: anime.coverImage,
                animeFormat: anime.format,
                rating: anime.score,
                isLike: true,
                isRewatch: false,
                rewatchCount: 0,
                dateWatched: new Date().toISOString().split('T')[0],
                reviewText: anime.synopsis,
                hasSpoilers: false,
                tags: anime.genres.map((g) => `#${g}`),
                likesCount: 0,
                commentsCount: 0,
                repostsCount: 0,
                createdAt: 'Today'
              };
              openShareStory(dummyLog as any);
            }}
            className="p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 transition-colors shadow-lg"
            aria-label="Share Story Card"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Play Trailer Floating Button */}
        {anime.trailerYoutubeId && (
          <button
            onClick={() => setShowTrailerModal(true)}
            className="absolute bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Trailer</span>
          </button>
        )}
      </div>

      {/* Main Info Strip */}
      <div className="px-4 -mt-16 sm:-mt-20 relative z-10 flex flex-col sm:flex-row gap-4 items-start">
        {/* Cover Poster with AnimeImage */}
        <div className="w-28 sm:w-36 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 bg-slate-900">
          <AnimeImage
            src={anime.coverImage}
            fallbackSrc={anime.bannerImage}
            alt={getAnimeTitle(anime)}
            aspectRatio="poster"
            containerClassName="w-full h-full"
          />
        </div>

        {/* Title & Metadata */}
        <div className="flex-1 space-y-2 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Rank #{anime.rank}
            </span>
            <span className="text-xs text-slate-300 font-mono font-semibold bg-slate-800/80 px-2 py-0.5 rounded-full border border-slate-700">
              MAL: {anime.malScore}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight drop-shadow-md">
            {anime.title.english}
          </h1>

          <div className="text-sm text-slate-300 space-x-2 font-medium">
            <span>{anime.title.romaji}</span>
            <span aria-hidden="true">·</span>
            <span className="font-japanese text-slate-400">{anime.title.native}</span>
          </div>

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-300 pt-1">
            <span>{anime.year}</span>
            <span aria-hidden="true">·</span>
            <span>{anime.format}</span>
            <span aria-hidden="true">·</span>
            <span>{anime.episodes} Episodes ({anime.durationMinutes}m)</span>
            <span aria-hidden="true">·</span>
            <span>{anime.ageRating}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-400 font-semibold">{anime.status}</span>
          </div>

          {/* Overall Hoshime Star Score Box */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/30 shadow-md">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(255,193,7,0.7)]" />
              <span className="font-mono text-xl font-extrabold text-amber-400 tabular-nums">
                {anime.score.toFixed(2)}
              </span>
              <span className="text-xs text-slate-300 font-medium">/ 5.0</span>
            </div>

            <div className="text-xs text-slate-300">
              <p className="font-mono text-white font-bold text-sm">
                {Object.values(anime.scoreDistribution).reduce((a, b) => a + b, 0).toLocaleString()}
              </p>
              <p className="text-slate-400">Ratings logged</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTION BUTTON MATRIX */}
      <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Large Prominent Log/Rate CTA */}
        <button
          onClick={() => openLogger(anime.id)}
          className="col-span-2 sm:col-span-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_2px_15px_rgba(255,193,7,0.35)] hover:brightness-110 active:scale-95 transition-all"
        >
          <Star className="w-4 h-4 fill-slate-950" />
          <span>
            {userEntry?.score ? `Logged (${userEntry.score.toFixed(1)}★)` : 'Log & Rate'}
          </span>
        </button>

        {/* Watch Status Selector */}
        <div className="relative">
          <button
            onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
            className="w-full h-full min-h-[44px] py-2.5 px-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Bookmark
                className={`w-4 h-4 shrink-0 ${
                  userEntry?.status ? 'text-amber-400 fill-amber-400/30' : 'text-slate-400'
                }`}
              />
              <span className="truncate">{userEntry?.status || 'Add to Watchlist'}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
          </button>

          {isStatusMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-2xl p-1.5 z-30 shadow-2xl space-y-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    updateWatchStatus(anime.id, status);
                    setIsStatusMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    userEntry?.status === status
                      ? 'bg-amber-400/20 text-amber-300 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{status}</span>
                  {userEntry?.status === status && <Check className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Favorite Star Button */}
        <button
          onClick={() => toggleStarFavorite(anime.id)}
          className={`min-h-[44px] py-2.5 px-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            userEntry?.isFavorite
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${userEntry?.isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>{userEntry?.isFavorite ? 'Favorited' : 'Favorite'}</span>
        </button>

        {/* Add to Custom List */}
        <button
          onClick={() => setIsAddToListOpen(true)}
          className="min-h-[44px] py-2.5 px-3 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors text-slate-300"
        >
          <Layers className="w-4 h-4 text-purple-400" />
          <span>Add to List</span>
        </button>
      </div>

      {/* 3. TABBED CONTENT NAVIGATION */}
      <div className="px-4 border-b border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-4 text-xs font-semibold">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'episodes', label: `Episodes (${anime.episodes})` },
          { id: 'reviews', label: `Reviews (${animeReviews.length})` },
          { id: 'characters', label: 'Cast & Seiyuu' },
          { id: 'lists', label: `Lists (${listsFeaturingAnime.length})` },
          { id: 'recommendations', label: 'Recommended' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-amber-400 text-amber-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="p-4 space-y-6">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Synopsis */}
            <div>
              <h3 className="font-display font-bold text-sm text-white mb-2">Synopsis</h3>
              <p
                className={`text-xs text-slate-300 leading-relaxed ${
                  !synopsisExpanded ? 'line-clamp-4' : ''
                }`}
              >
                {anime.synopsis}
              </p>
              <button
                onClick={() => setSynopsisExpanded(!synopsisExpanded)}
                className="mt-1 text-xs text-amber-400 hover:underline font-semibold"
              >
                {synopsisExpanded ? 'Show Less' : 'Read Full Synopsis'}
              </button>
            </div>

            {/* Star Score Distribution Histogram */}
            <div className="p-4 rounded-3xl bg-[#121622] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-400">
                  Rating Distribution
                </h4>
                <span className="font-mono text-xs text-amber-400 font-bold">
                  ★ {anime.score.toFixed(2)} Avg
                </span>
              </div>

              {/* Bar Graph */}
              <div className="space-y-1.5 text-xs font-mono">
                {['5.0', '4.5', '4.0', '3.5', '3.0', '2.5', '2.0', '1.0'].map((star) => {
                  const count = anime.scoreDistribution[star] || 0;
                  const max = Math.max(...Object.values(anime.scoreDistribution));
                  const percent = Math.round((count / (max || 1)) * 100);

                  return (
                    <div key={star} className="flex items-center gap-2">
                      <span className="w-7 text-[10px] text-slate-400">{star}★</span>
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <span className="w-12 text-[10px] text-slate-500 text-right tabular-nums">
                        {count.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Where to Watch (Streaming Direct Links) */}
            <div>
              <h3 className="font-display font-bold text-sm text-white mb-2.5">
                Where to Watch (Direct App Deep Links)
              </h3>
              <div className="flex flex-wrap gap-2">
                {anime.streamingLinks.map((st) => (
                  <a
                    key={st.name}
                    href={st.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-xs text-slate-200 transition-colors"
                  >
                    <span className="font-mono text-[10px] font-bold text-amber-400 bg-amber-400/10 px-1 rounded">
                      {st.badge}
                    </span>
                    <span>{st.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Information Grid */}
            <div className="p-4 rounded-3xl bg-[#121622] border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Studio</span>
                <span className="font-semibold text-white">{anime.studios.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Source Material</span>
                <span className="font-semibold text-white">{anime.source}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase">Season & Year</span>
                <span className="font-semibold text-white">
                  {anime.season} {anime.year}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase">Theme Songs</span>
                <span className="text-slate-300 block text-[11px] mt-0.5">
                  OP: {anime.themeSongs.op.join(' · ')}
                </span>
                <span className="text-slate-300 block text-[11px] mt-0.5">
                  ED: {anime.themeSongs.ed.join(' · ')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EPISODES */}
        {activeTab === 'episodes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{anime.episodesList.length} Episodes Listed</span>
              <span className="font-mono">
                Watched: {userEntry?.episodesWatched || 0} / {anime.episodes}
              </span>
            </div>

            {anime.episodesList.map((ep) => {
              const isWatched = (userEntry?.episodesWatched || 0) >= ep.number;

              return (
                <div
                  key={ep.number}
                  className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3 overflow-hidden">
                    <button
                      onClick={() => {
                        const newCount = isWatched ? ep.number - 1 : ep.number;
                        updateWatchStatus(
                          anime.id,
                          newCount >= anime.episodes ? 'Completed' : 'Watching',
                          newCount
                        );
                      }}
                      className={`min-w-[28px] h-7 rounded-lg flex items-center justify-center border transition-colors mt-0.5 ${
                        isWatched
                          ? 'bg-amber-400 border-amber-400 text-slate-950 font-bold'
                          : 'border-slate-700 text-transparent hover:border-slate-500'
                      }`}
                      aria-label="Toggle Watched"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </button>

                    <div>
                      <p className="font-bold text-white text-xs">
                        Ep {ep.number}: {ep.title}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Air Date: {ep.airDate}
                      </p>
                      {ep.synopsis && (
                        <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                          {ep.synopsis}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => openLogger(anime.id)}
                    className="p-2 text-slate-400 hover:text-amber-400 shrink-0"
                    title="Log Episode Note"
                  >
                    <Star className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{animeReviews.length} Community Reviews</span>
              <button
                onClick={() => openLogger(anime.id)}
                className="text-xs text-amber-400 hover:underline font-bold"
              >
                Write a Review
              </button>
            </div>

            {animeReviews.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <p>No community reviews for this anime yet.</p>
                <button
                  onClick={() => openLogger(anime.id)}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Be the first to review
                </button>
              </div>
            ) : (
              animeReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#121622] border border-slate-800 space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.userAvatar}
                        alt={rev.userName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-bold text-white">{rev.userName}</span>
                      <span className="text-slate-500 font-mono">@{rev.userHandle}</span>
                    </div>
                    <StarRating rating={rev.rating} size="sm" showScoreText={true} />
                  </div>
                  <p className="text-slate-200 leading-relaxed whitespace-pre-line">
                    {rev.reviewText}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: CHARACTERS & CAST */}
        {activeTab === 'characters' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anime.characters.map((ch) => (
              <div
                key={ch.id}
                className="p-3.5 rounded-2xl bg-[#121622] border border-slate-800/90 flex items-center justify-between gap-3 text-xs shadow-sm hover:border-slate-700 transition-colors"
              >
                {/* Character */}
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-slate-900">
                    <AnimeImage
                      src={ch.image}
                      fallbackSrc={anime.coverImage}
                      alt={ch.name}
                      aspectRatio="poster"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="truncate">
                    <p className="font-bold text-white text-sm truncate">{ch.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{ch.role}</p>
                  </div>
                </div>

                {/* Voice Actor (Seiyuu) */}
                <div className="flex items-center gap-2.5 text-right shrink-0">
                  <div>
                    <p className="font-semibold text-amber-300 text-sm">
                      {ch.voiceActor.name}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {ch.voiceActor.language}
                    </p>
                  </div>
                  <div className="w-12 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-700/80 bg-slate-900">
                    <AnimeImage
                      src={ch.voiceActor.image}
                      fallbackSrc={anime.coverImage}
                      alt={ch.voiceActor.name}
                      aspectRatio="poster"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: LISTS */}
        {activeTab === 'lists' && (
          <div className="space-y-3">
            {listsFeaturingAnime.length === 0 ? (
              <p className="text-xs text-slate-400 py-8 text-center">
                This anime hasn't been added to any public lists yet.
              </p>
            ) : (
              listsFeaturingAnime.map((list) => (
                <div
                  key={list.id}
                  onClick={() => setSelectedListId(list.id)}
                  className="p-3 rounded-2xl bg-[#121622] border border-slate-800 hover:border-purple-400/50 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-white">{list.title}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      by @{list.author.handle} · {list.items.length} titles
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 -rotate-90 text-slate-400" />
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 6: RECOMMENDATIONS */}
        {activeTab === 'recommendations' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedAnimeId(rec.id)}
                className="p-2 rounded-2xl bg-[#121622] border border-slate-800 hover:border-amber-400/50 cursor-pointer text-xs group"
              >
                <div className="aspect-[2/3] rounded-xl overflow-hidden mb-2">
                  <img
                    src={rec.coverImage}
                    alt={getAnimeTitle(rec)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="font-bold text-white truncate">{getAnimeTitle(rec)}</h4>
                <span className="font-mono text-amber-400 text-[10px] font-bold">
                  ★ {rec.score.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TRAILER MODAL */}
      {showTrailerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
          <div className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setShowTrailerModal(false)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 text-white"
            >
              ✕
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${anime.trailerYoutubeId}?autoplay=1`}
                title={`${anime.title.english} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ADD TO LIST DIALOG */}
      {isAddToListOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80"
            onClick={() => setIsAddToListOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#121622] border border-slate-800 rounded-3xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white">Add to Custom List</h3>
            {addedToListFeedback ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <p className="text-xs font-bold text-emerald-400">
                  Added to "{addedToListFeedback}"!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {customLists.map((l) => {
                  const alreadyIn = l.items.some((i) => i.animeId === anime.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        if (!alreadyIn) {
                          updateCustomList(l.id, {
                            items: [...l.items, { animeId: anime.id, rank: l.items.length + 1 }]
                          });
                        }
                        setAddedToListFeedback(l.title);
                        setTimeout(() => {
                          setAddedToListFeedback(null);
                          setIsAddToListOpen(false);
                        }, 900);
                      }}
                      className="w-full text-left p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs text-white font-medium flex items-center justify-between"
                    >
                      <div className="truncate pr-2">
                        <span className="block truncate">{l.title}</span>
                        <span className="text-[10px] text-slate-400">
                          {alreadyIn ? 'Already in list' : `${l.items.length} items`}
                        </span>
                      </div>
                      {alreadyIn ? (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Plus className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
