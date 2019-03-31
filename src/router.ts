import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AuthCallback from './views/AuthCallback.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ './views/DummyCalendar.vue')
  },
  {
    path: '/authcallback',
    name: 'AuthCallback',
    component: AuthCallback
  }
]

export default new Router({
  mode: 'history',
  routes
})
