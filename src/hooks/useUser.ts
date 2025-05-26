import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import type { User } from '@supabase/supabase-js';

export const useUser = (): User => {
  const context = useContext(AuthContext);
  if (!context || !context.user) {
    throw new Error('No authenticated user found.');
  }
  return context.user;
};
