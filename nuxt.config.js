module.exports = {
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
  }
}