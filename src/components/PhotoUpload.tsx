
import { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PhotoUploadProps {
  onPhotosSelected: (photos: File[]) => void;
  maxPhotos?: number;
}

const PhotoUpload = ({ onPhotosSelected, maxPhotos = 10 }: PhotoUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

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

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('image/')
    ).slice(0, maxPhotos);

    if (files.length > 0) {
      onPhotosSelected(files);
    }
  }, [onPhotosSelected, maxPhotos]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, maxPhotos);
    if (files.length > 0) {
      onPhotosSelected(files);
    }
  }, [onPhotosSelected, maxPhotos]);

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        isDragOver 
          ? 'border-purple-500 bg-purple-50' 
          : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full">
          <Upload className="text-white" size={32} />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Your Adventure Photos
          </h3>
          <p className="text-gray-500 mb-4">
            Drag & drop your photos here, or click to browse
          </p>
          
          <label htmlFor="photo-upload">
            <Button asChild className="bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600">
              <span className="cursor-pointer">
                <ImageIcon size={20} className="mr-2" />
                Choose Photos
              </span>
            </Button>
          </label>
          
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
        
        <p className="text-sm text-gray-400">
          Upload up to {maxPhotos} photos (JPG, PNG, GIF)
        </p>
      </div>
    </div>
  );
};

export default PhotoUpload;
