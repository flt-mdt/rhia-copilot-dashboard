// src/api.ts
import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// Exemple :
export const rhiaApi = axios.create({ baseURL: import.meta.env.VITE_API_RHIA_URL });
export const hunterApi = axios.create({ baseURL: import.meta.env.VITE_API_HUNTER_URL });

// Création de l'instance Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Récupération du JWT
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

    if (token && config.headers) {
      // Priorité à la méthode set() (AxiosHeaders)
      if (typeof (config.headers as any).set === "function") {
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      } else {
        // Fallback : objet classique
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }
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
