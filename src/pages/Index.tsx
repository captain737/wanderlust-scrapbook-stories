
import { useState } from 'react';
import Header from '@/components/Header';
import JournalEditor from '@/components/JournalEditor';
import JournalGallery from '@/components/JournalGallery';
import JournalEntryEditor from '@/components/JournalEntryEditor';
import { useToast } from '@/hooks/use-toast';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  photos: string[];
  date: Date;
  backgroundStyle: string;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'gallery' | 'editor' | 'edit-entry'>('gallery');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const { toast } = useToast();

  const handleNewEntry = () => {
    setActiveView('editor');
  };

  const handleSaveEntry = (entryData: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entryData,
      id: Date.now().toString(),
      date: new Date(),
    };

    setEntries(prev => [newEntry, ...prev]);
    setActiveView('gallery');
    
    toast({
      title: "Journal Entry Saved! ✨",
      description: "Your memory has been captured and added to your journal.",
    });
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setActiveView('edit-entry');
  };

  const handleUpdateEntry = (updatedEntry: JournalEntry) => {
    setEntries(prev => prev.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
    setActiveView('gallery');
    setEditingEntry(null);
    
    toast({
      title: "Entry Updated! ✨",
      description: "Your journal entry has been successfully updated.",
    });
  };

  const handleDeleteEntry = (entryId: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    setActiveView('gallery');
    setEditingEntry(null);
    
    toast({
      title: "Entry Deleted",
      description: "Your journal entry has been removed.",
    });
  };

  const handleCloseEditor = () => {
    setActiveView('gallery');
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header
        onNewEntry={handleNewEntry}
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      <main className="py-8">
        <JournalEditor
          onSave={handleSaveEntry}
          isVisible={activeView === 'editor'}
        />
        
        <JournalGallery
          entries={entries}
          isVisible={activeView === 'gallery'}
          onEditEntry={handleEditEntry}
        />

        {editingEntry && (
          <JournalEntryEditor
            entry={editingEntry}
            onSave={handleUpdateEntry}
            onDelete={handleDeleteEntry}
            onClose={handleCloseEditor}
            isVisible={activeView === 'edit-entry'}
          />
        )}
      </main>
      
      {/* Welcome Message for First Time Users */}
      {entries.length === 0 && activeView === 'gallery' && (
        <div className="fixed bottom-8 right-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg shadow-lg max-w-sm">
            <h4 className="font-semibold mb-2">Welcome to your journal! 🎒</h4>
            <p className="text-sm">
              Click "New Entry" to start documenting your study abroad adventure!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
