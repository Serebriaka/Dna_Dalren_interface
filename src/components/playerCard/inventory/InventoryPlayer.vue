<template>
  <div class="inventory">
    <header-inventory
      :player="player"
      :players="players"
      :indexCard="indexCard"
    />
    <inventory-table
        :player="players[indexCard]"
        :index="index"
        :indexCard="indexCard"
        :playerName="player.name"
    />
    <inventory-players
        :players="players"
        @change="clickAvatar"
    />
    <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="stats"
        pageLeftTab="classes"
        nameRightTab="Профиль"
        nameLeftTab="Классы"
        @tabChange="setPage"
    />
  </div>
</template>
<script>

import footerCard from "@/components/playerCard/footerCard.vue";
import inventoryTable from "./inventoryTable.vue"
import store from "@/store";
import HeaderInventory from "@/components/playerCard/inventory/header-inventory.vue";
import InventoryPlayers from "@/components/playerCard/inventory/inventoryPlayers.vue";
export default {
  props: {
    player: {},
    index: {}
  },
  components: {InventoryPlayers, HeaderInventory, footerCard, inventoryTable},
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
    clickAvatar(i) {
      this.indexCard = i
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
    //padding: 15px 15px 0 15px;
    width: 100%;
    height: calc(100% - 17px);
    display: flex;
    flex-direction: column;
    align-items: center;
  justify-content: space-between;
    @media screen and (min-width: 576px) {
      height: 100vh;
    }
}
</style>