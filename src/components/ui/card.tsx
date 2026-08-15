import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  elevated?: boolean;
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevated = false, interactive = false, ...props }, ref) => {
    const baseClasses = 'bg-white/80 backdrop-blur-sm rounded-xl border border-border transition-shadow duration-200';
    const elevationClasses = elevated ? 'shadow-md hover:shadow-lg' : 'shadow-sm';
    const interactiveClasses = interactive ? 'hover:shadow-lg cursor-pointer' : '';

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${elevationClasses} ${interactiveClasses} ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';