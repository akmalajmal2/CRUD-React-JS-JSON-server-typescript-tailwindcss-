import { memo } from "react";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "danger";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = memo(
  ({
    size = "md",
    variant = "primary",
    children,
    className = "",
    ...props
  }) => {
    const btnClassName = `rounded-xl px-4 py-2 leading-none text-[#fff] ${variant === "primary" ? "bg-blue-500" : variant === "danger" ? "bg-orange-500" : ""} ${size === "lg" ? "text-2xl font-bold px-6 py-3 rounded-2xl" : size === "md" ? "text-xl font-semibold px-3 py-2 rounded-xl" : ""} ${className}`;

    return (
      <button className={btnClassName} {...props}>
        {children}
      </button>
    );
  },
);
export default Button;
