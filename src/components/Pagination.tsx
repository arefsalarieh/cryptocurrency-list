'use client';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  onRefresh?: () => void;
  lastUpdated?: string | null;
}

export const Pagination = ({
  currentPage,
  hasMore,
  loading,
  onLoadMore,
  onRefresh,
  lastUpdated,
}: PaginationProps) => {
  return (
    <nav
      className="flex flex-col items-center gap-4 py-8"
      aria-label="Pagination Navigation"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          disabled={loading || !onRefresh}
          className={cn(
            'inline-flex items-center px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-60 disabled:cursor-not-allowed',
            !onRefresh && 'hidden'
          )}
          aria-label="Refresh Data"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Refresh
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span>
        </span>
        <button
          onClick={onLoadMore}
          disabled={loading || !hasMore}
          className={cn(
            'inline-flex items-center px-3 py-2 rounded-md border border-blue-600 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
            !hasMore && 'hidden'
          )}
          aria-label="Next Page"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Loading...
            </>
          ) : (
            <>
              Show more
              <ChevronRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>
      {lastUpdated && (
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Last updated: {new Date(lastUpdated).toLocaleString()}
        </div>
      )}
      {!hasMore && currentPage > 1 && (
        <div className="flex items-center gap-2 mt-2 text-green-700 dark:text-green-300 text-sm">
          <span className="text-lg">✔</span>
          <span>All items loaded.</span>
        </div>
      )}
    </nav>
  );
};
