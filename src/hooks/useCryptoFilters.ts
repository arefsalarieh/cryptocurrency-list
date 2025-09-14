import { useMemo } from 'react';
import { Cryptocurrency } from '@/types/crypto';
import { FilterOptions } from '@/components/SearchFilter';

export const useCryptoFilters = (cryptocurrencies: Cryptocurrency[], filters: FilterOptions) => {
  return useMemo(() => {
    let filtered = [...cryptocurrencies];

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(crypto => 
        crypto.name.toLowerCase().includes(searchTerm) ||
        crypto.symbol.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.minMarketCap || filters.maxMarketCap) {
      filtered = filtered.filter(crypto => {
        const usdQuote = crypto.quotes.find(q => q.name === 'USD');
        if (!usdQuote) return false;
        
        const marketCap = usdQuote.marketCap;
        const min = filters.minMarketCap ? parseFloat(filters.minMarketCap) : 0;
        const max = filters.maxMarketCap ? parseFloat(filters.maxMarketCap) : Infinity;
        
        return marketCap >= min && marketCap <= max;
      });
    }

    if (filters.minVolume || filters.maxVolume) {
      filtered = filtered.filter(crypto => {
        const usdQuote = crypto.quotes.find(q => q.name === 'USD');
        if (!usdQuote) return false;
        
        const volume = usdQuote.volume24h;
        const min = filters.minVolume ? parseFloat(filters.minVolume) : 0;
        const max = filters.maxVolume ? parseFloat(filters.maxVolume) : Infinity;
        
        return volume >= min && volume <= max;
      });
    }

    if (filters.minChange || filters.maxChange) {
      filtered = filtered.filter(crypto => {
        const usdQuote = crypto.quotes.find(q => q.name === 'USD');
        if (!usdQuote) return false;
        
        const change = usdQuote.percentChange24h;
        const min = filters.minChange ? parseFloat(filters.minChange) : -Infinity;
        const max = filters.maxChange ? parseFloat(filters.maxChange) : Infinity;
        
        return change >= min && change <= max;
      });
    }

    if (filters.showOnlyGainers) {
      filtered = filtered.filter(crypto => {
        const usdQuote = crypto.quotes.find(q => q.name === 'USD');
        return usdQuote ? usdQuote.percentChange24h > 0 : false;
      });
    }

    if (filters.showOnlyLosers) {
      filtered = filtered.filter(crypto => {
        const usdQuote = crypto.quotes.find(q => q.name === 'USD');
        return usdQuote ? usdQuote.percentChange24h < 0 : false;
      });
    }

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case 'rank':
          aValue = a.cmcRank;
          bValue = b.cmcRank;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.quotes.find(q => q.name === 'USD')?.price || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.price || 0;
          break;
        case 'marketCap':
          aValue = a.quotes.find(q => q.name === 'USD')?.marketCap || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.marketCap || 0;
          break;
        case 'volume24h':
          aValue = a.quotes.find(q => q.name === 'USD')?.volume24h || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.volume24h || 0;
          break;
        case 'change24h':
          aValue = a.quotes.find(q => q.name === 'USD')?.percentChange24h || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.percentChange24h || 0;
          break;
        case 'change7d':
          aValue = a.quotes.find(q => q.name === 'USD')?.percentChange7d || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.percentChange7d || 0;
          break;
        case 'change30d':
          aValue = a.quotes.find(q => q.name === 'USD')?.percentChange30d || 0;
          bValue = b.quotes.find(q => q.name === 'USD')?.percentChange30d || 0;
          break;
        default:
          aValue = a.cmcRank;
          bValue = b.cmcRank;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [cryptocurrencies, filters]);
};
