import {
  Bell,
  Check,
  CheckCheck,
  Heart,
  MessageCircle,
  Radio,
  Sparkles,
  Tv,
  UserPlus,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface NotificationCenterViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenterView: React.FC<NotificationCenterViewProps> = ({
  isOpen,
  onClose
}) => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [filter, setFilter] = useState<string>('All');

  if (!isOpen) return null;

  const filterChips = ['All', 'Likes', 'Comments', 'Follows', 'Episode Alerts'];

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Likes' && n.type === 'like') return true;
    if (filter === 'Comments' && n.type === 'comment') return true;
    if (filter === 'Follows' && n.type === 'follow') return true;
    if (filter === 'Episode Alerts' && n.type === 'episode') return true;
    return false;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-rose-400 fill-rose-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-amber-400" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-purple-400" />;
      case 'episode':
        return <Tv className="w-4 h-4 text-blue-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative z-10 w-full sm:max-w-md max-h-[85vh] bg-[#0F131D] border border-slate-800 rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-bold text-base">Notification Center</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-3 shrink-0">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setFilter(chip)}
              className={`whitespace-nowrap px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                filter === chip
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredNotifs.length === 0 ? (
            <p className="py-12 text-center text-xs text-slate-500">
              No notifications in this category
            </p>
          ) : (
            filteredNotifs.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-3 rounded-2xl border transition-colors cursor-pointer flex items-start gap-3 text-xs ${
                  n.isRead
                    ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                    : 'bg-[#151B2A] border-amber-400/30 text-slate-200'
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-800/80 shrink-0">
                  {getIcon(n.type)}
                </div>

                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{n.title}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {n.description}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1 shadow" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
