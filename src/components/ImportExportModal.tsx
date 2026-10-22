import {
  CheckCircle2,
  Database,
  Download,
  FileSpreadsheet,
  FileText,
  Loader2,
  RefreshCw,
  Sparkles,
  Upload,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ImportExportModal: React.FC = () => {
  const { isImportExportOpen, setIsImportExportOpen, importLibrary, exportLibrary } = useApp();

  const [mode, setMode] = useState<'import' | 'export'>('import');
  const [selectedSource, setSelectedSource] = useState<'mal' | 'anilist' | 'kitsu' | 'csv'>('anilist');
  const [conflictResolution, setConflictResolution] = useState<'keep' | 'overwrite'>('keep');
  const [usernameInput, setUsernameInput] = useState('');

  // Live progress simulation state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [importedCount, setImportedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  if (!isImportExportOpen) return null;

  const handleStartImport = () => {
    setIsProcessing(true);
    setProgress(0);
    setImportedCount(0);
    setIsDone(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setProgress(100);
        setImportedCount(6);
        setIsProcessing(false);
        setIsDone(true);
        importLibrary(
          selectedSource.toUpperCase(),
          6,
          conflictResolution === 'overwrite'
        );
      } else {
        setProgress(current);
        setImportedCount(Math.floor((current / 100) * 6));
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsImportExportOpen(false)}
      />

      {/* Container */}
      <div className="relative z-10 w-full max-w-md bg-[#0F131D] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Data Sync & Backups
              </h3>
              <p className="text-[11px] text-slate-400">
                AniList, MyAnimeList, Kitsu, CSV & JSON
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsImportExportOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl my-4 text-xs font-semibold">
          <button
            onClick={() => setMode('import')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              mode === 'import'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import / Sync</span>
          </button>
          <button
            onClick={() => setMode('export')}
            className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
              mode === 'export'
                ? 'bg-amber-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export & Backup</span>
          </button>
        </div>

        {/* MODE: IMPORT */}
        {mode === 'import' && (
          <div className="space-y-4 overflow-y-auto text-xs">
            {/* 1. Source selector */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                1. Select Source
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSource('anilist')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedSource === 'anilist'
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">AniList</span>
                  <span className="text-[10px] bg-blue-500/20 px-1.5 py-0.5 rounded text-blue-200">
                    OAuth
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSource('mal')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedSource === 'mal'
                      ? 'bg-blue-600/10 border-blue-600/40 text-blue-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">MyAnimeList</span>
                  <span className="text-[10px] bg-blue-600/20 px-1.5 py-0.5 rounded text-blue-200">
                    XML/Sync
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSource('kitsu')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedSource === 'kitsu'
                      ? 'bg-orange-500/10 border-orange-500/40 text-orange-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">Kitsu</span>
                  <span className="text-[10px] bg-orange-500/20 px-1.5 py-0.5 rounded text-orange-200">
                    Handle
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSource('csv')}
                  className={`p-3 rounded-xl border text-left flex items-center justify-between transition-colors ${
                    selectedSource === 'csv'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold">CSV / File</span>
                  <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-200">
                    Custom
                  </span>
                </button>
              </div>
            </div>

            {/* Username / File */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                2. Account Identifier
              </label>
              <input
                type="text"
                placeholder={
                  selectedSource === 'csv'
                    ? 'Paste CSV or drag file'
                    : `Enter your ${selectedSource.toUpperCase()} username`
                }
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Conflict resolution */}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                3. Conflict Resolution
              </label>
              <div className="space-y-1.5">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="conflict"
                    checked={conflictResolution === 'keep'}
                    onChange={() => setConflictResolution('keep')}
                    className="text-amber-400"
                  />
                  <div>
                    <p className="font-medium text-slate-200">
                      Keep existing logs & append missing
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Preserves your custom Hoshime star reviews and diaries.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <input
                    type="radio"
                    name="conflict"
                    checked={conflictResolution === 'overwrite'}
                    onChange={() => setConflictResolution('overwrite')}
                    className="text-amber-400"
                  />
                  <div>
                    <p className="font-medium text-slate-200">
                      Overwrite existing Hoshime logs
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Replaces all scores with imported remote values.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Live Progress Bar if running */}
            {isProcessing && (
              <div className="p-3 bg-slate-900 rounded-xl border border-amber-400/30 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Fetching anime titles from {selectedSource.toUpperCase()}...
                  </span>
                  <span className="font-mono text-amber-400 font-bold">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  {importedCount} entries mapped and converted to 0.5-5.0 scale.
                </p>
              </div>
            )}

            {isDone && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>
                  Successfully imported {importedCount} anime entries to your library!
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleStartImport}
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>Start 1-Click Sync</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* MODE: EXPORT */}
        {mode === 'export' && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-300">
              Download your complete anime watch diary, scores, rewatch milestones, and
              reviews in open formats:
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => exportLibrary('json')}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-center flex flex-col items-center gap-2 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="font-bold text-white">Full JSON Export</span>
                <span className="text-[10px] text-slate-400">
                  Complete diary & tags
                </span>
              </button>

              <button
                type="button"
                onClick={() => exportLibrary('csv')}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-center flex flex-col items-center gap-2 transition-colors group"
              >
                <div className="p-2.5 rounded-xl bg-emerald-400/10 text-emerald-400 group-hover:scale-110 transition-transform">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="font-bold text-white">Spreadsheet CSV</span>
                <span className="text-[10px] text-slate-400">
                  Excel & Google Sheets
                </span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              Files are saved immediately to your browser/Android download manager with
              timestamps.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
