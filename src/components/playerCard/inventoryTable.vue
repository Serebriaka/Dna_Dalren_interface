<template>
  <div class="inventory-lists">
    <div class="inventory-lists__left">
      Экипировка
      <div class="inventory-lists__left-tab">
        <div
            class="inventory-lists__left-item"
            v-for="(equip, index) in player.equipment"
            :key="index"
            @click="enEquip(index, equip)"
        >
          {{ equip.name }} <div v-if="isAdmin" @click="delEquip(index)" style="margin-left: 5px">x</div>
        </div>
      </div>
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
          <div @click="clickItem(index, inv)">{{inv.name}}</div>
          <div v-if="isAdmin" @click="delItem(index)" style="margin-left: 5px">x</div>
          <div class="selectPopup" v-if="index === selectedIndexPopup">
            <div class="selectPopup-tab"
                 @click="clickTab('use', inv, index)"
                 v-if="isUse"
            >
              Использовать
            </div>
            <div class="selectPopup-tab"
                 v-if="isArmor || isWeapon"
                 @click="clickTab('equip', inv, index)"
            >
              Экипировать
            </div>
            <div class="selectPopup-tab"
                 @click="clickTab('handOver', inv, index)"
            >
              Передать
            </div>
          </div>
        </div>
        <select v-if="isAdmin" v-model="selectedCategory">
          <option disabled value="">Выберите категорию</option>
          <option v-for="(item) in categoryArray" :key="item"> {{item}}</option>
        </select>
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
      selectedCategory: 'Предметы',
      selectedItem: '',
      categoryTouch: '',
      selectedIndexPopup: null,
      categoryArray: ["Броня", "Предметы", "Оружие", "Одежда", "Щиты"],
      isArmor: false,
      isWeapon: false,
    }
  },
  mounted() {
    // console.log(this.player.equipment)
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
    clickTab(tab, inv, index) {
      if(tab === 'equip') {
        this.player.equipment.push(inv)
        this.player.inventory.splice(index, 1)
      }
      console.log(inv)
      this.selectedIndexPopup = null
      store.dispatch('sendSharedValue')
    },
    delItem(index) {
      this.player.inventory.splice(index, 1)
      store.dispatch('sendSharedValue')
    },
    delEquip(index) {
      this.player.equipment.splice(index, 1)
      store.dispatch('sendSharedValue')
    },
    enEquip(index, equip) {
      this.player.equipment.splice(index, 1)
      this.player.inventory.push(equip)
      store.dispatch('sendSharedValue')
      this.isValidatePopup()
    },
    clickItem(index, inv) { //логика открытия и закрытия попапа
      console.log(inv)
      if (this.selectedIndexPopup === index) {
        this.selectedIndexPopup = null
        this.isValidatePopup()
      } else {
        this.categoryTouch = ''
        this.selectedIndexPopup = index
        this.categoryTouch = inv.category
        this.isValidatePopup()
      }
    },
    isValidatePopup() {
      let counter = 0
      this.player.equipment.forEach(item => {
        if(item?.handed === 'one-handed') counter++
      })
      let isTwoHandedActive = false
      if (counter <= 1) {
        isTwoHandedActive = true
      } else {
        isTwoHandedActive = false
      }

      let isTwoHanded = this.player.equipment.some(item => item?.handed === 'two-handed'); //блок валидации двуручного оружия
      if(this.categoryTouch === 'weapons' && !isTwoHanded && counter < 1) {
        this.isWeapon = true
      } else {
        this.isWeapon = false
      }
      console.log(this.isWeapon)
      if(this.categoryTouch === 'shield' && isTwoHandedActive) {
        this.isWeapon = true
      }

      let isSArmor = this.player.equipment.some(item => item.category === 'armor')//блок валидации брони
      if(this.categoryTouch === 'armor' && !isSArmor) {
        this.isArmor = true
      } else {
        this.isArmor = false
      }

    }
  },
  computed: {
    inventoryWeight() {
      let allItems = [...this.player.inventory, ...this.player.equipment]
      return allItems.reduce((total, item) => total + item.weight, 0);
    },
    items() {
      switch (this.selectedCategory) {
        case 'Броня':
          return store.state.allItems.armors
          break;
        case 'Предметы':
          return store.state.allItems.items
          break
        case 'Оружие':
          return store.state.allItems.weapons
          break
        case 'Одежда':
          return store.state.allItems.cloth
          break
        case 'Щиты':
          return store.state.allItems.shield
          break
        default: store.state.allItems.items
      }

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
    },
    // isArmor() {
    //   let result = false
    //   if(this.categoryTouch === 'armor') result = true
    //   return result
    // },
    isUse() {
      let result = false
      if(this.categoryTouch === 'medicine') result = true
      return result
    },
    // isWeapon() {
    //   let result = false
    //
    //   if(this.categoryTouch === 'weapons') result = true
    //   this.player.equipment.forEach(item => {
    //     if(item?.handed === 'two-handed') result = false
    //   })
    //   return result
    // }
  },
  watch: {
    selectedCategory() {
      this.selectedItem = ''
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