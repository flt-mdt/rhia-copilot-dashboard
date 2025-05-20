
import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
}

const StarRating = ({ value, onChange, maxStars = 5 }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  
  return (
    <div className="flex items-center">
      {[...Array(maxStars)].map((_, index) => {
        const ratingValue = index + 1;
        const filled = (hoverValue !== null ? ratingValue <= hoverValue : ratingValue <= value);
        
        return (
          <Star
            key={index}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              filled ? 'text-amber-400 fill-amber-400' : 'text-gray-300'
            }`}
            onMouseEnter={() => setHoverValue(ratingValue)}
            onMouseLeave={() => setHoverValue(null)}
            onClick={() => onChange(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
