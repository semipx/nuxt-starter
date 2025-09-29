import localeFiles from './i18n/localeFiles'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    // '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxtjs/device',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    'nuxt-gtag',
    '@nuxtjs/google-fonts',
    '@nuxtjs/seo'
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  site: {
    url: '',
    name: 'NuxtStarter',
    description: ''
  },

  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'dark'
  },

  runtimeConfig: {
    public: {

    }
  },

  routeRules: {
    // '/': { prerender: true }
  },

  devServer: {
    port: 5000
  },
  compatibilityDate: '2024-09-28',

  nitro: {
    // preset: 'cloudflare_pages'
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never'
      }
    }
  },

  googleFonts: {
    families: {
      Inter: [300, 500, 700]
    }
  },

  gtag: {
    id: ''
  },

  i18n: {
    vueI18n: 'i18n.config.ts',
    baseUrl: '',
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      cookieCrossOrigin: true,
      redirectOn: 'root'
    },
    langDir: 'locales',
    locales: localeFiles as any
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'NuxtStarter',
      url: '',
      logo: '',
      founder: {
        type: 'Person',
        name: 'dongnaebi',
        sameAs: ['https://twitter.com/dongnaebi', 'https://github.com/dongnaebi']
      }
    }
  },

  sitemap: {
    exclude: ['/test/**']
  }
})
