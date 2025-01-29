'use client';

import { useState, useEffect } from 'react';

export default function AddBlogPage() {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/blog/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, title, content }),
    });

    if (res.ok) {
      window.location.href = '/blog/show/all';
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] flex items-center justify-center py-20">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold text-[#084C20] text-center mb-8">
          Add a New Blog
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-semibold text-[#084C20] mb-1">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#6DBE47] focus:outline-none"
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-semibold text-[#084C20] mb-1">
              Content:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-[#6DBE47] focus:outline-none h-40"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#6DBE47] text-white font-semibold rounded-lg shadow-md hover:bg-[#5CAA3F] transition-all"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
}
