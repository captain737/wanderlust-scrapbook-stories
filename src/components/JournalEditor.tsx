
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sticker, Edit } from 'lucide-react';
import PhotoUpload from './PhotoUpload';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  photos: string[];
  date: Date;
  backgroundStyle: string;
}

interface JournalEditorProps {
  onSave: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  isVisible: boolean;
}

const JournalEditor = ({ onSave, isVisible }: JournalEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [backgroundStyle, setBackgroundStyle] = useState('bg-gradient-to-br from-blue-50 to-purple-50');

  const backgroundOptions = [
    { name: 'Sky Blue', class: 'bg-gradient-to-br from-blue-50 to-purple-50' },
    { name: 'Sunset', class: 'bg-gradient-to-br from-orange-50 to-pink-50' },
    { name: 'Forest', class: 'bg-gradient-to-br from-green-50 to-emerald-50' },
    { name: 'Warm Sand', class: 'bg-gradient-to-br from-yellow-50 to-orange-50' },
    { name: 'Ocean', class: 'bg-gradient-to-br from-cyan-50 to-blue-50' },
    { name: 'Lavender', class: 'bg-gradient-to-br from-purple-50 to-pink-50' },
  ];

  const handlePhotosSelected = (newPhotos: File[]) => {
    newPhotos.forEach(photo => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPhotos(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(photo);
    });
  };

  const handleSave = () => {
    if (title.trim() || content.trim() || photos.length > 0) {
      onSave({
        title: title || 'Untitled Entry',
        content,
        photos,
        backgroundStyle,
      });
      
      // Reset form
      setTitle('');
      setContent('');
      setPhotos([]);
      setBackgroundStyle('bg-gradient-to-br from-blue-50 to-purple-50');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Journal Entry</h2>
        
        <div className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entry Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My amazing day in..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Add Photos
            </label>
            <PhotoUpload onPhotosSelected={handlePhotosSelected} />
            
            {photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg shadow-md"
                    />
                    <button
                      onClick={() => setPhotos(prev => prev.filter((_, i) => i !== index))}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Background Style Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Choose Background Style
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.name}
                  onClick={() => setBackgroundStyle(bg.class)}
                  className={`h-16 rounded-lg border-2 transition-all ${bg.class} ${
                    backgroundStyle === bg.class 
                      ? 'border-purple-500 ring-2 ring-purple-200' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  title={bg.name}
                />
              ))}
            </div>
          </div>

          {/* Content Text Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Story
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tell us about your adventure... What did you see? How did you feel? What made this moment special?"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Preview
            </label>
            <Card className={`p-6 ${backgroundStyle} border-2 border-dashed border-gray-300`}>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {title || 'Your Title Here'}
              </h3>
              
              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              )}
              
              <p className="text-gray-700 leading-relaxed">
                {content || 'Your story will appear here...'}
              </p>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setTitle('');
                setContent('');
                setPhotos([]);
                setBackgroundStyle('bg-gradient-to-br from-blue-50 to-purple-50');
              }}
            >
              Clear All
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              disabled={!title.trim() && !content.trim() && photos.length === 0}
            >
              <Edit size={20} className="mr-2" />
              Save Entry
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JournalEditor;
