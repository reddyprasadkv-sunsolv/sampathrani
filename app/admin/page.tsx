'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Sparkles,
  Calendar,
  BookOpen,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { fetchClientContent, fetchClientInquiries } from '@/lib/clientData';

export default function AdminDashboard() {
  const [content, setContent] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchClientContent(), fetchClientInquiries()])
      .then(([contentData, inquiriesData]) => {
        setContent(contentData);
        setInquiries(Array.isArray(inquiriesData) ? inquiriesData : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching admin data:', err);
        setLoading(false);
      });
  }, []);

  const programsCount = content?.programs?.length || 0;
  const eventsCount = content?.events?.length || 0;
  const blogsCount = content?.blogs?.length || 0;
  const testimonialsCount =
    (content?.testimonials?.written?.length || 0) + (content?.testimonials?.videos?.length || 0);

  const pendingInquiries = inquiries.filter((i) => i.status === 'New').length;

  if (loading) {
    return (
      <div className="text-center py-20 text-[#7E6F64] text-sm">
        Loading admin dashboard metrics...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Welcome, Dr. Sampath Rani
          </h1>
          <p className="text-xs sm:text-sm text-[#7E6F64] mt-1">
            Complete administration dashboard to edit pages, update workshops, publish blogs, and manage client leads.
          </p>
        </div>

        <Link
          href="/admin/pages"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-[#D5BDAF]" />
          <span>Edit Page Content</span>
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Inquiries */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7E6F64] font-semibold mb-1">
              Client Inquiries
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#261E18]">
              {inquiries.length}
            </div>
            <div className="text-[11px] text-[#8C7769] mt-1 font-bold">
              {pendingInquiries} New Actionable Leads
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Programs */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7E6F64] font-semibold mb-1">
              Active Programs
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#261E18]">
              {programsCount}
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 font-bold">
              Full 7 Signature Curricula
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Workshops & Events */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7E6F64] font-semibold mb-1">
              Workshops & Events
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#261E18]">
              {eventsCount}
            </div>
            <div className="text-[11px] text-[#382F28] mt-1 font-bold">
              Hybrid & Online Masterclasses
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Blog & Soul Videos */}
        <div className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#7E6F64] font-semibold mb-1">
              Blogs & Soul Videos
            </div>
            <div className="font-serif-luxury text-3xl font-bold text-[#261E18]">
              {blogsCount}
            </div>
            <div className="text-[11px] text-[#8C7769] mt-1 font-bold">
              {testimonialsCount} Total Testimonials
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm">
        <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] mb-4">
          Quick Management Shortcuts
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Link
            href="/admin/pages"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              Edit Pages
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Hero, Bio & Book</div>
          </Link>

          <Link
            href="/admin/programs"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              Programs
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Add & edit courses</div>
          </Link>

          <Link
            href="/admin/events"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              Workshops
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Manage dates & venues</div>
          </Link>

          <Link
            href="/admin/testimonials"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              Testimonials
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Video & written</div>
          </Link>

          <Link
            href="/admin/blogs"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              New Blog
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Publish article</div>
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#D5BDAF]/50 hover:border-[#8C7769] text-center transition-all group"
          >
            <div className="text-[#261E18] font-bold text-xs uppercase group-hover:text-[#8C7769]">
              Settings & PIN
            </div>
            <div className="text-[10px] text-[#7E6F64] mt-1">Contact & SEO</div>
          </Link>
        </div>
      </div>

      {/* Recent Inquiries CRM Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
              Recent Client Inquiries & Booking Requests
            </h3>
            <p className="text-xs text-[#7E6F64]">
              Visitors who submitted the consultation or contact forms.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs uppercase tracking-wider font-bold text-[#382F28] hover:text-[#8C7769] flex items-center space-x-1"
          >
            <span>View All ({inquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {inquiries.length === 0 ? (
          <div className="text-center py-10 text-[#7E6F64] text-xs">
            No inquiries received yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#D5BDAF] text-[#7E6F64] uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Name</th>
                  <th className="py-3 px-3">Phone / Email</th>
                  <th className="py-3 px-3">Program / Service</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDE9] text-[#4A3E35]">
                {inquiries.slice(0, 5).map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3.5 px-3 text-[#7E6F64] whitespace-nowrap">
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-[#261E18]">
                      {inq.name}
                    </td>
                    <td className="py-3.5 px-3">
                      <div>{inq.phone}</div>
                      {inq.email && <div className="text-[11px] text-[#7E6F64]">{inq.email}</div>}
                    </td>
                    <td className="py-3.5 px-3 text-[#382F28] font-medium">
                      {inq.service}
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          inq.status === 'New'
                            ? 'bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]'
                            : inq.status === 'Contacted'
                            ? 'bg-sky-50 text-sky-800 border border-sky-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href="/admin/inquiries"
                        className="text-xs text-[#382F28] hover:text-[#8C7769] font-bold"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
