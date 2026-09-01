import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, LogOut } from 'lucide-react';
import { ModeToggle } from './ModeToggoler';
import { useLogoutMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';

interface NavLink {
  label: string;
  path: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Team', path: '/team' },
  { label: 'About', path: '/about' },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const hasToken = Boolean(localStorage.getItem('strapi_jwt'));
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined, {
    skip: !hasToken,
  });
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleScroll = (): void => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHomePage: boolean = location.pathname === '/';
  const userName = userData?.username ?? userData?.email?.split('@')[0] ?? 'Account';
  const initials = userName
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const roleName = String(userData?.role?.type ?? userData?.role?.name ?? '').toLowerCase();
  const isAdmin = roleName.includes('admin');
  const accountPath = isAdmin ? '/admin' : '/my-bookings';
  const isSignedIn = hasToken && Boolean(userData?.email);

  const handleLogout = async () => {
    await logout(undefined);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHomePage
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-600 to-rose-800 rounded-lg flex items-center justify-center text-white">
              <Calendar size={18} strokeWidth={2} />
            </div>
            <span
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled || !isHomePage ? 'text-slate-900' : 'text-white'
              }`}
            >
              Bookly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-rose-600'
                    : scrolled || !isHomePage
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop account actions */}
          <div className="hidden md:flex items-center gap-3">
            <ModeToggle />
            {hasToken && isUserLoading ? (
              <div className="h-9 w-28 animate-pulse rounded-lg bg-slate-200/70" />
            ) : isSignedIn ? (
              <>
                <Link to={accountPath} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${scrolled || !isHomePage ? 'hover:bg-slate-100' : 'hover:bg-white/10'}`}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className={`max-w-28 truncate text-sm font-semibold ${scrolled || !isHomePage ? 'text-slate-700' : 'text-white'}`}>
                    {isAdmin ? `Admin ${userName}` : userName}
                  </span>
                </Link>
                <button onClick={handleLogout} className={`rounded-lg p-2 transition-colors ${scrolled || !isHomePage ? 'text-slate-500 hover:bg-slate-100 hover:text-rose-600' : 'text-white/80 hover:bg-white/10 hover:text-white'}`} aria-label="Sign out" title="Sign out">
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${scrolled || !isHomePage ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>Sign In</Link>
                <Link to="/register" className="text-sm font-medium px-4 py-2 bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-lg hover:from-rose-700 hover:to-rose-900 transition-all shadow-lg shadow-rose-600/20">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X
                size={24}
                className={scrolled || !isHomePage ? 'text-slate-900' : 'text-white'}
              />
            ) : (
              <Menu
                size={24}
                className={scrolled || !isHomePage ? 'text-slate-900' : 'text-white'}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2">
              <ModeToggle />
              {isSignedIn ? (
                <>
                  <Link to={accountPath} className="flex items-center gap-3 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-xs font-bold text-white">{initials}</span>
                    {isAdmin ? `Admin ${userName}` : userName}
                  </Link>
                  <button onClick={handleLogout} className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full text-center px-4 py-2.5 text-slate-600 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">Sign In</Link>
                  <Link to="/register" className="w-full text-center px-4 py-2.5 bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-lg text-sm font-medium hover:from-rose-700 hover:to-rose-900 transition-colors">Get Started</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
