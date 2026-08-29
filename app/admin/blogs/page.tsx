'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Video,
  Calendar,
  Clock
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import defaultContent from '@/data/site-content.json';
import { fetchClientContent, saveClientContent } from '@/lib/clientData';
import { getImageUrl } from '@/lib/imageUtils';

export default function AdminBlogsPage() {
  const [content, setContent] = useState<any>(defaultContent);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const saveAll = async (newBlogs: any[]) => {
    setSaving(true);
    setStatusMessage(null);

    const updated = { ...content, blogs: newBlogs };
    setContent(updated);

    try {
      const res = await saveClientContent(updated);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Articles published successfully!' });
        setEditingBlog(null);
        setIsNew(false);
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to save articles' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error saving articles.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAddNew = () => {
    const title = 'New Wisdom Article';
    const slug = `article-${Date.now()}`;
    setEditingBlog({
      id: `b-${Date.now()}`,
      title,
      slug,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: 'Spiritual Growth',
      readTime: '4 min read',
      image: '/images/blog/transformation.jpeg',
      youtubeId: '',
      summary: 'Brief summary of the article...',
      content: 'Write the full article content here with rich metaphysical and coaching reflections...'
    });
    setIsNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      const filtered = content.blogs.filter((b: any) => b.id !== id);
      saveAll(filtered);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    let newBlogs = [...(content.blogs || [])];

    if (isNew) {
      newBlogs.unshift(editingBlog);
    } else {
      newBlogs = newBlogs.map((b: any) => (b.id === editingBlog.id ? editingBlog : b));
    }

    saveAll(newBlogs);
  };

  if (!content) return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading articles manager...</div>;

  const blogs = content.blogs || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Blog & Soul Videos Manager ({blogs.length})
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Publish articles, video reflections, and subconscious rewiring wisdom.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D5BDAF]" />
          <span>Write New Article</span>
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

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((b: any) => (
          <div
            key={b.id}
            className="bg-white rounded-3xl overflow-hidden border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] bg-[#EDEDE9]">
                <img
                  src={b.youtubeId ? `https://img.youtube.com/vi/${b.youtubeId}/hqdefault.jpg` : getImageUrl(b.image || '/images/abt3.jpg')}
                  alt={b.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-[#FAF8F5] text-[#261E18] border border-[#D5BDAF]">
                  {b.category}
                </span>
                {b.youtubeId && (
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-[#FAF8F5] flex items-center space-x-1">
                    <Video className="w-3 h-3 text-[#D5BDAF]" />
                    <span>Video</span>
                  </span>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center space-x-3 text-[11px] text-[#7E6F64] mb-2 font-medium">
                  <span>{b.date}</span>
                  {b.readTime && <span>• {b.readTime}</span>}
                </div>

                <h3 className="font-serif-luxury text-base font-bold text-[#261E18] line-clamp-2 mb-2">
                  {b.title}
                </h3>

                <p className="text-xs text-[#6A5A4E] line-clamp-2">
                  {b.summary || b.content}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-[#EDEDE9] mt-3 pt-3">
              <span className="text-[11px] text-[#7E6F64] font-mono">/blog/{b.slug}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingBlog({ ...b });
                    setIsNew(false);
                  }}
                  className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]"
                  title="Edit Article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                  title="Delete Article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-4 mb-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {isNew ? 'Create New Article' : 'Edit Article'}
              </h3>
              <button
                onClick={() => setEditingBlog(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#7E6F64] hover:text-[#261E18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      title: e.target.value,
                      slug: isNew
                        ? e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                        : editingBlog.slug
                    })
                  }
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Slug ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={editingBlog.category}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingBlog.readTime}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <ImageUploader
                  label="Article Cover Image"
                  recommendedDimensions="1200 × 675 px (16:9 Landscape)"
                  value={editingBlog.image || ''}
                  onChange={(url) => setEditingBlog({ ...editingBlog, image: url })}
                  aspectRatio="video"
                />

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    YouTube Video ID (Optional for Soul Video)
                  </label>
                  <input
                    type="text"
                    value={editingBlog.youtubeId || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, youtubeId: e.target.value })}
                    placeholder="e.g. 8PL_PbEKV9Q"
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingBlog.summary || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, summary: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Article Body (Separate paragraphs with blank lines) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={editingBlog.content}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-3 text-xs text-[#261E18] leading-relaxed font-mono"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#D5BDAF] text-[#4A3E35] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5]"
                >
                  {saving ? 'Publishing...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
