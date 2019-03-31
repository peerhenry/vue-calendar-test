import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import authService from '@/authService.ts'
authService.handleAuthentication().then((token: string) => {
  console.log('user is logged in with: ', token)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
