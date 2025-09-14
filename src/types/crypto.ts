export interface CryptoQuote {
  name: string;
  price: number;
  volume24h: number;
  volume7d: number;
  volume30d: number;
  marketCap: number;
  selfReportedMarketCap: number;
  percentChange1h: number;
  percentChange24h: number;
  percentChange7d: number;
  percentChange30d: number;
  percentChange60d: number;
  percentChange90d: number;
  lastUpdated: string;
  fullyDilluttedMarketCap: number;
  marketCapByTotalSupply: number;
  dominance: number;
  turnover: number;
  ytdPriceChangePercentage: number;
  percentChange1y: number;
}

export interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmcRank: number;
  marketPairCount: number;
  circulatingSupply: number;
  selfReportedCirculatingSupply: number;
  totalSupply: number;
  maxSupply: number;
  ath: number;
  atl: number;
  high24h: number;
  low24h: number;
  isActive: number;
  lastUpdated: string;
  dateAdded: string;
  quotes: CryptoQuote[];
  isAudited: boolean;
  auditInfoList: unknown[];
  badges: number[];
}

export interface CryptoApiResponse {
  data: {
    cryptoCurrencyList: Cryptocurrency[];
    totalCount: string;
  };
  status: {
    timestamp: string;
    error_code: string;
    error_message: string;
    elapsed: string;
    credit_count: number;
  };
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  hasMore: boolean;
}

export interface CryptoStore {
  cryptocurrencies: Cryptocurrency[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  lastUpdated: string | null;
  
  setCryptocurrencies: (cryptos: Cryptocurrency[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (pagination: Partial<PaginationState>) => void;
  addCryptocurrencies: (cryptos: Cryptocurrency[]) => void;
  setLastUpdated: (date: string) => void;
  reset: () => void;
}
