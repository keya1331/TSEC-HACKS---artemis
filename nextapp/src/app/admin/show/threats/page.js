'use client'

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ThreadTable() {
  const [threads, setThreads] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch data from the backend
  const fetchThreads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/show?page=${page}&limit=10`);
      const data = await res.json();
      const filteredThreads = data.threads.filter(thread =>
        thread.name.includes(search) ||
        thread.type.includes(search) ||
        thread.message.includes(search)
      );
      setThreads(filteredThreads);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch threads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="p-6 mt-10">
      <ToastContainer />
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by name, type, or message"
        className="mb-4 p-2 border w-full"
        style={{ marginBottom: '1rem' }} // Ensure the search bar is visible
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Message</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {threads.length > 0 ? (
              threads.map((thread) => (
                <tr key={thread._id}>
                  <td className="border p-2">{thread.name}</td>
                  <td className="border p-2">{thread.type}</td>
                  <td className="border p-2">{thread.message}</td>
                  <td className="border p-2">
                    <img
                      src={thread.image}
                      alt={thread.name}
                      className="w-16 h-16 object-cover"
                    />
                  </td>
                  <td className="border p-2">
                    {thread.location.latitude}, {thread.location.longitude}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border p-2 text-center">No threads found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
