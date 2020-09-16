module.exports = {
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'login',
        path: '/login',
        component: resolve(__dirname, 'pages/register.vue')
      })
    }
  }
}