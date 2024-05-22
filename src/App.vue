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
  height: 99.4%;
}
.app {
  //width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Bellota-Italic;

  @media (max-width: 600px) {
    border: 4px solid #707070;
    background-color: #D2DFC5;
  }
}

</style>
