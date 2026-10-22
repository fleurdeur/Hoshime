import {
  ChevronRight,
  Compass,
  Dice5,
  Dices,
  Flame,
  Layers,
  Play,
  RotateCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trophy,
  Tv
} from 'lucide-react';
import React, { useState } from 'react';
import { AnimeImage } from '../components/AnimeImage';
import { useApp } from '../context/AppContext';
import { Anime } from '../types/anime';

export const DiscoverView: React.FC = () => {
  const {
    animeList,
    isLoadingAnime,
    loadMoreAnime,
    customLists,
    setSelectedAnimeId,
    setSelectedListId,
    setIsSearchOpen,
    getAnimeTitle
  } = useApp();

  const [activeChip, setActiveChip] = useState<string>('Top Rated');
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [isStarWheelOpen, setIsStarWheelOpen] = useState(false);
  const [wheelSelectedAnime, setWheelSelectedAnime] = useState<Anime | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Featured seasonal hits for Hero Carousel
  const heroAnime = animeList.slice(0, 3);
  const currentHero = heroAnime[heroIndex] || animeList[0];

  const rollStarWheel = () => {
    setIsSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * animeList.length);
      setWheelSelectedAnime(animeList[randomIndex]);
      spins++;
      if (spins > 12) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 120);
  };

  const handleOpenWheel = () => {
    setIsStarWheelOpen(true);
    rollStarWheel();
  };

  const filterChips = [
    'Top Rated',
    'Trending',
    'Seasonal',
    'Upcoming',
    'Movies',
    'Studios'
  ];

  // Studio showcase list
  const studios = [
    { name: 'MAPPA', count: 18, color: 'from-orange-500/20 to-red-500/10' },
    { name: 'Kyoto Animation', count: 24, color: 'from-blue-500/20 to-cyan-500/10' },
    { name: 'Madhouse', count: 32, color: 'from-amber-500/20 to-yellow-500/10' },
    { name: 'ufotable', count: 12, color: 'from-purple-500/20 to-violet-500/10' },
    { name: 'Studio Ghibli', count: 22, color: 'from-emerald-500/20 to-teal-500/10' },
    { name: 'Studio Trigger', count: 14, color: 'from-pink-500/20 to-rose-500/10' }
  ];

  return (
    <div className="pb-32 max-w-4xl mx-auto px-3 sm:px-4 pt-3 space-y-6">
      {/* 1. STICKY TOP SEARCH BAR TRIGGER */}
      <div
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center justify-between p-3 rounded-2xl bg-[#121622] border border-slate-800 hover:border-amber-400/50 cursor-pointer shadow-md group transition-all"
      >
        <div className="flex items-center gap-3 text-slate-400">
          <Search className="w-4 h-4 group-hover:text-amber-400 transition-colors" />
          <span className="text-xs font-medium group-hover:text-slate-200">
            Search titles, studios, genres (e.g. Frieren, MAPPA)...
          </span>
        </div>
        <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300">
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* 2. HERO BANNER CAROUSEL */}
      {currentHero && (
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
          {/* Banner Art via AnimeImage with trailer still / cover fallback */}
          <AnimeImage
            src={currentHero.bannerImage}
            fallbackSrc={currentHero.coverImage}
            alt={getAnimeTitle(currentHero)}
            aspectRatio="banner"
            containerClassName="w-full h-full"
            className="scale-105 group-hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/65 to-transparent pointer-events-none" />

          {/* Banner Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col justify-end space-y-2 z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                Seasonal Spotlight
              </span>
              <span className="font-mono text-sm font-bold text-amber-300 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
                ★ {currentHero.score.toFixed(2)}
              </span>
            </div>

            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-tight line-clamp-2 drop-shadow-md">
              {getAnimeTitle(currentHero)}
            </h2>

            <p className="text-sm text-slate-200 line-clamp-2 max-w-xl hidden sm:block leading-relaxed drop-shadow">
              {currentHero.synopsis}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => setSelectedAnimeId(currentHero.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <span>View Anime</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => setSelectedAnimeId(currentHero.id)}
                className="px-3 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition-colors"
              >
                Season Guide
              </button>
            </div>
          </div>

          {/* Carousel indicators */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 p-1 rounded-full bg-black/50 backdrop-blur-sm">
            {heroAnime.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setHeroIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  heroIndex === idx ? 'w-5 bg-amber-400' : 'bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. QUICK FILTER CHIPS ROW */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveChip(chip)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeChip === chip
                ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* 4. RANDOM ANIME GENERATOR */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-purple-900/30 via-[#161C2C] to-amber-900/20 border border-purple-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-[0_0_15px_rgba(124,77,255,0.4)]">
            <Dices className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-white">
              Random Anime
            </h3>
            <p className="text-xs text-slate-400">
              Get an instant random anime recommendation
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenWheel}
          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all whitespace-nowrap"
        >
          Pick Random
        </button>
      </div>

      {/* 5. POPULAR THIS SEASON (Horizontal Poster Scroll) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h3 className="font-display font-bold text-base text-white">
              Popular Anime
            </h3>
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            See All ({animeList.length})
          </button>
        </div>

        <div className="flex items-stretch gap-3 overflow-x-auto no-scrollbar pb-2">
          {animeList.map((anime) => (
            <div
              key={anime.id}
              onClick={() => setSelectedAnimeId(anime.id)}
              className="w-38 sm:w-40 shrink-0 rounded-2xl bg-[#111622] border border-slate-800/80 hover:border-amber-400/50 cursor-pointer overflow-hidden group transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                <AnimeImage
                  src={anime.coverImage}
                  fallbackSrc={anime.bannerImage}
                  alt={getAnimeTitle(anime)}
                  aspectRatio="poster"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 backdrop-blur-sm text-xs font-mono font-bold text-amber-300 border border-white/10 shadow">
                  ★ {anime.score.toFixed(1)}
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-xs text-slate-200 font-medium">
                  {anime.format}
                </div>
              </div>

              <div className="p-3">
                <h4 className="font-display font-bold text-sm text-white line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-amber-300 transition-colors">
                  {getAnimeTitle(anime)}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-1">
                  {anime.genres.slice(0, 2).join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRENDING COMMUNITY LISTS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="font-display font-bold text-base text-white">
              Trending Community Lists
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {customLists.map((list) => (
            <div
              key={list.id}
              onClick={() => setSelectedListId(list.id)}
              className="p-3.5 rounded-2xl bg-[#111622] border border-slate-800 hover:border-purple-400/50 cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-purple-400 font-medium">
                  {list.items.length} titles
                </span>
                <span className="text-slate-400">♥ {list.likes} likes</span>
              </div>

              <h4 className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                {list.title}
              </h4>
              <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {list.description}
              </p>

              {/* Poster Thumbnail Stack Preview */}
              <div className="flex items-center gap-1.5 pt-2">
                {list.items.slice(0, 4).map((item, idx) => {
                  const anime = animeList.find((a) => a.id === item.animeId);
                  if (!anime) return null;
                  return (
                    <img
                      key={idx}
                      src={anime.coverImage}
                      alt={anime.title.english}
                      referrerPolicy="no-referrer"
                      className="w-10 h-14 rounded-lg object-cover border border-slate-800"
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ALL ANIME BROWSER & CATALOG (LIST ALL ANIME FROM OFFICIAL API) */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-display font-bold text-base text-white">
              All Anime
            </h3>
            <span className="text-[10px] font-mono text-amber-400/90 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              {animeList.length} Titles
            </span>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Search
          </button>
        </div>

        {/* 2-Column / 3-Column Grid of All Anime */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {animeList.map((anime) => (
            <div
              key={anime.id}
              onClick={() => setSelectedAnimeId(anime.id)}
              className="rounded-2xl bg-[#111622] border border-slate-800/80 hover:border-amber-400/50 cursor-pointer overflow-hidden group transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-900">
                <AnimeImage
                  src={anime.coverImage}
                  fallbackSrc={anime.bannerImage}
                  alt={getAnimeTitle(anime)}
                  aspectRatio="poster"
                  className="group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/85 backdrop-blur-sm text-xs font-mono font-bold text-amber-300 border border-white/10 shadow">
                  ★ {anime.score.toFixed(1)}
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-xs text-slate-200 font-medium">
                  {anime.format} · {anime.episodes || '?'} Ep
                </div>
              </div>

              <div className="p-3">
                <h4 className="font-display font-bold text-sm text-white line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-amber-300 transition-colors">
                  {getAnimeTitle(anime)}
                </h4>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span className="truncate">{anime.genres[0] || 'Anime'}</span>
                  <span className="font-mono text-slate-400 font-medium">{anime.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => loadMoreAnime({ page: Math.floor(animeList.length / 30) + 1 })}
            disabled={isLoadingAnime}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:border-amber-400 text-xs font-semibold text-amber-300 active:scale-95 transition-all shadow-md disabled:opacity-50"
          >
            {isLoadingAnime ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load More Anime</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* 8. STUDIO SHOWCASE */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Tv className="w-4 h-4 text-blue-400" />
          <h3 className="font-display font-bold text-base text-white">
            Studio Showcase
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {studios.map((st) => (
            <div
              key={st.name}
              onClick={() => setIsSearchOpen(true)}
              className={`p-3 rounded-2xl bg-gradient-to-br ${st.color} bg-slate-900 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all`}
            >
              <h4 className="font-display font-bold text-sm text-white">{st.name}</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {st.count} Works Featured
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STAR WHEEL MODAL */}
      {isStarWheelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsStarWheelOpen(false)}
          />
          <div className="relative z-10 w-full max-w-sm bg-[#111622] border border-amber-400/40 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-400">
              <Sparkles className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
            </div>

            <div>
              <h3 className="font-display font-extrabold text-lg text-white">
                {isSpinning ? 'Consulting the Stars...' : 'The Stars Have Decided!'}
              </h3>
              <p className="text-xs text-slate-400">
                Randomized anime recommendation for your tonight's watch
              </p>
            </div>

            {wheelSelectedAnime && (
              <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col items-center">
                <img
                  src={wheelSelectedAnime.coverImage}
                  alt={getAnimeTitle(wheelSelectedAnime)}
                  referrerPolicy="no-referrer"
                  className="w-28 h-40 object-cover rounded-xl shadow-lg border border-white/10 mb-2"
                />
                <h4 className="font-bold text-white text-sm line-clamp-1">
                  {getAnimeTitle(wheelSelectedAnime)}
                </h4>
                <span className="font-mono text-xs text-amber-400 mt-0.5 font-bold">
                  ★ {wheelSelectedAnime.score.toFixed(1)} / 5.0
                </span>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                  {wheelSelectedAnime.synopsis}
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={rollStarWheel}
                disabled={isSpinning}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 flex items-center justify-center gap-1.5"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>Reroll</span>
              </button>

              <button
                onClick={() => {
                  if (wheelSelectedAnime) {
                    setSelectedAnimeId(wheelSelectedAnime.id);
                    setIsStarWheelOpen(false);
                  }
                }}
                disabled={isSpinning}
                className="flex-1 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300"
              >
                View Anime
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
