
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = async (newLanguage: Language) => {
    await setLanguage(newLanguage);
    
    const languageNames = {
      en: 'English selected',
      fr: 'Français sélectionné',
      es: 'Español seleccionado'
    };
    
    toast({
      title: t('success.languageUpdated'),
      description: languageNames[newLanguage],
    });
  };

  const getLanguageDisplay = (lang: Language) => {
    const flags = {
      en: '🇺🇸',
      fr: '🇫🇷',
      es: '🇪🇸'
    };
    return flags[lang];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Languages className="h-5 w-5 text-primary" />
          <CardTitle>{t('settings.language')}</CardTitle>
        </div>
        <CardDescription>
          {t('settings.languageDescription')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select value={language} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue>
              {getLanguageDisplay(language)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">🇺🇸</SelectItem>
            <SelectItem value="fr">🇫🇷</SelectItem>
            <SelectItem value="es">🇪🇸</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default LanguageSelector;
