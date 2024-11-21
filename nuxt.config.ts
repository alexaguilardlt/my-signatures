// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Gestión de asignaturas',
      meta: [
        {
          name: 'description',
          content:
            'Aplicación para la gestión de asignaturas durante el curso escolar'
        }
      ],
      htmlAttrs: {
        lang: 'es'
      }
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    'nuxt-security',
    '@nuxtjs/supabase'
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    redirect: false
  }
})
