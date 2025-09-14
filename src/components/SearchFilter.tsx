'use client';

import { useState } from 'react';
import { Search, Filter, X, SortAsc, SortDesc } from 'lucide-react';
import { cn } from '@/utils/cn';

export type SortOption = 'rank' | 'name' | 'price' | 'marketCap' | 'volume24h' | 'change24h' | 'change7d' | 'change30d';
export type SortOrder = 'asc' | 'desc';

export interface FilterOptions {
  search: string;
  sortBy: SortOption;
  sortOrder: SortOrder;
  minMarketCap: string;
  maxMarketCap: string;
  minVolume: string;
  maxVolume: string;
  minChange: string;
  maxChange: string;
  showOnlyGainers: boolean;
  showOnlyLosers: boolean;
}

interface SearchFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  totalResults: number;
  isLoading?: boolean;
}

export const SearchFilter = ({ onFilterChange, totalResults, isLoading = false }: SearchFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    search: '',
    sortBy: 'rank',
    sortOrder: 'asc',
    minMarketCap: '',
    maxMarketCap: '',
    minVolume: '',
    maxVolume: '',
    minChange: '',
    maxChange: '',
    showOnlyGainers: false,
    showOnlyLosers: false,
  });

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: '',
      sortBy: 'rank',
      sortOrder: 'asc',
      minMarketCap: '',
      maxMarketCap: '',
      minVolume: '',
      maxVolume: '',
      minChange: '',
      maxChange: '',
      showOnlyGainers: false,
      showOnlyLosers: false,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.search || 
    filters.minMarketCap || filters.maxMarketCap ||
    filters.minVolume || filters.maxVolume ||
    filters.minChange || filters.maxChange ||
    filters.showOnlyGainers || filters.showOnlyLosers ||
    filters.sortBy !== 'rank' || filters.sortOrder !== 'asc';

  const sortOptions = [
    { value: 'rank', label: 'Rank' },
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'marketCap', label: 'Market Cap' },
    { value: 'volume24h', label: '24h Volume' },
    { value: 'change24h', label: '24h Change' },
    { value: 'change7d', label: '7d Change' },
    { value: 'change30d', label: '30d Change' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange('search', '')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value as SortOption)}
              className="px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  Sort by {option.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => handleFilterChange('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              title={`Sort ${filters.sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {filters.sortOrder === 'asc' ? (
                <SortAsc className="w-5 h-5" />
              ) : (
                <SortDesc className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "px-4 py-3 border rounded-lg transition-all flex items-center gap-2",
              isExpanded
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                : "border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
            )}
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Market Cap Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min (USD)"
                  value={filters.minMarketCap}
                  onChange={(e) => handleFilterChange('minMarketCap', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max (USD)"
                  value={filters.maxMarketCap}
                  onChange={(e) => handleFilterChange('maxMarketCap', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Volume Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min (USD)"
                  value={filters.minVolume}
                  onChange={(e) => handleFilterChange('minVolume', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max (USD)"
                  value={filters.maxVolume}
                  onChange={(e) => handleFilterChange('maxVolume', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Change Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min (%)"
                  value={filters.minChange}
                  onChange={(e) => handleFilterChange('minChange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max (%)"
                  value={filters.maxChange}
                  onChange={(e) => handleFilterChange('maxChange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Filters
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOnlyGainers}
                    onChange={(e) => handleFilterChange('showOnlyGainers', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Gainers Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.showOnlyLosers}
                    onChange={(e) => handleFilterChange('showOnlyLosers', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Losers Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          {isLoading ? 'Loading...' : `${totalResults} cryptocurrencies found`}
        </span>
        {hasActiveFilters && (
          <span className="text-blue-600 dark:text-blue-400">
            Filters active
          </span>
        )}
      </div>
    </div>
  );
};
