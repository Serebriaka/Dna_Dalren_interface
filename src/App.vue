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
  height: calc(100% - 4px);;
}
.app {
  //width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Bellota-Italic;

  @media (max-width: 600px) {
    border: 4px solid #707070;
    background-color: #e4ecdf;
  }
}

</style>
