
import { Trash2 } from 'lucide-react';

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
    isPolaroid?: boolean;
  };
}

interface ScrapbookElementProps {
  element: ScrapbookElement;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<ScrapbookElement>) => void;
  onDelete: () => void;
}

const ScrapbookElementComponent = ({ 
  element, 
  isSelected, 
  onSelect, 
  onUpdate, 
  onDelete 
}: ScrapbookElementProps) => {
  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX - element.x;
    const startY = e.clientY - element.y;
    
    const handleMouseMove = (e: MouseEvent) => {
      onUpdate({
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
  };

  return (
    <div
      className={`absolute cursor-move select-none ${
        isSelected ? 'ring-2 ring-purple-500' : ''
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
        onSelect();
      }}
      onMouseDown={handleMouseDown}
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
            onUpdate({ content: e.target.textContent || '' });
          }}
        >
          {element.content}
        </div>
      )}
      
      {element.type === 'photo' && (
        <div className={element.style.isPolaroid ? 'bg-white p-2 pb-6 shadow-lg' : ''}>
          <img
            src={element.content}
            alt="Scrapbook element"
            className={`w-full ${element.style.isPolaroid ? 'h-4/5' : 'h-full'} object-cover rounded-lg shadow-md`}
            draggable={false}
          />
          {element.style.isPolaroid && (
            <div className="text-center text-xs text-gray-600 mt-1 font-handwriting">
              Study Abroad Memory
            </div>
          )}
        </div>
      )}
      
      {element.type === 'sticker' && (
        <div className="w-full h-full flex items-center justify-center">
          {element.content.startsWith('data:') ? (
            <img src={element.content} alt="Custom sticker" className="w-full h-full object-cover rounded" />
          ) : (
            <div style={{ fontSize: element.style.fontSize }}>
              {element.content}
            </div>
          )}
        </div>
      )}
      
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
        >
          <Trash2 size={12} />
        </button>
      )}
    </div>
  );
};

export default ScrapbookElementComponent;
export type { ScrapbookElement };
