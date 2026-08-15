import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'xs';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'default', className, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-md text-xs font-medium transition-colors';
    const variantClasses = {
      default: `bg-primary text-on-primary`,
      secondary: `bg-secondary text-on-secondary`,
      destructive: `bg-destructive text-on-destructive`,
      outline: `border border-primary text-primary`,
      ghost: `hover:bg-accent/20`
    };
    const sizeClasses = {
      default: 'h-8 px-3',
      sm: 'h-7 px-2',
      lg: 'h-9 px-4',
      xs: 'h-6 px-2'
    };

    return (
      <div
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';