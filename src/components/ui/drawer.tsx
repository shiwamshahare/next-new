import React, { useEffect } from 'react';

interface DrawerProps {
  children: React.ReactNode;
  className?: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  side?: 'left' | 'right';
  backdropClass?: string;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ children, className, onOpenChange, open, side = 'left', backdropClass, ...props }, ref) => {
    useEffect(() => {
      if (!open) {
        // Prevent body scroll when drawer is open
        document.body.style.overflow = open ? 'hidden' : '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    const sideClasses = {
      left: 'left-0',
      right: 'right-0'
    }[side];

    return (
      <div
        ref={ref}
        className={`fixed inset-0 z-50 flex ${sideClasses} ${className}`}
        {...props}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm ${open ? 'block' : 'hidden'} ${backdropClass || ''}`}
          onClick={() => onOpenChange(false)}
        ></div>

        {/* Drawer Content */}
        <div
          className={`flex-1 bg-white/80 backdrop-blur-sm border-l border-border transform transition-transform duration-300 ease-out ${
            open ? `translate-x-0` : side === 'left' ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {children}
        </div>
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';