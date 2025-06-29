import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSEO } from '@/hooks/useSEO';

const Login = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { t } = useLanguage();

  useSEO({
    title: 'Login - RHIA Copilot | Access Your AI-Powered HR Dashboard',
    description: 'Sign in to your RHIA Copilot account to access advanced AI recruitment tools, candidate screening, and HR automation features.',
    keywords: 'RHIA Copilot login, HR dashboard, recruitment platform access, AI hiring tools',
    canonical: 'https://dashboard.rekrut.pro/login'
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError(t('login.error.missingFields'));
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(t('login.error.invalidCredentials'));
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
          <CardDescription className="text-center">{t('login.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">{t('login.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">{t('login.password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmit}>{t('login.signIn')}</Button>
          <div className="text-sm text-center text-gray-500">
            {t('login.noAccount')}
            <Button variant="link" onClick={() => navigate('/schedule-demo')}>
              {t('login.createAccount')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
