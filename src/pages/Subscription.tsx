import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
  priceId: string; // Stripe price ID
}

const Subscription = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: t('subscription.plans.starter.name'),
      price: 29,
      currency: '€',
      period: '/mois',
      description: t('subscription.plans.starter.description'),
      priceId: 'price_starter_monthly',
      features: [
        { text: t('subscription.plans.starter.features.requests'), included: true },
        { text: t('subscription.plans.starter.features.accounts'), included: true },
        { text: t('subscription.plans.starter.features.emailSupport'), included: true },
        { text: t('subscription.plans.starter.features.platformAccess'), included: true },
        { text: t('subscription.plans.starter.features.hrReports'), included: false },
        { text: t('subscription.plans.starter.features.apiIntegration'), included: false },
        { text: t('subscription.plans.starter.features.dedicatedSupport'), included: false },
      ]
    },
    {
      id: 'pro',
      name: t('subscription.plans.pro.name'),
      price: 79,
      currency: '€',
      period: '/mois',
      description: t('subscription.plans.pro.description'),
      priceId: 'price_pro_monthly',
      features: [
        { text: t('subscription.plans.pro.features.requests'), included: true },
        { text: t('subscription.plans.pro.features.accounts'), included: true },
        { text: t('subscription.plans.pro.features.hrReports'), included: true },
        { text: t('subscription.plans.pro.features.prioritySupport'), included: true },
        { text: t('subscription.plans.pro.features.platformAccess'), included: true },
        { text: t('subscription.plans.pro.features.apiIntegration'), included: false },
        { text: t('subscription.plans.pro.features.dedicatedSupport'), included: false },
      ]
    },
    {
      id: 'enterprise',
      name: t('subscription.plans.enterprise.name'),
      price: 199,
      currency: '€',
      period: '/mois',
      description: t('subscription.plans.enterprise.description'),
      priceId: 'price_enterprise_monthly',
      features: [
        { text: t('subscription.plans.enterprise.features.requests'), included: true },
        { text: t('subscription.plans.enterprise.features.accounts'), included: true },
        { text: t('subscription.plans.enterprise.features.apiWebhooks'), included: true },
        { text: t('subscription.plans.enterprise.features.dedicatedSupport'), included: true },
        { text: t('subscription.plans.enterprise.features.hrReports'), included: true },
        { text: t('subscription.plans.enterprise.features.prioritySupport'), included: true },
        { text: t('subscription.plans.enterprise.features.platformAccess'), included: true },
      ]
    }
  ];

  const planColors = [
    { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
    { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
    { bg: 'bg-indigo-50', text: 'text-indigo-600', hover: 'hover:bg-indigo-100' },
  ];

  const handleSubscribe = async (priceId: string, planName: string) => {
    try {
      // TODO: Remplacer par votre véritable appel API
      console.log(`Création d'une session Stripe pour le plan: ${planName} (${priceId})`);
      
      // Exemple d'appel API (à adapter selon votre backend)
      /*
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          planName: planName,
        }),
      });
      
      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
      */
      
      // Simulation temporaire
      alert(`Redirection vers Stripe pour le plan ${planName}...`);
    } catch (error) {
      console.error('Erreur lors de la création de la session Stripe:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Sign In */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-lg">RHIA Copilot</span>
          </button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/login')}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
        </div>

        {/* Header content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('subscription.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subscription.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const colors = planColors[index % planColors.length];
            return (
              <div 
                key={plan.id}
                className={`rounded-2xl p-8 flex flex-col ${colors.bg}`}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}{plan.currency}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                
                <p className="text-gray-600 mb-8 flex-grow">{plan.description}</p>
                
                <div className="space-y-3 mb-10">
                  {plan.features.filter(f => f.included).map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <ChevronRight className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} />
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  variant="ghost"
                  className={`mt-auto w-full justify-center h-12 text-md font-semibold ${colors.hover} ${colors.text}`}
                >
                  Choisir ce plan
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
