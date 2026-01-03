
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle, ShieldCheck } from 'lucide-react';

const ReceptionistLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'divyasree' && password === 'divya@2305') {
      localStorage.setItem('receptionist_auth', 'true');
      navigate('/receptionist/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Staff Portal</h1>
          <p className="text-slate-500">Access patient records and hospital schedules.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-500" /> Username
              </label>
              <input 
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter staff username"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" /> Password
              </label>
              <input 
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-5 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>
        
        <p className="text-center text-slate-400 text-sm mt-8">
          Unauthorized access is strictly prohibited.
        </p>
      </div>
    </div>
  );
};

export default ReceptionistLogin;
