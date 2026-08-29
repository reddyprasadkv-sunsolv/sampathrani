'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ShieldCheck, ArrowRight, Sparkles, KeyRound } from 'lucide-react';
import CaptchaWidget from '@/components/CaptchaWidget';

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      setError('Please solve the security verification captcha before logging in.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('sampath_admin_auth', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid Admin PIN/Password');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#FAF8F5] text-[#4A3E35] relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D5BDAF]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F5EBE0]/60 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-[#D5BDAF] shadow-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D5BDAF] p-1 bg-[#F5EBE0] mx-auto shadow-sm">
            <Image
              src="/images/logo.png"
              alt="Dr. Sampath Rani"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-widest text-[#382F28] font-bold px-3 py-1 rounded-full bg-[#F5EBE0] border border-[#D5BDAF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8C7769]" />
            <span>Admin Management CMS</span>
          </div>

          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Dr. Sampath Rani
          </h2>
          <p className="text-xs text-[#7E6F64]">
            Enter your admin PIN to manage pages, programs, events, blogs, and inquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1.5 uppercase tracking-wider">
              Admin PIN / Security Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-[#8E7E73] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (Default: admin123)"
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl py-3 pl-11 pr-4 text-sm text-[#261E18] placeholder-[#9E8E83] focus:outline-none tracking-widest"
              />
            </div>
            <p className="text-[11px] text-[#7E6F64] mt-1.5">
              Default password: <code className="text-[#382F28] font-bold font-mono">admin123</code> (customizable in admin settings)
            </p>
          </div>

          {/* Security Captcha */}
          <CaptchaWidget onVerify={(isValid) => setCaptchaVerified(isValid)} />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md shadow-[#382F28]/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4 text-[#D5BDAF]" />
              </>
            )}
          </button>
        </form>

        <div className="pt-8 text-center">
          <Link
            href="/"
            className="text-xs text-[#7E6F64] hover:text-[#261E18] transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
