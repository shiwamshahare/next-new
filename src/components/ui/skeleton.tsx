import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: number | string;
  width?: number | string;
  round?: boolean;
  variant?: 'text' | 'rect' | 'circle' | 'line';
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, height, width, round = false, variant = 'rect', ...props }, ref) => {
    const baseClasses = 'animate-pulse bg-muted/50';
    const roundedClasses = round ? 'rounded-full' : 'rounded-md';
    const variantClasses = {
      text: 'h-4',
      rect: '',
      circle: 'h-8 w-8',
      line: 'h-2 w-full'
    }[variant];

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${className} ${roundedClasses} ${variantClasses}`}
        style={{
          height: typeof height === 'number' ? `${height}px` : height,
          width: typeof width === 'number' ? `${width}px` : width
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';