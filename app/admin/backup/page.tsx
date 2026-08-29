'use client';

import React, { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  FileCode
} from 'lucide-react';
import { fetchClientContent, saveClientContent, fetchClientInquiries } from '@/lib/clientData';

export default function AdminBackupPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const [contentData, inquiriesData] = await Promise.all([
        fetchClientContent(),
        fetchClientInquiries()
      ]);

      const backupSnapshot = {
        exportedAt: new Date().toISOString(),
        siteContent: contentData,
        inquiries: inquiriesData
      };

      const blob = new Blob([JSON.stringify(backupSnapshot, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sampathrani_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setStatusMessage({ type: 'success', text: 'Master database backup exported successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to export backup.' });
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatusMessage(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          const siteContent = parsed.siteContent || parsed;

          const res = await saveClientContent(siteContent);
          if (parsed.inquiries && typeof window !== 'undefined') {
            localStorage.setItem('sampath_inquiries', JSON.stringify(parsed.inquiries));
          }

          if (res.success) {
            setStatusMessage({ type: 'success', text: 'Backup restored successfully! All content refreshed.' });
          } else {
            setStatusMessage({ type: 'error', text: res.message || 'Failed to restore backup.' });
          }
        } catch (parseErr) {
          setStatusMessage({ type: 'error', text: 'Invalid JSON backup file format.' });
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error reading file.' });
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
          Data Backup & Disaster Recovery
        </h1>
        <p className="text-xs text-[#7E6F64] mt-1">
          Export full JSON snapshots of the entire website database, programs, events, blogs, and inquiries.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center space-x-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Export Snapshot */}
        <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
              Download Master Snapshot
            </h3>
            <p className="text-xs text-[#7E6F64] leading-relaxed">
              Export all website content, hero sections, 7 signature programs, events, reviews, blogs, and inquiries as a timestamped JSON file.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md shadow-[#382F28]/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#D5BDAF]" />
            <span>{loading ? 'Generating Snapshot...' : 'Export JSON Master Backup'}</span>
          </button>
        </div>

        {/* Card 2: Restore Snapshot */}
        <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
              Restore Database from Backup
            </h3>
            <p className="text-xs text-[#7E6F64] leading-relaxed">
              Upload a previously exported JSON backup file to overwrite and restore all website contents, programs, and reviews instantly.
            </p>
          </div>

          <label className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider border-2 border-dashed border-[#D5BDAF] hover:border-[#382F28] bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#261E18] transition-all flex items-center justify-center space-x-2 cursor-pointer text-center">
            <Upload className="w-4 h-4 text-[#8C7769]" />
            <span>{loading ? 'Restoring Data...' : 'Choose JSON Backup File to Restore'}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              disabled={loading}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
