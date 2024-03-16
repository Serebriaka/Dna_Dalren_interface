<template>
  <div class="app">
    <gameMeneger/>
  </div>
</template>

<script>
import gameMeneger from './components/gameMeneger.vue'
import '@/assets/fonts.scss';


export default {
  components: {
    gameMeneger
  }
}
</script>

<style>
html, body {
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Colus;
}
</style>
