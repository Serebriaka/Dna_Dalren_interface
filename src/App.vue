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
* {
  box-sizing: border-box;
}
html, body {
  height: 100vh;
  margin: 0;
}
.app {
  //width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Bellota-Bold;

  @media (max-width: 600px) {
    border: 4px solid #707070;
    background-color: #e4ecdf;
    //padding: 15px 15px 0 15px;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
  }
}

</style>
