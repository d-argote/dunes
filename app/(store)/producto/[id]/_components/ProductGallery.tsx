"use client";

import { useState } from "react";

interface Props {
  name: string;
  images: string[];
  videoUrl: string | null;
}

export default function ProductGallery({ name, images, videoUrl }: Props) {
  const allImages = images.filter(Boolean);
  // Slots: images first, then video if present
  const hasVideo = Boolean(videoUrl);
  const totalSlots = allImages.length + (hasVideo ? 1 : 0);

  // selectedIndex: 0..allImages.length-1 = image, allImages.length = video
  const [selected, setSelected] = useState(0);

  const isVideoSelected = hasVideo && selected === allImages.length;
  const selectedImage = !isVideoSelected ? allImages[selected] : null;

  // If no media at all, show fallback
  if (totalSlots === 0) {
    return (
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="w-full aspect-[4/5] bg-surface-container-low rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-8xl opacity-20">spa</span>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Main viewer */}
      <div className="relative overflow-hidden group rounded-xl">
        {isVideoSelected && videoUrl ? (
          // eslint-disable-next-line jsx-a11y/media-has-caption
          <video
            key={videoUrl}
            src={videoUrl}
            controls
            autoPlay
            className="w-full aspect-[4/5] object-contain bg-black rounded-xl"
          />
        ) : selectedImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={name}
            className="w-full aspect-[4/5] object-cover shadow-sm group-hover:scale-105 transition-transform duration-700 rounded-xl"
            src={selectedImage}
          />
        ) : (
          <div className="w-full aspect-[4/5] bg-surface-container-low rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-8xl opacity-20">spa</span>
          </div>
        )}
        {!isVideoSelected && (
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none rounded-xl" />
        )}
      </div>

      {/* Thumbnails */}
      {totalSlots > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {allImages.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className={`aspect-square rounded-lg overflow-hidden bg-surface-container-high transition-all ${
                selected === i
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:opacity-80"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`${name} — vista ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
          {hasVideo && (
            <button
              type="button"
              onClick={() => setSelected(allImages.length)}
              className={`aspect-square rounded-lg bg-surface-container-high flex items-center justify-center transition-all ${
                isVideoSelected
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:bg-surface-container-highest"
              }`}
            >
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
