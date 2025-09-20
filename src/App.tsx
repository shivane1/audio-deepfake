import React, { useState, useRef } from 'react';
import { Shield, Brain, Mic, Zap, Globe, Lock, ArrowRight } from 'lucide-react';
import { RecordingInterface } from './components/RecordingInterface';
import { FeatureCard } from './components/FeatureCard';
import { AudioWaveform } from './components/AudioWaveform';
import { ThemeToggle } from './components/ThemeToggle';
import { InteractiveButton } from './components/InteractiveButton';

function App() {
  const [isDark, setIsDark] = useState(true);
  const detectionRef = useRef<HTMLElement>(null);

  const scrollToDetection = () => {
    detectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      {/* Background Effects */}
      <div className={`fixed inset-0 pointer-events-none transition-opacity duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-blue-950/20 via-transparent to-purple-950/20 opacity-100' 
          : 'bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 opacity-100'
      }`} />
      <div className={`fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] pointer-events-none transition-opacity duration-500 ${
        isDark 
          ? 'from-blue-900/20 via-transparent to-transparent opacity-100' 
          : 'from-blue-200/20 via-transparent to-transparent opacity-100'
      }`} />
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      </div>
      
      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          {/* Logo and Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <Shield size={40} className={isDark ? 'text-blue-500' : 'text-blue-600'} />
              <h1 className="text-5xl font-bold">HAVDEF</h1>
            </div>
            <p className={`text-xl font-semibold ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}>Hindi Audio-Visual Deepfake Defense</p>
          </div>

          {/* Hero Content */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-6xl font-bold leading-tight ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Real-time AI Voice
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent"> Fraud </span>
              Detection
            </h2>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Advanced deepfake detection system that flags AI-generated voice scams during real-time phone calls. 
              Specialized for Hinglish with 90%+ accuracy using state-of-the-art CNNs and spectrogram analysis.
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className={`backdrop-blur-xl rounded-2xl p-8 border max-w-2xl mx-auto transition-all duration-300 ${
              isDark 
                ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50' 
                : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-200/50'
            }`}>
              <AudioWaveform isRecording={true} className="scale-150" />
              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className={`flex items-center space-x-2 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">Live Monitoring</span>
                </div>
                <div className={`flex items-center space-x-2 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  <Brain size={16} />
                  <span className="text-sm font-semibold">AI-Powered</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <InteractiveButton onClick={scrollToDetection}>
              Try Detection System
            </InteractiveButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`px-6 py-20 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/50 to-transparent' 
          : 'bg-gradient-to-br from-gray-100/50 to-transparent'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Advanced Protection Features</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Built with cutting-edge AI and deep learning technologies to provide comprehensive protection against voice-based fraud.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Mic}
              title="Real-time Analysis"
              description="Live audio stream processing with instant deepfake detection during phone calls and voice interactions."
              highlight={true}
              isDark={isDark}
            />
            <FeatureCard
              icon={Brain}
              title="CNN-based Detection"
              description="Advanced convolutional neural networks trained on 5000+ samples for accurate spectrogram-based classification."
              isDark={isDark}
            />
            <FeatureCard
              icon={Globe}
              title="Hinglish Specialized"
              description="Optimized for Hindi-English code-switching patterns common in Indian voice communications."
              isDark={isDark}
            />
            <FeatureCard
              icon={Zap}
              title="Low Latency"
              description="Optimized for mobile devices with minimal processing delay and efficient resource utilization."
              isDark={isDark}
            />
            <FeatureCard
              icon={Lock}
              title="Privacy Focused"
              description="Local processing ensures your voice data never leaves your device, maintaining complete privacy."
              isDark={isDark}
            />
            <FeatureCard
              icon={Shield}
              title="Noise Robust"
              description="Advanced preprocessing handles background noise and maintains accuracy in challenging environments."
              isDark={isDark}
            />
          </div>
        </div>
      </section>

      {/* Detection Interface */}
      <section ref={detectionRef} className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Test the Detection System</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Experience our AI-powered deepfake detection in action. Record your voice or upload an audio file for real-time analysis.
            </p>
          </div>
          
          <RecordingInterface isDark={isDark} />
        </div>
      </section>

      {/* System Architecture */}
      <section className={`px-6 py-20 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/30 to-transparent' 
          : 'bg-gradient-to-br from-gray-50/30 to-transparent'
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>How It Works</h2>
            <p className={`text-xl max-w-3xl mx-auto ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Our advanced pipeline processes audio through multiple stages of analysis and machine learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Audio Capture", desc: "Real-time voice input from calls or recordings" },
              { step: "02", title: "Preprocessing", desc: "Noise filtering, normalization, and silence trimming" },
              { step: "03", title: "CNN Analysis", desc: "Spectrogram-based deep learning classification" },
              { step: "04", title: "Threat Alert", desc: "Instant notification with confidence scoring" }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className={`backdrop-blur-xl rounded-xl p-6 border text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50' 
                    : 'bg-gradient-to-br from-white/60 to-gray-50/60 border-gray-200/50'
                }`}>
                  <div className={`text-3xl font-bold mb-3 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>{item.step}</div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{item.title}</h3>
                  <p className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{item.desc}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className={`hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 ${
                    isDark ? 'text-slate-600' : 'text-gray-400'
                  }`} size={20} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`px-6 py-12 border-t transition-all duration-300 ${
        isDark ? 'border-slate-800' : 'border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto text-center space-y-4">
          <div className={`flex items-center justify-center space-x-2 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <Shield size={24} />
            <span className="text-xl font-bold">HAVDEF</span>
          </div>
          <p className={isDark ? 'text-gray-500' : 'text-gray-600'}>
            © 2025 HAVDEF Project. Advanced AI-powered deepfake detection for voice security.
          </p>
          <div className={`flex justify-center space-x-6 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <span>Python • TensorFlow • CNN • Signal Processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;