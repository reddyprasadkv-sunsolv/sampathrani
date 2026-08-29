'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  BookOpen,
  User,
  Compass,
  Briefcase
} from 'lucide-react';
import ImageUploader from '@/components/ImageUploader';
import { fetchClientContent, saveClientContent } from '@/lib/clientData';

export default function AdminPagesEditor() {
  const [content, setContent] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'biography' | 'spiritual' | 'worklife' | 'book'>('hero');
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchClientContent()
      .then((data) => setContent(data))
      .catch((err) => console.error('Error fetching content:', err));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await saveClientContent(content);
      if (res.success) {
        setStatusMessage({ type: 'success', text: res.message || 'Page content successfully saved & live!' });
      } else {
        setStatusMessage({ type: 'error', text: res.message || 'Failed to save changes.' });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Error saving content.' });
    } finally {
      setSaving(false);
    }
  };

  if (!content) {
    return <div className="py-20 text-center text-[#7E6F64] text-sm">Loading page content editor...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Header & Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#261E18]">
            Page Content Editor
          </h1>
          <p className="text-xs text-[#7E6F64] mt-1">
            Modify text, headlines, stats, images, and stories across the public pages.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-[#382F28] hover:bg-[#261E18] text-[#FAF8F5] shadow-lg shadow-[#382F28]/20 transition-all self-start sm:self-auto disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-[#D5BDAF]" />
          <span>{saving ? 'Saving Updates...' : 'Publish & Save Changes'}</span>
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
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {[
          { id: 'hero', label: '1. Home Hero & Stats', icon: Sparkles },
          { id: 'about', label: '2. About Intro & Quote', icon: User },
          { id: 'biography', label: '3. Official Biography', icon: User },
          { id: 'spiritual', label: '4. Spiritual Journey', icon: Compass },
          { id: 'worklife', label: '5. Past Work Life', icon: Briefcase },
          { id: 'book', label: '6. Best-Seller Book', icon: BookOpen }
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeSection === sec.id
                ? 'bg-[#382F28] text-[#FAF8F5] shadow-md'
                : 'bg-white text-[#4A3E35] hover:bg-[#F5EBE0] border border-[#D5BDAF]'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: HERO & STATS */}
      {/* ========================================================================= */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Home Hero Banner Settings
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Badge Headline
              </label>
              <input
                type="text"
                value={content.hero?.badge || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, badge: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <ImageUploader
                label="Hero Section Image / Portrait Photo"
                recommendedDimensions="800 × 1000 px (4:5 Portrait)"
                value={content.hero?.heroImage || ''}
                onChange={(url) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, heroImage: url }
                  })
                }
                aspectRatio="portrait"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Main Title
            </label>
            <input
              type="text"
              value={content.hero?.title || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Subtitle / Description
            </label>
            <textarea
              rows={3}
              value={content.hero?.subtitle || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, subtitle: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Primary Button Text
              </label>
              <input
                type="text"
                value={content.hero?.primaryCta || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, primaryCta: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Secondary Button Text
              </label>
              <input
                type="text"
                value={content.hero?.secondaryCta || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, secondaryCta: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          {/* Stats Editor */}
          <div className="pt-4 border-t border-[#EDEDE9] space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#382F28] tracking-wider">
              Animated Achievement Statistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {content.hero?.stats?.map((stat: any, sIdx: number) => (
                <div key={sIdx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#D5BDAF]/60 space-y-2">
                  <div>
                    <label className="block text-[10px] text-[#7E6F64] font-medium">Value (e.g. 1,247+)</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...content.hero.stats];
                        newStats[sIdx].value = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                      }}
                      className="w-full bg-white border border-[#D5BDAF] rounded-lg p-1.5 text-xs text-[#261E18]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#7E6F64] font-medium">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...content.hero.stats];
                        newStats[sIdx].label = e.target.value;
                        setContent({ ...content, hero: { ...content.hero, stats: newStats } });
                      }}
                      className="w-full bg-white border border-[#D5BDAF] rounded-lg p-1.5 text-xs text-[#261E18]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: ABOUT INTRO */}
      {/* ========================================================================= */}
      {activeSection === 'about' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Home About Summary & Quote
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Section Badge
              </label>
              <input
                type="text"
                value={content.aboutIntro?.badge || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    aboutIntro: { ...content.aboutIntro, badge: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <ImageUploader
                label="Featured Section Photo"
                recommendedDimensions="800 × 1000 px (4:5 Portrait)"
                value={content.aboutIntro?.image || ''}
                onChange={(url) =>
                  setContent({
                    ...content,
                    aboutIntro: { ...content.aboutIntro, image: url }
                  })
                }
                aspectRatio="portrait"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Heading Title
            </label>
            <input
              type="text"
              value={content.aboutIntro?.title || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutIntro: { ...content.aboutIntro, title: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Bio Paragraph 1
            </label>
            <textarea
              rows={3}
              value={content.aboutIntro?.paragraph1 || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutIntro: { ...content.aboutIntro, paragraph1: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Bio Paragraph 2
            </label>
            <textarea
              rows={3}
              value={content.aboutIntro?.paragraph2 || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutIntro: { ...content.aboutIntro, paragraph2: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Featured Spiritual Quote
            </label>
            <textarea
              rows={2}
              value={content.aboutIntro?.quote || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  aboutIntro: { ...content.aboutIntro, quote: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none italic"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: OFFICIAL BIOGRAPHY */}
      {/* ========================================================================= */}
      {activeSection === 'biography' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Official Biography & Academic Degrees
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={content.biography?.fullName || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    biography: { ...content.biography, fullName: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <ImageUploader
                label="Official Biography Portrait Photo"
                recommendedDimensions="800 × 1000 px (4:5 Portrait)"
                value={content.biography?.image || ''}
                onChange={(url) =>
                  setContent({
                    ...content,
                    biography: { ...content.biography, image: url }
                  })
                }
                aspectRatio="portrait"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
              Heading Title
            </label>
            <input
              type="text"
              value={content.biography?.heading || ''}
              onChange={(e) =>
                setContent({
                  ...content,
                  biography: { ...content.biography, heading: e.target.value }
                })
              }
              className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
            />
          </div>

          {/* Paragraphs */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#4A3E35]">
              Biography Paragraphs
            </label>
            {content.biography?.content?.map((para: string, pIdx: number) => (
              <div key={pIdx} className="flex gap-2 items-start">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const newContent = [...content.biography.content];
                    newContent[pIdx] = e.target.value;
                    setContent({
                      ...content,
                      biography: { ...content.biography, content: newContent }
                    });
                  }}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newContent = content.biography.content.filter((_: any, i: number) => i !== pIdx);
                    setContent({
                      ...content,
                      biography: { ...content.biography, content: newContent }
                    });
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newContent = [...(content.biography.content || []), 'New paragraph...'];
                setContent({
                  ...content,
                  biography: { ...content.biography, content: newContent }
                });
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#382F28] border border-[#D5BDAF]"
            >
              + Add Paragraph
            </button>
          </div>

          {/* Academic Degrees Array */}
          <div className="pt-4 border-t border-[#EDEDE9] space-y-3">
            <h4 className="text-xs uppercase font-bold text-[#382F28] tracking-wider">
              Academic Degrees & Certifications List
            </h4>
            <div className="space-y-2">
              {content.biography?.degrees?.map((deg: string, dIdx: number) => (
                <div key={dIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={deg}
                    onChange={(e) => {
                      const newDegrees = [...content.biography.degrees];
                      newDegrees[dIdx] = e.target.value;
                      setContent({
                        ...content,
                        biography: { ...content.biography, degrees: newDegrees }
                      });
                    }}
                    className="w-full bg-[#FAF8F5] border border-[#D5BDAF] rounded-xl p-2 text-xs text-[#261E18]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newDegrees = content.biography.degrees.filter((_: any, i: number) => i !== dIdx);
                      setContent({
                        ...content,
                        biography: { ...content.biography, degrees: newDegrees }
                      });
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                const newDegrees = [...(content.biography.degrees || []), 'New Degree / Certification'];
                setContent({
                  ...content,
                  biography: { ...content.biography, degrees: newDegrees }
                });
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#382F28] border border-[#D5BDAF]"
            >
              + Add Degree / Certification
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: SPIRITUAL JOURNEY */}
      {/* ========================================================================= */}
      {activeSection === 'spiritual' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Spiritual Journey Story (25 Years)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Title
              </label>
              <input
                type="text"
                value={content.spiritualJourney?.title || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    spiritualJourney: { ...content.spiritualJourney, title: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <ImageUploader
                label="Spiritual Journey Photo / Collage"
                recommendedDimensions="1200 × 675 px (16:9 Landscape)"
                value={content.spiritualJourney?.image || ''}
                onChange={(url) =>
                  setContent({
                    ...content,
                    spiritualJourney: { ...content.spiritualJourney, image: url }
                  })
                }
                aspectRatio="video"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#4A3E35]">
              Content Paragraphs
            </label>
            {content.spiritualJourney?.content?.map((para: string, pIdx: number) => (
              <div key={pIdx} className="flex gap-2 items-start">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const newContent = [...content.spiritualJourney.content];
                    newContent[pIdx] = e.target.value;
                    setContent({
                      ...content,
                      spiritualJourney: { ...content.spiritualJourney, content: newContent }
                    });
                  }}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newContent = content.spiritualJourney.content.filter((_: any, i: number) => i !== pIdx);
                    setContent({
                      ...content,
                      spiritualJourney: { ...content.spiritualJourney, content: newContent }
                    });
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newContent = [...(content.spiritualJourney.content || []), 'New reflection...'];
                setContent({
                  ...content,
                  spiritualJourney: { ...content.spiritualJourney, content: newContent }
                });
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#382F28] border border-[#D5BDAF]"
            >
              + Add Paragraph
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: PAST WORK LIFE */}
      {/* ========================================================================= */}
      {activeSection === 'worklife' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Past Work Life & Experience
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Title
              </label>
              <input
                type="text"
                value={content.pastWorkLife?.title || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    pastWorkLife: { ...content.pastWorkLife, title: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <ImageUploader
                label="Past Work Life Photo / Collage"
                recommendedDimensions="1200 × 675 px (16:9 Landscape)"
                value={content.pastWorkLife?.image || ''}
                onChange={(url) =>
                  setContent({
                    ...content,
                    pastWorkLife: { ...content.pastWorkLife, image: url }
                  })
                }
                aspectRatio="video"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#4A3E35]">
              Content Paragraphs
            </label>
            {content.pastWorkLife?.content?.map((para: string, pIdx: number) => (
              <div key={pIdx} className="flex gap-2 items-start">
                <textarea
                  rows={3}
                  value={para}
                  onChange={(e) => {
                    const newContent = [...content.pastWorkLife.content];
                    newContent[pIdx] = e.target.value;
                    setContent({
                      ...content,
                      pastWorkLife: { ...content.pastWorkLife, content: newContent }
                    });
                  }}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newContent = content.pastWorkLife.content.filter((_: any, i: number) => i !== pIdx);
                    setContent({
                      ...content,
                      pastWorkLife: { ...content.pastWorkLife, content: newContent }
                    });
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newContent = [...(content.pastWorkLife.content || []), 'New work life highlight...'];
                setContent({
                  ...content,
                  pastWorkLife: { ...content.pastWorkLife, content: newContent }
                });
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#382F28] border border-[#D5BDAF]"
            >
              + Add Paragraph
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 6: BEST-SELLER BOOK */}
      {/* ========================================================================= */}
      {activeSection === 'book' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D5BDAF]/60 shadow-sm space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#261E18] border-b border-[#EDEDE9] pb-3">
            Best-Seller Book Showcase
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Book Title
              </label>
              <input
                type="text"
                value={content.book?.title || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    book: { ...content.book, title: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Subtitle
              </label>
              <input
                type="text"
                value={content.book?.subtitle || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    book: { ...content.book, subtitle: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Amazon Purchase Link
              </label>
              <input
                type="text"
                value={content.book?.amazonUrl || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    book: { ...content.book, amazonUrl: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A3E35] mb-1">
                Flipkart Purchase Link
              </label>
              <input
                type="text"
                value={content.book?.flipkartUrl || ''}
                onChange={(e) =>
                  setContent({
                    ...content,
                    book: { ...content.book, flipkartUrl: e.target.value }
                  })
                }
                className="w-full bg-[#FAF8F5] border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2.5 text-xs text-[#261E18] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <ImageUploader
              label="Book Cover 3D Mockup / Front Cover"
              recommendedDimensions="600 × 850 px (3:4 Book Ratio)"
              value={content.book?.image || ''}
              onChange={(url) =>
                setContent({
                  ...content,
                  book: { ...content.book, image: url }
                })
              }
              aspectRatio="portrait"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#4A3E35]">
              Book Highlights / Chapter Features
            </label>
            {content.book?.highlights?.map((hl: string, hIdx: number) => (
              <div key={hIdx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={hl}
                  onChange={(e) => {
                    const newHighlights = [...content.book.highlights];
                    newHighlights[hIdx] = e.target.value;
                    setContent({
                      ...content,
                      book: { ...content.book, highlights: newHighlights }
                    });
                  }}
                  className="w-full bg-[#FAF8F5] border border-[#D5BDAF] rounded-xl p-2 text-xs text-[#261E18]"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newHighlights = content.book.highlights.filter((_: any, i: number) => i !== hIdx);
                    setContent({
                      ...content,
                      book: { ...content.book, highlights: newHighlights }
                    });
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const newHighlights = [...(content.book.highlights || []), 'New Book Chapter / Feature'];
                setContent({
                  ...content,
                  book: { ...content.book, highlights: newHighlights }
                });
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#F5EBE0] hover:bg-[#D5BDAF] text-[#382F28] border border-[#D5BDAF]"
            >
              + Add Highlight
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
