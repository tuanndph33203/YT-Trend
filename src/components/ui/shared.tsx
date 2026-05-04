import { cn } from '../../lib/utils';
import React from 'react';

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function Button({ 
  className, variant = 'primary', size = 'default', children, ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}) {
  return (
    <button 
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        {
          "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-900": variant === 'primary',
          "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-200": variant === 'secondary',
          "border border-gray-200 bg-transparent hover:bg-gray-50 focus:ring-gray-200": variant === 'outline',
          "bg-transparent hover:bg-gray-100 text-gray-700": variant === 'ghost',
          "h-8 px-3 text-sm": size === 'sm',
          "h-10 px-4 py-2": size === 'default',
          "h-12 px-8 text-lg": size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ children, variant = 'default', className }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger', className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      {
         "bg-gray-100 text-gray-800": variant === 'default',
         "bg-green-100 text-green-800": variant === 'success',
         "bg-yellow-100 text-yellow-800": variant === 'warning',
         "bg-red-100 text-red-800": variant === 'danger',
      },
      className
    )}>
      {children}
    </span>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      {...props}
    />
  );
}
