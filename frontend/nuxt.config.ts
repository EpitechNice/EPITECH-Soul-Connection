// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["assets/css/main.css"],
    // Register the axios module
    modules: ["@nuxtjs-alt/axios"],
    // Axios module configuration
    axios: {
        baseURL: process.env.API_BASE_URL || "http://172.20.0.3:80", // Example base URL
    },
    server: {
        port: process.env.PORT || 3000,
    },
})