import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outlined' | 'filled' | 'underline';
  textAreaSize?: 'default' | 'sm' | 'lg' | 'xs';
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    variant = 'outlined',
    textAreaSize = 'default',
    className,
    ...props
  }, ref) => {
    const baseClasses = 'flex min-h-[3.5rem] w-full rounded-md border border-input font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform disabled:cursor-not-allowed font-variant-numeric: tabular-nums resize-none min-h-[2.5rem] min-w-[2.5rem]';

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
      <textarea
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[textAreaSize]} ${className}`}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';