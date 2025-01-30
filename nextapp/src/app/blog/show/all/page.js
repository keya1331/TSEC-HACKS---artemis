'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function BlogsPage({ Component }) {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState({});

  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch('/api/blog/view/all');
      const data = await response.json();
      setBlogs(data.blogs);
      
      // Fetch author names for each unique email
      const uniqueEmails = [...new Set(data.blogs.map(blog => blog.userEmail))];
      const authorDetails = {};
      
      await Promise.all(uniqueEmails.map(async (email) => {
        const userResponse = await fetch('/api/user/get-name', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const userData = await userResponse.json();
        authorDetails[email] = userData.name;
      }));
      
      setAuthors(authorDetails);
    }
    fetchBlogs();
  }, []);

  const handleViewBlog = (id) => {
    window.location.href = `/blog/show/${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d8e3a6] to-[#b0c578] flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-[#084C20] text-center mb-12 mt-12">
        Blogs
      </h1>
      <div className="space-y-6 max-w-4xl w-full">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-[#084C20] mb-2">
              {blog.title}
            </h2>
            <p className="text-gray-700 mb-4">
              {blog.content.substring(0, 100)}...
            </p>
            <p className="text-gray-500 text-sm mb-4">
              By: {authors[blog.userEmail] || 'Loading...'}
            </p>
            <button
              onClick={() => handleViewBlog(blog._id)}
              className="px-4 py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition duration-300"
            >
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

BlogsPage.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default BlogsPage;
