<template>
  <div class="classes">
    <div class="classes-container">

    </div>
    <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="inventory"
        pageLeftTab="stats"
        nameRightTab="Инвентарь"
        nameLeftTab="Начало"
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
  name: "classesComponent",
  components: {footerCard},
  methods: {
    setPage(tab) {
      /* eslint-disable */
      this.player.page = tab
    },
  },
  computed: {
    isAdmin() {
      let result = false
      if(this.isLocation === '/admin') result = true
      return result
    }
  }
}
</script>

<style scoped lang="scss">
.classes {
  padding: 15px 15px 0 15px;
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-container {
    display: flex;
    gap: 10px;
  }
}
</style>