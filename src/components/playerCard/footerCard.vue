<template>
  <div class="footer">
    <div class="footer-top">
      <div class="footer-top-left footerTab">
        <div class="footer-top-left-image"/>
        <button @click="setCrystal('min')" class="btn" v-if="isAdmin">-</button>
        {{player.crystal}}
        <button @click="setCrystal('add')" class="btn" v-if="isAdmin">+</button>
      </div>
      <div class="romb romb-center"/>
      <div class="footer-top-right footerTab">
        <button @click="setGold('min')" class="btn" v-if="isAdmin">-</button>
        {{ player.gold}}
        <button @click="setGold('add')" class="btn" v-if="isAdmin">+</button>
        <select v-model="selectGold" v-if="isAdmin">
          <option v-for="number in numbersGold" :key="number"> {{number}} </option>
        </select>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-left footerTab" @click="toClasses">
        {{nameLeftTab}}
      </div>
      <div class="romb romb-left"/>
      <div class="footer-bottom-center footerTab">
        <button @click="setExp('min')" class="btn" v-if="isAdmin">-</button>
        {{player.exp}} exp
        <button @click="setExp('add')" class="btn" v-if="isAdmin">+</button>
      <select v-model="selectExp" v-if="isAdmin" style="width: 40px;">
        <option v-for="Exp in numbersExp" :key="Exp"> {{Exp}} </option>
      </select>
      </div>
      <div class="romb romb-right"/>
      <div class="footer-bottom-right footerTab" @click="toInventory">
        {{nameRightTab}}
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import { eventBus } from '@/eventBus'
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
      eventBus.$emit('setExp', this.player.exp);
      this.sendChangePlayer()
    },
    setCrystal(param) {
      if(param === 'add') {
        /* eslint-disable */
        this.player.crystal = ++this.player.crystal
      }
      if(param === 'min') {
        this.player.crystal = --this.player.crystal
      }
      this.sendChangePlayer()
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
    toInventory() {
      this.$emit('tabChange', this.pageRightTab)
      this.sendChangePlayer()
    },
    toClasses() {
      this.$emit('tabChange', this.pageLeftTab)
      this.sendChangePlayer()
    }
  },

}
</script>
<style lang="scss" scoped>
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
.footer {
  width: calc(109% - 4px);
  height: 80px;
  position: relative;
  &-top {
    display: flex;
    flex-direction: row;
    height: 74px;
    justify-content: center;
    gap: 1px;
    position: relative;
    top: 22px;
    &-right {
      padding-bottom: 33px !important;
    }
    &-left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 33px !important;
      &-image {
        width: 18px;
        height: 12px;
        margin-right: 13px;
        background-image: url('../../images/icons/crystal.png'); /* Путь к вашей PNG картинке */
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
    }
  }
  &-bottom {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 38px;
    z-index: 1;
    gap: 2px;
    bottom: -16px;
    &-left {

    }
  }
}
.romb {
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  background-color: #A4A86B;
  position: absolute;
  &-left {
    left: 32.5%;
    bottom: 38%;
  }
  &-right {
    left: 66%;
    bottom: 38%;
  }
  &-center {
    left: 49.55%;
    bottom: 69%;
  }
}
.footerTab {
  width: 33%;
  height: 100%;
  background-color: #8F4C3C;
  border-radius: 13px 13px 0 0;
  border: solid 1px #D9D9D9;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: white;
}
@media (min-width:596px) {
  .footer {
    margin-bottom: 40px;
    &-bottom {
      bottom: -39px;
    }
  }

}
</style>