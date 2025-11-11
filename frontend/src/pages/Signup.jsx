import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import logo from '../assets/lostify-logo.jpg';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(username, email, password);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Signup failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
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
            Create your account
          </h2>
        </div>
        
        <div className="card p-6">
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
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="Email"
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
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
            
            <div className="text-center">
              <Link to="/login" className="text-navy dark:text-accent hover:text-accent/80 font-medium transition-colors">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
