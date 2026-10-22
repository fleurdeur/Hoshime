import {
  Award,
  Bookmark,
  Eye,
  EyeOff,
  Heart,
  Layers,
  MessageCircle,
  MoreVertical,
  Repeat,
  Send,
  Share2,
  Sparkles,
  Trophy
} from 'lucide-react';
import React, { useState } from 'react';
import { AnimeImage } from '../components/AnimeImage';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';
import { LogEntry } from '../types/anime';

export const HomeFeedView: React.FC = () => {
  const {
    logs,
    likeLog,
    repostLog,
    bookmarkLog,
    addCommentToLog,
    openShareStory,
    setSelectedAnimeId,
    getAnimeTitle,
    openLogger,
    setActiveTab,
    userProfile
  } = useApp();

  const [feedTab, setFeedTab] = useState<'following' | 'global' | 'friends'>('following');
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<string, boolean>>({});
  const [activeCommentLogId, setActiveCommentLogId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const toggleSpoiler = (logId: string) => {
    setRevealedSpoilers((prev) => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  const handleSendComment = (logId: string) => {
    if (!commentInput.trim()) return;
    addCommentToLog(logId, commentInput);
    setCommentInput('');
  };

  return (
    <div className="pb-32 max-w-2xl mx-auto px-3 sm:px-4 pt-3 space-y-4">
      {/* Feed Sub-Tabs (Following / Global / Friends) */}
      <div className="flex items-center justify-between p-1 bg-[#121622] rounded-2xl border border-slate-800/80 text-xs font-semibold">
        <button
          onClick={() => setFeedTab('following')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            feedTab === 'following'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Following
        </button>
        <button
          onClick={() => setFeedTab('global')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            feedTab === 'global'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Global
        </button>
        <button
          onClick={() => setFeedTab('friends')}
          className={`flex-1 py-2 rounded-xl transition-all ${
            feedTab === 'friends'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Friends
        </button>
      </div>

      {/* FEED CONTENT */}
      {logs.length === 0 ? (
        <div className="py-16 px-4 text-center rounded-3xl bg-[#111622]/60 border border-slate-800/80 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 mx-auto flex items-center justify-center text-amber-400">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">Your Feed is Ready</h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              No reviews logged yet. Tap the star button to log your first anime rating or explore official catalog!
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => openLogger()}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              + Log Anime Now
            </button>
            <button
              onClick={() => setActiveTab('discover')}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold"
            >
              Explore Catalog
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {logs.map((log) => {
            const isSpoilerRevealed = revealedSpoilers[log.id];

            return (
              <article
                key={log.id}
                className="p-4 sm:p-5 rounded-3xl bg-[#111622] border border-slate-800/80 shadow-md space-y-3.5"
              >
              {/* User Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <img
                      src={log.userAvatar}
                      alt={log.userName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    {log.isVip && (
                      <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-0.5">
                        <Sparkles className="w-2.5 h-2.5 text-slate-950" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm">
                        {log.userName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        @{log.userHandle}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="text-slate-400">{log.createdAt}</span>
                      <span aria-hidden="true">·</span>
                      {log.isRewatch ? (
                        <span className="text-purple-300 font-semibold">
                          Rewatched (#{log.rewatchCount + 1})
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Watched</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <StarRating rating={log.rating} size="sm" showScoreText={true} />
                  <button
                    className="p-1 text-slate-400 hover:text-white"
                    aria-label="Options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Anime Content Row */}
              <div
                onClick={() => setSelectedAnimeId(log.animeId)}
                className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/40 cursor-pointer transition-all group"
              >
                <div className="w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800 group-hover:scale-105 transition-transform bg-slate-950">
                  <AnimeImage
                    src={log.animeCover}
                    alt={getAnimeTitle(log.animeTitle)}
                    aspectRatio="poster"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-display font-bold text-sm text-white truncate group-hover:text-amber-300 transition-colors">
                    {getAnimeTitle(log.animeTitle)}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span className="text-xs text-amber-300 font-medium bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      {log.episodeLogged
                        ? `Ep ${log.episodeLogged}`
                        : 'Entire Series'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{log.animeFormat}</span>
                    <span aria-hidden="true">·</span>
                    <span>{log.dateWatched}</span>
                  </div>
                </div>
              </div>

              {/* Review Text Body with Spoiler Shield */}
              {log.reviewText && (
                <div className="relative text-sm leading-relaxed text-slate-200">
                  {log.hasSpoilers && !isSpoilerRevealed ? (
                    <div
                      onClick={() => toggleSpoiler(log.id)}
                      className="p-3.5 rounded-2xl bg-slate-900/90 border border-rose-500/30 cursor-pointer flex items-center justify-between group hover:bg-slate-800 transition-colors select-none"
                    >
                      <div className="flex items-center gap-2 text-rose-400 font-medium text-xs">
                        <EyeOff className="w-4 h-4" />
                        <span>Contains Spoilers · Tap to reveal review</span>
                      </div>
                      <span className="text-xs text-slate-400 group-hover:text-white underline">
                        Reveal
                      </span>
                    </div>
                  ) : (
                    <div>
                      {log.hasSpoilers && (
                        <div className="flex items-center justify-between text-xs text-rose-400 font-mono mb-1">
                          <span>SPOILER REVEALED</span>
                          <button
                            onClick={() => toggleSpoiler(log.id)}
                            className="underline hover:text-rose-300"
                          >
                            Hide spoiler
                          </button>
                        </div>
                      )}
                      <p className="whitespace-pre-line leading-relaxed">{log.reviewText}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Tags */}
              {log.tags && log.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-amber-300/90 font-medium hover:underline cursor-pointer bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Interaction Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                {/* Like Button */}
                <button
                  onClick={() => likeLog(log.id)}
                  className={`flex items-center gap-1.5 py-1 px-2 rounded-lg transition-colors ${
                    log.isLikedByMe
                      ? 'text-rose-400'
                      : 'hover:text-rose-400 hover:bg-slate-800/60'
                  }`}
                  aria-label="Star Like"
                >
                  <Heart
                    className={`w-4 h-4 ${log.isLikedByMe ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                  <span className="font-mono text-xs tabular-nums">
                    {log.likesCount}
                  </span>
                </button>

                {/* Comment Button */}
                <button
                  onClick={() =>
                    setActiveCommentLogId(
                      activeCommentLogId === log.id ? null : log.id
                    )
                  }
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
                  aria-label="Comments"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-mono text-xs tabular-nums">
                    {log.commentsCount}
                  </span>
                </button>

                {/* Repost Button */}
                <button
                  onClick={() => repostLog(log.id)}
                  className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:text-purple-400 hover:bg-slate-800/60 transition-colors"
                  aria-label="Repost"
                >
                  <Repeat className="w-4 h-4" />
                  <span className="font-mono text-xs tabular-nums">
                    {log.repostsCount}
                  </span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => bookmarkLog(log.id)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    log.isBookmarked
                      ? 'text-amber-400'
                      : 'hover:text-amber-400 hover:bg-slate-800/60'
                  }`}
                  aria-label="Bookmark"
                >
                  <Bookmark
                    className={`w-4 h-4 ${log.isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                  />
                </button>

                {/* Share to Instagram Story / Social Card */}
                <button
                  onClick={() => openShareStory(log)}
                  className="flex items-center gap-1 py-1 px-2.5 rounded-lg bg-amber-400/10 text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all font-medium text-[11px]"
                  title="Generate 9:16 Story Card"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Story Card</span>
                </button>
              </div>

              {/* INLINE COMMENT SECTION IF OPEN */}
              {activeCommentLogId === log.id && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2.5">
                  {/* Previous comments */}
                  {log.comments && log.comments.length > 0 && (
                    <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                      {log.comments.map((c) => (
                        <div
                          key={c.id}
                          className="flex items-start gap-2 p-2 rounded-xl bg-slate-900/60 text-xs"
                        >
                          <img
                            src={c.userAvatar}
                            alt={c.userName}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-[11px]">
                                {c.userName}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {c.createdAt}
                              </span>
                            </div>
                            <p className="text-slate-300 text-xs mt-0.5">
                              {c.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add comment input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Write a constructive reply..."
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && handleSendComment(log.id)
                      }
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={() => handleSendComment(log.id)}
                      className="p-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
