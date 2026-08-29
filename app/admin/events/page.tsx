'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Clock,
  MapPin
} from 'lucide-react';
import { fetchClientContent, saveClientContent } from '@/lib/clientData';

export default function AdminEventsPage() {
  const [content, setContent] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const saveAll = async (newEvents: any[]) => {
    setSaving(true);
    setStatusMessage(null);

    const updated = { ...content, events: newEvents };
    setContent(updated);

    try {
      const res = await saveClientContent(updated);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Events schedule updated successfully!' });
        setEditingEvent(null);
        setIsNew(false);
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to save events' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error saving events.' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (evt: any) => {
    setEditingEvent({ ...evt });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingEvent({
      id: `evt-${Date.now()}`,
      title: 'New Workshop / Masterclass',
      date: 'Next Saturday',
      time: '10:30 AM – 1:30 PM IST',
      venue: 'In-Person (Hyderabad) & Live Zoom',
      modality: 'Hybrid',
      status: 'Registration Open',
      seats: 'Limited to 25 Seats',
      description: 'Masterclass syllabus outline and transformation points...',
      featured: true
    });
    setIsNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      const filtered = content.events.filter((e: any) => e.id !== id);
      saveAll(filtered);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    let newEvents = [...(content.events || [])];

    if (isNew) {
      newEvents.push(editingEvent);
    } else {
      newEvents = newEvents.map((e: any) => (e.id === editingEvent.id ? editingEvent : e));
    }

    saveAll(newEvents);
  };

  if (!content) return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading events manager...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Workshops & Events Manager ({content.events?.length || 0})
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Publish dates, timings, venue details, and registration status for upcoming masterclasses.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D5BDAF]" />
          <span>Add New Workshop</span>
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

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.events?.map((evt: any) => (
          <div
            key={evt.id}
            className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]">
                  {evt.modality}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(evt)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]"
                    title="Edit Event"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(evt.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                    title="Delete Event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif-luxury text-lg font-bold text-[#261E18]">
                {evt.title}
              </h3>

              <div className="space-y-1.5 text-xs text-[#4A3E35] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#D5BDAF]/40">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-[#8C7769]" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-[#8C7769]" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8C7769]" />
                  <span className="truncate text-[#6A5A4E]">{evt.venue}</span>
                </div>
              </div>

              <p className="text-xs text-[#6A5A4E] line-clamp-2">{evt.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-4 mb-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {isNew ? 'Create New Workshop' : `Edit Workshop`}
              </h3>
              <button
                onClick={() => setEditingEvent(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#7E6F64] hover:text-[#261E18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Workshop Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Date (e.g. Every Weekend / Sep 15)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Time (e.g. 10:30 AM – 1:30 PM IST)
                  </label>
                  <input
                    type="text"
                    required
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Modality
                  </label>
                  <select
                    value={editingEvent.modality}
                    onChange={(e) => setEditingEvent({ ...editingEvent, modality: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  >
                    <option value="Hybrid">Hybrid (In-Person & Online)</option>
                    <option value="Online">Online Zoom</option>
                    <option value="In-Person">In-Person (Hyderabad)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    value={editingEvent.status || 'Registration Open'}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Venue Description
                </label>
                <input
                  type="text"
                  value={editingEvent.venue}
                  onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Seats Info (e.g. 15 Seats Available)
                </label>
                <input
                  type="text"
                  value={editingEvent.seats || ''}
                  onChange={(e) => setEditingEvent({ ...editingEvent, seats: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Summary & Syllabus Details
                </label>
                <textarea
                  rows={3}
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#D5BDAF] text-[#4A3E35] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5]"
                >
                  {saving ? 'Saving...' : 'Save Workshop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
