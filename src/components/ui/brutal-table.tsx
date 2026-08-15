import React from 'react';

interface BrutalTableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTable = ({ className, children, ...props }: BrutalTableProps) => {
  const baseClasses = 'w-full border-collapse border border-red';

  return (
    <table
      className={`${baseClasses} ${className || ''}`}
      {...props}
    >
      <tbody className="divide-y divide-gray-400">{children}</tbody>
    </table>
  );
};

BrutalTable.displayName = 'BrutalTable';