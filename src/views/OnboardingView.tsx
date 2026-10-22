import {
  ArrowRight,
  Camera,
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
  Upload,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useRef, useState } from 'react';
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

const AVATAR_PRESETS = [
  { name: 'Frieren', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png' },
  { name: 'Denji', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b130138-sA07b9h2H7nO.png' },
  { name: 'Gojo', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b127993-zC7a3d1b9e0f.png' },
  { name: 'Bocchi', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b192806-u7K0q8B2D0t3.png' },
  { name: 'Violet', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b124483-C9pL1n4k0f8j.png' },
  { name: 'Eren', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b40882-6p7q8r9s0t1u.png' }
];

interface OnboardingViewProps {
  isOpen: boolean;
  onClose: () => void;
  isMandatoryAuth?: boolean;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  isOpen,
  onClose,
  isMandatoryAuth = false
}) => {
  const { login, signup, enterGuestMode, isAuthenticated } = useApp();

  const [step, setStep] = useState<'welcome' | 'auth' | 'wizard_genres'>('welcome');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Fresh clean state without premade dummy values
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [authError, setAuthError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setAuthError('Image size should be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!username.trim()) {
      setAuthError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setAuthError('Please enter your password');
      return;
    }

    login({
      username: username.trim(),
      email: email.trim() || undefined,
      avatar: selectedAvatar
    });
    onClose();
  };

  const handleSignupSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAuthError('');

    if (!username.trim()) {
      setAuthError('Please choose a username');
      return;
    }
    if (username.trim().length < 3) {
      setAuthError('Username must be at least 3 characters');
      return;
    }
    if (!password.trim() || password.length < 4) {
      setAuthError('Password must be at least 4 characters');
      return;
    }

    // Go to optional genre selection step
    setStep('wizard_genres');
  };

  const handleFinishSignup = () => {
    signup({
      username: username.trim(),
      email: email.trim() || undefined,
      avatar: selectedAvatar
    });
    onClose();
  };

  const handleGuestLogin = () => {
    enterGuestMode();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A10] text-white overflow-y-auto py-6">
      {/* Background artwork shimmer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg"
          alt="Anime Backdrop"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070A10]/70 via-[#070A10]/90 to-[#070A10]" />
      </div>

      {/* Close button (only shown if not mandatory auth) */}
      {!isMandatoryAuth && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 text-slate-400 hover:text-white rounded-full bg-slate-900/80 border border-slate-800"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md p-6 flex flex-col items-center text-center">
        {/* SCREEN 1: WELCOME & LANDING */}
        {step === 'welcome' && (
          <div className="w-full space-y-6">
            {/* Shimmering Star Logo */}
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-[0_0_35px_rgba(255,193,7,0.5)] transform hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-10 h-10 text-slate-950 fill-slate-950" />
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display font-extrabold text-3xl tracking-tight text-white">
                Hoshime
              </h1>
              <p className="text-sm font-medium text-amber-300/90">
                Anime Diary & Review Tracker
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
              Track your anime watches with 0.5 to 5.0 star ratings, choose your top favorites, and explore live titles.
            </p>

            <div className="space-y-2.5 pt-4">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setStep('auth');
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-sm shadow-[0_4px_20px_rgba(255,193,7,0.4)] hover:brightness-110 active:scale-95 transition-all"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  setAuthMode('signup');
                  setStep('auth');
                }}
                className="w-full py-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white font-semibold text-xs hover:border-slate-700 transition-colors"
              >
                Sign Up
              </button>

              <button
                onClick={handleGuestLogin}
                className="w-full py-2 text-xs text-slate-400 hover:text-amber-300 font-medium underline transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: AUTHENTICATION (LOG IN / SIGN UP) */}
        {step === 'auth' && (
          <div className="w-full space-y-4 text-left">
            {/* Mode Switch Tabs */}
            <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('login');
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authMode === 'login'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthError('');
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  authMode === 'signup'
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="text-center space-y-1 pt-1">
              <h2 className="font-display font-bold text-xl text-white">
                {authMode === 'login' ? 'Welcome Back' : 'Create Your Fresh Profile'}
              </h2>
              <p className="text-xs text-slate-400">
                {authMode === 'login'
                  ? 'Sign in to access your star journal and favorites'
                  : 'Start clean with zero premade data'}
              </p>
            </div>

            {authError && (
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
                {authError}
              </div>
            )}

            <form
              onSubmit={authMode === 'login' ? handleLoginSubmit : handleSignupSubmit}
              className="space-y-3.5 pt-1"
            >
              {/* Profile Avatar Selection on Sign Up */}
              {authMode === 'signup' && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Choose Profile Picture
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative group w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-purple-500 shrink-0 shadow-md">
                      <img
                        src={selectedAvatar}
                        alt="Selected Avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Upload Photo"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />

                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {AVATAR_PRESETS.map((p) => (
                          <button
                            key={p.name}
                            type="button"
                            onClick={() => setSelectedAvatar(p.url)}
                            className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform ${
                              selectedAvatar === p.url
                                ? 'border-amber-400 scale-110 shadow-sm'
                                : 'border-slate-700 opacity-70 hover:opacity-100'
                            }`}
                            title={p.name}
                          >
                            <img
                              src={p.url}
                              alt={p.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1"
                        >
                          <Upload className="w-3 h-3 text-amber-400" />
                          <span>Upload</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Username Input */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Username
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
                  <User className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={authMode === 'login' ? 'Your username or email' : 'e.g. ZenitsuCritic'}
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                    autoFocus
                  />
                  {username.length >= 3 && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                </div>
              </div>

              {/* Email (Optional on login, standard on signup) */}
              {authMode === 'signup' && (
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Email Address <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="reviewer@domain.com"
                      className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Password */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Password
                </label>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,193,7,0.4)] hover:brightness-110 active:scale-95 transition-all"
              >
                <span>{authMode === 'login' ? 'Log In & Open Diary' : 'Continue to Preferences'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full py-2 text-center text-xs text-slate-400 hover:text-amber-300 transition-colors"
              >
                Or Continue as Guest Critic &rarr;
              </button>
            </form>
          </div>
        )}

        {/* SCREEN 3: PREFERENCES WIZARD (GENRES) */}
        {step === 'wizard_genres' && (
          <div className="w-full space-y-4 text-center">
            <span className="text-xs text-amber-400 font-mono font-bold">
              Personalize Your Star Experience
            </span>
            <h2 className="font-display font-bold text-xl text-white">
              What genres do you love?
            </h2>
            <p className="text-xs text-slate-400">
              Select your favorite genres or skip directly to your clean diary.
            </p>

            <div className="flex flex-wrap justify-center gap-2 py-3 max-h-64 overflow-y-auto">
              {GENRES.map((g) => {
                const isSelected = selectedGenres.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
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

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleFinishSignup}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-extrabold text-sm shadow-[0_4px_25px_rgba(255,193,7,0.5)] hover:brightness-110 active:scale-95 transition-all"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={handleFinishSignup}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                Skip for now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
