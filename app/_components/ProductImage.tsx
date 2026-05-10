"use client";

import { useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function ProductImage({ src, alt, className }: Props) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-6xl opacity-20">spa</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setBroken(true)}
    />
  );
}
