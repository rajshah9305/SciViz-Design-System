// Performance monitoring and optimization utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTiming(key: string): void {
    this.metrics.set(key, performance.now());
  }

  endTiming(key: string): number {
    const startTime = this.metrics.get(key);
    if (startTime) {
      const duration = performance.now() - startTime;
      this.metrics.delete(key);
      return duration;
    }
    return 0;
  }

  measureAsync<T>(key: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(key);
    return fn().finally(() => {
      const duration = this.endTiming(key);
      console.log(`Performance: ${key} completed in ${duration.toFixed(2)}ms`);
    });
  }

  measureSync<T>(key: string, fn: () => T): T {
    this.startTiming(key);
    const result = fn();
    const duration = this.endTiming(key);
    console.log(`Performance: ${key} completed in ${duration.toFixed(2)}ms`);
    return result;
  }
}

// Image optimization utility
export const optimizeImage = (src: string, width?: number, height?: number): string => {
  if (src.includes('data:') || src.includes('blob:')) {
    return src;
  }
  
  // For production, implement image optimization
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', '85'); // Quality 85%
  params.append('f', 'webp'); // Prefer WebP format
  
  return `${src}${params.toString() ? `?${params.toString()}` : ''}`;
};

// Lazy loading utility
export const createIntersectionObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
};

// Bundle size tracking
export const trackBundleSize = (): void => {
  if (typeof window !== 'undefined' && 'navigator' in window) {
    const connection = (navigator as any).connection;
    if (connection) {
      console.log('Network Info:', {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt
      });
    }
  }
};

// Error boundary helper
export class ErrorTracker {
  static logError(error: Error, context: string): void {
    console.error(`Error in ${context}:`, error);
    
    // In production, send to monitoring service
    if (import.meta.env.PROD) {
      // Integration point for error tracking service
      this.sendToErrorService(error, context);
    }
  }

  private static sendToErrorService(error: Error, context: string): void {
    // Placeholder for error tracking service integration
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // In production, send to service like Sentry, LogRocket, etc.
    console.log('Error tracked:', errorData);
  }
}

// Performance metrics collection
export const collectWebVitals = (): void => {
  if (typeof window === 'undefined') return;

  // Collect Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      switch (entry.entryType) {
        case 'largest-contentful-paint':
          console.log('LCP:', entry.startTime);
          break;
        case 'first-input':
          console.log('FID:', (entry as any).processingStart - entry.startTime);
          break;
        case 'layout-shift':
          if (!(entry as any).hadRecentInput) {
            console.log('CLS:', (entry as any).value);
          }
          break;
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Browser doesn't support these metrics
    console.log('Performance metrics not supported');
  }
};

// Memory usage monitoring
export const monitorMemoryUsage = (): void => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
      total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
  }
};