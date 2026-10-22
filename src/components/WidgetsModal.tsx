import { Check, Plus, RefreshCw, Sparkles, Star, Tv, X } from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const WidgetsModal: React.FC = () => {
  const {
    isWidgetsOpen,
    setIsWidgetsOpen,
    userProfile,
    animeList,
    userLibrary,
    updateWatchStatus,
    getAnimeTitle,
    setSelectedAnimeId
  } = useApp();

  const [widgetTab, setWidgetTab] = useState<'star4' | 'watching' | 'recommendation'>('star4');

  if (!isWidgetsOpen) return null;

  // Star 4 anime
  const star4Anime = userProfile.star4
    .map((id) => animeList.find((a) => a.id === id))
    .filter(Boolean);

  // Currently watching anime
  const watchingAnime = Object.values(userLibrary)
    .filter((e) => e.status === 'Watching')
    .map((entry) => ({
      entry,
      anime: animeList.find((a) => a.id === entry.animeId)
    }))
    .filter((item) => item.anime !== undefined);

  // Daily recommendation (e.g. Frieren or Steins;Gate)
  const dailyRec = animeList[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWidgetsOpen(false)}
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#0E121B] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Android Home Screen Widgets
              </h3>
              <p className="text-[11px] text-slate-400">
                Jetpack Glance API native widget simulation
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWidgetsOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Widget Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl my-4 text-xs font-medium">
          <button
            onClick={() => setWidgetTab('star4')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              widgetTab === 'star4'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            The Star 4 (4×2)
          </button>
          <button
            onClick={() => setWidgetTab('watching')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              widgetTab === 'watching'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Watching (4×2)
          </button>
          <button
            onClick={() => setWidgetTab('recommendation')}
            className={`flex-1 py-1.5 rounded-lg transition-colors ${
              widgetTab === 'recommendation'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily Rec (2×2)
          </button>
        </div>

        {/* WIDGET PREVIEW CANVAS (Simulating Android Wallpaper) */}
        <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-gradient-to-br from-[#121824] via-[#1B2335] to-[#0A0D15] border border-slate-700/60 shadow-inner flex flex-col items-center justify-center">
          {/* WIDGET 1: THE STAR 4 (4x2) */}
          {widgetTab === 'star4' && (
            <div className="w-full max-w-md p-4 rounded-3xl bg-[#0B0E14]/85 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-display font-bold text-xs text-white tracking-wide">
                    The Star 4 · Hoshime
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  @{userProfile.handle}
                </span>
              </div>

              {/* 4 Poster Grid */}
              <div className="grid grid-cols-4 gap-2">
                {star4Anime.map((anime) => (
                  <div
                    key={anime!.id}
                    onClick={() => {
                      setSelectedAnimeId(anime!.id);
                      setIsWidgetsOpen(false);
                    }}
                    className="group cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-amber-400 transition-colors shadow-md relative">
                      <img
                        src={anime!.coverImage}
                        alt={getAnimeTitle(anime!)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute top-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] font-mono font-bold text-amber-400">
                        ★ {anime!.score.toFixed(1)}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-300 truncate w-full text-center mt-1">
                      {getAnimeTitle(anime!)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WIDGET 2: CURRENTLY WATCHING PROGRESS (4x2) */}
          {widgetTab === 'watching' && (
            <div className="w-full max-w-md p-4 rounded-3xl bg-[#0B0E14]/85 backdrop-blur-xl border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span className="font-display font-bold text-xs text-white">
                    Currently Watching · Fast Tracker
                  </span>
                </div>
                <span className="text-[10px] text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded font-mono">
                  Glance Live
                </span>
              </div>

              <div className="space-y-2">
                {watchingAnime.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No anime in 'Watching' status right now. Add one from Explore!
                  </div>
                ) : (
                  watchingAnime.slice(0, 2).map(({ entry, anime }) => {
                    const percent = Math.min(
                      100,
                      Math.round((entry.episodesWatched / (anime!.episodes || 1)) * 100)
                    );
                    return (
                      <div
                        key={entry.animeId}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-slate-800"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <img
                            src={anime!.coverImage}
                            alt={getAnimeTitle(anime!)}
                            referrerPolicy="no-referrer"
                            className="w-9 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div className="truncate">
                            <p className="text-xs font-bold text-white truncate">
                              {getAnimeTitle(anime!)}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              Ep {entry.episodesWatched} of {anime!.episodes} ({percent}%)
                            </p>
                            {/* Micro Progress Bar */}
                            <div className="w-28 h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Interactive Widget Button: +1 Episode */}
                        <button
                          onClick={() => {
                            const nextEp = entry.episodesWatched + 1;
                            updateWatchStatus(
                              anime!.id,
                              nextEp >= anime!.episodes ? 'Completed' : 'Watching',
                              nextEp
                            );
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-sm active:scale-95 transition-all"
                          title="Watch next episode"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>+1 Ep</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* WIDGET 3: DAILY RECOMMENDATION (2x2) */}
          {widgetTab === 'recommendation' && (
            <div className="w-52 aspect-square p-4 rounded-3xl bg-[#0B0E14]/90 backdrop-blur-xl border border-amber-400/30 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img
                  src={dailyRec.coverImage}
                  alt={getAnimeTitle(dailyRec)}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/70 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  Daily Star
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-xs font-bold text-amber-400">
                  ★ {dailyRec.score.toFixed(1)} / 5.0
                </span>
                <h4 className="font-display font-bold text-sm text-white line-clamp-2 leading-tight">
                  {getAnimeTitle(dailyRec)}
                </h4>
                <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                  {dailyRec.genres.join(', ')}
                </p>

                <button
                  onClick={() => {
                    setSelectedAnimeId(dailyRec.id);
                    setIsWidgetsOpen(false);
                  }}
                  className="w-full mt-2 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[10px] text-center transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <p className="text-center text-[11px] text-slate-500 mt-3 font-mono">
          To add to your actual Android home screen, long-press home screen &rarr; Widgets &rarr; Hoshime
        </p>
      </div>
    </div>
  );
};
