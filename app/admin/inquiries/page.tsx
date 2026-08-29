'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Clock,
  Download,
  Filter,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Video
} from 'lucide-react';
import { fetchClientInquiries } from '@/lib/clientData';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  const fetchInquiries = () => {
    fetchClientInquiries()
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching inquiries:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {}

    const updated = inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq));
    setInquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sampath_inquiries', JSON.stringify(updated));
    }
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this lead?')) {
      try {
        await fetch(`/api/inquiries?id=${id}`, {
          method: 'DELETE'
        });
      } catch (err) {}

      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem('sampath_inquiries', JSON.stringify(updated));
      }
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const exportCSV = () => {
    if (inquiries.length === 0) return;

    const headers = ['Date', 'Name', 'Phone', 'Email', 'Service', 'Mode', 'PreferredDate', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      i.createdAt || '',
      `"${i.name || ''}"`,
      `"${i.phone || ''}"`,
      `"${i.email || ''}"`,
      `"${i.service || ''}"`,
      `"${i.preferredMode || ''}"`,
      `"${i.preferredDate || ''}"`,
      `"${i.status || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered =
    filterStatus === 'All'
      ? inquiries
      : inquiries.filter((inq) => inq.status === filterStatus);

  if (loading) {
    return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading client leads CRM...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Inquiries & Leads CRM ({inquiries.length})
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Track consultation appointments, workshop registrations, and contact requests.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-[#382F28] hover:bg-[#F5EBE0] border border-[#D5BDAF] shadow-sm transition-all self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#8C7769]" />
          <span>Export Leads (CSV)</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2">
        <div className="text-xs text-[#7E6F64] mr-2 flex items-center space-x-1 font-medium">
          <Filter className="w-3.5 h-3.5 text-[#8C7769]" />
          <span>Status:</span>
        </div>
        {['All', 'New', 'Contacted', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filterStatus === status
                ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
            }`}
          >
            {status} ({status === 'All' ? inquiries.length : inquiries.filter((i) => i.status === status).length})
          </button>
        ))}
      </div>

      {/* Inquiries Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#7E6F64] text-xs">
              No inquiries found in this category.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#D5BDAF] text-[#7E6F64] uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Client</th>
                    <th className="py-3 px-3">Program / Service</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDE9] text-[#4A3E35]">
                  {filtered.map((inq) => (
                    <tr
                      key={inq.id}
                      onClick={() => setSelectedInquiry(inq)}
                      className={`hover:bg-[#FAF8F5] cursor-pointer transition-colors ${
                        selectedInquiry?.id === inq.id ? 'bg-[#F5EBE0]/60' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3 text-[#7E6F64] whitespace-nowrap">
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-[#261E18]">{inq.name}</div>
                        <div className="text-[11px] text-[#7E6F64]">{inq.phone}</div>
                      </td>
                      <td className="py-3.5 px-3 text-[#382F28] font-semibold">
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
                      <td className="py-3.5 px-3 text-right space-x-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Panel */}
        <div className="lg:col-span-4">
          {selectedInquiry ? (
            <div className="bg-white rounded-3xl p-6 border border-[#D5BDAF] shadow-lg space-y-5 sticky top-8">
              <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-3">
                <span className="text-xs uppercase font-bold text-[#8C7769]">Lead Details</span>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-xs text-[#7E6F64] hover:text-[#261E18]"
                >
                  Close
                </button>
              </div>

              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                  {selectedInquiry.name}
                </h3>
                <p className="text-xs text-[#7E6F64]">
                  Received {new Date(selectedInquiry.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Contact Links */}
              <div className="space-y-2 pt-1">
                <a
                  href={`https://wa.me/${selectedInquiry.phone?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedInquiry.name}, this is Dr. Sampath Rani Momula following up on your consultation request for ${selectedInquiry.service}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 flex items-center justify-center space-x-2 text-xs font-bold transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-700" />
                  <span>Reply on WhatsApp</span>
                </a>

                {selectedInquiry.phone && (
                  <a
                    href={`tel:${selectedInquiry.phone}`}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#261E18] border border-[#D5BDAF] flex items-center justify-center space-x-2 text-xs transition-all font-medium"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8C7769]" />
                    <span>Call: {selectedInquiry.phone}</span>
                  </a>
                )}

                {selectedInquiry.email && (
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="w-full py-2 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#261E18] border border-[#D5BDAF] flex items-center justify-center space-x-2 text-xs transition-all font-medium"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#8C7769]" />
                    <span className="truncate">{selectedInquiry.email}</span>
                  </a>
                )}
              </div>

              {/* Consultation specifics */}
              <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl text-xs text-[#4A3E35] border border-[#D5BDAF]/40">
                <div>
                  <span className="text-[#7E6F64] font-medium">Program: </span>
                  <span className="text-[#261E18] font-bold">{selectedInquiry.service}</span>
                </div>
                {selectedInquiry.preferredMode && (
                  <div>
                    <span className="text-[#7E6F64] font-medium">Mode: </span>
                    <span>{selectedInquiry.preferredMode}</span>
                  </div>
                )}
                {selectedInquiry.preferredDate && (
                  <div>
                    <span className="text-[#7E6F64] font-medium">Preferred Date: </span>
                    <span>{selectedInquiry.preferredDate}</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[11px] uppercase font-bold text-[#7E6F64] mb-1">
                  Message / Goals:
                </label>
                <div className="p-3 bg-[#FAF8F5] rounded-xl text-xs text-[#261E18] border border-[#D5BDAF]/60 leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message || 'No additional message provided.'}
                </div>
              </div>

              {/* Status Selector */}
              <div className="pt-3 border-t border-[#EDEDE9]">
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1.5">
                  Update Lead Status:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['New', 'Contacted', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                        selectedInquiry.status === st
                          ? 'bg-[#382F28] text-[#FAF8F5]'
                          : 'bg-[#FAF8F5] text-[#7E6F64] hover:bg-[#F5EBE0] border border-[#D5BDAF]/60'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm text-center text-[#7E6F64] text-xs">
              Select an inquiry from the list to view complete details, message history, and direct WhatsApp actions.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
