import React from "react";

interface BrutalSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: string[];
}

export function BrutalSelect({ label, value, onChange, options, className = "", ...props }: BrutalSelectProps) {
  return (
    <label className="block">
      {label && <span className="block text-xs font-bold uppercase tracking-wide mb-1">{label}</span>}
      <select
        value={value}
        onChange={onChange}
        className={`w-full border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none focus:border-red-600 ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
