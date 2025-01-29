'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function BlogsPage({ Component }) {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch('/api/blog/view/all');
      const data = await response.json();
      setBlogs(data.blogs);
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
            <p className="text-gray-500 text-sm mb-4">By: {blog.userName}</p>
            <button
              onClick={() => handleViewBlog(blog._id)}
              className="px-6 py-3 bg-[#6DBE47] text-white rounded-lg font-semibold hover:bg-[#5CAA3F] transition-all duration-300"
            >
              View Blog
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
