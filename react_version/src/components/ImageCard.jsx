import { Maximize2, Calendar, User } from 'lucide-react';

export default function ImageCard({ image, onSelect }) {
  return (
    <div
      id={`image-card-${image.id}`}
      onClick={() => onSelect(image)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/50 dark:border-slate-800/30 bg-slate-100 dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
    >
      {/* Aspect Ratio Box with zoom-effect on image */}
      <div className="relative aspect-square overflow-hidden bg-slate-200 dark:bg-slate-950">
        <img
          src={image.src}
          alt={image.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Shadow Overlay - fades in on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Hover Actions (Center Maximize Icon) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100">
          <div className="bg-white/20 dark:bg-slate-900/30 backdrop-blur-md border border-white/30 p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform duration-300">
            <Maximize2 className="h-6 w-6" />
          </div>
        </div>

        {/* Tag Pill (Top Left) */}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-white/80 dark:bg-slate-950/80 backdrop-blur-md text-slate-800 dark:text-slate-200 rounded-full border border-white/20 shadow-sm transition-transform duration-300 group-hover:scale-105">
          {image.category}
        </span>
      </div>

      {/* Info Card Body */}
      <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40 relative z-10 transition-colors duration-300">
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-display line-clamp-1">
          {image.title}
        </h3>
        
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
          {image.description}
        </p>

        {/* Faint footer elements */}
        <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100/80 dark:border-slate-800/20">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="truncate max-w-[80px]">{image.photographer}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{image.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
