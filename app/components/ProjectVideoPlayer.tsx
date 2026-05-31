"use client";

type ProjectVideoPlayerProps = {
  src: string;
  title: string;
};

export function ProjectVideoPlayer({ src, title }: ProjectVideoPlayerProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="h-auto w-full rounded-lg bg-black"
        aria-label={title}
      />
    </div>
  );
}
