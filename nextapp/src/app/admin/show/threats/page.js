'use client';

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";

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
        thread.name.toLowerCase().includes(search.toLowerCase()) ||
        thread.type.toLowerCase().includes(search.toLowerCase()) ||
        thread.message.toLowerCase().includes(search.toLowerCase())
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
    <div className="min-h-screen bg-gradient-to-br from-[#237414] to-[#bad699] text-[#081707] px-6 py-24">
      <ToastContainer />
      
      {/* Search Bar */}
      <div className="relative mb-8 max-w-2xl mx-auto">
        <FiSearch className="absolute left-3 top-2.5 text-[#6DBE47]" size={20} />
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search by name, type, or message..."
          className="w-full py-3 pl-10 pr-4 rounded-full bg-[#FFFFFF] text-[#081707] border border-[#BAD799] shadow-sm focus:ring-2 focus:ring-[#6DBE47] focus:outline-none placeholder-gray-500"
        />
      </div>

      {/* Data Table */}
      {loading ? (
        <p className="text-center text-[#6DBE47] font-semibold text-lg">Loading...</p>
      ) : (
        <div className="overflow-hidden shadow-lg rounded-lg border border-[#BAD799]">
          <table className="table-auto w-full bg-white rounded-lg">
            <thead>
              <tr className="bg-[#BAD799] text-[#081707]">
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {threads.length > 0 ? (
                threads.map((thread) => (
                  <tr
                    key={thread._id}
                    className="border-t border-[#D8E3A6] hover:bg-[#F4F9EB] transition-all"
                  >
                    <td className="p-4">{thread.name}</td>
                    <td className="p-4">{thread.type}</td>
                    <td className="p-4">{thread.message}</td>
                    <td className="p-4">
                      <div className="w-16 h-16 border border-[#6DBE47] rounded-lg overflow-hidden shadow-md">
                        <img
                          src={thread.image}
                          alt={thread.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-blue-600">
                    <Link href={`https://maps.google.com/?q=${thread.location.latitude},${thread.location.longitude}`} target='_blank'>{thread.location.latitude}, {thread.location.longitude}</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-400 border-t border-[#D8E3A6]"
                  >
                    No threads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-between items-center max-w-2xl mx-auto">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all shadow-md ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-[#BAD799] text-[#081707] hover:bg-[#6DBE47]"
          }`}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className={`px-6 py-3 rounded-lg font-medium transition-all shadow-md ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-[#BAD799] text-[#081707] hover:bg-[#6DBE47]"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
