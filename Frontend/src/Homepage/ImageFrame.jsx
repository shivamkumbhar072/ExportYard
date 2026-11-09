import { useState } from "react";

export default function ImageFrame({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority,
}) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className={`overflow-hidden bg-[#183F35] ${className}`}>
      {!unavailable && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          className="h-full w-full object-cover"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
