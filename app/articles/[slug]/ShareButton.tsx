"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button
      variant="outline"
      className="gap-2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4" />
      {copied ? "Link Copied!" : "Share"}
    </Button>
  );
}
