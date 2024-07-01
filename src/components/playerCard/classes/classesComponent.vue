<template>
  <div class="classes">
    <div class="classes-header">
      <div class="classes-header__dalren"/>
      <castom-text
          textTop="УР"
          :textBottom="player.level"
          :isTwoText="true"
          height="100%"
          background-color="#A4A86B"
          rightRombPosition="90.6%"
          rombColor="#738F5F"
          color="#3E3727"
      />
    </div>
    <class-list
        :isAdmin="isAdmin"
        :player="player"
    />
    <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="inventory"
        pageLeftTab="stats"
        nameRightTab="Инвентарь"
        nameLeftTab="Профиль"
        @tabChange="setPage"
    />
  </div>
</template>
<script>
import footerCard from "@/components/playerCard/footerCard.vue";
import ClassList from "@/components/playerCard/classes/classList.vue";
import CastomText from "@/components/castomText.vue";

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
    CastomText,
    ClassList,
    footerCard,
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
  height: calc(100% - 17px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 50px;
    &__dalren {
      width: 85px;
      height: 40px;
      background-image: url("@/images/dalren.svg");
      background-repeat: no-repeat;
    }
  }
}
</style>