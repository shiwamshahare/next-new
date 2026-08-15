import React from 'react';

interface BrutalTableCellProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTableCell = ({ className, children, ...props }: BrutalTableCellProps) => {
  const baseClasses = 'border border-red px-4 py-3 font-mono min-w-[2.5rem]';

  return (
    <td
      className={`${baseClasses} ${className || ''}`}
      {...props}
    >
      {children}
    </td>
  );
};

BrutalTableCell.displayName = 'BrutalTableCell';

// Header cell variant
export const BrutalTableHeaderCell = ({ className, children, ...props }: BrutalTableCellProps) => {
  const baseClasses = 'border border-red px-4 py-3 font-mono font-bold text-left bg-gray-50 uppercase text-xs tracking-wider min-w-[2.5rem]';

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