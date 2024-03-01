<template>
  <div class="footer-menu">
    <div class="footer-menu__btn-inventory footerTab">Классы</div>
    <div class="footer-menu__gold footerTab">
      <button @click="setGold('min')" class="btn" v-if="isAdmin">-</button>
      {{ player.gold}}
      <button @click="setGold('add')" class="btn" v-if="isAdmin">+</button>
      <select v-model="selectGold" v-if="isAdmin">
        <option v-for="number in numbersGold" :key="number"> {{number}} </option>
      </select>
    </div>
    <div class="footer-menu__exp footerTab">
      <button @click="setExp('min')" class="btn" v-if="isAdmin">-</button>
      {{player.exp}} exp
      <button @click="setExp('add')" class="btn" v-if="isAdmin">+</button>
      <select v-model="selectExp" v-if="isAdmin" style="width: 40px;">
        <option v-for="Exp in numbersExp" :key="Exp"> {{Exp}} </option>
      </select>
    </div>
    <div class="footer-menu__btn-inventory footerTab" @click="toInventory">{{nameRightTab}}</div>
  </div>
</template>
<script>
import store from "@/store";

export default {
  props: {
    isAdmin: {},
    player: {},
    pageRightTab: {},
    pageLeftTab: {},
    nameLeftTab: {},
    nameRightTab: {},
  },
  data() {
    return {
      numbersExp: [1,2,5,10,50,100,200,500,1000,2000],
      numbersGold: [1,2,5,10,50,100,200,500,1000,2000],
      selectGold: 1,
      selectExp: 1
    }
  },
  methods: {
    setGold(param) {
      if(param === 'add') {
        /* eslint-disable */
        this.player.gold = this.player.gold + +this.selectGold
      }
      if(param === 'min') {
        this.player.gold = this.player.gold - +this.selectGold
      }
      this.sendChangePlayer()
    },
    setExp(param) {
      if(param === 'add') {
        /* eslint-disable */
        this.player.exp = this.player.exp + +this.selectExp
      }
      if(param === 'min') {
        this.player.exp = this.player.exp - +this.selectExp
      }
      this.sendChangePlayer()
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
    toInventory() {
      this.$emit('tabChange', this.pageRightTab)
      this.sendChangePlayer()
    }
  },

}
</script>
<style lang="scss">
.footer-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  justify-content: space-between;
  &__gold {
    gap: 5px;
    height: 100%;
    width: 25%;
  }
  &__exp {
    height: 100%;
    width: 25%;
    text-align: center;
    gap: 5px;
  }
  &__btn-inventory {
    height: 100%;
    width: 25%;
    text-align: center;
    cursor: pointer;
  }
}
.footerTab {
  padding: 4px;
  display: flex;
  align-items: center;
  background-color: #e3a774;
  flex-direction: row;
  justify-content: center;
  border: 2px solid #b7763f;
}
.btn {
  background-color: #e3a774;
  transition: 0.3s ease;
}
.btn:hover {
  background-color: #e18a47;
  transition: 0.3s ease;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>