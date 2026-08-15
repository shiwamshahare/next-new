import React from 'react';

interface BrutalTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const BrutalTextarea = React.forwardRef<HTMLTextAreaElement, BrutalTextareaProps>(
  ({
    className,
    ...props
  }, ref) => {
    const baseClasses = 'border border-red bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:ring-0 focus:border-red-500 w-full resize-vertical';

    return (
      <textarea
        ref={ref}
        className={`${baseClasses} ${className || ''}`}
        {...props}
      />
    );
  }
);

BrutalTextarea.displayName = 'BrutalTextarea';