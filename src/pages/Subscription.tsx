import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SecurityComplianceSection } from '@/components/subscription/SecurityComplianceSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const Subscription = () => {
  const { t } = useLanguage();

  useSEO({
    title: 'Pricing Plans - RHIA Copilot | Choose Your AI Recruitment Solution',
    description: 'Choose the perfect RHIA Copilot plan for your HR needs. From Starter to Enterprise, find AI-powered recruitment solutions that scale with your business. No commitment required.',
    keywords: 'RHIA Copilot pricing, HR software plans, AI recruitment pricing, recruitment platform subscription, HR automation costs',
    canonical: 'https://dashboard.rekrut.pro/subscription'
  });

  return (
    <div className="transition-all duration-300 ease-in-out p-4 md:p-8 min-h-screen"
      style={{ marginLeft: 'var(--sidebar-width, 256px)' }}>
      <div className="container mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">{t('subscription.title')}</h1>
          <p className="text-gray-500 mt-2">{t('subscription.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Starter Plan */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t('subscription.plans.starter.name')}</CardTitle>
              <CardDescription className="text-gray-500">{t('subscription.plans.starter.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.requests')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.accounts')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.platformAccess')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.hrReports')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.apiIntegration')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.starter.features.emailSupport')}</span>
              </div>
              <Button className="w-full">{t('subscription.subscribe')}</Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t('subscription.plans.pro.name')}</CardTitle>
              <CardDescription className="text-gray-500">{t('subscription.plans.pro.description')}</CardDescription>
              <Badge className="bg-primary text-primary-foreground mt-2">{t('subscription.mostPopular')}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.requests')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.accounts')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.platformAccess')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.hrReports')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.apiIntegration')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.pro.features.prioritySupport')}</span>
              </div>
              <Button className="w-full">{t('subscription.subscribe')}</Button>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{t('subscription.plans.enterprise.name')}</CardTitle>
              <CardDescription className="text-gray-500">{t('subscription.plans.enterprise.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.requests')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.accounts')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.platformAccess')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.hrReports')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.apiWebhooks')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{t('subscription.plans.enterprise.features.dedicatedSupport')}</span>
              </div>
              <Button className="w-full">{t('subscription.subscribe')}</Button>
            </CardContent>
          </Card>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('subscription.comparison.title')}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-6 text-left font-medium text-gray-500 uppercase tracking-wider">{t('subscription.comparison.features')}</th>
                  <th className="py-3 px-6 text-center font-medium text-gray-500 uppercase tracking-wider">Starter</th>
                  <th className="py-3 px-6 text-center font-medium text-gray-500 uppercase tracking-wider">Pro</th>
                  <th className="py-3 px-6 text-center font-medium text-gray-500 uppercase tracking-wider">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center">
                      <span>{t('subscription.comparison.aiRequests')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-center">100</td>
                  <td className="py-4 px-6 border-b text-center">1000</td>
                  <td className="py-4 px-6 border-b text-center">{t('common.unlimited')}</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center">
                      <span>{t('subscription.comparison.hrAccounts')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-center">1</td>
                  <td className="py-4 px-6 border-b text-center">3</td>
                  <td className="py-4 px-6 border-b text-center">10</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center">
                      <span>{t('subscription.comparison.hrReports')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  <td className="py-4 px-6 border-b text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  <td className="py-4 px-6 border-b text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center">
                      <span>{t('subscription.comparison.apiWebhooks')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-center"><X className="h-4 w-4 mx-auto text-red-500" /></td>
                  <td className="py-4 px-6 border-b text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                  <td className="py-4 px-6 border-b text-center"><Check className="h-4 w-4 mx-auto text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-4 px-6 border-b">
                    <div className="flex items-center">
                      <span>{t('subscription.comparison.support')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 border-b text-center">{t('subscription.plans.starter.features.emailSupport')}</td>
                  <td className="py-4 px-6 border-b text-center">{t('subscription.plans.pro.features.prioritySupport')}</td>
                  <td className="py-4 px-6 border-b text-center">{t('subscription.plans.enterprise.features.dedicatedSupport')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('subscription.faq.title')}</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-md shadow-sm" open>
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.changePlan.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.changePlan.answer')}
              </div>
            </details>
            <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.exceedQuota.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.exceedQuota.answer')}
              </div>
            </details>
            <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.freeTrial.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.freeTrial.answer')}
              </div>
            </details>
            <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.dataSecure.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.dataSecure.answer')}
              </div>
            </details>
             <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.integration.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.integration.answer')}
              </div>
            </details>
             <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.aiModel.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.aiModel.answer')}
              </div>
            </details>
             <details className="border border-gray-200 rounded-md shadow-sm">
              <summary className="px-4 py-2 font-medium text-gray-800 list-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary">
                {t('subscription.faq.supportOnboarding.question')}
              </summary>
              <div className="px-4 py-2 text-gray-600">
                {t('subscription.faq.supportOnboarding.answer')}
              </div>
            </details>
          </div>
        </section>

        <section className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('subscription.cta.needHelp')}</h2>
          <Button variant="outline">{t('subscription.cta.contactTeam')}</Button>
        </section>

        <SecurityComplianceSection />
      </div>
    </div>
  );
};

export default Subscription;
