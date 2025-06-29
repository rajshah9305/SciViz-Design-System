import { useState, useRef, useEffect } from 'react';
import { createIntersectionObserver, optimizeImage } from '@/lib/performance';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = createIntersectionObserver((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(container);
      }
    });

    observer.observe(container);

    return () => {
      if (container) observer.unobserve(container);
    };
  }, []);

  useEffect(() => {
    if (isVisible && !isLoaded && !hasError) {
      const img = new Image();
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
      img.src = optimizeImage(src, width, height);
    }
  }, [isVisible, isLoaded, hasError, src, width, height, onLoad, onError]);

  const containerStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  if (hasError) {
    return (
      <div
        ref={containerRef}
        className={`bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center ${className}`}
        style={containerStyle}
      >
        <div className="text-center p-4">
          <div className="text-gray-400 text-sm">Image failed to load</div>
          <div className="text-xs text-gray-500 mt-1">{alt}</div>
        </div>
      </div>
    );
  }

  if (!isVisible || !isLoaded) {
    return (
      <div ref={containerRef} className={className} style={containerStyle}>
        {placeholder ? (
          <img
            src={placeholder}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
        ) : (
          <Skeleton className="w-full h-full" />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <img
        ref={imgRef}
        src={optimizeImage(src, width, height)}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}