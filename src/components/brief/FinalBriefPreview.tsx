
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Copy, Check } from 'lucide-react';
import { briefBackendApi } from '@/services/briefBackendApi';

interface FinalBriefPreviewProps {
  onBack: () => void;
}

const FinalBriefPreview: React.FC<FinalBriefPreviewProps> = ({ onBack }) => {
  const [finalMarkdown, setFinalMarkdown] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    loadFinalBrief();
  }, []);

  const loadFinalBrief = async () => {
    setIsLoading(true);
    try {
      const markdown = await briefBackendApi.getFinalBrief();
      setFinalMarkdown(markdown);
    } catch (error) {
      console.error('Erreur lors du chargement du brief final:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalMarkdown);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([finalMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brief-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4" />
          <p>Génération du brief final...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Brief Final</span>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleCopy} size="sm">
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {isCopied ? 'Copié!' : 'Copier'}
            </Button>
            <Button variant="outline" onClick={handleDownload} size="sm">
              <Download className="h-4 w-4" />
              Télécharger
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto p-4 bg-gray-50 rounded border">
          <pre className="whitespace-pre-wrap text-sm">{finalMarkdown}</pre>
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Retour aux sections
          </Button>
          <Button onClick={() => briefBackendApi.resetSession()}>
            Nouveau brief
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinalBriefPreview;
