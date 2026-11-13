import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password. Please check your credentials.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-lg mb-4">
            <span className="text-2xl font-black text-white">PF</span>
          </div>
          <h1 className="text-3xl font-bold text-black">PlanForge AI</h1>
          <p className="text-gray-600 mt-2">Manufacturing Intelligence Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6">Sign In</h2>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 bg-gray-700 border border-gray-600 rounded-lg flex items-center gap-2">
              <AlertCircle size={18} className="text-white flex-shrink-0" />
              <p className="text-sm text-white">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-black hover:text-gray-700 font-medium">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <p className="text-xs font-semibold text-gray-700 uppercase mb-2">✅ Demo Credentials:</p>
            <div className="space-y-1.5 text-xs text-gray-600">
              <p>
                <span className="font-bold text-black">Admin:</span> admin@planforge.com / admin123
              </p>
              <p>
                <span className="font-bold text-black">Supervisor:</span> supervisor@planforge.com / supervisor123
              </p>
              <p>
                <span className="font-bold text-black">Operator:</span> operator@planforge.com / operator123
              </p>
              <p>
                <span className="font-bold text-black">Analyst:</span> analyst@planforge.com / analyst123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          © 2024 PlanForge AI. All rights reserved.
        </p>
      </div>
    </div>
  );
}
