import { useState } from "react";

export default function ImageFrame({ src, alt, className = "" }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className={`overflow-hidden bg-[#102b43] ${className}`}>
      {!unavailable && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
