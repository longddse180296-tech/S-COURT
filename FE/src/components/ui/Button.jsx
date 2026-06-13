import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  // Styles according to SPORTSHUB_UI_SETUP.md guidelines
  const baseStyles = 'inline-flex items-center justify-center font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 select-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-button',
    secondary: 'bg-surface-dim text-secondary hover:bg-slate-200',
    outline: 'border border-slate-300 bg-transparent text-slate-800 hover:bg-slate-50',
    social: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 shadow-sm',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'h-9 px-4 text-[13px] rounded-full',
    md: 'h-11 px-6 text-[15px] rounded-full',
    lg: 'h-12 px-8 text-[17px] rounded-full',
  };

  const isBtnDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      disabled={isBtnDisabled}
      onClick={isBtnDisabled ? undefined : onClick}
      whileHover={isBtnDisabled ? {} : { scale: 1.02 }}
      whileTap={isBtnDisabled ? {} : { scale: 0.99 }}
      transition={{ duration: 0.2 }}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${isBtnDisabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          fill="none"
          viewBox="0 0 24 24"
          data-testid="spinner"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}

      {!isLoading && icon && iconPosition === 'left' && (
        <span className="mr-2 inline-flex">{icon}</span>
      )}

      <span>{children}</span>

      {!isLoading && icon && iconPosition === 'right' && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </motion.button>
  );
};

export default Button;
