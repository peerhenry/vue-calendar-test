import { Vue, CombinedVueInstance } from 'vue/types/vue'

const thing = {
  install(Vue: any) {
    Vue.mixin({
      created() {
        console.log('mixin created event for ', this.$options.name)
      }
    })
  }
}

export default thing
