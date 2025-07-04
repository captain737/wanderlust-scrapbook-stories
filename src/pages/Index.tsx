
import { useState } from 'react';
import Header from '@/components/Header';
import ScrapbookEditor from '@/components/ScrapbookEditor';
import JournalGallery from '@/components/JournalGallery';
import { useToast } from '@/hooks/use-toast';

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

interface Scrapbook {
  id: string;
  title: string;
  elements: ScrapbookElement[];
  date: Date;
  backgroundStyle: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'gallery' | 'editor' | 'edit-entry'>('gallery');
  const [scrapbooks, setScrapbooks] = useState<Scrapbook[]>([]);
  const { toast } = useToast();

  const handleNewScrapbook = () => {
    setActiveView('editor');
  };

  const handleSaveScrapbook = (scrapbookData: { title: string; elements: ScrapbookElement[]; backgroundStyle: string }) => {
    const newScrapbook: Scrapbook = {
      ...scrapbookData,
      id: Date.now().toString(),
      date: new Date(),
    };

    setScrapbooks(prev => [newScrapbook, ...prev]);
    setActiveView('gallery');
    
    toast({
      title: "Scrapbook Saved! ✨",
      description: "Your study abroad memories have been captured in your scrapbook.",
    });
  };

  // Convert scrapbooks to journal entries format for the gallery
  const journalEntries = scrapbooks.map(scrapbook => ({
    id: scrapbook.id,
    title: scrapbook.title,
    content: `Scrapbook with ${scrapbook.elements.length} elements`,
    photos: scrapbook.elements
      .filter(el => el.type === 'photo')
      .map(el => el.content)
      .slice(0, 4),
    date: scrapbook.date,
    backgroundStyle: scrapbook.backgroundStyle,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        onNewEntry={handleNewScrapbook}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <main className="py-8">
        <ScrapbookEditor
          onSave={handleSaveScrapbook}
          isVisible={activeView === 'editor'}
        />
        
        <JournalGallery
          entries={journalEntries}
          isVisible={activeView === 'gallery'}
          onEditEntry={() => {}} // Placeholder for now
        />
      </main>
      
      {/* Welcome Message for First Time Users */}
      {scrapbooks.length === 0 && activeView === 'gallery' && (
        <div className="fixed bottom-8 right-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h4 className="font-semibold mb-2">Welcome to your scrapbook studio! 🎨</h4>
            <p className="text-sm">
              Click "New Scrapbook" to start creating your study abroad memory collage!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
