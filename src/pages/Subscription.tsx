
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, CreditCard, Users, Zap, Shield, Headphones, FileText, Settings } from 'lucide-react';
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

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: 29,
      currency: '€',
      period: '/mois',
      description: 'Parfait pour débuter avec l\'IA RH',
      priceId: 'price_starter_monthly', // À remplacer par votre vrai price ID Stripe
      features: [
        { text: '100 requêtes IA', included: true },
        { text: '1 compte RH', included: true },
        { text: 'Support par email', included: true },
        { text: 'Accès à la plateforme', included: true },
        { text: 'Génération de rapports RH', included: false },
        { text: 'Intégration API', included: false },
        { text: 'Support dédié', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 79,
      currency: '€',
      period: '/mois',
      description: 'Pour les équipes RH en croissance',
      highlighted: true,
      priceId: 'price_pro_monthly', // À remplacer par votre vrai price ID Stripe
      features: [
        { text: '1000 requêtes IA', included: true },
        { text: 'Jusqu\'à 3 comptes RH', included: true },
        { text: 'Génération de rapports RH', included: true },
        { text: 'Priorité support', included: true },
        { text: 'Accès à la plateforme', included: true },
        { text: 'Intégration API', included: false },
        { text: 'Support dédié', included: false },
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      currency: '€',
      period: '/mois',
      description: 'Solution complète pour grandes entreprises',
      priceId: 'price_enterprise_monthly', // À remplacer par votre vrai price ID Stripe
      features: [
        { text: 'Requêtes illimitées', included: true },
        { text: 'Jusqu\'à 10 comptes RH', included: true },
        { text: 'Intégration API & Webhooks', included: true },
        { text: 'Support dédié & onboarding', included: true },
        { text: 'Génération de rapports RH', included: true },
        { text: 'Priorité support', included: true },
        { text: 'Accès à la plateforme', included: true },
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
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choisissez votre plan d'abonnement
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Automatisez votre processus de recrutement avec notre IA avancée. 
            Payez uniquement pour ce que vous utilisez.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>Sans engagement • Résiliable à tout moment</span>
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
                    Le plus populaire
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
                  Souscrire
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
              Comparaison détaillée des fonctionnalités
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                    Fonctionnalités
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
                    Requêtes IA mensuelles
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">100</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">1 000</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">Illimitées</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-green-500" />
                    Comptes RH
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">1</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">3</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">10</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-500" />
                    Rapports RH
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Settings className="h-4 w-4 text-orange-500" />
                    API & Webhooks
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-400">✗</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-blue-500" />
                    Support
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
            Questions fréquentes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Puis-je changer de plan à tout moment ?
              </h4>
              <p className="text-gray-600 text-sm">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. 
                Les changements prennent effet immédiatement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Que se passe-t-il si je dépasse mon quota ?
              </h4>
              <p className="text-gray-600 text-sm">
                Nous vous préviendrons avant d'atteindre la limite. 
                Vous pourrez upgrader votre plan ou attendre le mois suivant.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Y a-t-il une période d'essai gratuite ?
              </h4>
              <p className="text-gray-600 text-sm">
                Chaque plan inclut une garantie de remboursement de 14 jours 
                si vous n'êtes pas satisfait.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Les données sont-elles sécurisées ?
              </h4>
              <p className="text-gray-600 text-sm">
                Oui, toutes vos données sont chiffrées et hébergées en Europe 
                conformément au RGPD.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Besoin d'aide pour choisir le bon plan ?
          </p>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Contactez notre équipe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
