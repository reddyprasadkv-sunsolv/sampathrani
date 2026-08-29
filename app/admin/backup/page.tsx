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

export default function AdminBackupPage() {
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/backup');
      const data = await res.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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

          const res = await fetch('/api/backup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(parsed)
          });

          const data = await res.json();
          if (res.ok && data.success) {
            setStatusMessage({ type: 'success', text: 'Backup restored successfully! All data refreshed.' });
          } else {
            setStatusMessage({ type: 'error', text: data.error || 'Failed to restore backup' });
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
        {/* Export Backup */}
        <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
              Export Master Backup
            </h3>
            <p className="text-xs text-[#6A5A4E] leading-relaxed">
              Download a complete JSON copy of all website content, programs, upcoming masterclasses, blog articles, and inquiries.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={loading}
            className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4 text-[#D5BDAF]" />
            <span>{loading ? 'Exporting...' : 'Download Backup File (.json)'}</span>
          </button>
        </div>

        {/* Restore Backup */}
        <div className="bg-white rounded-3xl p-8 border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
              Restore from Backup
            </h3>
            <p className="text-xs text-[#6A5A4E] leading-relaxed">
              Upload a previously exported JSON backup file to restore pages, programs, events, and blogs.
            </p>
          </div>

          <label className="w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#FAF8F5] text-[#261E18] hover:bg-[#F5EBE0] border border-[#D5BDAF] transition-all flex items-center justify-center space-x-2 cursor-pointer">
            <Upload className="w-4 h-4 text-[#8C7769]" />
            <span>{loading ? 'Restoring...' : 'Select Backup JSON File'}</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
