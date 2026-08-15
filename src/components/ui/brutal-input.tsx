import React from "react";

interface BrutalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function BrutalInput({ label, className = "", ...props }: BrutalInputProps) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-bold uppercase tracking-wide mb-1">{label}</span>}
      <input
        className={`w-full border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:border-red-600 ${className}`}
        {...props}
      />
    </label>
  );
}