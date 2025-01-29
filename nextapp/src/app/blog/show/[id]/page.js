'use client'
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

  const handleEdit = () => {
    // Handle edit logic
    console.log('Edit blog:', id);
  };

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-lg mb-6">{blog.content}</p>
      <button 
        onClick={handleDelete} 
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default Page;
