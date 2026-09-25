import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-[#E5E1D8] bg-white ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
