import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface UserAvatarProps {
  src?: string;
  name?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showVip?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  name = 'User',
  className = '',
  size = 'md',
  showVip = false
}) => {
  const [hasError, setHasError] = useState(false);

  // Sync if src prop changes
  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  const getInitials = (n: string) => {
    const parts = n.trim().split(/\s+/);
    if (parts.length >= 2 && parts[0] && parts[1]) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return n.trim().slice(0, 2).toUpperCase() || 'U';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs':
        return 'w-6 h-6 text-[10px]';
      case 'sm':
        return 'w-8 h-8 text-xs';
      case 'lg':
        return 'w-16 h-16 text-lg';
      case 'xl':
        return 'w-24 h-24 text-2xl';
      case 'md':
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const hasExplicitDimensions = /\b(w-\S+|h-\S+)/.test(className);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${
        hasExplicitDimensions ? '' : getSizeClasses()
      } ${className}`}
    >
      <div
        className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center font-bold font-display select-none border border-amber-400/30 ${
          hasError || !src
            ? 'bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 text-white shadow-md'
            : 'bg-slate-900'
        }`}
      >
        {!hasError && src ? (
          <img
            src={src}
            alt={name}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className="w-full h-full object-cover object-center rounded-full block"
          />
        ) : (
          <span className="leading-none text-center flex items-center justify-center w-full h-full select-none">
            {getInitials(name)}
          </span>
        )}
      </div>

      {showVip && (
        <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow-md z-10">
          <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
        </div>
      )}
    </div>
  );
};
