console.log('nuxt config ,env');
console.dir(process);
module.exports = {
  server: process.env.NODE_ENV === 'development' ? undefined : {
    host: '0.0.0.0',
    port: '80'
  },
  router: {
    linkExactClass: 'active',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/register.vue')
      });
      routes.push({
        name: 'create-article',
        path: '/create/article',
        component: resolve(__dirname, 'pages/editor/_id.vue')
      })
    }
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}