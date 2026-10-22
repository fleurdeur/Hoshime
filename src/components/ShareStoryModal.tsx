import {
  Check,
  Copy,
  Download,
  QrCode,
  Share2,
  Sparkles,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StarRating } from './StarRating';

export const ShareStoryModal: React.FC = () => {
  const { isShareStoryOpen, closeShareStory, shareTargetLog, getAnimeTitle } = useApp();
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isShareStoryOpen || !shareTargetLog) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://hoshime.app/review/${shareTargetLog.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSimulatedDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={closeShareStory}
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        {/* Close Button */}
        <button
          onClick={closeShareStory}
          className="absolute -top-10 right-0 p-1.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 9:16 VERTICAL STORY CARD */}
        <div
          id="hoshime-story-card"
          className="w-full aspect-[9/16] max-h-[640px] rounded-3xl overflow-hidden bg-[#0A0D14] border border-amber-400/30 shadow-[0_0_40px_rgba(255,193,7,0.2)] flex flex-col justify-between relative p-6 select-none"
        >
          {/* Background Poster Artwork with Cinematic Blur Scrim */}
          <div className="absolute inset-0 z-0">
            <img
              src={shareTargetLog.animeCover}
              alt="Anime Backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover scale-110 filter blur-xl opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/70 to-[#0A0D14]/40" />
            {/* Top Star Dust Accent */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* CARD TOP HEADER: Brand & Watermark */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(255,193,7,0.5)]">
                <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              </div>
              <span className="font-display font-extrabold text-sm tracking-tight text-white">
                Hoshime <span className="text-amber-400 font-normal">星アニメ</span>
              </span>
            </div>
            <span className="text-[10px] text-amber-300 font-mono tracking-widest uppercase bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              Verified Log
            </span>
          </div>

          {/* CARD CENTER: Cover, Star Rating & Review Excerpt */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto px-1">
            {/* Poster Art */}
            <div className="w-28 h-40 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20 mb-4 transform hover:scale-105 transition-transform duration-300">
              <img
                src={shareTargetLog.animeCover}
                alt={getAnimeTitle(shareTargetLog.animeTitle)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Anime Title */}
            <h2 className="font-display font-bold text-lg text-white leading-tight mb-2 line-clamp-2 max-w-xs">
              {getAnimeTitle(shareTargetLog.animeTitle)}
            </h2>

            {/* Star Rating Glowing Display */}
            <div className="flex flex-col items-center gap-1 mb-3">
              <StarRating rating={shareTargetLog.rating} interactive={false} size="lg" />
              <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                {shareTargetLog.rating.toFixed(1)} / 5.0 Stars
              </span>
            </div>

            {/* Review Excerpt */}
            {shareTargetLog.reviewText && (
              <div className="relative max-w-xs px-3 py-2 bg-slate-900/70 backdrop-blur-md rounded-xl border border-slate-700/60 text-left">
                <p className="text-xs text-slate-200 italic line-clamp-3 leading-relaxed">
                  "{shareTargetLog.reviewText}"
                </p>
              </div>
            )}
          </div>

          {/* CARD FOOTER: Reviewer Profile & App Link QR */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={shareTargetLog.userAvatar}
                alt={shareTargetLog.userName}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full object-cover border border-amber-400/40"
              />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white leading-tight">
                  {shareTargetLog.userName}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  @{shareTargetLog.userHandle}
                </span>
              </div>
            </div>

            {/* Simulated QR Code Badge */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
              <QrCode className="w-5 h-5 text-amber-400" />
              <div className="text-[8px] text-slate-300 font-mono uppercase text-right leading-none">
                Scan to
                <br />
                <span className="text-white font-bold">Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="w-full grid grid-cols-3 gap-2 mt-4 text-xs font-medium">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 text-white hover:bg-slate-700 active:scale-95 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
            <span>{copied ? 'Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={handleSimulatedDownload}
            disabled={downloading}
            className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl transition-all ${
              downloadSuccess
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-800 text-white hover:bg-slate-700 active:scale-95'
            }`}
          >
            {downloadSuccess ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Download className="w-4 h-4 text-slate-300" />
            )}
            <span>{downloadSuccess ? 'Saved!' : downloading ? 'Saving...' : 'Save Card'}</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Hoshime Review: ${getAnimeTitle(shareTargetLog.animeTitle)}`,
                  text: `Rated ${shareTargetLog.rating} stars on Hoshime!`,
                  url: window.location.href
                }).catch(() => {});
              } else {
                handleCopyLink();
              }
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Share2 className="w-4 h-4 text-slate-950" />
            <span>Story Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
