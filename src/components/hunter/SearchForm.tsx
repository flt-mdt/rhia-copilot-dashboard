
import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { hunterApi } from '@/api/index';

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
      const res = await hunterApi.post('/search', {
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
      const res = await hunterApi.get(`/search/${id}/status`);
      const { status, is_terminal } = res.data;

      if (status === 'done') {
        fetchResults();
      } else if (is_terminal) {
        setStatus('idle');
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
      const res = await hunterApi.get(`/results/${userId}?min_score=80&limit=10`);
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
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Search Input */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8">
            <Textarea
              id="search-criteria"
              value={searchCriteria}
              onChange={handleChange}
              placeholder="Décrivez votre besoin de formation (métier, niveau d'expertise, matériel...)"
              className="w-full border-0 bg-transparent text-lg placeholder:text-gray-400 resize-none focus:ring-0 min-h-[120px] p-0"
              rows={4}
            />
            
            <div className="flex items-center justify-between mt-6">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-blue-50 text-blue-600 hover:bg-blue-50 border-blue-200 px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 text-base h-12"
                disabled={isLoading || searchCriteria.trim().length < 10}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                    Recherche...
                  </>
                ) : (
                  <>
                    <ChevronRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-medium">Métier</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-medium">Expertise</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-6 py-3 rounded-full">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-medium">Matériel</span>
          </div>
        </div>

        {/* Suggestions Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-6">Suggestions</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200 rounded-full px-6 py-2 font-medium"
              onClick={() => setSearchCriteria('Installateur photovoltaïque débutant')}
            >
              Installateur photovoltaïque débutant
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200 rounded-full px-6 py-2 font-medium"
              onClick={() => setSearchCriteria('Mise à niveau onduleur')}
            >
              Mise à niveau onduleur
            </Button>
            <Button
              type="button"
              variant="outline"
              className="bg-white hover:bg-blue-50 text-blue-600 border-blue-200 rounded-full px-6 py-2 font-medium"
              onClick={() => setSearchCriteria('Pose sur tuiles')}
            >
              Pose sur tuiles
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
