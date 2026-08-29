'use client';

import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Loader2, Link as LinkIcon, Info, Maximize2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  recommendedDimensions?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  className?: string;
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Image / Photo',
  recommendedDimensions,
  aspectRatio = 'auto',
  className = ''
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [currentDimensions, setCurrentDimensions] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        onChange(data.url);
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch (err: any) {
      setError('Upload connection error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setCurrentDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : 'aspect-video';

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div className="flex items-center space-x-2">
          <label className="block text-xs font-semibold text-[#4A3E35]">
            {label}
          </label>
          {recommendedDimensions && (
            <span className="inline-flex items-center space-x-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#F5EBE0] text-[#382F28] border border-[#D5BDAF]">
              <Info className="w-3 h-3 text-[#8C7769]" />
              <span>Recommended: {recommendedDimensions}</span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-[#7E6F64] hover:text-[#261E18] flex items-center space-x-1"
        >
          <LinkIcon className="w-3 h-3 text-[#8C7769]" />
          <span>{showUrlInput ? 'Hide URL text' : 'Paste Direct URL'}</span>
        </button>
      </div>

      {error && (
        <div className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px]">
          {error}
        </div>
      )}

      {/* Image Preview & Upload Dropzone */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Card */}
        {value ? (
          <div className="sm:col-span-5 relative group rounded-2xl overflow-hidden border border-[#D5BDAF] bg-[#FAF8F5] shadow-xs">
            <div className={`relative w-full ${aspectClass} max-h-40 bg-[#EDEDE9]`}>
              <img
                src={value}
                alt="Uploaded preview"
                onLoad={handleImageLoad}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/welcome.jpg';
                }}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                onChange('');
                setCurrentDimensions(null);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-[#261E18]/80 text-white hover:bg-red-600 transition-colors shadow-sm"
              title="Remove Image"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {currentDimensions && (
              <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-white flex items-center space-x-1">
                <Maximize2 className="w-2.5 h-2.5 text-[#D5BDAF]" />
                <span>{currentDimensions.width} × {currentDimensions.height} px</span>
              </div>
            )}
          </div>
        ) : (
          <div className="sm:col-span-5 rounded-2xl border border-dashed border-[#D5BDAF] bg-[#FAF8F5] p-4 text-center flex flex-col items-center justify-center min-h-[100px]">
            <ImageIcon className="w-6 h-6 text-[#8C7769] mb-1" />
            <span className="text-[11px] text-[#7E6F64]">No image selected</span>
            {recommendedDimensions && (
              <span className="text-[10px] text-[#8C7769] mt-0.5">Ideal: {recommendedDimensions}</span>
            )}
          </div>
        )}

        {/* Upload Action Box */}
        <div className="sm:col-span-7 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
            className="hidden"
          />

          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2.5 px-4 rounded-xl border border-[#D5BDAF] bg-white hover:bg-[#F5EBE0] text-[#261E18] font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-xs disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#8C7769]" />
                <span>Uploading from Computer...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-[#8C7769]" />
                <span>Upload Photo from Computer</span>
              </>
            )}
          </button>

          {showUrlInput && (
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or enter direct URL: /images/photo.jpg"
              className="w-full bg-white border border-[#D5BDAF] focus:border-[#382F28] rounded-xl p-2 text-xs text-[#261E18] placeholder-[#9E8E83] focus:outline-none"
            />
          )}

          <div className="flex flex-wrap items-center justify-between text-[10px] text-[#7E6F64] pt-0.5">
            <span>Supports JPG, PNG, WEBP, SVG (Max 10MB)</span>
            {recommendedDimensions && (
              <span className="font-semibold text-[#382F28]">Format: {recommendedDimensions}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
