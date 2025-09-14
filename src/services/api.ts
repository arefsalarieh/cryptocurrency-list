import axios from 'axios';
import { CryptoApiResponse, Cryptocurrency } from '@/types/crypto';

const API_BASE_URL = 'https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing';

class CryptoApiService {
  private baseURL = API_BASE_URL;

  async fetchCryptocurrencies(
    start: number = 1,
    limit: number = 100,
    sortBy: string = 'rank',
    sortType: string = 'asc'
  ): Promise<Cryptocurrency[]> {
    try {
      const params = {
        start,
        limit,
        sortBy,
        sortType,
        convert: 'USD,BTC,ETH',
        cryptoType: 'all',
        tagType: 'all',
        audited: 'false',
        aux: 'ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap'
      };

      const response = await axios.get<CryptoApiResponse>(this.baseURL, {
        params,
        timeout: 10000,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CryptoApp/1.0'
        }
      });

      if (response.data.status.error_code !== '0') {
        throw new Error(response.data.status.error_message || 'API request failed');
      }

      return response.data.data.cryptoCurrencyList;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error('Request timeout - please check your internet connection');
        }
        if (error.response?.status === 429) {
          throw new Error('Rate limit exceeded - please try again later');
        }
        if (error.response && error.response.status >= 500) {
          throw new Error('Server error - please try again later');
        }
        throw new Error(`API Error: ${error.message}`);
      }
      throw new Error('Unknown error occurred while fetching data');
    }
  }

  async fetchTopCryptocurrencies(limit: number = 10): Promise<Cryptocurrency[]> {
    return this.fetchCryptocurrencies(1, limit, 'rank', 'asc');
  }

  async fetchCryptocurrenciesPage(page: number, limit: number = 50): Promise<Cryptocurrency[]> {
    const start = (page - 1) * limit + 1;
    return this.fetchCryptocurrencies(start, limit, 'rank', 'asc');
  }

  async fetchAllCryptocurrencies(): Promise<Cryptocurrency[]> {
    const allCryptos: Cryptocurrency[] = [];
    let page = 1;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      try {
        const cryptos = await this.fetchCryptocurrenciesPage(page, limit);
        if (cryptos.length === 0) {
          hasMore = false;
        } else {
          allCryptos.push(...cryptos);
          page++;
          
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error);
        hasMore = false;
      }
    }

    return allCryptos;
  }
}

export const cryptoApiService = new CryptoApiService();
