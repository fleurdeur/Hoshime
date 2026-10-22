import React, { useState } from 'react';
import { Film, Sparkles, Star } from 'lucide-react';

interface AnimeImageProps {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: 'poster' | 'banner' | 'square' | 'wide' | 'auto';
  showOverlay?: boolean;
}

export const AnimeImage: React.FC<AnimeImageProps> = ({
  src,
  fallbackSrc,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'auto',
  showOverlay = false
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [attemptedFallback, setAttemptedFallback] = useState<boolean>(false);

  // Sync if src prop changes
  React.useEffect(() => {
    setCurrentSrc(src);
    setIsLoading(true);
    setHasError(false);
    setAttemptedFallback(false);
  }, [src]);

  const handleImageError = () => {
    if (!attemptedFallback && fallbackSrc && fallbackSrc !== currentSrc) {
      setAttemptedFallback(true);
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case 'poster':
        return 'aspect-[2/3]';
      case 'banner':
        return 'aspect-[16/9] sm:aspect-[21/9]';
      case 'wide':
        return 'aspect-video';
      case 'square':
        return 'aspect-square';
      default:
        return '';
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-900 ${getAspectClass()} ${containerClassName}`}
    >
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center z-10">
          <Sparkles className="w-5 h-5 text-amber-400/30 animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      {!hasError && currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
        />
      ) : (
        /* Artistic Fallback Card when Image CDN is unavailable */
        <div className="absolute inset-0 bg-gradient-to-br from-[#161C2C] via-[#0E131E] to-[#0A0D14] border border-amber-400/20 p-3 flex flex-col items-center justify-center text-center select-none">
          <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-1.5 shadow-sm">
            <Star className="w-4 h-4 fill-amber-400/60" />
          </div>
          <span className="font-display font-bold text-xs text-slate-200 line-clamp-2 px-1">
            {alt || 'Hoshime Anime'}
          </span>
          <span className="text-[10px] text-amber-400/80 font-mono mt-0.5">
            星アニメ Official
          </span>
        </div>
      )}

      {/* Optional Gradient Overlay */}
      {showOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/40 to-transparent pointer-events-none" />
      )}
    </div>
  );
};
