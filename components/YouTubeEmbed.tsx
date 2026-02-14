"use client";

import { useState } from "react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
  description?: string;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export default function YouTubeEmbed({
  url,
  title,
  description,
}: YouTubeEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoId = extractVideoId(url);

  if (!videoId) {
    return (
      <div className="my-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600 font-medium">
          Invalid YouTube URL. Please check the video link.
        </p>
        <p className="text-sm text-red-500 mt-2">URL: {url}</p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="my-8">
      {/* Video Container with 16:9 Aspect Ratio */}
      <div className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="relative pb-[56.25%]">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {/* YouTube iframe */}
          <iframe
            src={embedUrl}
            title={title || "YouTube video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>

      {/* Video Title and Description */}
      {(title || description) && (
        <div className="mt-4 px-2">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-sm text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
