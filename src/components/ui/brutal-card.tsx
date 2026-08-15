import React from "react";

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function BrutalCard({ children, className = "", ...props }: BrutalCardProps) {
  return (
    <div className={`relative ${className}`} {...props}>
      <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5" />
      <div className="relative bg-white border-2 border-black">{children}</div>
    </div>
  );
}