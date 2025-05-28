import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // ✅ Timeout explicite de 10 secondes
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`
  }
});

// ✅ Intercepteur global : gestion des erreurs réseau et 401
api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("❌ Erreur réseau : impossible de contacter l’API");
    } else if (error.response.status === 401) {
      console.warn("⚠️ Erreur 401 : token expiré ou invalide");
      // Optionnel : rediriger vers login / déconnexion
    } else {
      console.error(`❌ Erreur API (${error.response.status}) :`, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
