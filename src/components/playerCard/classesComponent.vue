<template>
  <div class="classes">
    <playerLevels
        :isAdmin="isAdmin"
        :player="player"
    />
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
import playerLevels from "@/components/playerCard/playerLevels.vue";
import footerCard from "@/components/playerCard/footerCard.vue";

export default {
  props: {
    player: {},
    isAdmin: {}
  },
  data() {
    return {
      currentLevel: 1,
    }
  },
  name: "classesComponent",
  components: {
    footerCard,
    playerLevels
  },
  mounted() {
  },
  methods: {
    setPage(tab) {
      /* eslint-disable */
      this.player.page = tab
    }
  },
  computed: {

  },
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
  &-header {
    display: flex;
    gap: 10px;
  }
}
</style>