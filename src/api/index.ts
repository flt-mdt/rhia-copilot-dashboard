// src/api/index.ts
import axios, { AxiosInstance } from "axios";
import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/* 1.  Client Supabase : permet de récupérer un JWT toujours à jour   */
/* ------------------------------------------------------------------ */
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

/** Renvoie le JWT (ou null) — la promesse se résout très vite (cache interne). */
async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();      // auto-refresh si expiré
  return data.session?.access_token ?? null;
}

/* ------------------------------------------------------------------ */
/* 2.  Création d’un AxiosInstance par micro-service                  */
/* ------------------------------------------------------------------ */
export const briefApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BRIEF_URL, // ex : https://brief-backend…/api
  timeout: 10_000
});

export const hunterApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HUNTER_URL, // ex : https://hunter-backend…/api
  timeout: 10_000
});

/* ------------------------------------------------------------------ */
/* 3.  Intercepteur JWT commun (async → Axios accepte une Promise)    */
/* ------------------------------------------------------------------ */
const attachJwtInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();

    // 🔎 Debug facultatif
    console.debug(
      `[Axios] ${config.method?.toUpperCase()} ${config.baseURL}${config.url} —`,
      token ? "JWT ajouté" : "PAS DE JWT"
    );

    if (token) {
  if (typeof (config.headers as any)?.set === "function") {
    // Cas AxiosHeaders
    (config.headers as any).set("Authorization", `Bearer ${token}`);
  } else {
    // ✅ On ajoute la propriété sans écraser l’objet → plus de TS2322
    (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }
}
    return config;
  });
};

/* ------------------------------------------------------------------ */
/* 4.  On monte l’intercepteur sur **chaque** client                   */
/* ------------------------------------------------------------------ */
[briefApi, hunterApi].forEach(attachJwtInterceptor);

/* ------------------------------------------------------------------ */
/* 5.  (Option) export d’un objet util si d’autres modules en ont besoin */
/* ------------------------------------------------------------------ */
export const apiClients = { briefApi, hunterApi };
