<template>
  <div class="inventory">
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
                   v-if="isUse && !stealItem"
              >
                Использовать
              </div>
              <div class="selectPopup-tab"
                   v-if="(isArmor || isWeapon || isСloth || isEquippable) && !stealItem"
                   @click="clickTab('equip', inv, index)"
              >
                Экипировать
              </div>
              <div class="selectPopup-tab"
                   v-if="!stealItem"
                   @click="clickTab('handOver', inv, index)"
              >
                Передать
              </div>
              <div class="selectPopup-tab"
                   v-if="stealItem"
                   @click="clickTab('stealItem', inv, index)"
              >
                Украсть
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
    <div v-if="isAdmin && player.isSteal" class="modal" :class="{ 'modal': true, 'slide-out': true }" style="border: 2px solid #f9ad03;">
      <div class="modal-content">
        <p>Игрок {{player.domName}} хочет украсть {{player.invName}} у игрока {{player.subName}}</p>
        <div class="modal-content-btns">
          <button class="medieval-button" @click="handle('yes')">Да</button>
          <button class="medieval-button" @click="handle('no')">Нет</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/store";
import helpers from "@/helpers";

export default {
  props: {
    player: {},
    index: {},
    indexCard: {},
    playerName: {},
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
      isEquippable: false,
      subName: '',
      domName: '',
      invName: '',
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
      if(tab === 'stealItem') {
        this.player.subName = this.player.name
        this.player.domName = this.playerName
        this.player.invName = inv.name
        this.player.isSteal = true
      }
      this.selectedIndexPopup = null
      store.dispatch('sendSharedValue')
    },
    delItem(index) {
      this.player.inventory.splice(index, 1)
      this.selectedIndexPopup = null
      store.dispatch('sendSharedValue')
    },
    delEquip(index) {
      this.player.equipment.splice(index, 1)
      store.dispatch('sendSharedValue')
    },
    enEquip(index, equip) {
      if(!this.stealItem) {
        this.player.equipment.splice(index, 1)
        this.player.inventory.push(equip)
        store.dispatch('sendSharedValue')
        this.isValidatePopup()
      }
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
    },
    isValidatePopup(inv)  {
      if (inv?.category === 'weapons' || inv?.category === 'shield' || inv?.category === 'armor' || inv?.category === 'cloth') {
        this.isArmor = false
        this.isWeapon = false
        this.isСloth = false
        this.isEquippable = false
        let isStrengthAgree = helpers.getStrengthValidate(inv, this.player.skills) //создаю хелпер на возможность экипировать по статам
        let isShieldAgree = helpers.getShellVal(inv, this.player.equipment, this.player.skills) //поправить и использова каунтера амуниции которые ниже
        console.log(isShieldAgree, 'result')
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
          if(item?.handed === 'one-handed' && item?.category === 'shield') {
            counterShield++
          }
        })
        //надо сделать вложенности if
        if(inv.handed === 'one-handed' && inv.category !== 'shield') {
          if(counterOneWeapons <= 1 && counterShield <= 1 && counterTwoWeapons === 0 && isStrengthAgree && isShieldAgree) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }
        if(inv.handed === 'one-handed' && inv.category === 'shield' && isShieldAgree) {
          if(counterOneWeapons <= 1 && counterShield === 0 && counterTwoWeapons === 0 ) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }
        if(inv.handed === 'two-handed') {
          if(counterOneWeapons === 0 && counterShield === 0 && counterTwoWeapons === 0 && isStrengthAgree) {
            this.isWeapon = true
          } else {
            this.isWeapon = false
          }
        }

        let isArmors = this.player.equipment.some(item => item.category === 'armor')//блок валидации брони
        if(this.categoryTouch === 'armor' && !isArmors && isStrengthAgree) {
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
      } else {
        this.isСloth = false
        this.isArmor = false
        this.isWeapon = false
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
    },
    handle(variable) { //логика воровства
      if(variable === 'yes') {
        let itemSteal = null
        this.player.inventory.map((item, index) => {
          if(item.name === this.player.invName) {
            this.player.inventory.splice(index, 1)
            itemSteal = item
          }
        })
        let index = null
        this.players.forEach((item, ind) => {
          if(item.name === this.player.domName) index = ind
        })
        this.players[index].inventory.push(itemSteal)
      }
      this.player.invName = ''
      this.player.domName = ''
      this.player.subName = ''
      this.player.isSteal = false
      store.dispatch('sendSharedValue')
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
    stealItem() { // проверка на принадлежность вещи игроку
      let result = false
      if(this.index !== this.indexCard) result = true
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
  &-lists {
    height: 100%;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 83%;
        border: 2px solid #8B4513;
      }
    }
    &__right {
      width: 100%;
      height: 100%;
      text-align: center;
      position: relative;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        width: 93.5%;
        flex-direction: column;
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
  //position: absolute;
  padding: 4px;
  left: 4px;
  height: auto;
  width: auto;
  border: 2px solid #8B4513;
  background-color: white;
  top: 32px;
  z-index: 2;
  //margin-bottom: 117px;
  &-tab {
    cursor: pointer;
  }
}
.medieval-button {
  background-color: #8B4513;
  color: #fff;
  padding: 5px 5px;
  font-size: 18px;
  border: 2px solid #8B4513;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s ease;
  height: 40px;
}
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.modal {
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.5s forwards; /* начальная анимация выезжания */
}

.modal.slide-out {
  animation: slideOut 0.5s forwards; /* анимация выезжания */
}
.modal-content {
  text-align: center;
  &-btns {
    gap: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>