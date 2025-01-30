'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const RangerPage = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  const fetchJobs = async () => {
    const email = localStorage.getItem('rangerEmail');
    if (!email) {
      console.error('No ranger email found in local storage');
      return;
    }

    try {
      const response = await fetch('/api/admin/rangers/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#d8e3a6] via-[#c8d796] to-[#b0c578] p-6">
      <h1 className="text-4xl font-bold text-center text-[#081707] mb-10">
        Ranger Dashboard
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push('/admin/threats')}
          className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
        >
          Go to Threats
        </button>
        <button
          onClick={fetchJobs}
          className="px-6 py-3 bg-[#6DBE47] text-white font-semibold rounded-md hover:bg-[#237414] transition duration-300"
        >
          Fetch My Jobs
        </button>
      </div>

      {jobs.length > 0 && (
        <section className="mt-8 w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-[#081707] mb-4">
            My Jobs
          </h2>
          <ul className="list-disc list-inside bg-white p-4 rounded-lg shadow-md">
            {jobs.map((job) => (
              <li key={job._id} className="text-lg text-[#081707]">
                {job.description}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default RangerPage;