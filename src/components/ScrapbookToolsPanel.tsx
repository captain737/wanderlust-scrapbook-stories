
import { Button } from '@/components/ui/button';
import { Type } from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import ElementControls from './ElementControls';
import { ScrapbookElement } from './ScrapbookElement';

interface ScrapbookToolsPanelProps {
  selectedElement: ScrapbookElement | null;
  customStickers: string[];
  backgroundStyle: string;
  onAddTextElement: () => void;
  onPhotosSelected: (photos: File[]) => void;
  onCustomStickerUpload: (photos: File[]) => void;
  onAddStickerElement: (sticker: string) => void;
  onUpdateElementStyle: (id: string, styleUpdates: Partial<ScrapbookElement['style']>) => void;
  onTogglePolaroid: (id: string) => void;
  onSetBackgroundStyle: (style: string) => void;
}

const ScrapbookToolsPanel = ({
  selectedElement,
  customStickers,
  backgroundStyle,
  onAddTextElement,
  onPhotosSelected,
  onCustomStickerUpload,
  onAddStickerElement,
  onUpdateElementStyle,
  onTogglePolaroid,
  onSetBackgroundStyle
}: ScrapbookToolsPanelProps) => {
  const stickerOptions = ['🌍', '✈️', '📸', '🎒', '🗺️', '🏛️', '🍕', '🎭', '🌅', '🚂', '🏖️', '⭐'];
  
  const backgroundOptions = [
    { name: 'Sky Blue', class: 'bg-gradient-to-br from-blue-50 to-purple-50' },
    { name: 'Sunset', class: 'bg-gradient-to-br from-orange-50 to-pink-50' },
    { name: 'Forest', class: 'bg-gradient-to-br from-green-50 to-emerald-50' },
    { name: 'Warm Sand', class: 'bg-gradient-to-br from-yellow-50 to-orange-50' },
    { name: 'Ocean', class: 'bg-gradient-to-br from-cyan-50 to-blue-50' },
    { name: 'Lavender', class: 'bg-gradient-to-br from-purple-50 to-pink-50' },
  ];

  return (
    <div className="lg:col-span-1 space-y-4">
      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Add Elements</h3>
        <div className="space-y-2">
          <Button
            onClick={onAddTextElement}
            variant="outline"
            className="w-full justify-start"
          >
            <Type size={16} className="mr-2" />
            Add Text
          </Button>
          <div>
            <p className="text-sm text-gray-600 mb-2">Add Photos</p>
            <PhotoUpload onPhotosSelected={onPhotosSelected} />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Create Custom Stickers</p>
            <PhotoUpload onPhotosSelected={onCustomStickerUpload} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Stickers</h3>
        <div className="grid grid-cols-4 gap-2">
          {stickerOptions.map((sticker, index) => (
            <button
              key={index}
              onClick={() => onAddStickerElement(sticker)}
              className="text-2xl p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sticker}
            </button>
          ))}
          {customStickers.map((sticker, index) => (
            <button
              key={`custom-${index}`}
              onClick={() => onAddStickerElement(sticker)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img src={sticker} alt="Custom sticker" className="w-8 h-8 object-cover rounded" />
            </button>
          ))}
        </div>
      </div>

      {selectedElement && (
        <ElementControls
          selectedElement={selectedElement}
          onUpdateStyle={(styleUpdates) => onUpdateElementStyle(selectedElement.id, styleUpdates)}
          onTogglePolaroid={() => onTogglePolaroid(selectedElement.id)}
        />
      )}

      <div>
        <h3 className="font-semibold mb-3 text-gray-700">Background</h3>
        <div className="grid grid-cols-2 gap-2">
          {backgroundOptions.map((bg) => (
            <button
              key={bg.name}
              onClick={() => onSetBackgroundStyle(bg.class)}
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
  );
};

export default ScrapbookToolsPanel;
