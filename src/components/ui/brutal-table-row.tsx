import React from 'react';

interface BrutalTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTableRow = ({ className, children, ...props }: BrutalTableRowProps) => {
  return (
    <tr
      className={`${className || ''} hover:bg-gray-50`}
      {...props}
    >
      {children}
    </tr>
  );
};

BrutalTableRow.displayName = 'BrutalTableRow';