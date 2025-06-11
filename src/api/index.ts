
import axios from "axios";

// Un client Axios pour chaque API, avec baseURL dynamique depuis l'env
export const briefApi = axios.create({
  baseURL: import.meta.env.VITE_API_BRIEF_URL,
  timeout: 10000
});

export const hunterApi = axios.create({
  baseURL: import.meta.env.VITE_API_HUNTER_URL,
  timeout: 10000
});

// Fonction utilitaire d'injection du JWT (déclarée UNE SEULE FOIS)
const injectTokenInterceptor = (apiInstance: typeof hunterApi) => {
  apiInstance.interceptors.request.use((config) => {
    const userData = localStorage.getItem("supabase.auth.token");
    let token: string | null = null;
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        // ✅ Prend access_token directement (structure confirmée)
        token = parsed.access_token;
      } catch {
        token = null;
      }
    }
    // Log pour debug
    console.log(
      `[${config.url}] Authorization header:`,
      token ? `Bearer ${token.substring(0, 10)}...` : "AUCUN TOKEN"
    );
    if (token && config.headers) {
      if (typeof (config.headers as any).set === "function") {
        (config.headers as any).set("Authorization", `Bearer ${token}`);
      } else {
        (config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });
};



// Appliquer l'intercepteur à chaque client API créé ci-dessus
[briefApi, hunterApi].forEach(injectTokenInterceptor);