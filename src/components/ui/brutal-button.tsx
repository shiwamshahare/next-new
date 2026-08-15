import React from "react";

interface BrutalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "accent";
  children: React.ReactNode;
}

export function BrutalButton({
  children,
  onClick,
  variant = "default",
  type = "button",
  className = "",
  ...props
}: BrutalButtonProps) {
  const variants = {
    default: "bg-white text-black hover:bg-black hover:text-white",
    accent: "bg-red-600 text-white hover:bg-black",
  };
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
      <button
        type={type}
        onClick={onClick}
        className={`relative border-2 border-black font-bold uppercase text-sm tracking-wide px-4 py-2 cursor-pointer active:translate-x-1 active:translate-y-1 ${variants[variant]}`}
        {...props}
      >
        {children}
      </button>
    </span>
  );
}