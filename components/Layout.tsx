import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Twitter, Linkedin, Github, Sun, Moon, User, Coins, LogOut, ChevronDown, X, Mail, Lock, Phone } from 'lucide-react';

// Mock Database
const MOCK_USERS = [
  { email: 'demo@promptifie.ai', password: 'password123' }
];

type AuthMode = 'LOGIN' | 'SIGN_UP';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: AuthMode;
  onLoginSuccess: (email: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode, onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setError(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      setError("Account not found. Please create one.");
      // Automatically switch to sign up and pre-fill email
      setTimeout(() => {
        setMode('SIGN_UP');
        setError(null);
      }, 1500);
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password.");
      return;
    }

    // Success
    onLoginSuccess(email);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate account creation
    MOCK_USERS.push({ email, password });
    onLoginSuccess(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white dark:bg-charcoal-lighter rounded-[32px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-accent transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-charcoal dark:text-offwhite mb-2">
              {mode === 'LOGIN' ? 'Login' : 'Create Account'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              {mode === 'LOGIN' ? 'Welcome back to Promptifie' : 'Join the revolution in AI prompting'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={mode === 'LOGIN' ? handleLogin : handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-all text-charcoal dark:text-offwhite"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-all text-charcoal dark:text-offwhite"
                />
              </div>
            </div>

            {mode === 'SIGN_UP' && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 dark:bg-charcoal border border-slate-200 dark:border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-all text-charcoal dark:text-offwhite"
                  />
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-accent hover:bg-accent-hover text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-accent/20 active:scale-95 mt-4"
            >
              {mode === 'LOGIN' ? 'Login' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setMode(mode === 'LOGIN' ? 'SIGN_UP' : 'LOGIN')}
              className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-accent transition-colors"
            >
              {mode === 'LOGIN' ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [userEmail, setUserEmail] = useState('');
  const [userCredits, setUserCredits] = useState(5000);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{isOpen: boolean, mode: AuthMode}>({isOpen: false, mode: 'LOGIN'});

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Inspiration', path: '/inspiration' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'Tools', path: '/tools' },
    { name: 'Pricing', path: '/pricing' }
  ];

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    // Dynamic update logic for credits can be added here if needed
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-black/5 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="text-2xl font-black tracking-tighter text-charcoal dark:text-offwhite hover:text-accent transition-colors">
              Promptifie
            </Link>
          </div>

          {/* Center: Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-tight transition-colors hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Always visible theme switcher */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-charcoal-lighter transition-colors text-slate-600 dark:text-slate-400 hover:text-accent"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {!isLoggedIn ? (
              /* Logged Out view: only Login and Sign Up */
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setAuthModal({isOpen: true, mode: 'LOGIN'})}
                  className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-accent transition-colors px-4 py-2"
                >
                  Login
                </button>
                <button 
                  onClick={() => setAuthModal({isOpen: true, mode: 'SIGN_UP'})}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-accent/20"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              /* Logged In view: Balance and Profile */
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent font-black text-xs">
                  <Coins size={14} /> {userCredits}
                </div>
                
                <div className="relative">
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-1 p-0.5 pr-2 rounded-full bg-slate-100 dark:bg-charcoal-lighter border border-black/5 dark:border-white/10 hover:border-accent transition-all"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/10">
                      <User size={18} />
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-charcoal-lighter rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b dark:border-white/5">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Account</p>
                        <p className="text-sm font-bold text-charcoal dark:text-offwhite truncate">{userEmail}</p>
                      </div>
                      <Link to="/pricing" className="block w-full text-left px-4 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-charcoal transition-colors">
                        My Subscription
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/5 transition-colors flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={() => setAuthModal({ ...authModal, isOpen: false })} 
        initialMode={authModal.mode}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-charcoal border-t dark:border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <Link to="/" className="text-xl font-bold text-charcoal dark:text-white hover:text-accent transition-colors">
                Promptifie
              </Link>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              Empowering creators with the most advanced reverse prompt engineering tools available. Turn any visual inspiration into a masterpiece.
            </p>
            <div className="flex gap-4">
              <Twitter className="text-slate-400 hover:text-accent cursor-pointer transition-colors" size={20} />
              <Linkedin className="text-slate-400 hover:text-accent cursor-pointer transition-colors" size={20} />
              <Github className="text-slate-400 hover:text-accent cursor-pointer transition-colors" size={20} />
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-charcoal dark:text-white mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/inspiration" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Inspiration</Link></li>
              <li><Link to="/pricing" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Pricing</Link></li>
              <li><Link to="/tools" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Tools</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-charcoal dark:text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact-us" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/about-us" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/affiliate-program" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold text-charcoal dark:text-white mb-6 uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Privacy policy</Link></li>
              <li><Link to="/terms-and-conditions" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Terms and conditions</Link></li>
              <li><Link to="/refund-policy" className="text-sm text-slate-600 dark:text-slate-400 hover:text-accent transition-colors">Refund policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs font-medium">
            © 2026 Promptifie, LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-accent flex items-center gap-1">
              Status <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            </a>
            <a href="#" className="text-xs text-slate-500 hover:text-accent">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
