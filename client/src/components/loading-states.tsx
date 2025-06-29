import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// Layout card skeleton for loading states
export function LayoutCardSkeleton() {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0 relative">
        <Skeleton className="h-48 w-full rounded-t-lg" />
        <div className="absolute top-4 left-4 flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Grid skeleton for multiple layout cards
export function LayoutGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <LayoutCardSkeleton key={index} />
      ))}
    </div>
  );
}

// Loading spinner component
export function LoadingSpinner({ 
  size = 'default',
  className = ''
}: { 
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <Loader2 
      className={`animate-spin text-[hsl(25,100%,50%)] ${sizeClasses[size]} ${className}`} 
    />
  );
}

// Full page loading component
export function PageLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[hsl(25,100%,50%)] mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
      </div>
    </div>
  );
}

// Stats section skeleton
export function StatsSkeleton() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-[hsl(0,0%,15%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="text-center">
              <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
              <Skeleton className="h-6 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-32 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Search results skeleton
export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-start gap-4">
            <Skeleton className="h-16 w-16 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Button loading state
export function ButtonLoading({ 
  children, 
  isLoading = false, 
  ...props 
}: { 
  children: React.ReactNode;
  isLoading?: boolean;
  [key: string]: any;
}) {
  return (
    <button 
      {...props}
      disabled={isLoading || props.disabled}
      className={`relative ${props.className || ''}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  );
}