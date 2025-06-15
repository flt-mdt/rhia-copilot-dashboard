import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogIn, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SecurityComplianceSection } from '@/components/subscription/SecurityComplianceSection';

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
        { text: t('subscription.plans.starter.features.hrReports'), included: true },
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
        { text: t('subscription.plans.pro.features.apiIntegration'), included: true },
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

  const faqs = [
    {
      id: 'faq1',
      question: t('subscription.faq.changePlan.question'),
      answer: t('subscription.faq.changePlan.answer'),
    },
    {
      id: 'faq2',
      question: t('subscription.faq.exceedQuota.question'),
      answer: t('subscription.faq.exceedQuota.answer'),
    },
    {
      id: 'faq3',
      question: t('subscription.faq.freeTrial.question'),
      answer: t('subscription.faq.freeTrial.answer'),
    },
    {
      id: 'faq4',
      question: t('subscription.faq.dataSecure.question'),
      answer: t('subscription.faq.dataSecure.answer'),
    },
    {
      id: 'faq5',
      question: t('subscription.faq.integration.question'),
      answer: t('subscription.faq.integration.answer'),
    },
    {
      id: 'faq6',
      question: t('subscription.faq.aiModel.question'),
      answer: t('subscription.faq.aiModel.answer'),
    },
    {
      id: 'faq7',
      question: t('subscription.faq.supportOnboarding.question'),
      answer: t('subscription.faq.supportOnboarding.answer'),
    },
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
        {/* Header avec bouton Planifier une démo puis Connexion */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-lg">RHIA Copilot</span>
          </button>
          {/* Boutons pixel perfect */}
          <div className="flex gap-3">
            <Button
              onClick={() => navigate('/schedule-demo')}
              className="h-12 px-7 rounded-full border-[1.5px] border-[#b3c6e0] bg-white text-[#24426b] font-medium text-base shadow-sm hover:bg-[#f6fafd] hover:text-[#24426b] hover:border-[#3882f6] transition-all"
              style={{ boxShadow: '0 1px 2px 0 rgba(16,30,54,0.07)', fontFamily: 'Inter, sans-serif', minWidth: 170 }}
            >
              {t('common.planDemo')}
            </Button>
            <Button
              onClick={() => navigate('/login')}
              className="h-12 px-7 rounded-full bg-[#3882f6] text-white font-medium text-base border-0 shadow-sm hover:bg-[#2563eb] transition-all"
              style={{ boxShadow: '0 1.5px 3px 0 rgba(16,30,54,0.09)', fontFamily: 'Inter, sans-serif', minWidth: 140 }}
            >
              {t('common.signIn')}
            </Button>
          </div>
        </div>

        {/* Header content */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 mb-4">
            {t('subscription.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subscription.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            return (
              <div 
                key={plan.id}
                className="rounded-2xl p-8 flex flex-col bg-blue-50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">
                    {plan.price}{plan.currency}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                
                <p className="text-gray-600 mb-8">{plan.description}</p>
                
                <div className="space-y-3 mb-10">
                  {plan.features.filter(f => f.included).map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  variant="ghost"
                  className="mt-auto w-full justify-center h-12 text-md font-semibold hover:bg-blue-100 text-blue-600"
                >
                  Choisir ce plan
                </Button>
              </div>
            )
          })}
        </div>
        
        {/* Section Sécurité & Conformité */}
        <SecurityComplianceSection />

        {/* FAQ Section */}
        <div className="mt-24 mb-12">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="md:col-span-1">
              <h2 className="text-4xl md:text-5xl font-geist font-bold text-gray-900 leading-tight">
                {t('subscription.faq.title')}
              </h2>
            </div>
            <div className="md:col-span-2">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem value={faq.id} key={faq.id}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Subscription;
