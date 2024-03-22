<template>
  <div class="admin">
    <div class="admin-select">
      <select-component :options="selectedCategories" @change="setCategory"/>
    </div>
    <div class="admin-basics-row">
      <div class="admin-basics">
        <div class="admin-basics-element">
          <input type="text" v-model="name" placeholder="Название"> <div>Название</div>
        </div>
        <div class="admin-basics-element">
          <input type="text" v-model="description" placeholder="Описание"> <div>Описание</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="weight" placeholder="Вес"> <div>Вес</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="sale" placeholder="Цена"> <div>Цена</div>
        </div>
        <div class="admin-basics-element">
          <select-component :options="selectedRarity" @change="setRarity"/> <div>Редкость</div>
        </div>
        <div class="admin-basics-element">
          <input type="checkbox" v-model="isProtection"> <div>Должен давать защиту</div>
        </div>
        <div class="admin-basics-element">
          <input type="checkbox" v-model="isRequirements"> <div>Есть требования чтобы надеть</div>
        </div>
        <div class="admin-basics-element">
          <input type="checkbox" v-model="isBuffs"> <div>Может давать баффы</div>
        </div>
      </div>
      <div class="admin-basics-protection" v-if="isProtection">
          <div class="admin-basics-element">
            <input type="number" v-model="protection.chopping" placeholder="Рубящий"> <div>Рубящий(защита)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="protection.pricking" placeholder="Колющий"> <div>Колющий(защита)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="protection.crushing" placeholder="Дробящий"> <div>Дробящий(защита)</div>
          </div>
      </div>
      <div class="admin-basics-requirements" v-if="isRequirements">
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.strength" placeholder="Сила"> <div>Сила(Требование)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.dexterity" placeholder="Ловкость"> <div>Ловкость(Требование)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.constitution" placeholder="Выносливость"> <div>Выносливость(Требование)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.intelligence" placeholder="Интеллект"> <div>Интеллект(Требование)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.wisdom" placeholder="Мудрость"> <div>Мудрость(Требование)</div>
          </div>
          <div class="admin-basics-element">
            <input type="number" v-model="requirements.charisma" placeholder="Харизма"> <div>Харизма(Требование)</div>
          </div>
      </div>
      <div class="admin-basics-buffs" v-if="isBuffs">
        <div class="admin-basics-element">
          <select-component :options="selectedHanded" @change="setHanded"/> <div>Сколько рук?</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.strength" placeholder="Сила"> <div>Сила (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.dexterity" placeholder="Ловкость"> <div>Ловкость (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.constitution" placeholder="Выносливость"> <div>Выносливость (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.intelligence" placeholder="Интеллект"> <div>Интеллект (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.wisdom" placeholder="Мудрость"> <div>Мудрость (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.charisma" placeholder="Харизма"> <div>Харизма (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="number" v-model="buffs.health" placeholder="Здоровье"> <div>увеличивает макс. Здоровье (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="text" v-model="buffs.damage.chopping" placeholder="Рубящий"> <div>Рубящий урон (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="text" v-model="buffs.damage.pricking" placeholder="Колющий"> <div>Колющий урон (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="text" v-model="buffs.damage.crushing" placeholder="Дробящий"> <div>Дробящий урон (Бафф)</div>
        </div>
        <div class="admin-basics-element">
          <input type="text" v-model="buffs.treatment" placeholder="Лечение"> <div>Лечит здоровья (для лечилок)</div>
        </div>
      </div>
    </div>
    <div
        @click="save"
        class="btn"
        :class="{activeBtn: isBtnActive}"
    >
      Сохранить
    </div>
    <div class="admin-items">
      <item-popup
          v-if="isPopup"
          :item="item"
      />
      <div class="admin-items-list" v-for="(value, key, index) in itemCategories" :key="value[key]">
        <div class="category">{{nameCategories[index]}}</div>
        <div class="admin-items-list-elem" v-for="item in value" :key="item.id">
          <div style="display: flex; gap: 5px; align-items: center" @click.stop>
            <div style="cursor: pointer" @click="openPopup(item)">{{item.name}} </div>
            <div style="cursor: pointer" @click="deleteItem(item)">x</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import SelectComponent from "@/components/selectComponents/selectComponent.vue";
import helpers from "@/helpers";
import store from "@/store";
import ItemPopup from "@/components/itemPopup.vue";

export default {
  components: {ItemPopup, SelectComponent},
  data() {
    return {
      item: {},
      isPopup: false,

      isProtection: false,
      isRequirements: false,
      isBuffs: false,
      nameCategories: ['Броня', 'Предметы', 'Щиты', 'Одежда', 'Оружие', 'Документы', 'Инструменты', 'Еда', 'Украшения', 'Медицина', 'Квестовые предметы'],
      selectedCategories: [
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
      selectedRarity: [
        {
          name: "Обычная",
          value: 1
        },
        {
          name: "Улучшенная",
          value: 2
        },
        {
          name: "Легендарная",
          value: 3
        },
        {
          name: "Квестовая",
          value: 4
        },
      ],
      selectedHanded: [
        {
          name: "Одноручное",
          value: 'one-handed'
        },
        {
          name: "Двуручное",
          value: 'two-handed'
        },
      ],
      itemObj: { // образец заполнения объекта
        id: "",
        name: '',
        category: '',
        weight: 0,
        sale: 0,
        description: '',
        rarity: 1, //редкость 1 - самый редкий 4 обычный
        logo: '',
        skills: [], //вариант на случай если предмет позволяет использовать навык
        handed: '',
        protection: {
          chopping: 0, //рубящий
          pricking: 0, //колющий
          crushing: 0, //дробящий
        },
        requirements: { //требования
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        buffs: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
          health: 0,
          treatment: '',
          damage: {
            chopping: '', //рубящий
            pricking: '', //колющий
            crushing: '', //дробящий
          },
        },
        isRead: false, //прочитать описание
        isUse: false, //использовать
        isEquip: false, //надеть
        isUndress: false, //снять
        isPlant: false, //подкинуть
        isSteal: false, //украсть
        isHandOver: false, //передать
      },


      name: '',
      selectedCategory: '',
      handed: 'one-handed',
      weight: 0,
      sale: 0,
      description: '',
      rarity: 0, //редкость 1 - самый редкий 4 обычный
      logo: '',
      skills: [],
      protection: {
        chopping: 0, //рубящий
        pricking: 0, //колющий
        crushing: 0, //дробящий
      },
      requirements: { //требования
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      },
      buffs: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        health: 0,
        treatment: '',
        damage: {
          chopping: '', //рубящий
          pricking: '', //колющий
          crushing: '', //дробящий
        },
      },
    }
  },
  mounted() {
    window.removeEventListener('click', this.closePopup)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.closePopup)
  },
  methods: {
    setRarity(rarity) {
      this.rarity = rarity.value
    },
    setCategory(category) {
      this.selectedCategory = category.value
    },
    setHanded(handed) {
      this.handed = handed.value
    },
    openPopup(item) {
      this.item = item
      this.isPopup = !this.isPopup
    },
    closePopup() {
      this.isPopup = !this.isPopup
    },
    async save() {
      let item = { ...this.itemObj}
      item.id = helpers.generateId()
      item.name = this.name
      item.category = this.selectedCategory
      item.weight = +this.weight
      item.sale = +this.sale
      item.description = this.description
      item.rarity = +this.rarity //редкость 1 - самый редкий 4 обычный
      item.logo = ''
      item.skills = [] //вариант на случай если предмет позволяет использовать навык
      item.handed = this.handed
      item.protection = {
        chopping: +this.protection.chopping, //рубящий
        pricking: +this.protection.pricking, //колющий
        crushing: +this.protection.crushing, //дробящий
      }
      item.requirements = { //требования
        strength: +this.requirements.strength,
        dexterity: +this.requirements.dexterity,
        constitution: +this.requirements.constitution,
        intelligence: +this.requirements.intelligence,
        wisdom: +this.requirements.wisdom,
        charisma: +this.requirements.charisma,
      }
      item.buffs = {
        strength: +this.buffs.strength,
        dexterity: +this.buffs.dexterity,
        constitution: +this.buffs.constitution,
        intelligence: +this.buffs.intelligence,
        wisdom: +this.buffs.wisdom,
        charisma: +this.buffs.charisma,
        health: +this.buffs.health,
        treatment: this.buffs.treatment, //лечение
        damage: {
          chopping: this.buffs.damage.chopping, //рубящий
          pricking: this.buffs.damage.pricking, //колющий
          crushing: this.buffs.damage.crushing, //дробящий
        },
      }
      item.isRead = false //прочитать описание
      item.isUse = false //использовать
      item.isEquip = false //надеть
      item.isUndress = false //снять
      item.isPlant = false //подкинуть
      item.isSteal = false //украсть
      item.isHandOver = false //передать

      await store.dispatch('setItem', item)
      await store.dispatch('getItems', item)
    },
    async deleteItem(item) {
      let object = {
        id: item.id,
        category: item.category
      }

      await store.dispatch('delItem', object)
      await store.dispatch('getItems')
    }
  },
  computed: {
    isBtnActive() {
      let result = false
      result = !!(this.name && this.selectedCategory && this.description && this.rarity);
      if(this.isBuffs && !this.handed) result = false
      return result
    },
    itemCategories() {
      return store.state.allItem
    }
  },
  watch: {
    isProtection() {
      this.itemObj.protection =  {
        chopping: 0, //рубящий
        pricking: 0, //колющий
        crushing: 0, //дробящий
      }
      this.protection = this.itemObj.protection
    },
    isRequirements() {
      this.itemObj.requirements = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
      }
      this.requirements = this.itemObj.requirements
    },
    isBuffs() {
      this.itemObj.buffs = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0,
        health: 0,
        treatment: '',
        damage: {
          chopping: '', //рубящий
          pricking: '', //колющий
          crushing: '', //дробящий
        },
      }
      this.buffs = this.itemObj.buffs
      this.handed = ''
    },
  }
}
</script>

<style scoped lang="scss">
.admin {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px;
  &-select {
    width: 100%;
  }
  &-basics {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;
    border: 1px solid #bcbbbd;
    border-radius: 10px;
    &-element {
      align-items: center;
      text-align: center;
      display: flex;
      gap: 10px;

    }
    &-row {
      display: flex;
      flex-direction: row !important;
      gap: 10px;
    }
    &-protection {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      border: 1px solid #bcbbbd;
      border-radius: 10px;
    }
    &-requirements {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      border: 1px solid #bcbbbd;
      border-radius: 10px;
    }
    &-buffs {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      border: 1px solid #bcbbbd;
      border-radius: 10px;
    }
  }
  &-items {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: space-around;
    height: 100%;
    border: 1px solid #000000;
    padding: 7px;
    text-align: center;
    align-items: center;
    &-list {
      align-items: center;
      width: 9%;
      height: 400px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      &-elem {
        padding-top: 5px;
      }
    }
  }
}
.activeBtn {
  transition: all 0.5s;
  color: black !important;
  background-color: #c35f10 !important;
  border: 2px solid #8B4513 !important;
}
.btn {
  //width: 100%;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  background-color: #a9a9a9;
  border-radius: 10px;
  color: #707070;
  border: 2px solid #707070;
}
.category {
  border-radius: 7px;
  padding: 5px;
  color: #ec8f46;
  border: 2px solid #8B4513;
}

</style>