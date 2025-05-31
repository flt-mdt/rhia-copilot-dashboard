
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface CollectionCardProps {
  collection: {
    id: string;
    title: string;
    description: string;
    count: number;
    icon: LucideIcon;
    color: string;
    items: any[];
  };
  onClick: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onClick }) => {
  const { title, description, count, icon: Icon, color } = collection;

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`${color} rounded-lg p-3 text-white`}>
            <Icon className="h-6 w-6" />
          </div>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            {count} {count === 1 ? 'élément' : 'éléments'}
          </Badge>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        {/* Preview thumbnails */}
        <div className="flex -space-x-2">
          {collection.items.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-medium"
            >
              {collection.id === 'candidates' 
                ? item.name?.charAt(0) || 'C'
                : item.title?.charAt(0) || 'B'
              }
            </div>
          ))}
          {collection.items.length > 3 && (
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-gray-600 text-xs font-medium">
              +{collection.items.length - 3}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
