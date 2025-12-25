import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './Icons';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full group">
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 h-[50px] rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-transparent focus:border-black dark:focus:border-white outline-none transition-all duration-200 text-lg font-medium text-black dark:text-white placeholder-gray-300 dark:placeholder-gray-700"
          placeholder="Type password..."
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOffIcon className="w-5 h-5" />
          ) : (
            <EyeIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};