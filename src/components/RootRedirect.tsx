
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si l'utilisateur est connecté, rediriger vers le dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de présentation
  return <Navigate to="/" replace />;
};

export default RootRedirect;
