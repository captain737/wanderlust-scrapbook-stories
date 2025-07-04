
import { Card } from '@/components/ui/card';
import { Book, Image as ImageIcon } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  photos: string[];
  date: Date;
  backgroundStyle: string;
}

interface JournalGalleryProps {
  entries: JournalEntry[];
  isVisible: boolean;
}

const JournalGallery = ({ entries, isVisible }: JournalGalleryProps) => {
  if (!isVisible) return null;

  if (entries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-16">
          <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Book className="text-purple-600" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your Journey Starts Here
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create your first journal entry to start documenting your amazing study abroad experience!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Journal Entries</h2>
        <p className="text-gray-600">
          {entries.length} {entries.length === 1 ? 'memory' : 'memories'} captured
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className={`overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${entry.backgroundStyle}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {entry.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {entry.date.toLocaleDateString()}
                </span>
              </div>

              {entry.photos.length > 0 && (
                <div className="mb-4">
                  {entry.photos.length === 1 ? (
                    <img
                      src={entry.photos[0]}
                      alt="Journal entry"
                      className="w-full h-40 object-cover rounded-lg shadow-sm"
                    />
                  ) : entry.photos.length === 2 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {entry.photos.slice(0, 2).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <img
                        src={entry.photos[0]}
                        alt="Main photo"
                        className="w-full h-32 object-cover rounded-lg shadow-sm"
                      />
                      <div className="relative">
                        <img
                          src={entry.photos[1]}
                          alt="Second photo"
                          className="w-full h-32 object-cover rounded-lg shadow-sm"
                        />
                        {entry.photos.length > 2 && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <div className="text-white text-center">
                              <ImageIcon size={24} className="mx-auto mb-1" />
                              <span className="text-sm font-semibold">
                                +{entry.photos.length - 2} more
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                {entry.content}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  {entry.photos.length > 0 && (
                    <span className="inline-flex items-center">
                      <ImageIcon size={16} className="mr-1" />
                      {entry.photos.length} photo{entry.photos.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <button className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JournalGallery;
