'use client';

import { Cryptocurrency } from '@/types/crypto';
import { 
  formatPrice, 
  formatMarketCap, 
  formatVolume, 
  formatPercentage, 
  formatSupply,
  getChangeColor
} from '@/utils/formatters';
import { TrendingUp, TrendingDown, Minus, DollarSign, BarChart3, Activity } from 'lucide-react';
import { cn } from '@/utils/cn';

interface CryptocurrencyCardProps {
  crypto: Cryptocurrency;
  rank: number;
}

export const CryptocurrencyCard = ({ crypto, rank }: CryptocurrencyCardProps) => {
  const usdQuote = crypto.quotes.find(q => q.name === 'USD');
  const btcQuote = crypto.quotes.find(q => q.name === 'BTC');
  
  if (!usdQuote) return null;

  const getChangeIcon = (percentage: number) => {
    if (percentage > 0) return <TrendingUp className="w-3 h-3" />;
    if (percentage < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  };

  const getRankColor = (rank: number) => {
    if (rank <= 3) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank <= 10) return 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
    return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300';
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={cn(
            'flex items-center justify-center min-w-10 min-h-10 rounded-full text-sm font-bold shadow-sm',
            getRankColor(rank)
          )}>
            {rank}
          </div>
          <div>
            <h3 className="line-clamp-1 font-bold text-gray-900 dark:text-white text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {crypto.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wider">
              {crypto.symbol}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {formatPrice(usdQuote.price)}
          </div>
          <div className={cn(
            'text-sm font-semibold flex items-center justify-end space-x-1 px-2 py-1 rounded-full',
            getChangeColor(usdQuote.percentChange24h),
            usdQuote.percentChange24h > 0 ? 'bg-green-50 dark:bg-green-900/20' : 
            usdQuote.percentChange24h < 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700'
          )}>
            {getChangeIcon(usdQuote.percentChange24h)}
            <span>{formatPercentage(usdQuote.percentChange24h)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Market Cap</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatMarketCap(usdQuote.marketCap)}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">24h Volume</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatVolume(usdQuote.volume24h)}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Circulating</span>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {formatSupply(crypto.circulatingSupply)}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Performance</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">7d Change</span>
            <span className={cn(
              'text-sm font-semibold flex items-center space-x-1 px-2 py-1 rounded-full',
              getChangeColor(usdQuote.percentChange7d),
              usdQuote.percentChange7d > 0 ? 'bg-green-50 dark:bg-green-900/20' : 
              usdQuote.percentChange7d < 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700'
            )}>
              {getChangeIcon(usdQuote.percentChange7d)}
              <span>{formatPercentage(usdQuote.percentChange7d)}</span>
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">30d Change</span>
            <span className={cn(
              'text-sm font-semibold flex items-center space-x-1 px-2 py-1 rounded-full',
              getChangeColor(usdQuote.percentChange30d),
              usdQuote.percentChange30d > 0 ? 'bg-green-50 dark:bg-green-900/20' : 
              usdQuote.percentChange30d < 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-gray-50 dark:bg-gray-700'
            )}>
              {getChangeIcon(usdQuote.percentChange30d)}
              <span>{formatPercentage(usdQuote.percentChange30d)}</span>
            </span>
          </div>
        </div>
      </div>

      {btcQuote && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Price in BTC</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {formatPrice(btcQuote.price, 'BTC')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};