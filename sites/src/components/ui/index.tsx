"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B82F6]";
  
  const variants = {
    primary: "bg-[#0A0A0A] text-white hover:bg-[#1F2937]",
    secondary: "bg-[#F9FAFB] text-[#0A0A0A] border border-[#E5E7EB] hover:bg-[#F3F4F6]",
    ghost: "text-[#4B5563] hover:text-[#0A0A0A] hover:bg-[#F3F4F6]",
    outline: "border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded",
    md: "px-4 py-2 text-sm rounded",
    lg: "px-6 py-3 text-base rounded",
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}

export function Card({ children, className = "", hover = false, padding = "md", onClick }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white border border-[#E5E7EB] rounded ${
        hover ? "hover:border-[#9CA3AF] transition-colors duration-150 cursor-pointer" : ""
      } ${paddings[padding]} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "default", size = "sm", className = "" }: BadgeProps) {
  const variants = {
    default: "bg-[#F3F4F6] text-[#374151]",
    success: "bg-[#ECFDF5] text-[#065F46]",
    warning: "bg-[#FFFBEB] text-[#92400E]",
    error: "bg-[#FEF2F2] text-[#991B1B]",
    info: "bg-[#EFF6FF] text-[#1E40AF]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={`inline-flex items-center font-medium rounded ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
}

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  label?: string;
  helperText?: string;
  error?: boolean;
}

export function Input({ 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  className = "", 
  label,
  helperText,
  error = false,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#374151] mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 bg-white border ${error ? "border-[#DC2626]" : "border-[#E5E7EB]"} rounded text-[#0A0A0A] text-sm placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent transition-colors ${className}`}
      />
      {helperText && (
        <p className={`mt-1.5 text-xs ${error ? "text-[#DC2626]" : "text-[#6B7280]"}`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover border border-[#E5E7EB]`}
      />
    );
  }

  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase();
  return (
    <div className={`${sizes[size]} rounded-full bg-[#0A0A0A] flex items-center justify-center text-white font-medium`}>
      {initials}
    </div>
  );
}

interface ProgressProps {
  value: number;
  max?: number;
  size?: "sm" | "md";
  color?: "default" | "success" | "warning" | "error";
}

export function Progress({ value, max = 100, size = "md", color = "default" }: ProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizes = {
    sm: "h-1",
    md: "h-2",
  };

  const colors = {
    default: "bg-[#0A0A0A]",
    success: "bg-[#059669]",
    warning: "bg-[#D97706]",
    error: "bg-[#DC2626]",
  };

  return (
    <div className={`w-full bg-[#F3F4F6] rounded-sm overflow-hidden ${sizes[size]}`}>
      <div
        className={`h-full ${colors[color]} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  subtitle?: string;
}

export function StatCard({ title, value, change, subtitle }: StatCardProps) {
  return (
    <Card>
      <div>
        <p className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-[#0A0A0A] tracking-tight">{value}</p>
        {change !== undefined && (
          <p className={`mt-1 text-sm ${change >= 0 ? "text-[#059669]" : "text-[#DC2626]"}`}>
            {change >= 0 ? "+" : ""}{change}% from previous period
          </p>
        )}
        {subtitle && (
          <p className="mt-1 text-sm text-[#6B7280]">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#E5E7EB]">
            {headers.map((header, i) => (
              <th 
                key={i} 
                className="px-4 py-3 text-left text-xs font-medium text-[#6B7280] uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F3F4F6]">
          {children}
        </tbody>
      </table>
    </div>
  );
}

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="border-b border-[#E5E7EB]">
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#0A0A0A] text-[#0A0A0A]"
                : "border-transparent text-[#6B7280] hover:text-[#0A0A0A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
