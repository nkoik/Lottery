import fbService from '../services/firebase'
import { store } from '../store'
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // This allows the application to halt rendering until
  // Firebase is finished with its initialization process,
  // and handle the user accordingly
  Router.beforeEach(async (to, from, next) => {
    const { ensureAuthIsInitialized, isAuthenticated } = fbService
    try {
      // Force the app to wait until Firebase has
      // finished its initialization, and handle the
      // authentication state of the user properly
      await ensureAuthIsInitialized(store)
      console.log(to.matched.some(record => record.meta.requiresAuth))
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (isAuthenticated(store)) {
          next()
        } else {
          next({ name: 'Login' })
        }
      } else if ((to.name === 'Register' && isAuthenticated(store)) ||
        (to.name === 'Login' && isAuthenticated(store))) {
        next('/user')
      } else {
        next()
      }
    } catch (err) {
      console.log(err)
    }
  })

  return Router
}
