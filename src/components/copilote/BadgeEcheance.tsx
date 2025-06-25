
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface BadgeEcheanceProps {
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

const BadgeEcheance: React.FC<BadgeEcheanceProps> = ({ deadline, priority }) => {
  const getVariant = () => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    if (diffDays > 0) return `Dans ${diffDays}j`;
    return `Retard ${Math.abs(diffDays)}j`;
  };

  return (
    <Badge variant={getVariant()} className="text-xs">
      {formatDate(deadline)}
    </Badge>
  );
};

export default BadgeEcheance;
