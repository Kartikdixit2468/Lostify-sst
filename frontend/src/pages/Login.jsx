import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/lostify-logo.jpg';

export default function Login() {
  const [activeTab, setActiveTab] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');
    const usernameParam = searchParams.get('username');
    const emailParam = searchParams.get('email');
    const isAdminParam = searchParams.get('isAdmin');

    if (error === 'unauthorized') {
      toast.error('Only @sst.scaler.com accounts are allowed.');
    } else if (error === 'oauth_failed') {
      toast.error('Google login failed. Please try again.');
    } else if (token && usernameParam && emailParam) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({
        username: usernameParam,
        email: emailParam,
        isAdmin: isAdminParam === 'true'
      }));
      toast.success('Login successful!');
      navigate('/dashboard');
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'admin') {
        await loginAdmin(username, password);
        toast.success('Admin login successful!');
        navigate('/admin');
      } else {
        await login(username, password);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="Lostify Logo"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>
          <h2 className="text-3xl font-heading font-bold text-charcoal dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="card p-6">
          <div className="flex border-b border-charcoal/20 dark:border-white/20 mb-6">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-3 text-center font-heading font-semibold transition-all ${
                activeTab === 'user'
                  ? 'border-b-2 border-accent text-navy dark:text-accent'
                  : 'text-charcoal/60 dark:text-white/60 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              User Login
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex-1 py-3 text-center font-heading font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'border-b-2 border-accent text-navy dark:text-accent'
                  : 'text-charcoal/60 dark:text-white/60 hover:text-charcoal dark:hover:text-white'
              }`}
            >
              Admin Login
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-lost/10 border border-lost text-lost px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="Username"
              />
            </div>
            
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Signing in...' : activeTab === 'admin' ? 'Sign in as Admin' : 'Sign in'}
            </button>

            {activeTab === 'user' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-charcoal/20 dark:border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-navy text-charcoal/60 dark:text-white/60">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border-2 border-charcoal/20 dark:border-white/20 rounded-lg bg-white dark:bg-navy font-medium text-charcoal dark:text-white hover:bg-lightGray dark:hover:bg-navy/90 transition-all duration-300"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google (@sst.scaler.com)
                </button>

                <div className="text-center">
                  <Link to="/signup" className="text-navy dark:text-accent hover:text-accent/80 font-medium transition-colors">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
