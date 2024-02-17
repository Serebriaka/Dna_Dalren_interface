<template>
  <div class="inventory">
    <div class="inventory-players">
      <div class="inventory-players-tab" v-for="play in players" :key="play.name"> {{ play.name }}</div>
    </div>
    <div class="inventory-card"> Инфентарь игрока: {{player.name}}</div>
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
                   v-if="isArmor || isWeapon || isСloth"
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
      isСloth: false,
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
      if(tab === 'use') {
        this.useHealth(inv, index)
      }
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
      if (this.selectedIndexPopup === index) {
        this.selectedIndexPopup = null
        this.isValidatePopup(inv)
      } else {
        this.categoryTouch = ''
        this.selectedIndexPopup = index
        this.categoryTouch = inv.category
        this.isValidatePopup(inv)
      }
      console.log(inv)
    },
    isValidatePopup(inv) {
      if (inv?.category === 'weapons' || inv?.category === 'shield' || inv?.category === 'armor' || inv?.category === 'cloth') {
        let counterOneWeapons = 0 // количество одноручных оружий
        this.player.equipment.forEach(item => {
          if(item?.handed === 'one-handed') counterOneWeapons++
        })

        let counterTwoWeapons = 0 // количество двуручных оружий
        this.player.equipment.forEach(item => {
          if(item?.handed === 'two-handed') counterTwoWeapons++
        })

        let counterShield = 0 //количество щитов
        this.player.equipment.forEach(item => {
          console.log(item)
          if(item?.handed === 'one-handed' && item?.category === 'shield') {
            counterShield++
          }
        })
        let isTwoHanded = this.player.equipment.some(item => item?.handed === 'two-handed'); //блок валидации двуручного оружия
        //надо сделать вложенности if
        if(inv.handed === 'one-handed' && inv.category !== 'shield') {
          if(counterOneWeapons <= 1 && counterShield <= 1 && counterTwoWeapons === 0) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }
        if(inv.handed === 'one-handed' && inv.category === 'shield') {
          if(counterOneWeapons <= 1 && counterShield === 0 && counterTwoWeapons === 0) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }
        if(inv.handed === 'two-handed') {
          if(counterOneWeapons === 0 && counterShield === 0 && counterTwoWeapons === 0) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }

        let isArmors = this.player.equipment.some(item => item.category === 'armor')//блок валидации брони
        if(this.categoryTouch === 'armor' && !isArmors) {
          this.isArmor = true
        } else {
          this.isArmor = false
        }
        let isСloth = this.player.equipment.some(item => item.category === 'cloth')//блок валидации одежды
        if(this.categoryTouch === 'cloth' && !isСloth) {
          this.isСloth = true
        } else {
          this.isСloth = false
        }
      }
    },
    useHealth(inv, index) {
      if(inv.category === 'medicine') {
        if(inv.randoms === '1d12') {
          let randomNum = 0
          randomNum = Math.floor(Math.random() * 12) + 1;
          this.player.actHealth = this.player.actHealth + +randomNum
          this.player.inventory.splice(index, 1)
        }
        if(inv.randoms === '1d6') {
          let randomNum = 0
          randomNum = Math.floor(Math.random() * 6) + 1;
          this.player.actHealth = this.player.actHealth + +randomNum
          this.player.inventory.splice(index, 1)
        }
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
    isUse() {
      let result = false
      if(this.categoryTouch === 'medicine') result = true
      return result
    },
    players() {
      return store.state.playerCards
    },
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
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &-players {
    display: flex;
    flex-direction: row;
    gap: 10px;
    &-tab {
      height: 40px;
      width: 40px;
      background-color: green;
      color: white;
    }
  }
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
      position: relative;
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
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 97%;
        height: 90%;
        border: 2px solid #8B4513;
        overflow: auto;
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
  position: fixed;
  height: auto;
  width: 40%;
  border: 2px solid #8B4513;
  background-color: white;
  top: 10px;
  //margin-bottom: 117px;
  &-tab {
    cursor: pointer;
  }
}
</style>