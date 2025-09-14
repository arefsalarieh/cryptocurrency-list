"use client";

import { useEffect, useState } from "react";
import { useCryptoData } from "@/hooks/useCryptoData";
import { useCryptoFilters } from "@/hooks/useCryptoFilters";
import { CryptocurrencyCard } from "./CryptocurrencyCard";
import { Pagination } from "./Pagination";
import { SearchFilter, FilterOptions } from "./SearchFilter";
import { CryptocurrencyListSkeleton } from "./ui/Skeleton";
import { RefreshCw, AlertCircle } from "lucide-react";

export const CryptocurrencyList = () => {
  const {
    cryptocurrencies,
    loading,
    error,
    pagination,
    lastUpdated,
    loadInitialData,
    loadMoreData,
    refreshData,
  } = useCryptoData();

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

  const filteredCryptocurrencies = useCryptoFilters(cryptocurrencies, filters);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Error Loading Data
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4 max-w-md">
          {error}
        </p>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (loading && cryptocurrencies.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Top Cryptocurrencies
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
        <CryptocurrencyListSkeleton count={10} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Top Cryptocurrencies</h2>
            <p className="text-blue-100 text-lg">
              Real-time market data and performance metrics
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            {lastUpdated && (
              <div className="text-sm text-blue-100 bg-blue-500/30 px-3 py-2 rounded-lg">
                Last updated: {new Date(lastUpdated).toLocaleString()}
              </div>
            )}
            <button
              onClick={refreshData}
              disabled={loading}
              className="p-3 cursor-pointer bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <RefreshCw
                className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      <SearchFilter
        onFilterChange={setFilters}
        totalResults={filteredCryptocurrencies.length}
        isLoading={loading}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Market Cap
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $
                {filteredCryptocurrencies
                  .reduce((sum, crypto) => {
                    const usdQuote = crypto.quotes.find(
                      (q) => q.name === "USD"
                    );
                    return sum + (usdQuote?.marketCap || 0);
                  }, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                24h Volume
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                $
                {filteredCryptocurrencies
                  .reduce((sum, crypto) => {
                    const usdQuote = crypto.quotes.find(
                      (q) => q.name === "USD"
                    );
                    return sum + (usdQuote?.volume24h || 0);
                  }, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🪙</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Cryptos
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredCryptocurrencies.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCryptocurrencies.length > 0 ? (
            filteredCryptocurrencies.map((crypto, index) => (
              <CryptocurrencyCard
                key={crypto.id}
                crypto={crypto}
                rank={crypto.cmcRank || index + 1}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No cryptocurrencies found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                Try adjusting your search criteria or filters to find what you're looking for.
              </p>
            </div>
          )}
          {loading && cryptocurrencies.length > 0 && (
            <CryptocurrencyListSkeleton count={1} />
          )}
        </div>
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        hasMore={pagination.hasMore}
        loading={loading}
        onLoadMore={loadMoreData}
        onRefresh={refreshData}
        lastUpdated={lastUpdated}
      />

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredCryptocurrencies.length}
            </span>{" "}
            cryptocurrencies
            {pagination.totalItems > 0 && (
              <span>
                {" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {pagination.totalItems}
                </span>
              </span>
            )}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Data provided by CoinMarketCap • Updated every 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
};
