import React, { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface InteractiveButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const InteractiveButton: React.FC<InteractiveButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  className = '' 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative inline-flex items-center space-x-2 font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg overflow-hidden ${
        variant === 'primary'
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl hover:shadow-blue-500/25'
          : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white px-6 py-3 rounded-lg hover:shadow-slate-500/25'
      } ${isClicked ? 'scale-95' : ''} ${className}`}
    >
      {/* Ripple effect */}
      <div className={`absolute inset-0 bg-white/20 rounded-full transition-all duration-300 ${
        isClicked ? 'scale-150 opacity-0' : 'scale-0 opacity-100'
      }`} />
      
      {/* Lightning effect for primary button */}
      {variant === 'primary' && (
        <Zap 
          size={16} 
          className={`absolute left-2 transition-all duration-300 ${
            isClicked ? 'opacity-100 scale-110' : 'opacity-0 scale-50'
          }`} 
        />
      )}
      
      <span className="relative z-10">{children}</span>
      <ArrowRight 
        size={20} 
        className={`relative z-10 group-hover:translate-x-1 transition-transform duration-300 ${
          isClicked ? 'translate-x-2' : ''
        }`} 
      />
    </button>
  );
};