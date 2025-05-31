import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Optionally, check if user is authenticated (session exists)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setError('Session missing or expired. Please request a new password reset link.');
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) setError(error.message);
    else {
      setMsg('Password updated! Redirecting to login...');
      setTimeout(() => navigate('/auth'), 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Set New Password</h2>
        {error && <div className="mb-2 text-red-600">{error}</div>}
        {msg && <div className="mb-2 text-green-600">{msg}</div>}
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mb-2"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          disabled={!!error}
        >
          Set Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;