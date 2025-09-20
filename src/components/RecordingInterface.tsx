import React, { useState, useRef, useCallback } from 'react';
import { Mic, Square, Upload, Loader2, Shield, AlertTriangle, CheckCircle, FileAudio, X } from 'lucide-react';
import { AudioWaveform } from './AudioWaveform';

interface RecordingInterfaceProps {
  isDark: boolean;
}

export const RecordingInterface: React.FC<RecordingInterfaceProps> = ({ isDark }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{verdict: string; confidence: number} | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimer = useRef<NodeJS.Timeout>();

  const startRecording = useCallback(async () => {
    try {
      setIsRecording(true);
      setResult(null);
      setRecordingDuration(0);
      
      // Simulate recording duration counter
      recordingTimer.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      // Simulate recording for demo purposes
      setTimeout(() => {
        stopRecording();
      }, 5000);
    } catch (error) {
      console.error('Recording failed:', error);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
    if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }
    analyzeAudio();
  }, []);

  const analyzeAudio = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Simulate detection result
    const isDeepfake = Math.random() > 0.7;
    setResult({
      verdict: isDeepfake ? 'DEEPFAKE' : 'REAL',
      confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
    });
    
    setIsAnalyzing(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      analyzeAudio();
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setUploadedFile(file);
      analyzeAudio();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setResult(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Recording Controls */}
      <div className={`backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50' 
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 border-gray-200/50'
      }`}>
        <div className="text-center space-y-6">
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Voice Analysis
          </h3>
          
          {/* Waveform Visualization */}
          <div className={`h-20 flex items-center justify-center rounded-xl border transition-all duration-300 ${
            isDark 
              ? 'bg-black/20 border-slate-700/30' 
              : 'bg-gray-100/50 border-gray-300/30'
          }`}>
            <AudioWaveform isRecording={isRecording} isAnalyzing={isAnalyzing} />
          </div>

          {/* Recording Duration */}
          {(isRecording || recordingDuration > 0) && (
            <div className="text-3xl font-mono font-bold text-blue-400">
              {formatTime(recordingDuration)}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            {!isRecording ? (
              <>
                <button
                  onClick={startRecording}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                >
                  <Mic size={20} />
                  <span>Start Recording</span>
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                >
                  <Upload size={20} />
                  <span>Upload File</span>
                </button>
              </>
            ) : (
              <button
                onClick={stopRecording}
                className="flex items-center space-x-2 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-gray-500/25"
              >
                <Square size={20} />
                <span>Stop Recording</span>
              </button>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Drag and Drop Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-6 p-8 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer ${
              isDragOver
                ? isDark
                  ? 'border-blue-400 bg-blue-900/20'
                  : 'border-blue-500 bg-blue-50'
                : isDark
                  ? 'border-slate-600 hover:border-slate-500'
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center space-y-2">
              <FileAudio size={32} className={`mx-auto ${isDark ? 'text-slate-400' : 'text-gray-500'}`} />
              <p className={`font-medium ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Drag & drop audio files here
              </p>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
                Supports MP3, WAV, FLAC formats
              </p>
            </div>
          </div>

          {/* Uploaded File Display */}
          {uploadedFile && (
            <div className={`flex items-center justify-between p-4 rounded-lg border ${
              isDark 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-gray-100 border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <FileAudio size={20} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {uploadedFile.name}
                </span>
              </div>
              <button
                onClick={clearFile}
                className={`p-1 rounded-full transition-colors ${
                  isDark 
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-white' 
                    : 'hover:bg-gray-200 text-gray-500 hover:text-gray-700'
                }`}
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Status */}
      {isAnalyzing && (
        <div className={`backdrop-blur-xl rounded-2xl p-6 border animate-pulse transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-blue-900/30 to-blue-800/30 border-blue-700/50' 
            : 'bg-gradient-to-br from-blue-50/80 to-blue-100/80 border-blue-200/50'
        }`}>
          <div className={`flex items-center justify-center space-x-3 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}>
            <Loader2 className="animate-spin" size={24} />
            <span className="text-lg font-semibold">Analyzing audio for deepfake signatures...</span>
          </div>
          <div className={`mt-4 rounded-full h-2 overflow-hidden ${
            isDark ? 'bg-blue-900/20' : 'bg-blue-200/50'
          }`}>
            <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-full rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && !isAnalyzing && (
        <div className={`backdrop-blur-xl rounded-2xl p-6 border transform transition-all duration-500 animate-fade-in ${
          result.verdict === 'DEEPFAKE' 
            ? isDark
              ? 'bg-gradient-to-br from-red-900/30 to-red-800/30 border-red-700/50'
              : 'bg-gradient-to-br from-red-50/80 to-red-100/80 border-red-200/50'
            : isDark
              ? 'bg-gradient-to-br from-green-900/30 to-green-800/30 border-green-700/50'
              : 'bg-gradient-to-br from-green-50/80 to-green-100/80 border-green-200/50'
        }`}>
          <div className="text-center space-y-4">
            <div className={`flex items-center justify-center space-x-3 ${
              result.verdict === 'DEEPFAKE' 
                ? isDark ? 'text-red-400' : 'text-red-600'
                : isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              {result.verdict === 'DEEPFAKE' ? (
                <AlertTriangle size={32} />
              ) : (
                <CheckCircle size={32} />
              )}
              <h3 className="text-2xl font-bold">
                {result.verdict === 'DEEPFAKE' ? 'Deepfake Detected' : 'Authentic Voice'}
              </h3>
            </div>
            
            <div className="space-y-2">
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Confidence Level</p>
              <div className={`rounded-full h-4 overflow-hidden ${
                isDark ? 'bg-black/20' : 'bg-gray-200/50'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    result.verdict === 'DEEPFAKE' 
                      ? 'bg-gradient-to-r from-red-500 to-red-400' 
                      : 'bg-gradient-to-r from-green-500 to-green-400'
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                />
              </div>
              <p className="text-xl font-bold">{Math.round(result.confidence * 100)}%</p>
            </div>

            {result.verdict === 'DEEPFAKE' && (
              <div className={`rounded-xl p-4 border ${
                isDark 
                  ? 'bg-red-900/20 border-red-700/30' 
                  : 'bg-red-50 border-red-200'
              }`}>
                <div className={`flex items-center space-x-2 ${
                  isDark ? 'text-red-300' : 'text-red-700'
                }`}>
                  <Shield size={20} />
                  <span className="font-semibold">Security Alert</span>
                </div>
                <p className={`text-sm mt-2 ${
                  isDark ? 'text-red-200' : 'text-red-600'
                }`}>
                  This audio appears to be AI-generated. Exercise caution if this was from an unexpected source.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};