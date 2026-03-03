'use client';

import { useState } from 'react';

export default function FixPasswordPage() {
  const [email, setEmail] = useState('stimflow01@gmail.com');
  const [password, setPassword] = useState('123456');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fixPassword = async () => {
    setLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/auth/fix-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setMessage('✅ Password fixed! You can now login.');
      } else {
        setMessage(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      setMessage('❌ Error fixing password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Fix Password</h1>
        <p className="mb-4 text-sm text-gray-600">
          Your password is stored as plain text. Click fix to hash it properly.
        </p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={fixPassword}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Fixing...' : 'Fix Password'}
        </button>
        
        {message && (
          <p className={`mt-4 text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}