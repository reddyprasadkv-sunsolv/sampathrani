'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Video,
  BookOpen,
  Play
} from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [content, setContent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'videos' | 'written'>('videos');
  const [editingVideo, setEditingVideo] = useState<any | null>(null);
  const [editingWritten, setEditingWritten] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const saveAll = async (newTestimonials: any) => {
    setSaving(true);
    setStatusMessage(null);

    const updated = { ...content, testimonials: newTestimonials };
    setContent(updated);

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: 'Testimonials updated successfully!' });
        setEditingVideo(null);
        setEditingWritten(null);
        setIsNew(false);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to save testimonials' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Server connection error' });
    } finally {
      setSaving(false);
    }
  };

  // Video Handlers
  const handleAddVideo = () => {
    setEditingVideo({
      id: `v-${Date.now()}`,
      youtubeId: '',
      title: 'New Client Video Transformation Story',
      speaker: 'Workshop Graduate',
      tag: 'Life Coaching'
    });
    setIsNew(true);
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Delete this video testimonial?')) {
      const filtered = content.testimonials.videos.filter((v: any) => v.id !== id);
      saveAll({ ...content.testimonials, videos: filtered });
    }
  };

  const handleSaveVideoModal = (e: React.FormEvent) => {
    e.preventDefault();
    let newVideos = [...(content.testimonials?.videos || [])];
    if (isNew) {
      newVideos.unshift(editingVideo);
    } else {
      newVideos = newVideos.map((v: any) => (v.id === editingVideo.id ? editingVideo : v));
    }
    saveAll({ ...content.testimonials, videos: newVideos });
  };

  // Written Handlers
  const handleAddWritten = () => {
    setEditingWritten({
      id: `w-${Date.now()}`,
      name: 'Client / Reviewer Name',
      designation: 'Profession, City',
      rating: 5,
      review: 'Inspirational review text about personal growth and transformation...',
      program: 'Holistic Life Coaching'
    });
    setIsNew(true);
  };

  const handleDeleteWritten = (id: string) => {
    if (confirm('Delete this written review?')) {
      const filtered = content.testimonials.written.filter((w: any) => w.id !== id);
      saveAll({ ...content.testimonials, written: filtered });
    }
  };

  const handleSaveWrittenModal = (e: React.FormEvent) => {
    e.preventDefault();
    let newWritten = [...(content.testimonials?.written || [])];
    if (isNew) {
      newWritten.unshift(editingWritten);
    } else {
      newWritten = newWritten.map((w: any) => (w.id === editingWritten.id ? editingWritten : w));
    }
    saveAll({ ...content.testimonials, written: newWritten });
  };

  if (!content) return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading testimonials manager...</div>;

  const videos = content.testimonials?.videos || [];
  const written = content.testimonials?.written || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Testimonials & Reviews Manager
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Manage YouTube video reviews and written reviews from graduates and scholars.
          </p>
        </div>

        {activeTab === 'videos' ? (
          <button
            onClick={handleAddVideo}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D5BDAF]" />
            <span>Add Video Review</span>
          </button>
        ) : (
          <button
            onClick={handleAddWritten}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 text-[#D5BDAF]" />
            <span>Add Written Review</span>
          </button>
        )}
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

      {/* Tabs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'videos'
              ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
              : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
          }`}
        >
          Video Reviews ({videos.length})
        </button>
        <button
          onClick={() => setActiveTab('written')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
            activeTab === 'written'
              ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
              : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
          }`}
        >
          Written & Book Reviews ({written.length})
        </button>
      </div>

      {/* Videos Grid */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((vid: any) => (
            <div
              key={vid.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-[#EDEDE9]">
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]">
                    {vid.tag}
                  </span>
                  <h4 className="font-serif-luxury font-bold text-[#261E18] text-sm mt-2">
                    {vid.title}
                  </h4>
                  <p className="text-xs text-[#7E6F64]">By {vid.speaker}</p>
                  <p className="text-[11px] text-[#8C7769] font-mono mt-1">
                    YouTube ID: {vid.youtubeId}
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-[#EDEDE9]">
                  <button
                    onClick={() => {
                      setEditingVideo({ ...vid });
                      setIsNew(false);
                    }}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]"
                    title="Edit Video"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteVideo(vid.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                    title="Delete Video"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Written Grid */}
      {activeTab === 'written' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {written.map((w: any) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-[#B89986]">
                    {[...Array(w.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B89986] text-[#B89986]" />
                    ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingWritten({ ...w });
                        setIsNew(false);
                      }}
                      className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]"
                      title="Edit Review"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteWritten(w.id)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#4A3E35] italic leading-relaxed">
                  &quot;{w.review}&quot;
                </p>

                <div className="pt-2">
                  <div className="font-serif-luxury font-bold text-[#261E18] text-sm">
                    {w.name}
                  </div>
                  <div className="text-[11px] text-[#8C7769] font-medium">{w.designation}</div>
                  {w.program && <div className="text-[10px] text-[#7E6F64]">{w.program}</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Video Modal */}
      {editingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-4 mb-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {isNew ? 'Add Video Testimonial' : 'Edit Video Testimonial'}
              </h3>
              <button
                onClick={() => setEditingVideo(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#7E6F64] hover:text-[#261E18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideoModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  YouTube Video ID * (e.g. jA18NqHqg40)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. jA18NqHqg40"
                  value={editingVideo.youtubeId}
                  onChange={(e) => setEditingVideo({ ...editingVideo, youtubeId: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingVideo.title}
                  onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Speaker / Client Name
                  </label>
                  <input
                    type="text"
                    value={editingVideo.speaker}
                    onChange={(e) => setEditingVideo({ ...editingVideo, speaker: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Tag / Category
                  </label>
                  <input
                    type="text"
                    value={editingVideo.tag}
                    onChange={(e) => setEditingVideo({ ...editingVideo, tag: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingVideo(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#D5BDAF] text-[#4A3E35] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5]"
                >
                  {saving ? 'Saving...' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Written Modal */}
      {editingWritten && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-4 mb-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {isNew ? 'Add Written Review' : 'Edit Written Review'}
              </h3>
              <button
                onClick={() => setEditingWritten(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#7E6F64] hover:text-[#261E18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWrittenModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingWritten.name}
                    onChange={(e) => setEditingWritten({ ...editingWritten, name: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Designation / Location
                  </label>
                  <input
                    type="text"
                    value={editingWritten.designation}
                    onChange={(e) => setEditingWritten({ ...editingWritten, designation: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Program Attended
                </label>
                <input
                  type="text"
                  value={editingWritten.program || ''}
                  onChange={(e) => setEditingWritten({ ...editingWritten, program: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Star Rating (1-5)
                </label>
                <select
                  value={editingWritten.rating}
                  onChange={(e) => setEditingWritten({ ...editingWritten, rating: Number(e.target.value) })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Testimonial / Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingWritten.review}
                  onChange={(e) => setEditingWritten({ ...editingWritten, review: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingWritten(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#D5BDAF] text-[#4A3E35] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5]"
                >
                  {saving ? 'Saving...' : 'Save Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
