<template lang="pug">
div
  div(v-if="success")
    h2 You are now logged in!
    p token: {{ token }}
  h2(v-else) Pending...
</template>

<script lang="ts">
import Vue from 'vue'
import authService from '@/authService.ts'

export default Vue.extend({
  data: function() {
    return {
      success: false,
      token: ''
    }
  },
  created() {
    authService.handleAuthentication().then((s: string) => {
      this.success = true
      this.token = s
      setTimeout(() => {
        this.$router.push('/')
      }, 1500)
    })
  }
})
</script>

<style scoped lang="scss">
</style>