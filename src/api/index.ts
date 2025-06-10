
import axios from "axios";

// Un client Axios pour chaque API, avec baseURL dynamique depuis l'env
export const rhiaApi = axios.create({
  baseURL: import.meta.env.VITE_API_HUNTER_URL,
  timeout: 10000
});

export const hunterApi = axios.create({
  baseURL: import.meta.env.VITE_API_BRIEF_URL,
  timeout: 10000
});
