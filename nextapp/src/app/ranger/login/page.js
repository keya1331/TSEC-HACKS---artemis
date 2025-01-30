'use client';
import React, { useState } from 'react';

const RangerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/ranger/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('rangerEmail', email);
        window.location.href = '/ranger';
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d8e3a6] via-[#c8d796] to-[#b0c578] p-6">
      <h1 className="text-4xl font-bold text-center text-[#081707] mb-10">
        Ranger Login
      </h1>
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-[#081707] text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#081707] text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default RangerLogin;
