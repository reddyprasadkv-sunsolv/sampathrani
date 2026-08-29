'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent, saveClientContent } from '@/lib/clientData';

export default function AdminSettingsPage() {
  const [content, setContent] = useState<any>(defaultContent);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading settings:', err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    // Save admin PIN to localStorage as well
    if (content?.siteSettings?.adminPin && typeof window !== 'undefined') {
      localStorage.setItem('sampath_admin_pin', content.siteSettings.adminPin);
    }

    try {
      const res = await saveClientContent(content);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Site settings & security updated successfully!' });
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to save settings' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error saving settings.' });
    } finally {
      setSaving(false);
    }
  };

  if (!content) return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading site settings...</div>;

  const settings = content.siteSettings || {};
  const socials = settings.socialLinks || {};

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Site Settings, SEO & Security
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Configure contact coordinates, brand titles, social media channels, and change the Admin PIN.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-lg shadow-[#382F28]/20 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#D5BDAF]" />
          <span>{saving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center space-x-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Admin Security PIN Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF] flex items-center justify-center font-bold">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#261E18]">
                Admin Authentication Security PIN
              </h3>
              <p className="text-xs text-[#7E6F64]">
                Change the password/PIN required to log into this administration dashboard.
              </p>
            </div>
          </div>

          <div className="max-w-md pt-2">
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Current / New Admin PIN *
            </label>
            <input
              type="text"
              required
              value={settings.adminPin || 'admin123'}
              onChange={(e) =>
                setContent({
                  ...content,
                  siteSettings: { ...settings, adminPin: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-3 text-sm text-[#261E18] font-mono tracking-wider focus:outline-none"
            />
          </div>
        </div>

        {/* Brand & SEO */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Brand Identity & SEO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Website Name / Brand
              </label>
              <input
                type="text"
                value={settings.name || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, name: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Founder Title / Credentials
              </label>
              <input
                type="text"
                value={settings.title || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, title: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Primary Brand Tagline
            </label>
            <input
              type="text"
              value={settings.tagline || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  siteSettings: { ...settings, tagline: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Contact & Location Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, phone: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                WhatsApp Raw Digits (e.g. 919848709677)
              </label>
              <input
                type="text"
                value={settings.whatsappRaw || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, whatsappRaw: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, email: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Working / Consultation Hours
              </label>
              <input
                type="text"
                value={settings.workingHours || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...settings, workingHours: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Physical Center Address
            </label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  siteSettings: { ...settings, address: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Social Media & Video Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                YouTube Channel URL
              </label>
              <input
                type="text"
                value={socials.youtube || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: {
                      ...settings,
                      socialLinks: { ...socials, youtube: e.target.value }
                    }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={socials.instagram || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: {
                      ...settings,
                      socialLinks: { ...socials, instagram: e.target.value }
                    }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                value={socials.linkedin || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: {
                      ...settings,
                      socialLinks: { ...socials, linkedin: e.target.value }
                    }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Facebook Page URL
              </label>
              <input
                type="text"
                value={socials.facebook || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: {
                      ...settings,
                      socialLinks: { ...socials, facebook: e.target.value }
                    }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                X / Twitter URL
              </label>
              <input
                type="text"
                value={socials.twitter || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: {
                      ...settings,
                      socialLinks: { ...socials, twitter: e.target.value }
                    }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
