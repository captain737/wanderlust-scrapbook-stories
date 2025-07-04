
import { Image as ImageIcon } from 'lucide-react';
import ScrapbookElementComponent, { ScrapbookElement } from './ScrapbookElement';

interface ScrapbookCanvasProps {
  elements: ScrapbookElement[];
  selectedElement: string | null;
  backgroundStyle: string;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<ScrapbookElement>) => void;
  onDeleteElement: (id: string) => void;
}

const ScrapbookCanvas = ({
  elements,
  selectedElement,
  backgroundStyle,
  onSelectElement,
  onUpdateElement,
  onDeleteElement
}: ScrapbookCanvasProps) => {
  return (
    <div
      className={`relative w-full h-96 lg:h-[600px] ${backgroundStyle} border-2 border-dashed border-gray-300 rounded-lg overflow-hidden`}
      onClick={() => onSelectElement(null)}
    >
      {elements.map((element) => (
        <ScrapbookElementComponent
          key={element.id}
          element={element}
          isSelected={selectedElement === element.id}
          onSelect={() => onSelectElement(element.id)}
          onUpdate={(updates) => onUpdateElement(element.id, updates)}
          onDelete={() => onDeleteElement(element.id)}
        />
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
  );
};

export default ScrapbookCanvas;
