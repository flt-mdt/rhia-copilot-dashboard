
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import api from '@/api/index';

interface SearchFormProps {
  onSearch: (criteria: string) => void;
  onResults?: (candidates: any[]) => void;
  isLoading: boolean;
  userId: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onResults, isLoading, userId }) => {
  const { t } = useLanguage();
  const [searchCriteria, setSearchCriteria] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [searchId, setSearchId] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'done'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchCriteria(e.target.value);

    if (e.target.value.length > 10) {
      const extractedTags: string[] = [];

      const techSkills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'AWS', 'DevOps'];
      const locations = ['Paris', 'Lyon', 'Remote', 'France', 'Europe'];
      const levels = ['Senior', 'Junior', 'Lead', 'Manager', 'CTO'];

      [...techSkills, ...locations, ...levels].forEach(term => {
        if (e.target.value.toLowerCase().includes(term.toLowerCase())) {
          extractedTags.push(term);
        }
      });

      setTags([...new Set(extractedTags)]);
    } else {
      setTags([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('pending');

    try {
      const res = await api.post('/search', {
        user_id: userId,
        brief_text: searchCriteria,
        language: 'fr',
        platforms: ['linkedin', 'github', 'welcometothejungle'],
        max_candidates: 10
      });

      const id = res.data?.search_id;

      if (!id) {
        console.error('❌ search_id manquant dans la réponse API');
        setStatus('idle');
        return;
      }

      console.log(`✅ search_id reçu : ${id}`);
      setSearchId(id);
      pollSearchStatus(id);
      onSearch(searchCriteria);
    } catch (err) {
      console.error('Erreur API:', err);
      setStatus('idle');
    }
  };

  const pollSearchStatus = async (id: string) => {
  try {
    const res = await api.get(`/search/${id}/status`);
    const { status, is_terminal } = res.data;

    if (status === 'done') {
      fetchResults();
    } else if (is_terminal) {
      setStatus('idle');
      // Optionnel : afficher un message d’erreur ou “aucun résultat”
    } else {
      setTimeout(() => pollSearchStatus(id), 3000);
    }
  } catch (err) {
    console.error('Polling error:', err);
    setStatus('idle');
  }
};


  const fetchResults = async () => {
    try {
      const res = await api.get(`/results/${userId}?min_score=80&limit=10`);
      if (typeof onResults === 'function') {
        onResults(res.data.candidates);
      }
      setStatus('done');
    } catch (err) {
      console.error('Fetch error:', err);
      setStatus('idle');
    }
  };

  return (
    <Card className="rounded-xl bg-white shadow-sm max-w-3xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-gray-800">
          {t('hunter.subtitle')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="search-criteria" className="block text-sm font-medium text-gray-700 mb-2">
              {t('hunter.description')}
            </label>
            <Textarea
              id="search-criteria"
              value={searchCriteria}
              onChange={handleChange}
              placeholder={t('hunter.placeholder')}
              className="rounded-md bg-gray-50 text-sm focus:outline-blue-600 resize-none"
              rows={5}
            />
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-0"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md w-full md:w-auto"
            disabled={isLoading || searchCriteria.trim().length < 10}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {t('hunter.searching')}
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                {t('hunter.searchButton')}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
