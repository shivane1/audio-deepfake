import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
        isDark 
          ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' 
          : 'bg-white hover:bg-gray-100 text-slate-600 shadow-lg'
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        <Sun 
          size={24} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          size={24} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
    </button>
  );
};