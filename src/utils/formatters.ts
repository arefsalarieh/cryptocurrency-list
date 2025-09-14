export const formatPrice = (price: number, currency: string = 'USD'): string => {
  if (price === 0) return '$0.00';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: price < 1 ? 8 : 2,
  });
  
  return formatter.format(price);
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap === 0) return '$0';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  
  return formatter.format(marketCap);
};

export const formatVolume = (volume: number): string => {
  if (volume === 0) return '$0';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  
  return formatter.format(volume);
};

export const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};

export const formatSupply = (supply: number): string => {
  if (supply === 0) return '0';
  
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  });
  
  return formatter.format(supply);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getChangeColor = (percentage: number): string => {
  if (percentage > 0) return 'text-green-600 dark:text-green-400';
  if (percentage < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-600 dark:text-gray-400';
};

export const getChangeBgColor = (percentage: number): string => {
  if (percentage > 0) return 'bg-green-100 dark:bg-green-900/20';
  if (percentage < 0) return 'bg-red-100 dark:bg-red-900/20';
  return 'bg-gray-100 dark:bg-gray-800';
};
