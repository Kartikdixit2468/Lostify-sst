import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Electronics', 'ID Cards', 'Books', 'Accessories', 'Wallets', 'Others'];
const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'resolved', label: 'Resolved' }
];

export default function FilterPanel({ filters, onFilterChange, onClear, isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const FilterContent = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Type</label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
          className="input-field"
        >
          <option value="all">All</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Category</label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="input-field"
        >
          {categories.map(cat => (
            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Location</label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onFilterChange('location', e.target.value)}
          placeholder="Enter location..."
          className="input-field"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Date Range</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => onFilterChange('dateFrom', e.target.value)}
            className="input-field text-sm"
            placeholder="From"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => onFilterChange('dateTo', e.target.value)}
            className="input-field text-sm"
            placeholder="To"
          />
        </div>
      </div>

      {isAdmin && (
        <>
          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFilterChange('status', e.target.value)}
              className="input-field"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">User</label>
            <input
              type="text"
              value={filters.user}
              onChange={(e) => onFilterChange('user', e.target.value)}
              placeholder="Email or name..."
              className="input-field"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-charcoal dark:text-white">
              <input
                type="checkbox"
                checked={filters.hasImage}
                onChange={(e) => onFilterChange('hasImage', e.target.checked)}
                className="w-4 h-4 rounded text-accent focus:ring-accent"
              />
              Has Image
            </label>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-charcoal dark:text-white mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange('sortBy', e.target.value)}
          className="input-field"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClear}
        className="btn-secondary w-full"
      >
        Clear Filters
      </motion.button>
    </motion.div>
  );

  if (isMobile) {
    return (
      <div className="mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters {isOpen ? '▲' : '▼'}
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="card mt-4 p-4 overflow-hidden"
            >
              <FilterContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="card p-4 sticky top-4 h-fit">
      <h3 className="text-lg font-heading font-bold text-charcoal dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </h3>
      <FilterContent />
    </div>
  );
}
