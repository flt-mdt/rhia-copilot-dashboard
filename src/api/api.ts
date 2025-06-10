// src/api.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Création de l'instance Axios sans headers Authorization par défaut
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

// Intercepteur pour injecter le token dynamique AVANT chaque requête
api.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    // Récupère dynamiquement le JWT Supabase (localStorage ou AuthContext)
    const userData = localStorage.getItem("supabase.auth.token");
    let token: string | null = null;
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        token = parsed.currentSession?.access_token || parsed.access_token;
      } catch {
        token = null;
      }
    }

    // Les headers doivent rester un simple objet string-string pour Axios v1+
    config.headers = {
      ...(config.headers as Record<string, string>),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    };

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Intercepteur réponse : gestion des erreurs, logs
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error("❌ Erreur réseau : impossible de contacter l’API");
    } else if (error.response.status === 401) {
      console.warn("⚠️ Erreur 401 : token expiré ou invalide");
      // Optionnel : trigger logout ou redirection ici
    } else {
      console.error(
        `❌ Erreur API (${error.response.status}) :`,
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

export default api;
