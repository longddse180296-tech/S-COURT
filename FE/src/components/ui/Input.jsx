import React, { useState, useId } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = React.forwardRef(({
  type = 'text',
  label,
  placeholder,
  error,
  icon, // Left icon
  className = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const reactId = useId();
  const inputId = id || reactId;
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-[11px] md:text-[13px] font-extrabold text-slate-950 uppercase tracking-wider"
        >
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {React.cloneElement(icon, { size: 18, strokeWidth: 2 })}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          placeholder={placeholder}
          className={`
            w-full
            h-11
            rounded-xl
            border
            bg-surface-dim
            text-[13px] md:text-[15px]
            font-medium
            text-slate-950
            transition-all
            placeholder-slate-400
            focus:bg-white
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500/20
            ${icon ? 'pl-11' : 'pl-4'}
            ${isPassword ? 'pr-11' : 'pr-4'}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
              : 'border-slate-300 focus:border-primary'
            }
            ${className}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 text-slate-400 hover:text-slate-600 focus:outline-none flex items-center justify-center"
            tabIndex={-1}
            data-testid="password-toggle"
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={2} />
            ) : (
              <Eye size={18} strokeWidth={2} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs font-semibold text-red-500" data-testid="error-message">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
