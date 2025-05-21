
import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

interface FileUploaderProps {
  onUpload: (name: string, files: File[]) => void;
}

export const FileUploader = ({ onUpload }: FileUploaderProps) => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [candidateName, setCandidateName] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };
  
  const addFiles = (newFiles: File[]) => {
    // Filter valid file types (you can restrict to certain file types)
    const validFiles = newFiles.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/msword' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'video/mp4'
    );
    
    if (validFiles.length !== newFiles.length) {
      setError("Some files were rejected. Only PDF, Word, and MP4 files are allowed.");
    } else {
      setError(null);
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };
  
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSubmit = () => {
    if (files.length === 0) {
      setError("Please add at least one file.");
      return;
    }
    
    setError(null);
    onUpload(candidateName, files);
  };
  
  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <File className="h-5 w-5 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <File className="h-5 w-5 text-blue-500" />;
    } else if (fileType.includes('video')) {
      return <File className="h-5 w-5 text-purple-500" />;
    }
    return <File className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="candidateName">Candidate Name (optional)</Label>
        <Input
          id="candidateName"
          placeholder="Enter candidate name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.mp4"
        />
        
        <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer">
          <div className="rounded-full bg-primary/10 p-3">
            <Upload className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">
              {dragging ? "Drop files here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOCX, MP4 (Max file size: 10MB)
            </p>
          </div>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <p className="text-sm">{error}</p>
        </Alert>
      )}
      
      {files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected files:</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
              >
                <div className="flex items-center">
                  {getFileIcon(file.type)}
                  <span className="ml-2 text-sm truncate max-w-[200px]">{file.name}</span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={() => {
          setFiles([]);
          setCandidateName('');
        }}>
          Clear
        </Button>
        <Button type="button" onClick={handleSubmit}>
          {files.length > 0 ? "Upload and Process" : "Upload Files"}
        </Button>
      </div>
    </div>
  );
};
