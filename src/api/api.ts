// src/api.ts
import axios from "axios";

// Création de l'instance Axios sans headers Authorization par défaut
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

// Intercepteur pour injecter le token dynamique AVANT chaque requête
api.interceptors.request.use(
  (config) => {
    // Tu dois récupérer le JWT Supabase là où il est stocké
    // Exemple : depuis localStorage ou le contexte React
    const userData = localStorage.getItem("supabase.auth.token");
    let token: string | null = null;
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        // Adaptation selon structure Supabase (vérifie la tienne !)
        token = parsed.currentSession?.access_token || parsed.access_token;
      } catch (e) {
        token = null;
      }
    }

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercepteur réponse : inchangé
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("❌ Erreur réseau : impossible de contacter l’API");
    } else if (error.response.status === 401) {
      console.warn("⚠️ Erreur 401 : token expiré ou invalide");
      // Redirection possible vers login
    } else {
      console.error(`❌ Erreur API (${error.response.status}) :`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
