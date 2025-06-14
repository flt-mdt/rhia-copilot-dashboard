
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock, Eye, Check } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    iconWrapperClass: 'bg-blue-100',
    iconClass: 'text-blue-500',
    titleKey: 'subscription.security.cards.privacy.title',
    descriptionKey: 'subscription.security.cards.privacy.description',
    cardClass: 'bg-blue-50',
  },
  {
    icon: Eye,
    iconWrapperClass: 'bg-yellow-100',
    iconClass: 'text-yellow-600',
    titleKey: 'subscription.security.cards.access.title',
    descriptionKey: 'subscription.security.cards.access.description',
    cardClass: 'bg-yellow-50',
  },
  {
    icon: Check,
    iconWrapperClass: 'bg-rose-500',
    iconClass: 'text-white',
    titleKey: 'subscription.security.cards.compliance.title',
    descriptionKey: 'subscription.security.cards.compliance.description',
    cardClass: 'bg-rose-50',
  }
];

export const SecurityComplianceSection = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-24 mb-12">
      <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-12">
        {t('subscription.security.title')}
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div 
              key={index}
              className={`rounded-2xl p-6 flex flex-col ${feature.cardClass}`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${feature.iconWrapperClass} mb-6`}>
                <Icon className={`w-6 h-6 ${feature.iconClass}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t(feature.titleKey)}</h3>
              <p className="text-gray-600">{t(feature.descriptionKey)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
