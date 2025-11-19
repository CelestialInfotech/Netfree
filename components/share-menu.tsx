"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, Facebook, Send, MessageSquare, Instagram } from "lucide-react";

export default function ShareMenu({
  movieId,
  onClose,
}: {
  movieId: string;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/movie/${movieId}`
      : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    onClose();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute top-12 right-0 w-56 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl p-3 z-50 border border-gray-800 animate-fadeIn"
    >
      {/* Copy Link */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-3 text-white py-2 hover:bg-white/10 rounded-lg"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? "Copied!" : "Copy Link"}
      </button>

      {/* WhatsApp */}
      <a
        onClick={onClose}
        href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        className="w-full flex items-center gap-3 text-white py-2 hover:bg-white/10 rounded-lg"
      >
        <MessageSquare size={18} className="text-green-400" />
        WhatsApp
      </a>

      {/* Facebook */}
      <a
        onClick={onClose}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        className="w-full flex items-center gap-3 text-white py-2 hover:bg-white/10 rounded-lg"
      >
        <Facebook size={18} className="text-blue-500" />
        Facebook
      </a>

      {/* Telegram */}
      <a
        onClick={onClose}
        href={`https://t.me/share/url?url=${encodeURIComponent(
          shareUrl
        )}&text=Watch this movie!`}
        target="_blank"
        className="w-full flex items-center gap-3 text-white py-2 hover:bg-white/10 rounded-lg"
      >
        <Send size={18} className="text-sky-400" />
        Telegram
      </a>

      {/* Instagram (Copy Link) */}
      <button
        onClick={handleCopy}
        className="w-full flex items-center gap-3 text-white py-2 hover:bg-white/10 rounded-lg"
      >
        <Instagram size={18} className="text-pink-500" />
        Instagram (Copy Link)
      </button>
    </div>
  );
}
