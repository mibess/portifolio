
import { useState } from "react";

// If the video is missing or fails to load, it collapses gracefully and returns null.
export const ProjectVideoPreview = ({ videoUrl, title }: { videoUrl?: string; title: string }) => {
  const [videoError, setVideoError] = useState(false);

  if (!videoUrl || videoError) return null;

  return (
    <div className="mt-6 mb-6 w-full">
      
      <div className="relative aspect-video w-full      overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50 shadow-sm transition-all duration-300 group-hover:border-purple-300/40 group-hover:shadow-[0_4px_20px_rgba(188,19,254,0.04)]">
        {/* Liquid glass light reflections */}
        <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/10 to-white/20 opacity-30 z-10 pointer-events-none" />
        
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 ease-out group-hover:scale-[1.03] rounded-2xl"
          onError={() => setVideoError(true)}
          style={{ pointerEvents: "none" }}
        />
      </div>
    </div>
  );
};
