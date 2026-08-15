import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outlined' | 'filled' | 'underline';
  inputSize?: 'default' | 'sm' | 'lg' | 'xs';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'outlined',
    inputSize = 'default',
    className,
    ...props
  }, ref) => {
    const baseClasses = 'flex h-10 w-full rounded-md border border-input font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform disabled:cursor-not-allowed font-variant-numeric: tabular-nums min-h-[2.5rem] min-w-[2.5rem]';

    const variantClasses = {
      default: `border-background bg-background hover:bg-background/50 active:scale-[0.96]`,
      outlined: `border-input hover:border-input/50 active:scale-[0.96]`,
      filled: `bg-primary/5 border-primary/20 text-primary placeholder:text-primary/60 hover:bg-primary/10 active:scale-[0.96]`,
      underline: `border-b border-b-primary bg-transparent px-0 py-2 hover:bg-primary/5 active:scale-[0.96]`,
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2 text-sm',
      sm: 'h-9 px-3 text-xs',
      lg: 'h-12 px-4 text-base',
      xs: 'h-8 px-2 text-xs'
    };

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';