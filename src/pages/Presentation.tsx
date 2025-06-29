import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check, Star, Users, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSEO } from '@/hooks/useSEO';

const Presentation = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'RHIA Copilot - AI-Powered HR Recruitment Platform | Automate Your Hiring Process',
    description: 'Transform your recruitment process with RHIA Copilot\'s advanced AI technology. Streamline candidate screening, job matching, and HR workflows. Get started with a free trial today.',
    keywords: 'AI recruitment, HR automation, candidate screening, job matching, artificial intelligence hiring, recruitment software, HR technology, talent acquisition',
    canonical: 'https://dashboard.rekrut.pro/',
    ogImage: '/lovable-uploads/98d20c94-e540-454c-bdd4-b19b3b05d04e.png'
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to RHIA Copilot <Sparkles className="inline-block h-6 w-6 text-yellow-500 ml-2" />
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            The AI-powered HR recruitment platform that automates your hiring process.
          </p>
          <Button size="lg" className="bg-primary text-white hover:bg-primary-dark" onClick={() => navigate('/schedule-demo')}>
            Schedule a Demo <ArrowRight className="ml-2" />
          </Button>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-blue-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">AI-Powered Matching</h2>
              </div>
              <p className="text-gray-700">
                Instantly match candidates to jobs with our advanced AI algorithms.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-green-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Candidate Screening</h2>
              </div>
              <p className="text-gray-700">
                Automate candidate screening and identify top talent quickly.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">Enhanced Collaboration</h2>
              </div>
              <p className="text-gray-700">
                Improve team collaboration with shared candidate profiles and feedback.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Unlock the Power of AI for Your HR Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <Check className="inline-block h-5 w-5 text-green-500 mr-2" /> Save Time and Resources
              </h3>
              <p className="text-gray-700 mb-4">
                Reduce manual tasks and focus on strategic HR initiatives.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <Check className="inline-block h-5 w-5 text-green-500 mr-2" /> Improve Hiring Quality
              </h3>
              <p className="text-gray-700 mb-4">
                Find the best candidates with data-driven insights and AI-powered matching.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <Check className="inline-block h-5 w-5 text-green-500 mr-2" /> Reduce Bias
              </h3>
              <p className="text-gray-700 mb-4">
                Ensure fair and unbiased hiring decisions with AI-driven assessments.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                <Check className="inline-block h-5 w-5 text-green-500 mr-2" /> Stay Compliant
              </h3>
              <p className="text-gray-700 mb-4">
                Maintain compliance with automated tracking and reporting.
              </p>
            </div>
          </div>
        </section>

        {/* Security and Compliance Section */}
        <section className="bg-gray-50 py-12 rounded-lg shadow-md">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Security and Compliance <Shield className="inline-block h-8 w-8 text-gray-500 ml-2" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">GDPR Compliant</h3>
                <p className="text-gray-700">
                  Your data is protected with the highest standards of data privacy.
                </p>
              </div>
              <div>
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">End-to-End Encryption</h3>
                <p className="text-gray-700">
                  We use advanced encryption to keep your data secure at all times.
                </p>
              </div>
              <div>
                <Check className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Regular Audits</h3>
                <p className="text-gray-700">
                  Our systems are regularly audited to ensure the highest level of security.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Presentation;
