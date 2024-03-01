<template>
  <div class="inventory">
    <div class="inventory-players">
      <div class="inventory-players-tab"
           v-for="(play, index) in players"
           :key="play.name"
           @click="clickAvatar(index)"
           :style="{backgroundImage: 'url(' + require(`@/images/avatars/${play.avatar}.jpg`) + ')'}"
      >
<!--        {{ play.name }}-->
      </div>
    </div>
    <div class="inventory-card"> Инфентарь игрока: {{players[indexCard].name}}</div>
    <inventory-table
        :player="players[indexCard]"
        :index="index"
        :indexCard="indexCard"
        :playerName="player.name"
    />

    <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="stats"
        pageLeftTab="classes"
        nameRightTab="Начало"
        nameLeftTab="Классы"
        @tabChange="setPage"
    />
  </div>
</template>
<script>

import footerCard from "@/components/playerCard/footerCard.vue";
import inventoryTable from "./inventoryTable.vue"
import store from "@/store";
export default {
  props: {
    player: {},
    index: {}
  },
  components: {footerCard, inventoryTable},
  data() {
    return {
      indexCard: this.index,
    }
  },
  methods: {
    setPage(tab) {
      /* eslint-disable */
      this.player.page = tab
    },
    clickAvatar(index) {
      console.log(index)
      this.indexCard = index
      store.dispatch('sendSharedValue')
    }
  },
  computed: {
    isLocation() {
      return window.location.pathname
    },
    isAdmin() {
      let result = false
      if(this.isLocation === '/admin') result = true
      return result
    },
    players() {
      return store.state.playerCards
    },
  }
}
</script>
<style lang="scss">
.inventory {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &-players {
    display: flex;
    flex-direction: row;
    gap: 10px;

    &-tab {
      background-size: cover;
      background-position: center;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      border: 2px solid rgb(101, 92, 29);
      height: 40px;
      width: 40px;
      background-color: green;
      color: white;
      cursor: pointer;
    }
  }
}
</style>