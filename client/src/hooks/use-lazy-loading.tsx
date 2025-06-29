import { useEffect, useRef, useState } from 'react';
import { createIntersectionObserver } from '@/lib/performance';

interface UseLazyLoadingOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useLazyLoading(options: UseLazyLoadingOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = createIntersectionObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    elementRef,
    isVisible,
    isLoaded,
    setIsLoaded
  };
}

// Hook for lazy loading images
export function useLazyImage(src: string, options?: UseLazyLoadingOptions) {
  const { elementRef, isVisible, isLoaded, setIsLoaded } = useLazyLoading(options);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isVisible && !isLoaded && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.onerror = () => {
        setError(true);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [isVisible, isLoaded, src]);

  return {
    elementRef,
    imageSrc,
    isLoaded,
    error,
    isVisible
  };
}

// Hook for lazy loading components
export function useLazyComponent<T>(
  importFn: () => Promise<{ default: React.ComponentType<T> }>,
  options?: UseLazyLoadingOptions
) {
  const { elementRef, isVisible } = useLazyLoading(options);
  const [Component, setComponent] = useState<React.ComponentType<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (isVisible && !Component && !loading) {
      setLoading(true);
      importFn()
        .then((module) => {
          setComponent(() => module.default);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [isVisible, Component, loading, importFn]);

  return {
    elementRef,
    Component,
    loading,
    error,
    isVisible
  };
}