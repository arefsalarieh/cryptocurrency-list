import { useEffect, useCallback } from 'react';
import { useCryptoStore } from '@/store/cryptoStore';
import { indexedDBService } from '@/services/indexedDB';

const fetchFromApi = async (page: number = 1, limit: number = 10) => {
  const response = await fetch(`/api/crypto?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'API request failed');
  }
  return result.data;
};

export const useCryptoData = () => {
  const {
    cryptocurrencies,
    loading,
    error,
    pagination,
    lastUpdated,
    setCryptocurrencies,
    setLoading,
    setError,
    setPagination,
    addCryptocurrencies,
    setLastUpdated,
  } = useCryptoStore();

  const loadInitialData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const isStale = await indexedDBService.isDataStale(5);
      
      if (isStale) {
        const freshData = await fetchFromApi(1, 10);
        await indexedDBService.saveCryptocurrencies(freshData);
        setCryptocurrencies(freshData);
        setLastUpdated(new Date().toISOString());
      } else {
        const storedData = await indexedDBService.getCryptocurrencies(10, 0);
        if (storedData.length > 0) {
          setCryptocurrencies(storedData);
        } else {
          const freshData = await fetchFromApi(1, 10);
          await indexedDBService.saveCryptocurrencies(freshData);
          setCryptocurrencies(freshData);
          setLastUpdated(new Date().toISOString());
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Error loading initial data:', err);
    } finally {
      setLoading(false);
    }
  }, [setCryptocurrencies, setLoading, setError, setLastUpdated]);

  const loadMoreData = useCallback(async () => {
    if (loading || !pagination.hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const nextPage = pagination.currentPage + 1;
      const startIndex = (nextPage - 1) * pagination.itemsPerPage;
      
      const storedData = await indexedDBService.getCryptocurrencies(
        pagination.itemsPerPage,
        startIndex
      );

      if (storedData.length > 0) {
        addCryptocurrencies(storedData);
        setPagination({ currentPage: nextPage });
      } else {
        const freshData = await fetchFromApi(nextPage, pagination.itemsPerPage);
        
        if (freshData.length > 0) {
          addCryptocurrencies(freshData);
          setPagination({ currentPage: nextPage });
          
          const allData = [...cryptocurrencies, ...freshData];
          await indexedDBService.saveCryptocurrencies(allData);
        } else {
          setPagination({ hasMore: false });
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more data';
      setError(errorMessage);
      console.error('Error loading more data:', err);
    } finally {
      setLoading(false);
    }
  }, [
    loading,
    pagination,
    cryptocurrencies,
    addCryptocurrencies,
    setLoading,
    setError,
    setPagination,
  ]);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const freshData = await fetchFromApi(1, 10);
      await indexedDBService.saveCryptocurrencies(freshData);
      setCryptocurrencies(freshData);
      setLastUpdated(new Date().toISOString());
      setPagination({ currentPage: 1, hasMore: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh data';
      setError(errorMessage);
      console.error('Error refreshing data:', err);
    } finally {
      setLoading(false);
    }
  }, [setCryptocurrencies, setLoading, setError, setLastUpdated, setPagination]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        refreshData();
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [loading, refreshData]);

  return {
    cryptocurrencies,
    loading,
    error,
    pagination,
    lastUpdated,
    loadInitialData,
    loadMoreData,
    refreshData,
  };
};
