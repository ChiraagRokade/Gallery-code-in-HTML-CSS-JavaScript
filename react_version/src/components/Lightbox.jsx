import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Play, Pause, ZoomIn, ZoomOut, Calendar, Tag, User } from 'lucide-react';

export default function Lightbox({
  image,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalImages
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prevImageId, setPrevImageId] = useState(image.id);

  if (image.id !== prevImageId) {
    setPrevImageId(image.id);
    setIsZoomed(false);
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Slideshow interval
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        onNext();
      }, 3000); // changes image every 3 seconds
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, onNext]);



  const toggleZoom = () => setIsZoomed(!isZoomed);
  const togglePlay = () => setIsPlaying(!isPlaying);

  // Trigger file download
  const handleDownload = (e) => {
    e.stopPropagation();
    // Simple download link trigger
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      id="lightbox-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md transition-all duration-300 animate-fade-in"
    >
      {/* Upper Control Bar (Header) */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="absolute top-0 inset-x-0 h-16 flex items-center justify-between px-6 bg-gradient-to-b from-black/60 to-transparent z-50"
      >
        {/* Title and Index */}
        <div className="text-white">
          <h2 className="text-sm font-semibold tracking-wide font-display truncate max-w-[200px] md:max-w-md">
            {image.title}
          </h2>
          <p className="text-[11px] text-slate-400">
            {currentIndex + 1} of {totalImages}
          </p>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-1 md:gap-3">
          {/* Autoplay Play/Pause */}
          <button
            id="lightbox-play-btn"
            onClick={togglePlay}
            title={isPlaying ? 'Pause Slideshow' : 'Start Slideshow'}
            className={`p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors ${
              isPlaying ? 'text-indigo-400 bg-white/5' : ''
            }`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>

          {/* Zoom Toggle */}
          <button
            id="lightbox-zoom-btn"
            onClick={toggleZoom}
            title={isZoomed ? 'Zoom Out' : 'Zoom In'}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
          </button>

          {/* Download */}
          <button
            id="lightbox-download-btn"
            onClick={handleDownload}
            title="Download Image"
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Download className="h-5 w-5" />
          </button>

          {/* Separator */}
          <span className="w-px h-5 bg-slate-800" />

          {/* Close */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            title="Close Lightbox (Esc)"
            className="p-2 rounded-full text-slate-300 hover:text-white bg-slate-900/60 hover:bg-rose-600/30 hover:text-rose-400 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        id="lightbox-prev-btn"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        title="Previous Image (ArrowLeft)"
        className="absolute left-4 z-40 p-3 rounded-full bg-slate-900/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/40 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        id="lightbox-next-btn"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        title="Next Image (ArrowRight)"
        className="absolute right-4 z-40 p-3 rounded-full bg-slate-900/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/40 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-full max-h-[80vh] px-4 md:px-16 flex items-center justify-center transition-all duration-300 select-none ${
          isZoomed ? 'scale-125 overflow-auto max-h-screen cursor-zoom-out' : 'cursor-zoom-in'
        }`}
        onClick={toggleZoom}
      >
        <img
          src={image.src}
          alt={image.title}
          className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 border border-slate-800/20"
        />
      </div>

      {/* Metadata Bottom Sheet (Fades in) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center text-center z-40"
      >
        <div className="max-w-2xl px-4 text-slate-300">
          <p className="text-xs md:text-sm font-medium text-slate-300 leading-relaxed font-sans mt-1">
            {image.description}
          </p>

          {/* Meta Badges */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 md:gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 px-3 py-1 rounded-full">
              <User className="h-3.5 w-3.5 text-indigo-400" />
              <span>By {image.photographer}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 px-3 py-1 rounded-full">
              <Tag className="h-3.5 w-3.5 text-indigo-400" />
              <span className="capitalize">{image.category}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-sm border border-slate-800/50 px-3 py-1 rounded-full">
              <Calendar className="h-3.5 w-3.5 text-indigo-400" />
              <span>Released {image.date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
