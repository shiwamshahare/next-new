import React from 'react';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  bordered?: boolean;
  striped?: boolean;
  highlightOnHover?: boolean;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  isClickable?: boolean;
  highlightOnHover?: boolean;
}

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
  className?: string;
  isNumeric?: boolean;
  align?: 'left' | 'center' | 'right';
  isActionCell?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, bordered = true, striped = true, highlightOnHover = true, ...props }, ref) => {
    const baseClasses = 'min-w-full divide-y';
    const borderClasses = bordered ? 'divide-border' : '';
    const stripeClasses = striped ? 'bg-white/50' : '';
    const hoverClasses = highlightOnHover ? 'hover:bg-muted/50' : '';

    return (
      <table
        ref={ref}
        className={`${baseClasses} ${borderClasses} ${stripeClasses} ${hoverClasses} ${className}`}
        {...props}
      />
    );
  }
);

Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={`${className} bg-muted/50`} {...props} />
  )
);

TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={`${className} divide-y divide-border`} {...props} />
  )
);

TableBody.displayName = 'TableBody';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, isClickable = false, highlightOnHover = true, ...props }, ref) => {
    const baseClasses = 'transition-colors duration-150';
    const clickableClasses = isClickable ? 'hover:bg-muted/50 cursor-pointer' : '';
    const hoverClasses = !isClickable && highlightOnHover ? 'hover:bg-muted/50' : '';

    return (
      <tr
        ref={ref}
        className={`${baseClasses} ${clickableClasses} ${hoverClasses} ${className}`}
        {...props}
      />
    );
  }
);

TableRow.displayName = 'TableRow';

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, isNumeric = false, align = 'left', ...props }, ref) => {
  const baseClasses = 'px-6 py-4 whitespace-nowrap text-sm font-medium';
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];
  const numericClasses = isNumeric ? 'font-mono' : '';

  return (
    <td
      ref={ref}
      className={`${baseClasses} ${alignmentClasses} ${numericClasses} ${className}`}
      {...props}
    />
  );
});

TableCell.displayName = 'TableCell';

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
  <th
    ref={ref}
    scope="col"
    className={`px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider`}
    {...props}
  />
));

TableHeaderCell.displayName = 'TableHeaderCell';

// Utility component for sorting indicators
export const SortIndicator = ({ isSorted, sortDirection }: { isSorted?: boolean; sortDirection?: 'asc' | 'desc' }) => {
  if (!isSorted) return null;

  return (
    <svg
      className="ml-1 h-4 w-4 text-muted-foreground transition-transform duration-200"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={sortDirection === 'asc' ? "M5 6l7 7 7-7" : "M5 12l7-7 7 7"}
      />
    </svg>
  );
};