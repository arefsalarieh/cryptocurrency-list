import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CryptoStore, Cryptocurrency, PaginationState } from '@/types/crypto';

const initialPagination: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  hasMore: false,
};

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      cryptocurrencies: [],
      loading: false,
      error: null,
      pagination: initialPagination,
      lastUpdated: null,

      setCryptocurrencies: (cryptos: Cryptocurrency[]) => {
        set((state) => ({
          cryptocurrencies: cryptos,
          pagination: {
            ...state.pagination,
            totalItems: cryptos.length,
            hasMore: cryptos.length >= state.pagination.itemsPerPage,
          },
        }));
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setPagination: (paginationUpdate: Partial<PaginationState>) => {
        set((state) => ({
          pagination: {
            ...state.pagination,
            ...paginationUpdate,
          },
        }));
      },

      addCryptocurrencies: (cryptos: Cryptocurrency[]) => {
        set((state) => {
          const existingIds = new Set(state.cryptocurrencies.map(c => c.id));
          const newCryptos = cryptos.filter(c => !existingIds.has(c.id));
          
          return {
            cryptocurrencies: [...state.cryptocurrencies, ...newCryptos],
            pagination: {
              ...state.pagination,
              totalItems: state.cryptocurrencies.length + newCryptos.length,
              hasMore: newCryptos.length === state.pagination.itemsPerPage,
            },
          };
        });
      },

      setLastUpdated: (date: string) => {
        set({ lastUpdated: date });
      },

      reset: () => {
        set({
          cryptocurrencies: [],
          loading: false,
          error: null,
          pagination: initialPagination,
          lastUpdated: null,
        });
      },
    }),
    {
      name: 'crypto-store',
      partialize: (state) => ({
        cryptocurrencies: state.cryptocurrencies,
        lastUpdated: state.lastUpdated,
        pagination: state.pagination,
      }),
    }
  )
);
