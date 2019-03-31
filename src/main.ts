import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import thing from './plugin'
import authService from '@/authService.ts'
Vue.use(thing)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
