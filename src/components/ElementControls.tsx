
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrapbookElement } from './ScrapbookElement';

interface ElementControlsProps {
  selectedElement: ScrapbookElement;
  onUpdateStyle: (styleUpdates: Partial<ScrapbookElement['style']>) => void;
  onTogglePolaroid: () => void;
}

const ElementControls = ({ selectedElement, onUpdateStyle, onTogglePolaroid }: ElementControlsProps) => {
  const fontOptions = [
    'Arial', 'Georgia', 'Times New Roman', 'Helvetica', 'Verdana', 
    'Comic Sans MS', 'Impact', 'Trebuchet MS', 'Courier New', 'Brush Script MT'
  ];

  const fontSizes = [12, 16, 20, 24, 28, 32, 40, 48, 56, 72];

  return (
    <div className="border-t pt-4">
      <h3 className="font-semibold mb-3 text-gray-700">Edit Selected</h3>
      
      {selectedElement.type === 'text' && (
        <div className="space-y-3">
          <div>
            <label className="text-sm text-gray-600">Font</label>
            <Select 
              value={selectedElement.style.fontFamily || 'Arial'} 
              onValueChange={(value) => onUpdateStyle({ fontFamily: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map(font => (
                  <SelectItem key={font} value={font}>{font}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Size</label>
            <Select 
              value={String(selectedElement.style.fontSize || 16)} 
              onValueChange={(value) => onUpdateStyle({ fontSize: Number(value) })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontSizes.map(size => (
                  <SelectItem key={size} value={String(size)}>{size}px</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Color</label>
            <input
              type="color"
              value={selectedElement.style.color || '#333333'}
              onChange={(e) => onUpdateStyle({ color: e.target.value })}
              className="w-full h-10 rounded border cursor-pointer"
            />
          </div>
        </div>
      )}
      
      {selectedElement.type === 'photo' && (
        <div className="space-y-3">
          <Button
            onClick={onTogglePolaroid}
            variant={selectedElement.style.isPolaroid ? "default" : "outline"}
            className="w-full"
          >
            {selectedElement.style.isPolaroid ? 'Remove Polaroid' : 'Make Polaroid'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ElementControls;
