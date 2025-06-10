
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const VideoUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const navigate = useNavigate();

  const validateVideoFile = (file: File): boolean => {
    // Check file type
    const allowedTypes = ['video/mp4', 'video/avi', 'video/mov', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(file.type)) {
      return false;
    }
    
    // Check file size (limit to 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a video file smaller than 500MB.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      
      if (!validateVideoFile(selectedFile)) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid video file (MP4, AVI, MOV).",
          variant: "destructive"
        });
        // Reset the input
        e.target.value = '';
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const uploadToAPI = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Create FormData for multipart/form-data upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Simulate progress during upload
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 500);
      
      const response = await fetch('https://teacher-assesment.onrender.com/process/', {
        method: 'POST',
        body: formData,
      });
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const apiResults = await response.json();
      
      // Store the API results in localStorage
      localStorage.setItem('apiResults', JSON.stringify(apiResults));
      
      // Clear any old demo data
      localStorage.removeItem('evaluationResults');
      
      toast({
        title: "Analysis Complete",
        description: "Your video has been processed successfully.",
      });
      
      // Navigate to results page after a short delay
      setTimeout(() => {
        navigate('/results');
      }, 1500);
      
    } catch (error) {
      console.error('Upload failed:', error);
      
      toast({
        title: "Upload Failed",
        description: "There was an error processing your video. Please try again.",
        variant: "destructive"
      });
      
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
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
    
    // Double-check file validation before upload
    if (!validateVideoFile(file)) {
      return;
    }
    
    uploadToAPI();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    
    if (droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      
      if (!validateVideoFile(droppedFile)) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid video file (MP4, AVI, MOV).",
          variant: "destructive"
        });
        return;
      }
      
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
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
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                id="video-upload"
                accept="video/mp4,video/avi,video/mov,video/quicktime,video/x-msvideo"
                className="hidden"
                onChange={handleFileChange}
                disabled={isUploading}
              />
              
              {file ? (
                <div className="space-y-2">
                  <p className="text-cecos font-medium">Selected file:</p>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <p className="text-xs text-green-600">✓ Valid video file</p>
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
                  <p className="text-xs text-gray-400 mt-2">Supported formats: MP4, AVI, MOV (Max 500MB)</p>
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
                {uploadProgress < 100 
                  ? `${Math.round(uploadProgress)}% - ${uploadProgress < 30 ? 'Uploading video...' : uploadProgress < 70 ? 'Processing frames...' : 'Analyzing emotions...'}`
                  : '100% - Analysis complete!'
                }
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
