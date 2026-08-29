'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Calendar,
  Star,
  BookOpen,
  MessageSquare,
  Settings,
  Database,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { getImageUrl } from '@/lib/imageUtils';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show the admin dashboard shell
  const isLoginPage = pathname?.includes('/admin/login') || pathname?.endsWith('admin/login') || pathname?.endsWith('admin/login/');

  useEffect(() => {
    if (isLoginPage) {
      setAuthorized(true);
      return;
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('sampath_admin_auth') : null;
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('sampath_admin_auth');
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-[#6A5A4E] text-sm">
        Verifying administrator session...
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Page Content Editor', href: '/admin/pages', icon: FileText },
    { label: 'Programs (7 Offerings)', href: '/admin/programs', icon: Sparkles },
    { label: 'Workshops & Events', href: '/admin/events', icon: Calendar },
    { label: 'Testimonials & Reviews', href: '/admin/testimonials', icon: Star },
    { label: 'Blog & Soul Videos', href: '/admin/blogs', icon: BookOpen },
    { label: 'Inquiries & Leads CRM', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Site Settings & SEO', href: '/admin/settings', icon: Settings },
    { label: 'Backup & Restore', href: '/admin/backup', icon: Database },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin' || pathname === '/admin/';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#261E18] flex flex-col md:flex-row font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#261E18] text-[#FAF8F5]">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D5BDAF] p-0.5">
            <Image src={getImageUrl('/images/logo.png')} alt="Logo" width={32} height={32} />
          </div>
          <span className="font-serif-luxury font-bold text-[#FAF8F5] text-sm">
            Dr. Sampath Rani CMS
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg text-[#D6CCC2] hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#261E18] text-[#FAF8F5] flex flex-col justify-between transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Logo & Admin Branding */}
          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/10">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#D5BDAF] p-1 bg-white/10">
              <Image
                src={getImageUrl('/images/logo.png')}
                alt="Dr. Sampath Rani"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-serif-luxury font-bold text-sm text-[#FAF8F5]">
                Dr. Sampath Rani
              </div>
              <div className="text-[10px] uppercase tracking-wider font-semibold text-[#D5BDAF]">
                Admin Control Center
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-[#FAF8F5] text-[#261E18] shadow-md'
                      : 'text-[#D6CCC2] hover:text-[#FAF8F5] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${active ? 'text-[#261E18]' : 'text-[#D5BDAF]'}`} />
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-[#FAF8F5] bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center space-x-2 transition-all"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D5BDAF]" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all flex items-center justify-center space-x-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#FAF8F5]">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#D5BDAF]/40 shadow-sm">
          <div className="flex items-center space-x-2 text-xs text-[#52443A] font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authenticated Administrator Session</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#382F28] hover:text-[#8C7769] font-bold flex items-center space-x-1"
            >
              <span>Preview Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C7769]" />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 bg-[#FAF8F5]">{children}</main>
      </div>
    </div>
  );
}
