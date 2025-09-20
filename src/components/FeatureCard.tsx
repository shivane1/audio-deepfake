import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
  isDark?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  highlight = false,
  isDark = true
}) => {
  return (
    <div className={`relative p-6 rounded-xl backdrop-blur-xl border transition-all duration-300 hover:transform hover:scale-105 cursor-pointer ${
      highlight 
        ? isDark
          ? 'bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-500/50 shadow-blue-500/20 shadow-lg' 
          : 'bg-gradient-to-br from-blue-50/80 to-blue-100/80 border-blue-200/50 shadow-blue-200/20 shadow-lg'
        : isDark
          ? 'bg-gradient-to-br from-slate-900/40 to-slate-800/40 border-slate-700/50 hover:border-slate-600/50'
          : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-200/50 hover:border-gray-300/50'
    }`}>
      <div className={`inline-flex p-3 rounded-lg mb-4 ${
        highlight 
          ? isDark
            ? 'bg-blue-500/20 text-blue-400' 
            : 'bg-blue-100 text-blue-600'
          : isDark
            ? 'bg-slate-800/50 text-slate-400'
            : 'bg-gray-100 text-gray-600'
      }`}>
        <Icon size={24} />
      </div>
      <h3 className={`text-lg font-semibold mb-2 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>{title}</h3>
      <p className={`text-sm leading-relaxed ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>{description}</p>
    </div>
  );
};