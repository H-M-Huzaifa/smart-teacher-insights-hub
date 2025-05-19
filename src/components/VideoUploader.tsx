
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const VideoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: "Upload Complete",
        description: "Your video has been processed successfully.",
      });
      
      // Store demo data for results page
      const demoData = [
        { time: "00:05", dominantEmotion: "Neutral", engagementLevel: "Medium" },
        { time: "00:15", dominantEmotion: "Happy", engagementLevel: "High" },
        { time: "00:30", dominantEmotion: "Confused", engagementLevel: "Low" },
        { time: "00:45", dominantEmotion: "Interested", engagementLevel: "High" },
        { time: "01:00", dominantEmotion: "Neutral", engagementLevel: "Medium" },
      ];
      
      localStorage.setItem('evaluationResults', JSON.stringify(demoData));
      
      // Navigate to results page
      setTimeout(() => {
        navigate('/results');
      }, 1000);
    }, 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would send the file to your API
    // For now, let's simulate the upload and API processing
    simulateUpload();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-cecos-light border-opacity-20 animate-fade-in">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label 
              htmlFor="video-upload" 
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Upload Teacher Lecture Video
            </label>
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer 
                transition-all duration-300 hover:bg-cecos-lightest hover:bg-opacity-5
                ${file ? 'border-cecos' : 'border-gray-300'} 
                ${isUploading ? 'pulse-border' : ''}`}
              onClick={() => document.getElementById('video-upload')?.click()}
            >
              <input
                type="file"
                id="video-upload"
                accept="video/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              
              {file ? (
                <div className="space-y-2">
                  <p className="text-cecos font-medium">Selected file:</p>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg 
                    className="mx-auto h-12 w-12 text-cecos-light" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-lg font-medium">Drag and drop your video here</p>
                  <p className="text-sm text-gray-500">or click to browse files</p>
                  <p className="text-xs text-gray-400 mt-2">Supported formats: MP4, AVI, MOV</p>
                </div>
              )}
            </div>
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cecos transition-all duration-300 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 text-right">
                {uploadProgress}% - Processing video...
              </p>
            </div>
          )}
          
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full bg-cecos hover:bg-cecos-light text-white font-medium py-3 rounded transition duration-200"
              disabled={!file || isUploading}
            >
              {isUploading ? "Processing..." : "Analyze Video"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoUploader;
