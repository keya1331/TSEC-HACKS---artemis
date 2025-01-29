'use client'
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700">{blog.content}</p>
            <p className="text-gray-500 text-sm">By: {blog.userName}</p>
            <button 
              onClick={() => handleViewBlog(blog._id)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
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