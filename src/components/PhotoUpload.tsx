import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, Check, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Props {
  onImageUpload: (file: File) => void;
  uploadedImage: string | null;
}

const PhotoUpload = ({ onImageUpload, uploadedImage }: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onImageUpload(file);
    setIsUploading(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onImageUpload(null as any);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="glass-card border-0 shadow-glass hover:shadow-glow transition-all duration-500 animate-scale-in">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-3 text-2xl font-bold">
          <div className="p-2 rounded-xl bg-gradient-primary">
            <Camera className="h-6 w-6 text-white" />
          </div>
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Upload Your Photo
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {!uploadedImage ? (
          <div
            className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
              isDragOver
                ? 'border-primary bg-primary/10 shadow-glow'
                : 'border-primary/30 hover:border-primary hover:bg-primary/5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {isUploading ? (
              <div className="space-y-4 animate-pulse">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-spin">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-primary">Processing Image...</h3>
                  <p className="text-muted-foreground">Analyzing your photo for the best fit</p>
                </div>
                <div className="w-32 h-2 mx-auto bg-primary/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary animate-shimmer relative">
                    <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow animate-float">
                    <Upload className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    Drag & Drop Your Photo
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    or click to browse files
                  </p>
                </div>

                <Button 
                  className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 px-8 py-3 font-semibold"
                  onClick={handleUploadClick}
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Browse Files
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-scale-in">
            {/* Image Preview */}
            <div className="relative rounded-3xl overflow-hidden shadow-float">
              <img
                src={uploadedImage}
                alt="Uploaded photo"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Success Badge */}
              <div className="absolute top-4 right-4 flex items-center space-x-2 glass-intense px-3 py-2 rounded-full">
                <Check className="h-5 w-5 text-success" />
                <span className="text-white font-medium">Photo Ready</span>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={clearImage}
                className="absolute top-4 left-4 p-2 glass-intense rounded-full hover:bg-error/20 transition-colors duration-300 group"
              >
                <X className="h-5 w-5 text-white group-hover:text-error" />
              </button>
            </div>

            {/* Upload New Photo Button */}
            <Button
              variant="outline"
              onClick={handleUploadClick}
              className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Camera className="mr-2 h-4 w-4" />
              Upload Different Photo
            </Button>
          </div>
        )}

        {/* Tips */}
        <div className="glass-card p-4 rounded-2xl space-y-2">
          <div className="flex items-center space-x-2 text-primary">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">Tips for Best Results</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1 ml-7">
            <li>• Wear form-fitting clothes</li>
            <li>• Stand against a plain background</li>
            <li>• Ensure good lighting</li>
            <li>• Face the camera directly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;