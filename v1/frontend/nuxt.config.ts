// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    css: ["assets/css/main.css"],
    // Register the axios module
    server: {
        port: process.env.PORT || 3000,
    },
})