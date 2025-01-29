'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the blog data based on the id
      fetch(`/api/blog/view/${id}`)
        .then(response => response.json())
        .then(data => setBlog(data))
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id]);

  const handleDelete = () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error('User email not found in local storage');
      return;
    }

    fetch(`/api/blog/delete/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Blog deleted:', data);
        toast.success('Blog deleted successfully!');
        setTimeout(() => {
          window.location.href = '/blog/show/all';
        }, 2000);
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
        toast.error('Error deleting blog');
      });
  };

  if (!blog) {
    return <div className="flex items-center justify-center min-h-screen text-lg text-[#084C20]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        <h1 className="text-4xl font-extrabold text-[#084C20] text-center mb-6">{blog.title}</h1>
        <p className="text-lg text-[#084C20] leading-relaxed mb-6">{blog.content}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
