import React, { useCallback, useState } from 'react';
import { Upload, FileAudio, FileVideo, X } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  }, []);

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
  };

  const isAudio = selectedFile?.type.startsWith('audio/');
  const isVideo = selectedFile?.type.startsWith('video/');

  if (isAnalyzing) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-mint-200 border-t-mint-500 mb-6"></div>
        <h3 className="font-fredoka text-2xl font-semibold text-gray-800 mb-2">
          Analyzing your pet's sounds...
        </h3>
        <p className="text-gray-600 mb-4">
          Our AI is listening carefully to understand what your pet is feeling
        </p>
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-mint-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-coral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-lavender-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!selectedFile ? (
        <div
          className={`relative border-3 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
            dragActive
              ? 'border-mint-400 bg-mint-50'
              : 'border-gray-300 hover:border-mint-300 hover:bg-mint-25'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-6">
            <Upload className="w-16 h-16 text-mint-400 mx-auto mb-4 animate-bounce-slow" />
            <h3 className="font-fredoka text-2xl font-semibold text-gray-800 mb-2">
              Upload your pet's audio or video
            </h3>
            <p className="text-gray-600 mb-6">
              Drop files here or click to browse • Max 30 seconds
            </p>
          </div>

          <input
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="flex justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <FileAudio className="w-4 h-4" />
              <span>Audio files</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileVideo className="w-4 h-4" />
              <span>Video files</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              {isAudio ? (
                <div className="w-16 h-16 bg-mint-100 rounded-xl flex items-center justify-center">
                  <FileAudio className="w-8 h-8 text-mint-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-coral-100 rounded-xl flex items-center justify-center">
                  <FileVideo className="w-8 h-8 text-coral-600" />
                </div>
              )}
              
              <div>
                <h4 className="font-fredoka font-semibold text-lg text-gray-800">
                  {selectedFile.name}
                </h4>
                <p className="text-gray-500 text-sm">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {isAudio ? 'Audio' : 'Video'}
                </p>
              </div>
            </div>
            
            <button
              onClick={clearFile}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-mint-400 to-mint-500 text-white font-fredoka font-semibold py-4 px-6 rounded-xl hover:from-mint-500 hover:to-mint-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            🎯 Analyze My Pet's Mood
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;