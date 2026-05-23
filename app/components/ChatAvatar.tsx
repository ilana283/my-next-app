"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-12 w-12",
} as const;

const sizePixels = {
  sm: 32,
  md: 36,
  lg: 48,
} as const;

type ChatAvatarProps = {
  src: string | StaticImageData;
  alt: string;
  size?: keyof typeof sizeClasses;
  className?: string;
};

export function ChatAvatar({ src, alt, size = "md", className = "" }: ChatAvatarProps) {
  const [failed, setFailed] = useState(false);
  const dim = sizePixels[size];

  if (failed) {
    return (
      <div
        className={`${sizeClasses[size]} bg-brand-blush/80 text-brand-copper dark:bg-brand-copper/20 dark:text-brand-blush flex shrink-0 items-center justify-center rounded-full text-xs font-semibold ${className}`}
        aria-hidden
      >
        IP
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dim}
      height={dim}
      className={`${sizeClasses[size]} shrink-0 rounded-full object-cover object-center ring-2 ring-white dark:ring-zinc-950 ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
