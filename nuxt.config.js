require('dotenv').config();
const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.css',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseUrl: process.env.API_URL || 'http://localhost:1224',
  },

  /*
  ** Environment Config
  */
  env: {
    API_URL: process.env.API_URL || 'http://localhost:1224',
    ENDPOINT_URL: process.env.ENDPOINT_URL || '/gql',
    LOGIN_URL: process.env.LOGIN_URL || '/login',
    START_URL: process.env.START_URL || '/start',
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true,
          },
        });
      }
    },
  },

  apollo: {
    authenticationType: '',
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_URL + process.env.ENDPOINT_URL || 'http://localhost:1224/gql',
        httpLinkOptions: {
          credentials: 'omit',
        },
        tokenName: 'auth',
      },
    },
  },
};
