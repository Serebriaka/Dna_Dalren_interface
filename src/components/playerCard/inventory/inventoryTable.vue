<template>
  <div class="inventory">
    <div class="inventory-lists">
      <div class="inventory-lists__left">
        <castom-text
            right-romb-position="96.3%"
            rombColor="#3E3727"
            style="z-index: 1"
            backgroundColor="#8F4C3C"
            text="Экипировка"
            :isText="true"
        />
        <div class="inventory-lists__left-tab">
          <div
              style="width: 100%; display: flex"
              v-for="(equip, index) in player.equipment"
              :key="index"
              @click="enEquip(index, equip)"
          >
            <castom-text
                :text="equip.name"
                :isText="true"
                height="100%"
                background-color="#A4A86B"
                rightRombPosition="96.6%"
                rombColor="#3E3727"
                color="#3E3727"
                :boxShadow="false"
            />
            <div v-if="isAdmin" style="margin-left: 5px">x</div>
          </div>
        </div>
      </div>
      <div class="inventory-lists__right">
        <castom-text
            right-romb-position="96.3%"
            style="z-index: 1"
            rombColor="#3E3727"
            backgroundColor="#8F4C3C"
            text="Инвентарь"
            :isText="true"
        />
        <div class="inventory-lists__right-tab" >
          <div
              style="width: 100%; display: flex"
               v-for="(inv, index) in player.inventory"
               :key="index"
              @click="clickItem(index, inv)"
              @click.stop
          >
            <castom-text
                :text="inv.name"
                :isText="true"
                height="100%"
                background-color="#A4A86B"
                rightRombPosition="96.6%"
                rombColor="#3E3727"
                color="#3E3727"
                :boxShadow="false"
            />
            <div v-if="isAdmin" @click="delItem(index, inv)" style="margin-left: 5px">x</div>
            <div class="selectPopup" v-if="index === selectedIndexPopup">
              <div class="selectPopup-tab"
                   @click="clickTab('use', inv, index)"
                   v-if="inv.isUse && !stealItem"
              >
                <castom-text
                    text="Использовать"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
              <div class="selectPopup-tab"
                   v-if="inv.isEquip && !stealItem"
                   @click="clickTab('equip', inv, index)"
              >
                <castom-text
                    text="Экипировать"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
              <div class="selectPopup-tab"
                   v-if="inv.isHandOver && !stealItem"
                   @click="clickTab('handOver', inv, index)"
              >
                <castom-text
                    text="Передать"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
              <div class="selectPopup-tab"
                   v-if="inv.isPlant && !stealItem"
                   @click="clickTab('plant', inv, index)"
              >
                <castom-text
                    text="Подкинуть"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
              <div class="selectPopup-tab"
                   v-if="inv.isRead && !stealItem"
                   @click="clickTab('read', inv, index)"
              >
                <castom-text
                    text="Описание"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
              <div class="selectPopup-tab"
                   v-if="stealItem"
                   @click="clickTab('stealItem', inv, index)"
              >
                <castom-text
                    text="Украсть"
                    :isText="true"
                    height="100%"
                    background-color="#A4A86B"
                    rightRombPosition="96.6%"
                    rombColor="#3E3727"
                    color="#3E3727"
                    :boxShadow="false"
                />
              </div>
            </div>
          </div>
          <select v-if="isAdmin" v-model="selectedCategory" style="width: 100%">
            <option disabled value="">Выберите категорию</option>
            <option v-for="(item) in categoryArray" :key="item.id"> {{item.name}}</option>
          </select>
          <select v-if="isAdmin" v-model="selectedItem" style="width: 100%">
            <option disabled value="">Выберите предмет</option>
            <option v-for="(item) in items" :key="item.id"> {{item.name}}</option>
          </select>
          <button @click="addItem" v-if="isAdmin">+</button>
        </div>
      </div>
    </div>
    <div
        class="weight"
    >
      <castom-text
          :text="`Вес: ${inventoryWeight} / ${maxWeight}`"
          :isText="true"
          height="100%"
          background-color="#A4A86B"
          rightRombPosition="92.6%"
          rombColor="#3E3727"
          :color="isBigWeight"
          :boxShadow="false"
      /> 
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
    <description-popup
       v-if="isReadPopup"
      :item="itemClick"
      :description="itemClick.description"
      @close="closePopup"
    />
  </div>
