import React from 'react';

interface AudioWaveformProps {
  isRecording?: boolean;
  isAnalyzing?: boolean;
  className?: string;
  isDark?: boolean;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({ 
  isRecording = false, 
  isAnalyzing = false, 
  className = "",
  isDark = true
}) => {
  const bars = Array.from({ length: 40 }, (_, i) => i);

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {bars.map((bar) => (
        <div
          key={bar}
          className={`bg-gradient-to-t rounded-full transition-all duration-300 ${
            isRecording || isAnalyzing
              ? 'from-blue-400 to-blue-600 animate-pulse'
              : isDark 
                ? 'from-gray-600 to-gray-800'
                : 'from-gray-300 to-gray-500'
          }`}
          style={{
            width: '3px',
            height: isRecording || isAnalyzing 
              ? `${Math.random() * 30 + 10}px` 
              : '8px',
            animationDelay: `${bar * 50}ms`,
            animationDuration: `${800 + Math.random() * 400}ms`
          }}
        />
      ))}
    </div>
  );
};