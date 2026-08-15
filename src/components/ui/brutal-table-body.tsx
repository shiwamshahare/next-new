import React from 'react';

interface BrutalTableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
  children: React.ReactNode;
}

export const BrutalTableBody = ({ className, children, ...props }: BrutalTableBodyProps) => {
  return (
    <tbody
      className={`${className || ''}`}
      {...props}
    >
      {children}
    </tbody>
  );
};

BrutalTableBody.displayName = 'BrutalTableBody';