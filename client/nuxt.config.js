const apiURL = 'https://xanh.life/api';

export default {
  mode: 'spa',
  env: { apiURL },
  head: {
    title: `Forum Làng Đại Học - Xanh.life`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { 
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Nunito:400,700|Sedgwick+Ave+Display&display=swap'
      }
    ]
  },
  loading: { color: '#fff' },
  css: [
    '@/assets/scss/style.scss'
  ],
  plugins: [
    '@/plugins/vue2-editor.js'
  ],
  buildModules: [
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    'vue-social-sharing/nuxt'
  ],
  axios: {
    baseURL: apiURL,
    credentials: true,
    common: {
      'Accept': 'application/json, text/plain, */*'
    },
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true
  },
  build: {
    transpile: ['vue-notifications']
  }
}
