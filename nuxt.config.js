module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'online',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor:['element-ui']
  },
    /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/nuxt-swiper-plugin.js', ssr: false },
    {src: '~plugins/ElementUI',ssr: true,},
    { src: '~/plugins/cropper', ssr: false },
  ],
  css: [
    'swiper/dist/css/swiper.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  modules: [
    // Simple usage
    'cookie-universal-nuxt',
     // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'

  ],
  axios: {
    // proxyHeaders: false
  },
}

