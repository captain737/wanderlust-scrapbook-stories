
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save } from 'lucide-react';
import ScrapbookCanvas from './ScrapbookCanvas';
import ScrapbookToolsPanel from './ScrapbookToolsPanel';
import { ScrapbookElement } from './ScrapbookElement';

interface ScrapbookProps {
  onSave: (scrapbook: { title: string; elements: ScrapbookElement[]; backgroundStyle: string }) => void;
  isVisible: boolean;
}

const ScrapbookEditor = ({ onSave, isVisible }: ScrapbookProps) => {
  const [title, setTitle] = useState('My Study Abroad Adventure');
  const [elements, setElements] = useState<ScrapbookElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState('bg-gradient-to-br from-blue-50 to-purple-50');
  const [customStickers, setCustomStickers] = useState<string[]>([]);

  const selectedEl = elements.find(el => el.id === selectedElement);

  const addTextElement = () => {
    const newElement: ScrapbookElement = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Click to edit text',
      x: Math.random() * 300,
      y: Math.random() * 200,
      width: 200,
      height: 50,
      style: {
        fontSize: 16,
        fontFamily: 'Arial',
        color: '#333333',
        backgroundColor: 'transparent',
      }
    };
    setElements(prev => [...prev, newElement]);
  };

  const addStickerElement = (sticker: string) => {
    const newElement: ScrapbookElement = {
      id: Date.now().toString(),
      type: 'sticker',
      content: sticker,
      x: Math.random() * 400,
      y: Math.random() * 300,
      width: 50,
      height: 50,
      style: {
        fontSize: 40,
      }
    };
    setElements(prev => [...prev, newElement]);
  };

  const handlePhotosSelected = (photos: File[]) => {
    photos.forEach(photo => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newElement: ScrapbookElement = {
            id: Date.now().toString() + Math.random(),
            type: 'photo',
            content: e.target.result as string,
            x: Math.random() * 200,
            y: Math.random() * 200,
            width: 150,
            height: 150,
            style: {}
          };
          setElements(prev => [...prev, newElement]);
        }
      };
      reader.readAsDataURL(photo);
    });
  };

  const handleCustomStickerUpload = (photos: File[]) => {
    photos.forEach(photo => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const imageUrl = e.target.result as string;
          setCustomStickers(prev => [...prev, imageUrl]);
          
          const newElement: ScrapbookElement = {
            id: Date.now().toString() + Math.random(),
            type: 'sticker',
            content: imageUrl,
            x: Math.random() * 400,
            y: Math.random() * 300,
            width: 80,
            height: 80,
            style: {}
          };
          setElements(prev => [...prev, newElement]);
        }
      };
      reader.readAsDataURL(photo);
    });
  };

  const updateElement = (id: string, updates: Partial<ScrapbookElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const updateElementStyle = (id: string, styleUpdates: Partial<ScrapbookElement['style']>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, style: { ...el.style, ...styleUpdates } } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const togglePolaroid = (id: string) => {
    const element = elements.find(el => el.id === id);
    if (element && element.type === 'photo') {
      updateElementStyle(id, { isPolaroid: !element.style.isPolaroid });
    }
  };

  const handleSave = () => {
    onSave({
      title,
      elements,
      backgroundStyle
    });
  };

  if (!isVisible) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-3xl font-bold bg-transparent border-none outline-none text-gray-800 w-full"
              placeholder="My Scrapbook Title"
            />
          </div>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Save size={20} className="mr-2" />
            Save Scrapbook
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <ScrapbookToolsPanel
            selectedElement={selectedEl || null}
            customStickers={customStickers}
            backgroundStyle={backgroundStyle}
            onAddTextElement={addTextElement}
            onPhotosSelected={handlePhotosSelected}
            onCustomStickerUpload={handleCustomStickerUpload}
            onAddStickerElement={addStickerElement}
            onUpdateElementStyle={updateElementStyle}
            onTogglePolaroid={togglePolaroid}
            onSetBackgroundStyle={setBackgroundStyle}
          />

          <div className="lg:col-span-3">
            <ScrapbookCanvas
              elements={elements}
              selectedElement={selectedElement}
              backgroundStyle={backgroundStyle}
              onSelectElement={setSelectedElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScrapbookEditor;
