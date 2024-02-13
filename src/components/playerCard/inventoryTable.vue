<template>
  <div class="inventory-lists">
    <div class="inventory-lists__left">
      Экипировка
      <div class="inventory-lists__left-tab"></div>
      <div class="weight">Вес: {{inventoryWeight}} / {{maxWeight}}</div>
    </div>
    <div class="inventory-lists__right">
      Инвентарь
      <div class="inventory-lists__right-tab">
        <div
            class="inventory-lists__right-item"
            v-for="(inv, index) in player.inventory"
            :key="index"

        >
          <div @click="clickItem(index)">{{inv.name}}</div>
          <div v-if="isAdmin" @click="delItem(index)" style="margin-left: 5px">x</div>
          <div class="selectPopup" v-if="index === selectedIndexPopup">
            <div class="test" @click="selectedIndexPopup = null">Использовать</div>
            <div class="test">Экипировать</div>
            <div class="test">Передать</div>
          </div>
        </div>
        <select v-if="isAdmin" v-model="selectedItem">
          <option disabled value="">Выберите предмет</option>
          <option v-for="(item, index) in items" :key="index"> {{item.name}}</option>
        </select>
        <button @click="addItem" v-if="isAdmin">+</button>
      </div>
    </div>
  </div>

</template>
<script>
import store from "@/store";

export default {
  props: {
    player: {}
  },
  data() {
    return {
      selectedItem: '',
      selectedIndexPopup: null,
    }
  },
  methods: {
    addItem() {
      /* eslint-disable */
      if (this.selectedItem !== '') {
        let item = this.items.find((item) => {
          return item.name === this.selectedItem
        })
        this.player.inventory.push(item)
        store.dispatch('sendSharedValue')
      }

    },
    delItem(index) {
      this.player.inventory.splice(index, 1)
      store.dispatch('sendSharedValue')
    },
    clickItem(index) {
      if (this.selectedIndexPopup === index) {
        this.selectedIndexPopup = null
      } else {
        this.selectedIndexPopup = index
      }
      console.log(index, this.selectedIndexPopup)


    }
  },
  computed: {
    inventoryWeight() {
      let allItems = [...this.player.inventory, ...this.player.equipment]
      return allItems.reduce((total, item) => total + item.weight, 0);
    },
    items() {
      return store.state.items
    },
    maxWeight() {
      let result = 0
      result = this.player.skills.strength * 4
      return result
    },
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
.inventory {
  &-lists {
    height: 50%;
    width: 100%;
    display: flex;
    gap: 20px;
    @media screen and (min-width: 576px) {
      margin-bottom: 20px;
    }
    &__left {
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      &-tab {
        width: 100%;
        height: 80%;
        border: 2px solid #8B4513;
      }
    }
    &__right {
      width: 100%;
      height: 100%;
      text-align: center;
      &-item {
        display: flex;
        align-items: center;
        text-align: center;
        width: 93.5%;
        justify-content: center;
        margin-top: -1px;
        height: auto;
        background-color: #e79049;
        padding: 3px;
        border: 2px solid #8B4513;
        @media screen and (min-width: 576px) {
          cursor: pointer;
        }
      }

      &-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 97%;
        height: 90%;
        border: 2px solid #8B4513;
        overflow-y: auto;
        gap: 2px;
      }
    }
  }
}
.weight {
  font-size: 16px;
  font-weight: 600;
  margin-top: 5px;
}
.selectPopup {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: auto;
  width: 40%;
  border: 2px solid #8B4513;
  background-color: white;
  margin-bottom: 117px;
}
</style>