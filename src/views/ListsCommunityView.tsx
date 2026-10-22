import {
  ArrowDown,
  ArrowUp,
  Globe,
  Heart,
  Layers,
  Lock,
  Plus,
  Share2,
  Trash2,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CustomList, CustomListItem } from '../types/anime';

export const ListsCommunityView: React.FC = () => {
  const {
    customLists,
    animeList,
    createCustomList,
    likeCustomList,
    setSelectedAnimeId,
    selectedListId,
    setSelectedListId,
    getAnimeTitle,
    userProfile
  } = useApp();

  const [isCreatingList, setIsCreatingList] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isRanked, setIsRanked] = useState(true);
  const [privacy, setPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');
  const [selectedItems, setSelectedItems] = useState<CustomListItem[]>([
    { animeId: '154587', commentary: 'A transcendent journey through time and emotions.' },
    { animeId: '9253', commentary: 'The highest peak of sci-fi psychological thrillers.' }
  ]);
  const [searchToAdd, setSearchToAdd] = useState('');

  const activeList = customLists.find((l) => l.id === selectedListId);

  const handleAddItem = (animeId: string) => {
    if (!selectedItems.some((i) => i.animeId === animeId)) {
      setSelectedItems([...selectedItems, { animeId, commentary: '' }]);
      setSearchToAdd('');
    }
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, idx) => idx !== index));
  };

  const handleMoveItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= selectedItems.length) return;
    const updated = [...selectedItems];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSelectedItems(updated);
  };

  const handleUpdateCommentary = (index: number, commentary: string) => {
    const updated = [...selectedItems];
    updated[index].commentary = commentary;
    setSelectedItems(updated);
  };

  const handleSaveNewList = () => {
    if (!title.trim() || selectedItems.length === 0) return;
    createCustomList({
      title: title.trim(),
      description: description.trim(),
      isRanked,
      privacy,
      items: selectedItems.map((item, idx) => ({
        ...item,
        rank: isRanked ? idx + 1 : undefined
      }))
    });
    setIsCreatingList(false);
    setTitle('');
    setDescription('');
  };

  // IF DETAILED LIST IS SELECTED
  if (activeList) {
    return (
      <div className="pb-32 max-w-3xl mx-auto px-4 pt-3 space-y-5 text-white">
        {/* Back Button */}
        <button
          onClick={() => setSelectedListId(null)}
          className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1.5"
        >
          &larr; Back to all lists
        </button>

        {/* List Header Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#181F30] to-[#0E131E] border border-slate-800 space-y-3">
          {activeList.bannerCover && (
            <div className="absolute inset-0 z-0 opacity-20">
              <img
                src={activeList.bannerCover}
                alt={activeList.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={activeList.author.avatar}
                alt={activeList.author.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full object-cover border border-amber-400/40"
              />
              <span className="text-xs font-semibold text-slate-300">
                Created by @{activeList.author.handle}
              </span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              {activeList.isRanked ? 'Ranked List' : 'Unranked Curation'}
            </span>
          </div>

          <h1 className="relative z-10 font-display font-extrabold text-2xl text-white">
            {activeList.title}
          </h1>

          <p className="relative z-10 text-xs text-slate-300 leading-relaxed max-w-xl">
            {activeList.description}
          </p>

          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
            <span>{activeList.items.length} titles</span>
            <button
              onClick={() => likeCustomList(activeList.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                activeList.isLikedByMe
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${activeList.isLikedByMe ? 'fill-rose-500' : ''}`}
              />
              <span>{activeList.likes} Likes</span>
            </button>
          </div>
        </div>

        {/* List Entries */}
        <div className="space-y-3">
          {activeList.items.map((item, idx) => {
            const anime = animeList.find((a) => a.id === item.animeId);
            if (!anime) return null;

            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#121622] border border-slate-800 flex items-start gap-3.5 text-xs"
              >
                {/* Rank Number */}
                <span className="font-mono text-base font-extrabold text-amber-400 w-6 pt-2 shrink-0 text-center">
                  #{idx + 1}
                </span>

                {/* Poster */}
                <div
                  onClick={() => setSelectedAnimeId(anime.id)}
                  className="w-14 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-800 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={anime.coverImage}
                    alt={getAnimeTitle(anime)}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Commentary */}
                <div className="flex-1 overflow-hidden">
                  <div
                    onClick={() => setSelectedAnimeId(anime.id)}
                    className="cursor-pointer group"
                  >
                    <h3 className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">
                      {getAnimeTitle(anime)}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono">
                      ★ {anime.score.toFixed(1)} · {anime.format} · {anime.year}
                    </p>
                  </div>

                  {item.commentary && (
                    <div className="mt-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-slate-300 text-xs leading-relaxed italic">
                      "{item.commentary}"
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-32 max-w-4xl mx-auto px-4 pt-3 space-y-5 text-white">
      {/* Top Banner & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">
            Custom Lists & Community
          </h2>
          <p className="text-xs text-slate-400">
            Curate thematic rankings, franchises, and recommendations
          </p>
        </div>

        <button
          onClick={() => setIsCreatingList(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create List</span>
        </button>
      </div>

      {/* Community Lists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {customLists.map((list) => (
          <div
            key={list.id}
            onClick={() => setSelectedListId(list.id)}
            className="p-4 rounded-3xl bg-[#111622] border border-slate-800 hover:border-amber-400/50 cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <img
                  src={list.author.avatar}
                  alt={list.author.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-slate-300 font-medium">
                  @{list.author.handle}
                </span>
              </div>
              <span className="font-mono text-amber-400 font-bold">
                ♥ {list.likes}
              </span>
            </div>

            <h3 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {list.title}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {list.description}
            </p>

            {/* Poster Stack */}
            <div className="flex items-center gap-2 pt-1">
              {list.items.slice(0, 4).map((item, idx) => {
                const anime = animeList.find((a) => a.id === item.animeId);
                if (!anime) return null;
                return (
                  <img
                    key={idx}
                    src={anime.coverImage}
                    alt={anime.title.english}
                    referrerPolicy="no-referrer"
                    className="w-12 h-16 rounded-xl object-cover border border-slate-800"
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* LIST BUILDER MODAL */}
      {isCreatingList && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsCreatingList(false)}
          />
          <div className="relative z-10 w-full max-w-lg max-h-[90vh] bg-[#10141E] border border-slate-800 rounded-3xl p-5 shadow-2xl flex flex-col overflow-hidden text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
              <h3 className="font-bold text-base text-white">Create Custom List</h3>
              <button
                onClick={() => setIsCreatingList(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  List Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Top 10 Psychological Thrillers"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Why did you build this list?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="font-medium text-slate-300">Ranked List (1..N)</span>
                <input
                  type="checkbox"
                  checked={isRanked}
                  onChange={(e) => setIsRanked(e.target.checked)}
                  className="rounded text-amber-400"
                />
              </div>

              {/* Add Anime Search */}
              <div>
                <label className="text-slate-400 font-semibold block mb-1">
                  Add Anime to List
                </label>
                <select
                  value=""
                  onChange={(e) => handleAddItem(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  <option value="" disabled>
                    Select an anime to add...
                  </option>
                  {animeList.map((a) => (
                    <option key={a.id} value={a.id}>
                      {getAnimeTitle(a)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Items with commentary & reordering */}
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold block">
                  List Entries ({selectedItems.length})
                </label>
                {selectedItems.map((item, idx) => {
                  const anime = animeList.find((a) => a.id === item.animeId);
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">
                          #{idx + 1} {anime ? getAnimeTitle(anime) : item.animeId}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, 'up')}
                            className="p-1 hover:text-amber-400 text-slate-400"
                            title="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveItem(idx, 'down')}
                            className="p-1 hover:text-amber-400 text-slate-400"
                            title="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1 hover:text-rose-400 text-slate-400 ml-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        placeholder="Add commentary why this is ranked here..."
                        value={item.commentary || ''}
                        onChange={(e) => handleUpdateCommentary(idx, e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-700 rounded-lg p-2 text-[11px] text-slate-200 focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsCreatingList(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNewList}
                className="px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold hover:bg-amber-300"
              >
                Save List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