</template>
<script>
import store from "@/store";
import validationItems from "@/validationItems";
import helpers from "@/helpers";
import DescriptionPopup from "@/components/descriptionPopup.vue";
import CastomText from "@/components/castomText.vue";
// import helpers from "@/helpers";

export default {
  components: {CastomText, DescriptionPopup},
  props: {
    player: {},
    index: {},
    indexCard: {},
    playerName: {},
  },
  data() {
    return {
      selectedCategory: 'Предметы',
      itemClick: {},
      selectedItem: '',
      categoryTouch: '',
      selectedIndexPopup: null,
      categoryArray: [
        {
          name: "Броня",
          value: "armors",
        },
        {
          name: "Квестовое",
          value: "questItem",
        },
        {
          name: "Предметы",
          value: "items",
        },
        {
          name: "Щиты",
          value: "shields",
        },
        {
          name: "Одежда",
          value: "cloth",
        },
        {
          name: "Оружие",
          value: "weapons",
        },
        {
          name: "Документы",
          value: "documents",
        },
        {
          name: "Инструменты",
          value: "instruments",
        },
        {
          name: "Еда",
          value: "food",
        },
        {
          name: "Медицина",
          value: "medicine",
        },
        {
          name: "Украшения",
          value: "jewelry",
        },
      ],

      oneHandedCount: 0,
      twoHandedCount: 0,
      shieldsCount: 0,
      clothCount: 0,
      jeweleryCount: 0,
      armorCount: 0,
      isReadPopup: false,

      subName: '',
      domName: '',
      invName: '',
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClick);
    this.validateItems()
  },
  methods: {
    checkInventory() {
      this.armorCount = validationItems.counter(this.player.equipment).armorCount
      this.shieldsCount = validationItems.counter(this.player.equipment).shieldsCount
      this.jeweleryCount = validationItems.counter(this.player.equipment).jeweleryCount
      this.clothCount = validationItems.counter(this.player.equipment).clothCount
      this.oneHandedCount = validationItems.counter(this.player.equipment).oneHandedCount
      this.twoHandedCount = validationItems.counter(this.player.equipment).twoHandedCount
    },
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
    validateItems() {
      this.$nextTick(() => {
        this.checkInventory() // Проверка экипировки перед валидацией
        this.player.inventory = this.player.inventory.map((item, index) => {
          item.isEquip = false
          item.isUse = false
          item.isRead = true
          // item.isPlant = true
          if (validationItems.getIsEquip(item) && validationItems.getStatsValidate(item.requirements, this.player.skills)) { // Валидация по возможности экипировать
            if(item.category === 'weapons') { // валидация по оружию
              if(item.handed === 'one-handed' && !this.twoHandedCount && this.oneHandedCount < 2 && validationItems.getShellVal(item, this.player.equipment, this.player.skills )) { //валидация одноручного оружия
                item.isEquip = true
              }
              if(item.handed === 'two-handed' && !this.twoHandedCount && !this.oneHandedCount) { //валидация двуручного оружия
                item.isEquip = true
              }
            }
            if(item.category === 'armors' && !this.armorCount) { // Валидация по броне
              item.isEquip = true
            }
            if(item.category === 'cloth' && !this.clothCount) { // Валидация по одежде
              item.isEquip = true
            }
            if(item.category === 'jewelry' && !this.jeweleryCount) { // Валидация по украшениям
              item.isEquip = true
            }
            if(item.category === 'shields'  && !this.shieldsCount && this.oneHandedCount <= 1 && !this.twoHandedCount && validationItems.getShellVal(item, this.player.equipment, this.player.skills )) { // Валидация по украшениям
              item.isEquip = true
            }
          }
          if(item.category === 'medicine') {
            item.isUse = true
          }
          return item;
        });
        store.dispatch('sendSharedValue')
      });
    },
    closePopup() {
      this.isReadPopup = false
      this.itemClick = {}
    },

    clickTab(tab, inv, index) {
      if(tab === 'equip') {
        this.player.equipment.push(inv)
        helpers.setNewSkills(this.player.skills, inv, 'add')
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
      if(tab === 'read') {
        store.commit('setDescription',inv)
        this.player.page = 'description'
      }
      store.dispatch('sendSharedValue')
    },
    delItem(index) {
      this.player.inventory.splice(index, 1)
      this.selectedIndexPopup = null
      store.dispatch('sendSharedValue')
    },
    // delEquip(index, inv) {
    //   this.player.equipment.splice(index, 1)
    //   helpers.setNewSkills(this.player.skills, inv, 'del')
    //   store.dispatch('sendSharedValue')
    // },
    enEquip(index, equip) {
      if(!this.stealItem) {
        this.player.equipment.splice(index, 1)
        this.player.inventory.push(equip)
        helpers.setNewSkills(this.player.skills, equip, 'del')
        store.dispatch('sendSharedValue')
      }
    },
    clickItem(index, inv) { //логика открытия и закрытия попапа
      this.validateItems()
      console.log(this.selectedIndexPopup,'попали сюда 1', index)
      if (this.selectedIndexPopup === index)  {
        console.log(this.selectedIndexPopup,'попали сюда 2', index)
        this.selectedIndexPopup = null
      } else {
        console.log(this.selectedIndexPopup,'попали сюда 3', index)
        this.selectedIndexPopup = index
      }
    },
    useHealth(inv, index) {
      if(inv.category === 'medicine') {
        if(inv.buffs.treatment === '1d12') {
          let randomNum = 0
          randomNum = Math.floor(Math.random() * 12) + 1;
          this.player.actHealth = this.player.actHealth + +randomNum
          this.player.inventory.splice(index, 1)
        }
        if(inv.buffs.treatment === '1d6') {
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
    },
    handleClick() {
      this.selectedIndexPopup = null
    }
  },
  computed: {
    isBigWeight() {
      return this.inventoryWeight < this.maxWeight ? '#3E3727' : '#b40f0f'
    },
    itemCategories() {
      return store.state.allItem
    },
    inventoryWeight() {
      let allItems = [...this.player.inventory, ...this.player.equipment]
      if(allItems[0] !== undefined) {
        return allItems.reduce((total, item) => total + item.weight, 0)
      } else {
        return 0
      }
    },
    items() {
      let category = this.categoryArray.find(item => item.name === this.selectedCategory)
      return this.itemCategories[category.value]
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
    },
  }
}
</script>
<style scoped lang="scss">
.inventory {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 55%;
  @media screen and (min-width: 576px) {
    height: 40vh;
  }
  &-lists {
    height: 80%;
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
      position: relative;
      &-item {
        position: relative;
        display: flex;
        align-items: center;
        text-align: center;
        width: 93.5%;
        justify-content: center;
        margin-top: -1px;
        height: auto;
        background: linear-gradient(322deg, #cbc630, #ff9a00);
        padding: 3px;
        border-radius: 5px;
        border: 2px solid #8B4513;
        @media screen and (min-width: 576px) {
          cursor: pointer;
        }
      }
      &-tab {
        display: flex;
        position: absolute;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        padding: 22px 8px 0 8px;
        overflow: auto;
        gap: 4px;
        background-color: rgba(176, 208, 194, 0.5);
        border: 1px solid #3E3727;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        border-radius: 12px;
      }
    }
    &__right {
      width: 100%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
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
        background: linear-gradient(322deg, #b7763f, #d78913);
        padding: 3px;
        border-radius: 5px;
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
        width: 100%;
        height: 100%;
        padding: 22px 8px 0 8px;
        background-color: rgba(176, 208, 194, 0.5);
        border: 1px solid #3E3727;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        overflow: auto;
        gap: 4px;
        border-radius: 12px;
      }
    }
  }
}
.weight {
  font-size: 16px;
  font-weight: 600;
  width: 100px;
}
.selectPopup {
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 10px;
  left: 4px;
  gap: 4px;
  height: auto;
  width: 78%;
  border: 2px solid #3E3727;
  background-color: #CDBD97;
  border-radius: 8px;
  top: 32px;
  z-index: 2;
  //margin-bottom: 117px;
  &-tab {
    cursor: pointer;
    font-size: 12px;
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
  //font-family: 'Times New Roman', serif;
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
.red {
  color: red;
  //box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}
</style>