import React from "react";
import Image from "next/image";

interface PositionedImageProps {
  src: string;
  alt: string;
  caption?: string;
  alignment?: "left" | "right" | "center";
}

export default function PositionedImage({
  src,
  alt,
  caption,
  alignment = "center",
}: PositionedImageProps) {
  // Alignment-specific styles
  const alignmentStyles = {
    left: "float-left mr-6 mb-4 max-w-[45%] sm:max-w-[400px]",
    right: "float-right ml-6 mb-4 max-w-[45%] sm:max-w-[400px]",
    center: "mx-auto my-8 max-w-full",
  };

  const containerStyles = {
    left: "clear-none",
    right: "clear-none",
    center: "clear-both",
  };

  return (
    <figure
      className={`${containerStyles[alignment]} ${alignmentStyles[alignment]} rounded-xl overflow-hidden shadow-lg relative z-10`}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
        unoptimized={src.includes("ctfassets.net")}
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 italic px-3 py-2 bg-gray-50">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
