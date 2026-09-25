import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-[#E4572E] text-white hover:bg-[#cf4d28]",
    secondary:
      "border border-[#E5E1D8] bg-white text-[#17211D] hover:bg-[#F7F5F0]",
    success:
      "bg-[#176B4D] text-white hover:bg-[#125a40]",
    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      className={`rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
