"use client";

import { useState } from "react";

export default function SocialShareButton({
  title,
  url,
  imageUrl,
  description,
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <i className="fa-brands fa-facebook-f"></i>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <i className="fa-brands fa-twitter"></i>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <i className="fa-brands fa-linkedin-in"></i>
      </a>
      <button
        onClick={handleCopy}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        {isCopied ? (
          <span>Copied!</span>
        ) : (
          <span>
            <i className="fa-solid fa-copy"></i> Copy Link
          </span>
        )}
      </button>
    </div>
  );
}