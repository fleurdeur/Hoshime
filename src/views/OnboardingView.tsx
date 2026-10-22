import {
  ArrowRight,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Flame,
  Globe,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useState } from 'react';
import { StarRating } from '../components/StarRating';
import { useApp } from '../context/AppContext';

const GENRES = [
  'Action',
  'Adventure',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Isekai',
  'Fantasy',
  'Psychological',
  'Horror',
  'Mystery',
  'Sports',
  'Mecha',
  'Comedy',
  'Music',
  'Supernatural',
  'Thriller'
];

interface OnboardingViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({ isOpen, onClose }) => {
  const { animeList, updateUserProfile, getAnimeTitle } = useApp();

  const [step, setStep] = useState<'welcome' | 'auth' | 'wizard_genres' | 'wizard_ratings' | 'wizard_social'>(
    'welcome'
  );

  // Auth fields
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');
  const [username, setUsername] = useState('astral_ryo');
  const [email, setEmail] = useState('user@hoshime.app');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);

  // Wizard selections
  const [selectedGenres, setSelectedGenres] = useState<string[]>([
    'Fantasy',
    'Adventure',
    'Psychological',
    'Music'
  ]);
  const [seedRatings, setSeedRatings] = useState<Record<string, number>>({
    '154587': 5.0,
    '9253': 5.0,
    '144665': 4.5
  });
  const [followedReviewers, setFollowedReviewers] = useState<Record<string, boolean>>({
    sakuga_dan: true,
    kagura_x: true
  });

  if (!isOpen) return null;

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleFinishOnboarding = () => {
    if (username.trim()) {
      updateUserProfile({ name: username, handle: username.toLowerCase().replace(/\s+/g, '_') });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A10] text-white">
      {/* Background artwork shimmer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJrBlsvLw.jpg"
          alt="Official Anime Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/70 via-[#070A10]/90 to-[#070A10]" />
      </div>

      {/* Close button (allows skipping wizard if opened from menu) */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/80 border border-slate-800"
        aria-label="Close Onboarding"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md p-6 flex flex-col items-center text-center">
        {/* SCREEN 1: WELCOME & SPLASH */}
        {step === 'welcome' && (
          <div className="w-full space-y-6 animate-fade-in">
            {/* Shimmering Star Logo */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-[0_0_35px_rgba(255,193,7,0.5)] transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-slate-950 fill-slate-950" />
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-white">
                Hoshime <span className="text-amber-400 font-normal">星アニメ</span>
              </h1>
              <p className="text-sm font-medium text-amber-300/90 italic">
                "Track your anime journey, rate by the stars."
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              The premier Android platform for 0.5-5.0 star anime journaling, seasonal guides, custom curations, and social reviews.
            </p>

            <div className="space-y-2.5 pt-4">
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setStep('auth');
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(255,193,7,0.4)] active:scale-95 transition-all"
              >
                Create Hoshime Account
              </button>

              <button
                onClick={() => {
                  setAuthMode('login');
                  setStep('auth');
                }}
                className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-semibold text-xs transition-colors"
              >
                Log In with Existing Profile
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 text-xs text-slate-400 hover:text-white font-medium underline"
              >
                Explore as Guest (Read-Only)
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: AUTHENTICATION */}
        {step === 'auth' && (
          <div className="w-full space-y-4 text-left">
            <div className="text-center space-y-1">
              <h2 className="font-display font-bold text-xl text-white">
                {authMode === 'signup' ? 'Create Your Account' : 'Welcome Back'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'signup'
                  ? 'Join thousands of stellar anime critics'
                  : 'Log in to sync your ratings and diary'}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Username
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400">
                    <User className="w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g. sakuga_enthusiast"
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Email Address
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">
                  Password
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Social Logins */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block text-center mb-2">
                  Or Connect with Services
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setStep('wizard_genres')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-1.5"
                  >
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>AniList OAuth</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('wizard_genres')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>MyAnimeList</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep('wizard_genres')}
                className="w-full mt-3 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <span>Continue to Personalization</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: STEP 1 - FAVORITE GENRES */}
        {step === 'wizard_genres' && (
          <div className="w-full space-y-4 text-center">
            <span className="text-xs text-amber-400 font-mono font-bold">
              Step 1 of 3 · Preferences
            </span>
            <h2 className="font-display font-bold text-xl text-white">
              What genres do you love?
            </h2>
            <p className="text-xs text-slate-400">
              Select at least 3 genres to customize your recommendation star engine.
            </p>

            <div className="flex flex-wrap justify-center gap-2 py-3 max-h-64 overflow-y-auto">
              {GENRES.map((g) => {
                const isSelected = selectedGenres.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                        : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {isSelected && '✓ '}
                    {g}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep('wizard_ratings')}
              disabled={selectedGenres.length === 0}
              className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Next: Quick Seed Ratings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 3: STEP 2 - QUICK SEED RATINGS */}
        {step === 'wizard_ratings' && (
          <div className="w-full space-y-4 text-center">
            <span className="text-xs text-amber-400 font-mono font-bold">
              Step 2 of 3 · Calibrate Your Stars
            </span>
            <h2 className="font-display font-bold text-xl text-white">
              Rate anime you've seen
            </h2>
            <p className="text-xs text-slate-400">
              Give a 0.5 to 5.0 star score to calibrate the Hoshime rating engine.
            </p>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1 text-left">
              {animeList.slice(0, 4).map((anime) => {
                const currentScore = seedRatings[anime.id] || 0;

                return (
                  <div
                    key={anime.id}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <img
                        src={anime.coverImage}
                        alt={getAnimeTitle(anime)}
                        referrerPolicy="no-referrer"
                        className="w-9 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="truncate">
                        <p className="font-bold text-white text-xs truncate">
                          {getAnimeTitle(anime)}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {anime.year} · {anime.format}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end">
                      <StarRating
                        rating={currentScore}
                        interactive={true}
                        size="sm"
                        onChange={(val) =>
                          setSeedRatings((prev) => ({ ...prev, [anime.id]: val }))
                        }
                      />
                      <span className="font-mono text-[10px] text-amber-400 font-bold mt-1">
                        {currentScore > 0 ? `${currentScore.toFixed(1)}★` : 'Unrated'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setStep('wizard_social')}
              className="w-full py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Next: Social Connections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* SCREEN 3: STEP 3 - SOCIAL CONNECTIONS & COMPLETION */}
        {step === 'wizard_social' && (
          <div className="w-full space-y-4 text-center">
            <span className="text-xs text-amber-400 font-mono font-bold">
              Step 3 of 3 · Community
            </span>
            <h2 className="font-display font-bold text-xl text-white">
              Follow top Hoshime critics
            </h2>
            <p className="text-xs text-slate-400">
              Discover active community members for your Following feed.
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto text-left">
              {[
                {
                  handle: 'sakuga_dan',
                  name: 'SakugaSensei',
                  bio: 'Key animation & fight choreography analyst.',
                  avatar:
                    'https://s4.anilist.co/file/anilistcdn/character/large/b127993-zC7a3d1b9e0f.png'
                },
                {
                  handle: 'kagura_x',
                  name: 'KaguraNights',
                  bio: 'Cyberpunk & Mecha enthusiast. Night City devotee.',
                  avatar:
                    'https://s4.anilist.co/file/anilistcdn/character/large/b124483-C9pL1n4k0f8j.png'
                }
              ].map((reviewer) => {
                const isFollowing = followedReviewers[reviewer.handle];

                return (
                  <div
                    key={reviewer.handle}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={reviewer.avatar}
                        alt={reviewer.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-white text-xs">{reviewer.name}</p>
                        <p className="text-[10px] text-slate-400">@{reviewer.handle}</p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setFollowedReviewers((prev) => ({
                          ...prev,
                          [reviewer.handle]: !isFollowing
                        }))
                      }
                      className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                        isFollowing
                          ? 'bg-slate-800 text-slate-300 border border-slate-700'
                          : 'bg-amber-400 text-slate-950 font-bold'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-[0_4px_25px_rgba(255,193,7,0.5)] active:scale-95 transition-all"
            >
              Launch Hoshime (星アニメ) 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
