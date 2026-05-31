"use client";

import Image from "next/image";
import { useState } from "react";

type ProfileAvatarProps = {
  src: string;
  alt: string;
  initials?: string;
};

export function ProfileAvatar({ src, alt, initials = "IP" }: ProfileAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="mx-auto shrink-0 sm:mx-0">
      {failed ? (
        <div className="border-brand-rose/50 bg-brand-blush/80 text-brand-copper dark:bg-brand-copper/20 dark:text-brand-blush flex h-28 w-28 items-center justify-center rounded-full border-2 text-xl font-semibold shadow-sm ring-4 ring-white sm:h-32 sm:w-32 dark:ring-zinc-900/80">
          {initials}
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          width={128}
          height={128}
          className="border-brand-rose/40 h-28 w-28 rounded-full border-2 object-cover object-center shadow-sm ring-4 ring-white sm:h-32 sm:w-32 dark:ring-zinc-900/80"
          priority
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
