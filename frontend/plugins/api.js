// plugins/api.js

export default defineNuxtPlugin((nuxtApp) => {
    const apiBaseUrl = 'http://172.20.0.3'; // Remplacez par l'URL de votre backend
  
    const apiFetch = $fetch.create({
      baseURL: apiBaseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      onRequest({ request, options }) {
        // Vous pouvez ajouter des intercepteurs de requêtes ici
      },
      onResponse({ request, response, options }) {
        // Interceptez les réponses si nécessaire
      },
      onResponseError({ request, response, options }) {
        console.error('API Error:', response.status, response.statusText);
      },
    });
  
    return {
      provide: {
        $api: apiFetch,
      },
    };
  });
  