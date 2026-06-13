import React from 'react';
import { motion } from 'framer-motion';

const Card = React.forwardRef(({
  children,
  className = '',
  interactive = false,
  onClick,
  ...props
}, ref) => {
  const Component = interactive ? motion.div : 'div';
  
  const hoverProps = interactive && onClick ? {
    whileHover: { y: -4, scale: 1.01 },
    whileTap: { scale: 0.99 },
    transition: { duration: 0.2, ease: 'easeInOut' }
  } : {};

  return (
    <Component
      ref={ref}
      onClick={onClick}
      className={`
        bg-white
        rounded-2xl
        shadow-premium
        border
        border-slate-100/50
        overflow-hidden
        ${interactive ? 'cursor-pointer hover:shadow-lg hover:border-slate-200/60' : ''}
        ${className}
      `}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`p-5 pb-3 border-b border-slate-50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-base md:text-lg font-extrabold text-slate-950 ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`text-xs md:text-sm font-medium text-secondary mt-1 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`p-5 pt-3 bg-slate-50/50 border-t border-slate-50 flex items-center justify-end ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
