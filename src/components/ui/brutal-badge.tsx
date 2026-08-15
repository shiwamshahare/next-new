import React from "react";

interface BrutalBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  tone?: "default" | "accent";
}

export function BrutalBadge({ children, tone = "default", className = "", ...props }: BrutalBadgeProps) {
  const tones = {
    default: "bg-black text-white",
    accent: "bg-red-600 text-white",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase border-2 border-black ${tones[tone]} ${className}`} {...props}>
      {children}
    </span>
  );
}