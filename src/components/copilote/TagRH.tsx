
import React from 'react';

interface TagRHProps {
  tag: string;
}

const TagRH: React.FC<TagRHProps> = ({ tag }) => {
  const getTagColor = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'paie':
        return 'bg-blue-100 text-blue-800';
      case 'formation':
        return 'bg-green-100 text-green-800';
      case 'entretien':
        return 'bg-purple-100 text-purple-800';
      case 'période d\'essai':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getTagColor(tag)}`}>
      #{tag}
    </span>
  );
};

export default TagRH;
