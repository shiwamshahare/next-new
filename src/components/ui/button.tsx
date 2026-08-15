import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'ghost' | 'link' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'xs';
  asChild?: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'default',
    asChild = false,
    isLoading = false,
    className,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium font-variant-numeric: tabular-nums transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none min-h-[2.5rem] min-w-[2.5rem]';

    const variantClasses = {
      primary: `bg-primary text-on-primary hover:bg-primary/90 active:scale-[0.96]`,
      secondary: `bg-secondary text-on-secondary hover:bg-secondary/90 active:scale-[0.96]`,
      destructive: `bg-destructive text-on-destructive hover:bg-destructive/90 active:scale-[0.96]`,
      ghost: `hover:bg-accent/20 active:scale-[0.96]`,
      link: `text-primary hover:text-primary/90 underline-offset-2 hover:underline active:scale-[0.96]`,
      outline: `border border-primary text-primary hover:bg-primary/10 active:scale-[0.96]`
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 px-3',
      lg: 'h-11 px-6',
      icon: 'h-9 w-9',
      xs: 'h-8 px-2.5 text-xs'
    };

    const loadingClasses = isLoading
      ? 'cursor-not-allowed animate-pulse opacity-70'
      : '';

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${loadingClasses} ${className || ''}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';