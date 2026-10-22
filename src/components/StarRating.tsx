import { Star } from 'lucide-react';
import React, { useState } from 'react';

interface StarRatingProps {
  rating: number; // 0 to 5.0
  maxStars?: number;
  interactive?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onChange?: (newRating: number) => void;
  showScoreText?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  interactive = false,
  size = 'md',
  onChange,
  showScoreText = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const val = starIndex - 1 + (isHalf ? 0.5 : 1.0);
    setHoverRating(val);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, starIndex: number) => {
    if (!interactive || !onChange) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isHalf = x < rect.width / 2;
    const val = starIndex - 1 + (isHalf ? 0.5 : 1.0);
    onChange(val);
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 ${className}`}
      onMouseLeave={() => interactive && setHoverRating(null)}
    >
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const starNumber = index + 1;
          const isFilled = displayRating >= starNumber;
          const isHalf = !isFilled && displayRating >= starNumber - 0.5;

          return (
            <div
              key={index}
              className={`relative select-none ${
                interactive ? 'cursor-pointer p-0.5 hover:scale-115 transition-transform duration-150' : ''
              }`}
              onMouseMove={(e) => handleMouseMove(e, starNumber)}
              onClick={(e) => handleClick(e, starNumber)}
            >
              {/* Background empty star */}
              <Star
                className={`${sizeClasses[size]} text-slate-700/80 transition-colors`}
                strokeWidth={1.5}
              />

              {/* Half Star Overlay */}
              {isHalf && (
                <div className="absolute inset-0 overflow-hidden w-1/2 p-0.5 pointer-events-none">
                  <Star
                    className={`${sizeClasses[size]} fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(255,193,7,0.6)]`}
                    strokeWidth={1.5}
                  />
                </div>
              )}

              {/* Full Star Overlay */}
              {isFilled && (
                <div className="absolute inset-0 p-0.5 pointer-events-none">
                  <Star
                    className={`${sizeClasses[size]} fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(255,193,7,0.7)]`}
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showScoreText && (
        <span className="font-mono text-xs font-semibold tabular-nums text-amber-400 ml-1">
          {displayRating > 0 ? displayRating.toFixed(1) : '—'}
        </span>
      )}
    </div>
  );
};
