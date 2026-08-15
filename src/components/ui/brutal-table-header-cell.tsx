import React from 'react';

interface BrutalTableHeaderCellProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTableHeaderCell = ({ className, children, ...props }: BrutalTableHeaderCellProps) => {
  const baseClasses = 'border border-gray-400 px-4 py-3 font-mono font-bold text-left bg-gray-50 uppercase text-xs tracking-wider';

  return (
    <th
      className={`${baseClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </th>
  );
};

BrutalTableHeaderCell.displayName = 'BrutalTableHeaderCell';