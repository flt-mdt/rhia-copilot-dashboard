import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Création de l'instance Axios pour chaque service
export const briefApi = axios.create({
  baseURL: import.meta.env.VITE_API_BRIEF_URL,
  timeout: 10000
});
export const hunterApi = axios.create({
  baseURL: import.meta.env.VITE_API_HUNTER_URL,
  timeout: 10000
});

// Fonction utilitaire pour injecter le Bearer token dans les requêtes
const injectTokenInterceptor = (apiInstance: typeof briefApi) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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

      // Debug log pour vérifier le token
      // (à retirer en prod si tout fonctionne)
      console.log(
        `[Axios][${config.url}] Authorization header:`,
        token ? `Bearer ${token.substring(0, 10)}...` : "Aucun token trouvé"
      );

      if (token && config.headers) {
        if (typeof (config.headers as any).set === "function") {
          (config.headers as any).set("Authorization", `Bearer ${token}`);
        } else {
          (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
};

// Applique le même intercepteur à chaque client que tu vas utiliser dans tes hooks/pages
[briefApi, hunterApi].forEach(injectTokenInterceptor);

// Tu peux exporter un client générique si tu as besoin d'une API "par défaut"
export default briefApi;
