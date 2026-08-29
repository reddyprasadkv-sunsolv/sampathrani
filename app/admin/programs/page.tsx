'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Save,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { fetchClientContent, saveClientContent } from '@/lib/clientData';

export default function AdminProgramsPage() {
  const [content, setContent] = useState<any>(null);
  const [editingProgram, setEditingProgram] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error loading content:', err));
  }, []);

  const saveAll = async (newPrograms: any[]) => {
    setSaving(true);
    setStatusMessage(null);

    const updated = { ...content, programs: newPrograms };
    setContent(updated);

    try {
      const res = await saveClientContent(updated);
      if (res.success) {
        setStatusMessage({ type: 'success', text: 'Programs updated successfully!' });
        setEditingProgram(null);
        setIsNew(false);
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to save programs' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error saving programs.' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (prog: any) => {
    setEditingProgram({ ...prog });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingProgram({
      id: `prog-${Date.now()}`,
      title: 'New Empowerment Program',
      slug: `program-${Date.now()}`,
      tagline: 'Empowering Tagline Here',
      description: 'Detailed description of this empowerment curriculum...',
      image: '/images/welcome.jpg',
      format: 'Zoom / In-Person (1 Hour / Session)',
      packages: ['1 Session', '3 Sessions', '12 Sessions'],
      features: ['Personalized weekly exercises', 'Direct mentorship with Dr. Sampath Rani'],
      featured: true
    });
    setIsNew(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this program?')) {
      const filtered = content.programs.filter((p: any) => p.id !== id);
      saveAll(filtered);
    }
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    let newPrograms = [...(content.programs || [])];

    if (isNew) {
      newPrograms.push(editingProgram);
    } else {
      newPrograms = newPrograms.map((p: any) => (p.id === editingProgram.id ? editingProgram : p));
    }

    saveAll(newPrograms);
  };

  if (!content) return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading programs manager...</div>;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Programs Manager ({content.programs?.length || 0})
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Create, edit, or remove the signature empowerment programs & session tiers.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#D5BDAF]" />
          <span>Add New Program</span>
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

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {content.programs?.map((prog: any) => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl p-6 border border-[#D5BDAF]/60 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]">
                  {prog.format}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(prog)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]"
                    title="Edit Program"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prog.id)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                    title="Delete Program"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {prog.title}
              </h3>
              <p className="text-xs text-[#8C7769] font-semibold">{prog.tagline}</p>
              <p className="text-xs text-[#6A5A4E] line-clamp-2">{prog.description}</p>

              {/* Packages */}
              {prog.packages && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {prog.packages.map((pkg: string, pIdx: number) => (
                    <span key={pIdx} className="text-[10px] bg-[#FAF8F5] border border-[#D5BDAF]/60 px-2 py-0.5 rounded text-[#4A3E35] font-medium">
                      {pkg}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#261E18]/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF] shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#EDEDE9] pb-4 mb-6">
              <h3 className="font-serif-luxury text-xl font-bold text-[#261E18]">
                {isNew ? 'Create New Program' : `Edit: ${editingProgram.title}`}
              </h3>
              <button
                onClick={() => setEditingProgram(null)}
                className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-[#7E6F64] hover:text-[#261E18]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Program Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProgram.title}
                    onChange={(e) => setEditingProgram({ ...editingProgram, title: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Slug ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProgram.id}
                    onChange={(e) => setEditingProgram({ ...editingProgram, id: e.target.value, slug: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingProgram.tagline || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, tagline: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                    Format (e.g. Zoom / In-Person)
                  </label>
                  <input
                    type="text"
                    value={editingProgram.format || ''}
                    onChange={(e) => setEditingProgram({ ...editingProgram, format: e.target.value })}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ImageUploader
                  label="Program Card Cover Image"
                  recommendedDimensions="800 × 500 px (16:10 Ratio)"
                  value={editingProgram.image || ''}
                  onChange={(url) => setEditingProgram({ ...editingProgram, image: url })}
                  aspectRatio="video"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Full Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProgram.description}
                  onChange={(e) => setEditingProgram({ ...editingProgram, description: e.target.value })}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Packages (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProgram.packages?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      packages: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="1 Session, 3 Sessions, 12 Sessions"
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                  Curriculum Highlights (comma separated)
                </label>
                <input
                  type="text"
                  value={editingProgram.features?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProgram({
                      ...editingProgram,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Deep root-cause scan, Weekly milestone reviews"
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingProgram(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold border border-[#D5BDAF] text-[#4A3E35] hover:bg-[#FAF8F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5]"
                >
                  {saving ? 'Saving...' : 'Save Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
