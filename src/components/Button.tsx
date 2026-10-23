import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/Icons";

type ButtonProps = {
  label: string;
  href?: string;
  variant?: "primary" | "light" | "outline";
  size?: "md" | "lg";
  className?: string;
  showArrow?: boolean;
};

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  light: "bg-white text-heading hover:bg-white/90",
  outline: "border border-white text-white hover:bg-white/10",
};

const SIZES = {
  md: "h-[44px] px-[22px]",
  lg: "h-[52px] px-[25px]",
};

// Pill button with the trailing ↗ arrow used across the design.
export default function Button({
  label,
  href = "#",
  variant = "primary",
  size = "md",
  className = "",
  showArrow = true,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center gap-[4px] rounded-full text-[18px] leading-none tracking-[-0.01em] whitespace-nowrap transition-colors ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {label}
      {showArrow && <ArrowUpRightIcon className="size-[11px]" />}
    </Link>
  );
}
