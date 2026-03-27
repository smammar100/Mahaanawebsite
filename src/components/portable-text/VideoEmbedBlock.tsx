"use client";

import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoEmbedValue {
  url?: string;
  title?: string;
  caption?: string;
  startTime?: number;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  return match?.[1] || null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] || null;
}

export function VideoEmbedBlock({ value }: { value: VideoEmbedValue }) {
  if (!value.url) return null;

  const youtubeId = getYouTubeId(value.url);
  const vimeoId = getVimeoId(value.url);
  const title = value.title || "Embedded video";
  const start = Number.isFinite(value.startTime) && (value.startTime || 0) > 0
    ? Math.floor(value.startTime as number)
    : 0;

  return (
    <figure className="my-10">
      <div className="aspect-video overflow-hidden rounded-xl border border-surface-stroke bg-black">
        {youtubeId ? (
          <LiteYouTubeEmbed
            id={youtubeId}
            title={title}
            params={start > 0 ? `start=${start}` : undefined}
            poster="hqdefault"
            activatedClass="lyt-activated"
            iframeClass="h-full w-full"
          />
        ) : vimeoId ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}${
              start > 0 ? `#t=${start}s` : ""
            }`}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            src={value.url}
            title={title}
            controls
            preload="metadata"
            className="h-full w-full"
          />
        )}
      </div>
      {value.caption ? (
        <figcaption className="mt-3 text-center text-body-sm text-text-tertiary">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
