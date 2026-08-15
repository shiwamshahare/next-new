import React from 'react';

interface BrutalTableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTableHeader = ({ className, children, ...props }: BrutalTableHeaderProps) => {
  const baseClasses = 'bg-gray-50';

  return (
    <thead
      className={`${baseClasses} ${className || ''}`}
      {...props}
    >
      <tr className="border-b border-gray-400">{children}</tr>
    </thead>
  );
};

BrutalTableHeader.displayName = 'BrutalTableHeader';