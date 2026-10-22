import {
  Calendar,
  Check,
  ChevronDown,
  FileText,
  Heart,
  Loader2,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { searchAnimeApi } from '../services/animeApi';
import { Anime } from '../types/anime';
import { StarRating } from './StarRating';

export const LoggerModal: React.FC = () => {
  const {
    isLoggerOpen,
    closeLogger,
    loggerAnimeId,
    animeList,
    addAnimeToDatabase,
    logAnime,
    saveDraftLog,
    currentDraft,
    clearDraftLog,
    getAnimeTitle,
    editingLog
  } = useApp();

  const [selectedAnimeId, setSelectedAnimeId] = useState<string>(
    loggerAnimeId || (animeList[0]?.id ?? '')
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [apiSearchResults, setApiSearchResults] = useState<Anime[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const [rating, setRating] = useState<number>(5.0);
  const [isLike, setIsLike] = useState<boolean>(true);
  const [dateWatched, setDateWatched] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isRewatch, setIsRewatch] = useState<boolean>(false);
  const [rewatchCount, setRewatchCount] = useState<number>(1);
  const [logType, setLogType] = useState<'entire' | 'episode'>('entire');
  const [episodeLogged, setEpisodeLogged] = useState<number>(1);

  const [reviewText, setReviewText] = useState<string>('');
  const [hasSpoilers, setHasSpoilers] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>(['#Masterpiece']);
  const [currentTagInput, setCurrentTagInput] = useState('');

  const [syncAniList, setSyncAniList] = useState(true);
  const [syncMAL, setSyncMAL] = useState(true);
  const [postToFeed, setPostToFeed] = useState(true);

  // Load editing log or draft if matches or when opened
  useEffect(() => {
    if (editingLog) {
      setSelectedAnimeId(editingLog.animeId);
      setRating(editingLog.rating);
      setIsLike(editingLog.isLike);
      setReviewText(editingLog.reviewText || '');
      setIsRewatch(editingLog.isRewatch);
      setRewatchCount(editingLog.rewatchCount || 1);
      setHasSpoilers(editingLog.hasSpoilers);
      setTags(editingLog.tags || []);
      setDateWatched(editingLog.dateWatched);
      if (editingLog.episodeLogged) {
        setLogType('episode');
        setEpisodeLogged(editingLog.episodeLogged);
      } else {
        setLogType('entire');
      }
    } else if (loggerAnimeId) {
      setSelectedAnimeId(loggerAnimeId);
      setRating(5.0);
      setReviewText('');
      setIsRewatch(false);
      setHasSpoilers(false);
      setTags(['#Masterpiece']);
    } else if (currentDraft) {
      setSelectedAnimeId(currentDraft.animeId);
      setRating(currentDraft.rating);
      setReviewText(currentDraft.reviewText);
      setIsRewatch(currentDraft.isRewatch);
      setHasSpoilers(currentDraft.hasSpoilers);
      setTags(currentDraft.tags);
      setDateWatched(currentDraft.dateWatched);
    }
  }, [loggerAnimeId, currentDraft, isLoggerOpen, editingLog]);

  // Debounced API search for anime picker
  useEffect(() => {
    if (!isPickerOpen) return;
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
        console.warn('Review anime search error:', e);
      } finally {
        setIsSearchingApi(false);
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isPickerOpen]);

  if (!isLoggerOpen) return null;

  const currentAnime = animeList.find((a) => a.id === selectedAnimeId) || animeList[0];

  const handleAddTag = (e: React.KeyboardEvent | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    const clean = currentTagInput.trim().replace(/^#/, '');
    if (clean && !tags.includes(`#${clean}`)) {
      setTags([...tags, `#${clean}`]);
      setCurrentTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handlePublish = () => {
    if (!currentAnime) return;
    logAnime({
      animeId: currentAnime.id,
      rating,
      isLike,
      episodeLogged: logType === 'episode' ? episodeLogged : undefined,
      isRewatch,
      rewatchCount: isRewatch ? rewatchCount : 0,
      dateWatched,
      reviewText: reviewText.trim() || undefined,
      hasSpoilers,
      tags,
      syncAniList,
      syncMAL,
      postToFeed
    });
  };

  const handleSaveDraft = () => {
    if (!currentAnime) return;
    saveDraftLog({
      animeId: currentAnime.id,
      rating,
      reviewText,
      isRewatch,
      hasSpoilers,
      tags,
      dateWatched
    });
    closeLogger();
  };

  const filteredAnime = animeList.filter(
    (a) =>
      a.title.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.romaji.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={closeLogger}
      />

      {/* Modal Container */}
      <div className="relative w-full sm:max-w-xl max-h-[90vh] bg-[#10141E] border border-slate-800 rounded-t-3xl sm:rounded-2xl shadow-2xl z-10 flex flex-col overflow-hidden">
        {/* Top Drag Handle (Mobile) & Header */}
        <div className="px-5 pt-3 pb-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto sm:hidden absolute top-2 left-1/2 -translate-x-1/2" />
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-white text-base">
              {editingLog ? 'Edit Post' : 'Log Anime'}
            </h3>
          </div>
          <button
            onClick={closeLogger}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-sm">
          {/* 1. ANIME SELECTOR */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Selected Anime
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-left transition-colors"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <img
                    src={currentAnime?.coverImage}
                    alt={getAnimeTitle(currentAnime)}
                    referrerPolicy="no-referrer"
                    className="w-10 h-14 object-cover rounded-lg shrink-0 border border-slate-800"
                  />
                  <div className="truncate">
                    <p className="font-bold text-white text-sm truncate">
                      {getAnimeTitle(currentAnime)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {currentAnime?.format} · {currentAnime?.episodes} Episodes · {currentAnime?.year}
                    </p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
              </button>

              {/* Dropdown Anime Picker with Live API Search */}
              {isPickerOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-2 z-20 max-h-64 overflow-y-auto">
                  <div className="flex items-center gap-2 px-2.5 py-2 mb-2 bg-slate-800/80 rounded-lg border border-slate-700">
                    <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search any anime via AniList API..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                      autoFocus
                    />
                    {isSearchingApi ? (
                      <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
                    ) : searchQuery ? (
                      <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    ) : null}
                  </div>

                  <div className="space-y-1">
                    {searchQuery.trim() ? (
                      apiSearchResults.length > 0 ? (
                        apiSearchResults.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              addAnimeToDatabase(item);
                              setSelectedAnimeId(item.id);
                              setIsPickerOpen(false);
                              setSearchQuery('');
                            }}
                            className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                              selectedAnimeId === item.id
                                ? 'bg-amber-400/20 text-amber-300'
                                : 'hover:bg-slate-800 text-slate-200'
                            }`}
                          >
                            <img
                              src={item.coverImage}
                              alt={getAnimeTitle(item)}
                              referrerPolicy="no-referrer"
                              className="w-8 h-11 object-cover rounded shrink-0"
                            />
                            <div className="truncate flex-1">
                              <span className="truncate text-xs font-semibold block text-white">
                                {getAnimeTitle(item)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {item.year} · {item.format} · ★ {item.score.toFixed(1)}
                              </span>
                            </div>
                          </button>
                        ))
                      ) : !isSearchingApi ? (
                        <div className="py-4 text-center text-xs text-slate-500">
                          No anime found matching "{searchQuery}"
                        </div>
                      ) : null
                    ) : (
                      /* Quick Curated Anime List */
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
                          Catalog
                        </span>
                        {animeList.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setSelectedAnimeId(item.id);
                              setIsPickerOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors ${
                              selectedAnimeId === item.id
                                ? 'bg-amber-400/20 text-amber-300'
                                : 'hover:bg-slate-800 text-slate-200'
                            }`}
                          >
                            <img
                              src={item.coverImage}
                              alt={getAnimeTitle(item)}
                              referrerPolicy="no-referrer"
                              className="w-7 h-9 object-cover rounded shrink-0"
                            />
                            <div className="truncate flex-1">
                              <span className="truncate text-xs font-medium block">
                                {getAnimeTitle(item)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {item.year} · {item.format}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. STAR RATING (0.5 to 5.0) & LIKE TOGGLE */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#141A28] border border-slate-800/80 text-center space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Star Rating
              </span>
              <button
                type="button"
                onClick={() => setIsLike(!isLike)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isLike
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isLike ? 'fill-rose-500 text-rose-500' : ''}`}
                />
                <span>Favorite</span>
              </button>
            </div>

            {/* Large Interactive Star Rater */}
            <div className="py-2 flex flex-col items-center justify-center">
              <StarRating
                rating={rating}
                interactive={true}
                size="xl"
                onChange={(val) => setRating(val)}
              />
              <div className="mt-2 flex items-center gap-2 font-mono">
                <span className="text-2xl font-extrabold text-amber-400 tabular-nums">
                  {rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500">/ 5.0 Stars</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Slide or tap left/right side of any star for half-star precision
              </p>
            </div>
          </div>

          {/* 3. DATE WATCHED & EPISODE TRACKER */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date Picker */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <label className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Date Watched</span>
              </label>
              <input
                type="date"
                value={dateWatched}
                onChange={(e) => setDateWatched(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Scope / Episode Picker */}
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
              <label className="text-xs font-medium text-slate-400 mb-1.5 block">
                Watch Progress
              </label>
              <div className="flex items-center gap-1 p-0.5 bg-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setLogType('entire')}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                    logType === 'entire'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Completed Series
                </button>
                <button
                  type="button"
                  onClick={() => setLogType('episode')}
                  className={`flex-1 py-1 text-xs font-medium rounded-md transition-colors ${
                    logType === 'episode'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Specific Ep
                </button>
              </div>

              {logType === 'episode' && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Episode:</span>
                  <input
                    type="number"
                    min={1}
                    max={currentAnime?.episodes || 999}
                    value={episodeLogged}
                    onChange={(e) => setEpisodeLogged(Number(e.target.value))}
                    className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-center text-white"
                  />
                  <span className="text-xs text-slate-500">
                    of {currentAnime?.episodes || '?'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* 4. REWATCH TOGGLE & COUNTER */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <div>
                <p className="text-xs font-semibold text-white">
                  I have watched this before
                </p>
                <p className="text-[10px] text-slate-400">
                  Track recurring series views
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsRewatch(!isRewatch)}
                className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                  isRewatch ? 'bg-amber-400' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isRewatch ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              {isRewatch && (
                <div className="flex items-center gap-1 font-mono text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <span>#{rewatchCount + 1}</span>
                  <button
                    type="button"
                    onClick={() => setRewatchCount(rewatchCount + 1)}
                    className="hover:text-white"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 5. REVIEW TEXT EDITOR WITH SPOILER TOGGLE */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Review & Thoughts (Markdown)
              </label>
              <label className="flex items-center gap-1.5 text-xs text-rose-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasSpoilers}
                  onChange={(e) => setHasSpoilers(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-rose-500 focus:ring-0"
                />
                <span>Contains Spoilers</span>
              </label>
            </div>
            <textarea
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What made this stellar? Animation, direction, emotional resonance, voice acting..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* 6. TAGS */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tags & Milestones
            </label>
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-rose-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  placeholder="#add tag"
                  value={currentTagInput}
                  onChange={(e) => setCurrentTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-24 bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="p-1 text-slate-400 hover:text-amber-400"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 7. SYNC TOGGLES */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400 block">
              Auto-Sync & Distribution
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={postToFeed}
                  onChange={(e) => setPostToFeed(e.target.checked)}
                  className="rounded text-amber-400"
                />
                <span className="text-slate-300 text-[11px]">Public Feed</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncAniList}
                  onChange={(e) => setSyncAniList(e.target.checked)}
                  className="rounded text-amber-400"
                />
                <span className="text-slate-300 text-[11px]">AniList Sync</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncMAL}
                  onChange={(e) => setSyncMAL(e.target.checked)}
                  className="rounded text-amber-400"
                />
                <span className="text-slate-300 text-[11px]">MAL Sync</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0E121B] flex items-center justify-between gap-3 shrink-0">
          {!editingLog ? (
            <button
              type="button"
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>Save Draft</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeLogger}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-[0_2px_12px_rgba(255,193,7,0.35)] active:scale-95 transition-all"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{editingLog ? 'Save Changes' : 'Publish'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
