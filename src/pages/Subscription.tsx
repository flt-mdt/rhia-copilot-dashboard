
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Users, Zap, Shield, Headphones, FileText, Settings, LogIn } from 'lucide-react';
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
      priceId: 'price_starter_monthly', // À remplacer par votre vrai price ID Stripe
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
      highlighted: true,
      priceId: 'price_pro_monthly', // À remplacer par votre vrai price ID Stripe
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
      priceId: 'price_enterprise_monthly', // À remplacer par votre vrai price ID Stripe
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header avec bouton Sign In */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fdc4d16b-8516-4b74-b559-2340f062242b.png" 
              alt="RHIA Copilot Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-semibold text-lg">RHIA Copilot</span>
          </div>
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('subscription.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>{t('subscription.noCommitment')}</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 hover:shadow-2xl ${
                plan.highlighted 
                  ? 'border-2 border-blue-500 shadow-xl scale-105' 
                  : 'border border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t('subscription.mostPopular')}
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}{plan.currency}
                  </span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <Button 
                  onClick={() => handleSubscribe(plan.priceId, plan.name)}
                  className={`w-full mb-8 h-12 text-lg font-semibold ${
                    plan.highlighted
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {t('subscription.subscribe')}
                </Button>

                <div className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                        feature.included 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Check className="h-3 w-3" />
                      </div>
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="px-8 py-6 bg-gray-50 border-b">
            <h3 className="text-2xl font-bold text-gray-900 text-center">
              {t('subscription.comparison.title')}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    {t('subscription.comparison.features')}
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    {t('subscription.comparison.aiRequests')}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">100</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">1 000</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Illimitées</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    {t('subscription.comparison.hrAccounts')}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">1</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">3</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">10</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    {t('subscription.comparison.hrReports')}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4 text-orange-500" />
                    {t('subscription.comparison.apiWebhooks')}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-blue-500" />
                    {t('subscription.comparison.support')}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Email</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Prioritaire</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Dédié</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t('subscription.faq.title')}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('subscription.faq.changePlan.question')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('subscription.faq.changePlan.answer')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('subscription.faq.exceedQuota.question')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('subscription.faq.exceedQuota.answer')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('subscription.faq.freeTrial.question')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('subscription.faq.freeTrial.answer')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('subscription.faq.dataSecure.question')}
              </h4>
              <p className="text-gray-600 text-sm">
                {t('subscription.faq.dataSecure.answer')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t('subscription.cta.needHelp')}
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            {t('subscription.cta.contactTeam')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
