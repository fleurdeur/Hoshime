import React, { useRef, useState } from 'react';
import { Camera, Check, Eye, EyeOff, Lock, Mail, Sparkles, Upload, User, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AVATAR_PRESETS = [
  { name: 'Frieren', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b178491-j5YF6uP7tE0s.png' },
  { name: 'Denji', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b130138-sA07b9h2H7nO.png' },
  { name: 'Gojo', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b127993-zC7a3d1b9e0f.png' },
  { name: 'Bocchi', url: 'https://s4.anilist.co/file/anilistcdn/character/large/b192806-u7K0q8B2D0t3.png' }
];

export const LoginPromptModal: React.FC = () => {
  const {
    isLoginPromptOpen,
    closeLoginPrompt,
    loginPromptReason,
    login,
    signup
  } = useApp();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_PRESETS[0].url);
  const [error, setError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isLoginPromptOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image should be under 5MB');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    if (authMode === 'signup' && username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (authMode === 'login') {
      login({
        username: username.trim(),
        email: email.trim() || undefined,
        avatar: selectedAvatar
      });
    } else {
      signup({
        username: username.trim(),
        email: email.trim() || undefined,
        avatar: selectedAvatar
      });
    }
    closeLoginPrompt();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#111622] border border-slate-800 p-6 shadow-2xl space-y-4 text-white">
        {/* Close Button */}
        <button
          onClick={closeLoginPrompt}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 mx-auto flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-lg text-white">
            Log In Required
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed px-2">
            {loginPromptReason || 'Guests cannot create or edit posts and profiles. Log in or create an account to continue.'}
          </p>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setAuthMode('login');
              setError('');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
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
              setError('');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Avatar chooser on signup */}
          {authMode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Avatar
              </label>
              <div className="flex items-center gap-2">
                {AVATAR_PRESETS.map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setSelectedAvatar(p.url)}
                    className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-transform ${
                      selectedAvatar === p.url
                        ? 'border-amber-400 scale-110 shadow-sm'
                        : 'border-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2 py-1 rounded-lg bg-slate-800 border border-slate-700 text-[10px] text-slate-300 flex items-center gap-1"
                >
                  <Upload className="w-3 h-3 text-amber-400" />
                  <span>Upload</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}

          {/* Username */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 block">
              Username
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
              <User className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Email (Optional for signup) */}
          {authMode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300 block">
                Email <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
                <Mail className="w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-300 block">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus-within:border-amber-400 transition-colors">
              <Lock className="w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all"
            >
              {authMode === 'login' ? 'Log In' : 'Sign Up'}
            </button>
            <button
              type="button"
              onClick={closeLoginPrompt}
              className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel & Continue Browsing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
