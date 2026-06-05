import { Search, SlidersHorizontal, Grid2X2, Grid3X3, Grid } from 'lucide-react';

export default function FilterBar({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  gridCols,
  setGridCols
}) {
  return (
    <div className="w-full flex flex-col gap-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
      
      {/* Top Section: Search and Sorting */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-md group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </span>
          <input
            id="search-input"
            type="text"
            placeholder="Search by title, category, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        {/* Controls: Sorting and Grid Toggle */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          
          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-500" />
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <option value="default">Default Order</option>
              <option value="alpha-asc">Title: A - Z</option>
              <option value="alpha-desc">Title: Z - A</option>
              <option value="newest">Date: Newest</option>
              <option value="oldest">Date: Oldest</option>
            </select>
          </div>

          {/* Grid Layout Toggles */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <button
              id="grid-cols-2-btn"
              onClick={() => setGridCols(2)}
              title="2 Columns Grid"
              className={`p-1.5 rounded-lg transition-all ${
                gridCols === 2
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              id="grid-cols-3-btn"
              onClick={() => setGridCols(3)}
              title="3 Columns Grid"
              className={`p-1.5 rounded-lg transition-all ${
                gridCols === 3
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              id="grid-cols-4-btn"
              onClick={() => setGridCols(4)}
              title="4 Columns Grid"
              className={`p-1.5 rounded-lg transition-all ${
                gridCols === 4
                  ? 'bg-white dark:bg-slate-800 shadow-sm text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Section: Category Pills */}
      <div className="flex flex-wrap gap-2 items-center border-t border-slate-100 dark:border-slate-800/40 pt-4">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mr-2">Categories:</span>
        {categories.map((category) => (
          <button
            key={category}
            id={`category-${category.toLowerCase().replace(/\s+/g, '-')}-btn`}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-indigo-500 to-violet-500 border-indigo-500 text-white shadow-md shadow-indigo-500/20 scale-[1.03]'
                : 'bg-slate-50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
