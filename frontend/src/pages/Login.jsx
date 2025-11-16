import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/lostify-logo.jpg';

export default function Login() {
  const [activeTab, setActiveTab] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await loginAdmin(username, password);
      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      await googleLogin(credentialResponse.credential);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Login failed';
      toast.error(errorMsg);
    }
  };

  const handleGoogleError = () => {
    toast.error('Google Sign-In failed. Please try again.');
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
              {loading ? 'Signing in...' : 'Sign in as Admin'}
            </button>

            {activeTab === 'user' && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-charcoal/20 dark:border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-navy text-charcoal/60 dark:text-white/60">
                      SST Students Sign in with Google
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    text="signin_with"
                    theme="outline"
                    size="large"
                    width="100%"
                  />
                </div>

                <p className="text-sm text-center text-charcoal/60 dark:text-white/60">
                  Only @sst.scaler.com email addresses are allowed
                </p>

                <div className="text-center">
                  <Link to="/" className="text-navy dark:text-accent hover:text-accent/80 font-medium transition-colors">
                    ← Back to Home
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
