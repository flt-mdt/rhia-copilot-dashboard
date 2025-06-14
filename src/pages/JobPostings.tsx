import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';

const JobPostings = () => {
  const { t } = useLanguage();

  return (
    <div className="ml-64 p-8 bg-[#F9FAFB] min-h-screen">
      <Header title={t('jobs.title')} />
      <div>
        <h2>{t('jobs.allJobs')}</h2>
        <Button>{t('jobs.addNew')}</Button>
      </div>
    </div>
  );
};
export default JobPostings;
