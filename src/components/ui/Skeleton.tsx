import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={cn(
      'relative isolate overflow-hidden rounded-md bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700',
      'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent dark:before:via-white/10',
      className
    )}
    aria-busy="true"
    {...props}
  />
);

export const CryptocurrencyCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm w-fit">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="h-8 w-40 mb-2" />
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
      ))}
    </div>

    <div className="space-y-3">
      <Skeleton className="h-4 w-24 mb-3" />
      <div className="grid grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-7 w-24 rounded-full" />
          </div>
        ))}
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
    </div>
  </div>
);

export const CryptocurrencyListSkeleton = ({ count = 10 }: { count?: number }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <CryptocurrencyCardSkeleton key={index} />
    ))}
  </div>
);
