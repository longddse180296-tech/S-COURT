import React from 'react';

const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-extrabold uppercase tracking-wide select-none';

  const variants = {
    primary: 'bg-primary/10 text-primary-deep border border-primary/20',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    danger: 'bg-red-50 text-red-700 border border-red-100',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100',
    info: 'bg-blue-50 text-blue-700 border border-blue-100',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200/60',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[9px] rounded-md',
    md: 'px-2.5 py-1 text-[10px] rounded-lg',
    lg: 'px-3.5 py-1.5 text-[11px] rounded-xl',
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant] || variants.neutral}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
