<template lang="pug">
  .home
    img(alt="Vue logo" src="../assets/logo.png")
    HelloWorld(msg="Welcome to Your Vue.js + TypeScript App")
    div
      button(v-if="isAuthenticated" @click="logOut") LOGOUT
      button(v-else @click="login") LOGIN
</template>

<script lang="ts">
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import authService from '@/authService.ts'

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld
  },
  created() {
    console.log('home created, name:', this.$options.name)
  },
  methods: {
    login() {
      authService.login({})
    },
    logOut() {
      authService.logOut()
    }
  },
  computed: {
    isAuthenticated(): boolean {
      return authService.isAuthenticated()
    }
  }
})
</script>
