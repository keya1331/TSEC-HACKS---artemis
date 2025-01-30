'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchBlogAndCheckOwnership = async () => {
      try {
        const response = await fetch(`/api/blog/view/${id}`);
        const data = await response.json();
        setBlog(data);
        
        // Check if current user is the author using email
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) return;

        // Compare with the blog author's email
        setIsAuthor(userEmail === data.userEmail);
        
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error loading blog data');
      }
    };

    if (id) {
      fetchBlogAndCheckOwnership();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) {
        toast.error('Please login to delete the blog');
        return;
      }

      toast.loading('Deleting blog...', { id: 'deleteBlog' });
      
      const response = await fetch(`/api/blog/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete blog');
      }

      toast.success('Blog deleted successfully', { id: 'deleteBlog' });
      router.push('/reports');

    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error deleting blog', { id: 'deleteBlog' });
    }
  };

  if (!blog) {
    return <div className="flex items-center justify-center min-h-screen text-lg text-[#084C20]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
        <h1 className="text-4xl font-extrabold text-[#084C20] text-center mb-6">{blog.title}</h1>
        <p className="text-gray-600 text-center mb-4">
          By: {blog.authorName || 'Unknown Author'}
        </p>
        <p className="text-lg text-[#084C20] leading-relaxed mb-6">{blog.content}</p>
        {isAuthor && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              Delete Blog
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
