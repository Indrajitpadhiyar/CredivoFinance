import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../utils/axiosinstance';
import { API_PATHS } from '../../../utils/apiPath';
import { validateEmail } from '../../../utils/helper';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) return setError('Invalid email');
    if (!password) return setError('Password is required');
    setError('');
    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: email.trim(),
        password: password.trim(),
      });
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4 relative">

      {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-white/20">
          <div
            className="w-32 aspect-square rounded-full relative flex justify-center items-center animate-[spin_3s_linear_infinite] z-40 bg-[conic-gradient(white_0deg,white_300deg,transparent_270deg,transparent_360deg)] before:animate-[spin_2s_linear_infinite] before:absolute before:w-[60%] before:aspect-square before:rounded-full before:z-[80] before:bg-[conic-gradient(white_0deg,white_270deg,transparent_180deg,transparent_360deg)] after:absolute after:w-3/4 after:aspect-square after:rounded-full after:z-[60] after:animate-[spin_3s_linear_infinite] after:bg-[conic-gradient(#065f46_0deg,#065f46_180deg,transparent_180deg,transparent_360deg)]"
          >
            <span
              className="absolute w-[85%] aspect-square rounded-full z-[60] animate-[spin_5s_linear_infinite] bg-[conic-gradient(#34d399_0deg,#34d399_180deg,transparent_180deg,transparent_360deg)]"
            >
            </span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className={`bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md sm:max-w-lg transition duration-300 ${loading ? 'blur-[1.5px] pointer-events-none' : ''}`}>
        <div className="flex justify-center mb-6">
          <img src="./image/logoo.png" alt="Logo" className="h-24 w-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <div className="flex items-center mt-1 border rounded-md px-3 py-2 bg-white shadow-sm">
              <img src="./image/mail-line.svg" alt="mail" className="w-4 h-4 mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <div className="relative flex items-center mt-1 border rounded-md px-3 py-2 bg-white shadow-sm">
              <img src="./image/lock-line.svg" alt="lock" className="w-4 h-4 mr-2" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Remember & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-blue-600 underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow"
          >
            Log In
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm">
            Don't have an account?{' '}
            <button className='text-blue-700 underline hover:text-blue-900' onClick={() => (window.location.href = '/register')}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
