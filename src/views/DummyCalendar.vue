<template lang="pug">
  .about
    h1 This is DummyCalendar
    FullCalendar
</template>

<script lang="ts">
// import { FullCalendar } from 'vue-full-calendar' // does not work because there are no type definitions
import Vue from 'vue'
const myMod = require('vue-full-calendar')
const FullCalendar = myMod.FullCalendar

export default Vue.extend({
  components: { FullCalendar }
})
</script>

<style lang="scss">
@import '~fullcalendar/dist/fullcalendar.css';
// @import '~/src/assets/core/main.css';
// @import '~/src/assets/daygrid/main.css';
// @import '@/assets/interaction/main.css';

/*
.fc-button,
.fc button {
  background-color: lightblue;
  background-image: none;
  border: none;
  font-size: 18px;
}
*/
</style>
