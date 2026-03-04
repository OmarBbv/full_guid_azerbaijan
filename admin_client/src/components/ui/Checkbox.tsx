import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            className={`w-5 h-5 rounded border-zinc-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer ${className}`}
            {...props}
          />
        </div>
        <label className="text-sm font-medium text-zinc-700 cursor-pointer group-hover:text-zinc-900 transition-colors">
          {label}
        </label>
        {error && (
          <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
