import {
  Check,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Star,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Anime } from '../types/anime';

const ALL_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Gore',
  'Historical',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
];

interface SearchFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAnime: (animeId: string) => void;
}

export const SearchFilterSheet: React.FC<SearchFilterSheetProps> = ({
  isOpen,
  onClose,
  onSelectAnime
}) => {
  const { animeList, getAnimeTitle, loadMoreAnime, isLoadingAnime } = useApp();

  const [query, setQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Trigger live search against official AniList database when user types
  React.useEffect(() => {
    if (query.trim().length >= 3) {
      const handler = setTimeout(() => {
        loadMoreAnime({ search: query.trim() });
      }, 400);
      return () => clearTimeout(handler);
    }
  }, [query]);

  // Filter states
  const [sortBy, setSortBy] = useState<
    'popularity' | 'score' | 'release' | 'alpha'
  >('score');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [genreStates, setGenreStates] = useState<
    Record<string, 'include' | 'exclude' | 'neutral'>
  >({});
  const [minScore, setMinScore] = useState<number>(0);

  if (!isOpen) return null;

  // Genre 3-state toggle: neutral -> include -> exclude -> neutral
  const toggleGenre = (genre: string) => {
    setGenreStates((prev) => {
      const current = prev[genre] || 'neutral';
      if (current === 'neutral') return { ...prev, [genre]: 'include' };
      if (current === 'include') return { ...prev, [genre]: 'exclude' };
      return { ...prev, [genre]: 'neutral' };
    });
  };

  const resetFilters = () => {
    setSortBy('score');
    setSelectedFormat('All');
    setSelectedStatus('All');
    setGenreStates({});
    setMinScore(0);
  };

  // Filter logic
  const includedGenres = Object.entries(genreStates)
    .filter(([_, val]) => val === 'include')
    .map(([g]) => g);

  const excludedGenres = Object.entries(genreStates)
    .filter(([_, val]) => val === 'exclude')
    .map(([g]) => g);

  let filtered = animeList.filter((anime) => {
    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchEng = anime.title.english.toLowerCase().includes(q);
      const matchRom = anime.title.romaji.toLowerCase().includes(q);
      const matchKanji = anime.title.native.toLowerCase().includes(q);
      const matchStudios = anime.studios.some((s) => s.toLowerCase().includes(q));
      if (!matchEng && !matchRom && !matchKanji && !matchStudios) return false;
    }

    // Format
    if (selectedFormat !== 'All' && anime.format !== selectedFormat) return false;

    // Status
    if (selectedStatus !== 'All' && anime.status !== selectedStatus) return false;

    // Min Score
    if (anime.score < minScore) return false;

    // Genres included (must have all included)
    for (const inc of includedGenres) {
      if (!anime.genres.includes(inc)) return false;
    }

    // Genres excluded (must NOT have any excluded)
    for (const exc of excludedGenres) {
      if (anime.genres.includes(exc)) return false;
    }

    return true;
  });

  // Sort logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'popularity') return a.rank - b.rank;
    if (sortBy === 'release') return b.year - a.year;
    if (sortBy === 'alpha') return a.title.english.localeCompare(b.title.english);
    return 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0B0E14] text-white">
      {/* Top Search Header */}
      <div className="h-16 px-4 bg-[#10141E] border-b border-slate-800 flex items-center gap-3 shrink-0">
        <div className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700/80 focus-within:border-amber-400">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search anime title, studio, Japanese name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-0.5 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Drawer Toggle */}
        <button
          onClick={() => setShowFilterPanel(!showFilterPanel)}
          className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border transition-colors ${
            showFilterPanel || includedGenres.length > 0 || excludedGenres.length > 0 || minScore > 0
              ? 'bg-amber-400/20 border-amber-400 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
          }`}
          aria-label="Toggle Filters"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-white"
          aria-label="Close search"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* FILTER BOTTOM / SLIDE DRAWER IF ACTIVE */}
      {showFilterPanel && (
        <div className="p-4 bg-[#121723] border-b border-slate-800 max-h-72 overflow-y-auto space-y-4 text-xs">
          {/* Sorting */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Sort By
              </span>
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'score', label: '★ Star Rating' },
                { id: 'popularity', label: 'Popularity' },
                { id: 'release', label: 'Release Date' },
                { id: 'alpha', label: 'A to Z' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSortBy(s.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    sortBy === s.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] block mb-1.5">
              Format
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'TV', 'Movie', 'OVA', 'ONA'].map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFormat(f)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedFormat === f
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Minimum Star Rating Slider */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Minimum Score
              </span>
              <span className="font-mono text-amber-400 font-bold">
                {minScore > 0 ? `≥ ${minScore.toFixed(1)} Stars` : 'Any'}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={4.5}
              step={0.5}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          {/* GENRE INCLUSION / EXCLUSION DUAL-STATE GRID */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Genres (Tap: Green = Include, Tap again: Red = Exclude)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {ALL_GENRES.map((g) => {
                const state = genreStates[g] || 'neutral';
                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                      state === 'include'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                        : state === 'exclude'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {state === 'include' && <Check className="w-3 h-3 text-emerald-400" />}
                    {state === 'exclude' && <X className="w-3 h-3 text-rose-400" />}
                    <span>{g}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* RESULTS LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span>{filtered.length} Anime Found</span>
            {isLoadingAnime && (
              <span className="text-amber-400 animate-pulse font-mono text-[11px]">
                · Searching AniList live...
              </span>
            )}
          </div>
          <span className="capitalize">Sorted by {sortBy}</span>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-300">
              {isLoadingAnime ? 'Searching official AniList database...' : 'No anime matched your filters'}
            </p>
            <p className="text-xs text-slate-500">
              Try adjusting your genre exclusion or minimum star rating
            </p>
            <button
              onClick={resetFilters}
              className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-amber-400 text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((anime) => (
              <div
                key={anime.id}
                onClick={() => {
                  onSelectAnime(anime.id);
                  onClose();
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/90 border border-slate-800/80 hover:border-amber-400/50 hover:bg-slate-800/80 cursor-pointer active:scale-[0.98] transition-all group"
              >
                <img
                  src={anime.coverImage}
                  alt={getAnimeTitle(anime)}
                  referrerPolicy="no-referrer"
                  className="w-14 h-20 rounded-xl object-cover shrink-0 border border-slate-800 group-hover:scale-105 transition-transform"
                />
                <div className="overflow-hidden flex-1">
                  <h4 className="font-display font-bold text-sm text-white truncate group-hover:text-amber-300 transition-colors">
                    {getAnimeTitle(anime)}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="font-mono text-amber-400 font-bold">
                      ★ {anime.score.toFixed(1)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{anime.format}</span>
                    <span aria-hidden="true">·</span>
                    <span>{anime.year}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                    {anime.genres.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
