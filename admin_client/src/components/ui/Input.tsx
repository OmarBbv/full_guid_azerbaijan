import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-zinc-700">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-white border rounded-xl outline-none transition-all duration-200 border-zinc-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-zinc-400 text-zinc-900 text-sm ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
            } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
