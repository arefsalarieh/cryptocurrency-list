import { CryptocurrencyList } from '@/components/CryptocurrencyList';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cryptocurrency Markets
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Real-time cryptocurrency prices and market data with offline support
            </p>
          </div>
          
          <ErrorBoundary>
            <CryptocurrencyList />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
