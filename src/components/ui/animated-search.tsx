
import { useState } from "react";

interface AnimatedSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const AnimatedSearch = ({ 
  value, 
  onChange, 
  placeholder = "Search...", 
  className = "" 
}: AnimatedSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg 
          className={`h-5 w-5 transition-colors duration-300 ${
            isFocused ? 'text-blue-500' : 'text-gray-400'
          }`}
          viewBox="0 0 20 20" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path 
            d="M19 19L13 13M15 8A7 7 0 111 8a7 7 0 0114 0z" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <input 
        type="text" 
        placeholder={placeholder}
        className={`pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none transition-all duration-300 ${
          isFocused 
            ? 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-lg' 
            : 'hover:border-gray-300'
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <div className="absolute inset-0 rounded-lg bg-blue-500 opacity-20 animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
