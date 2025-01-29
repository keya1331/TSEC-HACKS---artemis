'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract token and email from query parameters
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token || !email) {
      toast.error('Invalid or expired link.');
      router.push('/auth/forgot-password');
    }
  }, [token, email, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    toast.loading('Resetting password...', { id: 'reset-password' });

    try {
      const res = await axios.post(
        '/api/auth/reset-password',
        { email, token, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (res?.data?.success) {
        toast.success('Password reset successfully! Redirecting to login...', {
          id: 'reset-password',
        });
        setPassword('');
        setTimeout(() => router.push('/auth/login'), 3000);
      } else {
        toast.error(res?.data?.message || 'Something went wrong.', {
          id: 'reset-password',
        });
      }
    } catch (err) {
      toast.error('Failed to reset password.', { id: 'reset-password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#BAD799] text-[#081707] px-4">
      <div className="w-full max-w-md p-8 bg-[#F5F5F5] rounded-lg shadow-lg border border-[#6DBE47]">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-[#237414]">Reset Password</h2>
        <p className="text-sm text-[#081707] text-center mb-8">
          Enter your new password to reset your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#081707]">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full px-4 py-3 bg-[#BAD799] border border-[#6DBE47] rounded-lg focus:ring-2 focus:ring-[#8AAC8B] text-[#081707]"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              isSubmitting
                ? 'bg-[#BAD799] cursor-not-allowed'
                : 'bg-[#6DBE47] hover:bg-[#237414] focus:ring-2 focus:ring-[#8AAC8B]'
            } text-white`}
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
