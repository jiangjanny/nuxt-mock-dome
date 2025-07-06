// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      useMockApi: process.env.USE_MOCK_API === 'true',
      usePROXYApi: process.env.USE_VITE_PROXY === 'true',
      realApiUrl: process.env.REAL_API_URL || 'https://dummyjson.com'
    },
  },
  vite: {
    server: {
      proxy: process.env.USE_VITE_PROXY === 'true' ? {
        '/api': {
          target: 'https://dummyjson.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      } : undefined
    }
  },
})
