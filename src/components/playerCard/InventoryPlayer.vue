<template>
  <div class="inventory">
    <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="inventory"
        pageLeftTab="stats"
        nameRightTab="Начало"
        nameLeftTab="Классы"
        @tabChange="setPage"
    />
  </div>
</template>
<script>

import footerCard from "@/components/playerCard/footerCard.vue";

export default {
  props: {
    player: {}
  },
  components: {footerCard},
  data() {
    return {

    }
  },
  methods: {
    setPage(tab) {
      /* eslint-disable */
      this.player.page = tab
    },
  },
  computed: {
    isLocation() {
      return window.location.pathname
    },
    isAdmin() {
      let result = false
      if(this.isLocation === '/admin') result = true
      return result
    }
  }
}
</script>
<style lang="scss">

</style>