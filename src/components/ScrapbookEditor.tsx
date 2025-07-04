
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Save, Plus, Type, Image as ImageIcon, Sticker, Move, Trash2 } from 'lucide-react';
import PhotoUpload from './PhotoUpload';

interface ScrapbookElement {
  id: string;
  type: 'text' | 'photo' | 'sticker';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  style: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    rotation?: number;
  };
}

interface ScrapbookProps {
  onSave: (scrapbook: { title: string; elements: ScrapbookElement[]; backgroundStyle: string }) => void;
  isVisible: boolean;
}

const ScrapbookEditor = ({ onSave, isVisible }: ScrapbookProps) => {
  const [title, setTitle] = useState('My Study Abroad Adventure');
  const [elements, setElements] = useState<ScrapbookElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [backgroundStyle, setBackgroundStyle] = useState('bg-gradient-to-br from-blue-50 to-purple-50');
  const [draggedElement, setDraggedElement] = useState<string | null>(null);

  const backgroundOptions = [
    { name: 'Sky Blue', class: 'bg-gradient-to-br from-blue-50 to-purple-50' },
    { name: 'Sunset', class: 'bg-gradient-to-br from-orange-50 to-pink-50' },
    { name: 'Forest', class: 'bg-gradient-to-br from-green-50 to-emerald-50' },
    { name: 'Warm Sand', class: 'bg-gradient-to-br from-yellow-50 to-orange-50' },
    { name: 'Ocean', class: 'bg-gradient-to-br from-cyan-50 to-blue-50' },
    { name: 'Lavender', class: 'bg-gradient-to-br from-purple-50 to-pink-50' },
  ];

  const stickerOptions = ['🌍', '✈️', '📸', '🎒', '🗺️', '🏛️', '🍕', '🎭', '🌅', '🚂', '🏖️', '⭐'];

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

  const updateElement = (id: string, updates: Partial<ScrapbookElement>) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
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
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Add Elements</h3>
              <div className="space-y-2">
                <Button
                  onClick={addTextElement}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Type size={16} className="mr-2" />
                  Add Text
                </Button>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Add Photos</p>
                  <PhotoUpload onPhotosSelected={handlePhotosSelected} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Stickers</h3>
              <div className="grid grid-cols-4 gap-2">
                {stickerOptions.map((sticker, index) => (
                  <button
                    key={index}
                    onClick={() => addStickerElement(sticker)}
                    className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {sticker}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Background</h3>
              <div className="grid grid-cols-2 gap-2">
                {backgroundOptions.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => setBackgroundStyle(bg.class)}
                    className={`h-12 rounded-lg border-2 transition-all ${bg.class} ${
                      backgroundStyle === bg.class 
                        ? 'border-purple-500 ring-2 ring-purple-200' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    title={bg.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <div
              className={`relative w-full h-96 lg:h-[600px] ${backgroundStyle} border-2 border-dashed border-gray-300 rounded-lg overflow-hidden`}
              onClick={() => setSelectedElement(null)}
            >
              {elements.map((element) => (
                <div
                  key={element.id}
                  className={`absolute cursor-move select-none ${
                    selectedElement === element.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  style={{
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    transform: `rotate(${element.style.rotation || 0}deg)`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                  onMouseDown={(e) => {
                    const startX = e.clientX - element.x;
                    const startY = e.clientY - element.y;
                    
                    const handleMouseMove = (e: MouseEvent) => {
                      updateElement(element.id, {
                        x: e.clientX - startX,
                        y: e.clientY - startY,
                      });
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                >
                  {element.type === 'text' && (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="w-full h-full outline-none"
                      style={{
                        fontSize: element.style.fontSize,
                        fontFamily: element.style.fontFamily,
                        color: element.style.color,
                        backgroundColor: element.style.backgroundColor,
                      }}
                      onBlur={(e) => {
                        updateElement(element.id, { content: e.target.textContent || '' });
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === 'photo' && (
                    <img
                      src={element.content}
                      alt="Scrapbook element"
                      className="w-full h-full object-cover rounded-lg shadow-md"
                      draggable={false}
                    />
                  )}
                  
                  {element.type === 'sticker' && (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        fontSize: element.style.fontSize,
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {selectedElement === element.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(element.id);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              ))}
              
              {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Start creating your scrapbook!</p>
                    <p className="text-sm">Add photos, text, and stickers using the tools on the left</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScrapbookEditor;
