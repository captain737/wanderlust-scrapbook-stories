
import { Book, Plus, Image, Sticker } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNewEntry: () => void;
  activeView: 'gallery' | 'editor';
  onViewChange: (view: 'gallery' | 'editor') => void;
}

const Header = ({ onNewEntry, activeView, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-500 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Book className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">Study Abroad Journal</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onViewChange('gallery')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === 'gallery' 
                  ? 'bg-white text-purple-600 font-semibold' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => onViewChange('editor')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeView === 'editor' 
                  ? 'bg-white text-purple-600 font-semibold' 
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Editor
            </button>
          </nav>

          <Button
            onClick={onNewEntry}
            className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
          >
            <Plus size={20} className="mr-2" />
            New Entry
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
