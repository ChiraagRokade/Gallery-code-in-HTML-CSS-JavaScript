import { useState, useEffect } from 'react';
import { Sun, Moon, Image, Sparkles, Layers } from 'lucide-react';
import FilterBar from './components/FilterBar';
import ImageCard from './components/ImageCard';
import Lightbox from './components/Lightbox';

const IMAGES_DATA = [
  {
    id: 1,
    src: '/img/1.jpg',
    title: 'Ethereal Forest Canopy',
    description: 'A breathtaking shot capturing golden sunlight filtering through dense green forest leaves, highlighting nature\'s tranquil beauty.',
    category: 'Nature',
    tags: ['forest', 'sunlight', 'green', 'trees', 'peaceful'],
    photographer: 'Elena Rostova',
    date: '2026-03-12'
  },
  {
    id: 2,
    src: '/img/2.jpg',
    title: 'Minimalist Architecture',
    description: 'Clean geometry and sharp shadows outline a modern concrete structure, highlighting the elegance of minimalist urban design.',
    category: 'Architecture',
    tags: ['concrete', 'shadows', 'modern', 'lines', 'minimal'],
    photographer: 'Hiroshi Tanaka',
    date: '2026-04-18'
  },
  {
    id: 3,
    src: '/img/3.jpg',
    title: 'Symmetry in Motion',
    description: 'Symmetrical reflection of modern architectural framework against a glass façade, creating visual harmony and depth.',
    category: 'Architecture',
    tags: ['reflection', 'glass', 'structure', 'symmetry', 'pattern'],
    photographer: 'Sarah Jenkins',
    date: '2026-01-25'
  },
  {
    id: 4,
    src: '/img/4.jpg',
    title: 'Serene Mountain Peak',
    description: 'A crisp morning capture of snow-dusted mountain ridges contrasting against a soft, misty sky during sunrise.',
    category: 'Landscape',
    tags: ['mountain', 'snow', 'mist', 'morning', 'sky'],
    photographer: 'Marco Rossi',
    date: '2026-05-02'
  },
  {
    id: 5,
    src: '/img/5.jpg',
    title: 'Urban Convergence',
    description: 'The sweeping curve of glass and steel panels on a contemporary skyscraper facade converging toward the clouds.',
    category: 'Architecture',
    tags: ['skyscraper', 'steel', 'curve', 'urban', 'skyward'],
    photographer: 'David Miller',
    date: '2026-02-14'
  },
  {
    id: 6,
    src: '/img/6.jpg',
    title: 'Silent Reflection',
    description: 'A calm lake mirroring a minimalist wooden dock stretching out into smooth water during twilight.',
    category: 'Landscape',
    tags: ['lake', 'dock', 'minimal', 'reflection', 'calm', 'twilight'],
    photographer: 'Anya Vance',
    date: '2026-05-15'
  }
];

const CATEGORIES = ['All', 'Nature', 'Architecture', 'Landscape'];

export default function App() {
  const images = IMAGES_DATA;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [gridCols, setGridCols] = useState(3);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Sync theme to HTML element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Handle dark mode toggle
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Filter and Sort Images
  const getProcessedImages = () => {
    let result = [...images];

    // 1. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(img => img.category === selectedCategory);
    }

    // 2. Search query filter (title, description, tags, photographer)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        img =>
          img.title.toLowerCase().includes(q) ||
          img.description.toLowerCase().includes(q) ||
          img.photographer.toLowerCase().includes(q) ||
          img.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // 3. Sorting
    if (sortBy === 'alpha-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'alpha-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  };

  const processedImages = getProcessedImages();

  // Next/Prev Navigation inside Lightbox
  const handlePrevImage = () => {
    if (!selectedImage) return;
    const index = processedImages.findIndex(img => img.id === selectedImage.id);
    if (index === -1) return;
    const prevIndex = (index - 1 + processedImages.length) % processedImages.length;
    setSelectedImage(processedImages[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const index = processedImages.findIndex(img => img.id === selectedImage.id);
    if (index === -1) return;
    const nextIndex = (index + 1) % processedImages.length;
    setSelectedImage(processedImages[nextIndex]);
  };

  // Helper to map gridCols to CSS Tailwind grid-cols classes
  const getGridColsClass = () => {
    if (gridCols === 2) return 'grid-cols-1 md:grid-cols-2';
    if (gridCols === 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'; // Default 3 cols
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300 font-sans pb-16">
      
      {/* Premium Header */}
      <header className="relative overflow-hidden py-12 md:py-16 border-b border-slate-200/50 dark:border-slate-800/40 bg-white/40 dark:bg-slate-900/10 backdrop-blur-sm">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-indigo-500 to-violet-600 p-3 rounded-2xl shadow-lg shadow-indigo-500/20 text-white animate-pulse">
              <Image className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight font-display bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-white dark:to-indigo-200 bg-clip-text text-transparent">
                Immersive Media Portfolio
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5 font-medium">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                Tailwind CSS v4.0 & React Interactive Showcase
              </p>
            </div>
          </div>

          {/* Theme toggler */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:bg-slate-100 dark:hover:bg-slate-850 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm font-semibold cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4.5 w-4.5 text-amber-500 animate-spin-slow" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4.5 w-4.5 text-indigo-600" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* Filter Toolbar */}
        <FilterBar
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          gridCols={gridCols}
          setGridCols={setGridCols}
        />

        {/* Gallery Grid */}
        <div className="mt-8">
          {processedImages.length > 0 ? (
            <div className={`grid gap-6 md:gap-8 ${getGridColsClass()}`}>
              {processedImages.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onSelect={setSelectedImage}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-white/40 dark:bg-slate-900/20 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl backdrop-blur-sm">
              <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-900/60 text-slate-400 mb-4">
                <Layers className="h-10 w-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-display">No Assets Found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                We couldn't find matches for "{searchQuery}". Try modifying your keywords or filters.
              </p>
              <button
                id="reset-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('default');
                }}
                className="mt-6 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 active:scale-95 transition-all"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Conditional Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          images={processedImages}
          onClose={() => setSelectedImage(null)}
          onPrev={handlePrevImage}
          onNext={handleNextImage}
          currentIndex={processedImages.findIndex(img => img.id === selectedImage.id)}
          totalImages={processedImages.length}
        />
      )}
    </div>
  );
}
