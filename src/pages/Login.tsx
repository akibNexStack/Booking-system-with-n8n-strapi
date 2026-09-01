import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Github,
  Chrome,
} from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { toast } from 'sonner';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await axiosInstance.post('/auth/local', {
        identifier: email,
        password,
      });
      localStorage.setItem('strapi_jwt', response.data.jwt);
      toast.success('Signed in successfully.');
      navigate('/my-bookings');
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message
        : undefined;
      const friendlyMessage = message ?? 'Incorrect email or password.';
      setAuthError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-50/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl grid lg:grid-cols-2 gap-0">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 rounded-l-3xl p-12 text-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-rose-400/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 right-0 w-[200px] h-[200px] bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar size={20} strokeWidth={2} />
              </div>
              <span className="text-2xl font-bold tracking-tight">Bookly</span>
            </Link>

            <h2 className="text-4xl font-bold leading-tight mb-6">
              Welcome back to<br />your beauty journey
            </h2>
            <p className="text-rose-100/80 text-lg leading-relaxed max-w-sm">
              Sign in to access your appointments, manage bookings, and discover new services tailored just for you.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <CheckCircle2 size={20} className="text-amber-300 flex-shrink-0" />
              <span className="text-sm text-rose-50">Over 12,000 happy clients trust Bookly</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <CheckCircle2 size={20} className="text-amber-300 flex-shrink-0" />
              <span className="text-sm text-rose-50">Book appointments in under 2 minutes</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <CheckCircle2 size={20} className="text-amber-300 flex-shrink-0" />
              <span className="text-sm text-rose-50">4.9 average rating from verified reviews</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-3xl lg:rounded-l-none p-8 sm:p-12 shadow-xl shadow-slate-200/50 relative">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-rose-800 rounded-xl flex items-center justify-center text-white">
              <Calendar size={20} strokeWidth={2} />
            </div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight">Bookly</span>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600 ring-1 ring-inset ring-rose-600/10 mb-4">
              <Sparkles size={12} />
              Secure Login
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Sign in to your account</h1>
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-rose-600 font-semibold hover:text-rose-700 transition-colors">
                Create one now
              </Link>
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
            >
              <Chrome size={18} />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
            >
              <Github size={18} />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500/20 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl font-semibold text-sm hover:from-rose-500 hover:to-rose-600 transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
            {authError && (
              <p className="rounded-lg bg-rose-50 px-3 py-2 text-center text-sm text-rose-700">
                {authError} Please check your password or create a new account.
              </p>
            )}
          </form>

          {/* Terms */}
          <p className="mt-6 text-xs text-slate-400 text-center leading-relaxed">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-rose-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-rose-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
