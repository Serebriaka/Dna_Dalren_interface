<template>
  <div class="admin">
    <div class="admin-select">
      <select-component :options="selectedCategories" @change="setCategory"/>
    </div>
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
<!--      <div class="admin-basics-element"></div>-->
<!--      <div class="admin-basics-element"></div>-->
<!--      <div class="admin-basics-element"></div>-->
<!--      <div class="admin-basics-element"></div>-->
    </div>

<!--  <button @click="save"></button>-->
  </div>
</template>

<script>

import SelectComponent from "@/components/selectComponents/selectComponent.vue";

export default {
  components: {SelectComponent},
  data() {
    return {
      isProtection: false,
      isRequirements: false,
      isBuffs: false,

      selectedCategories: [
        {
          name: "Оружие",
          value: "armors",
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
      selectedCategory: "",
      itemObj: {
        name: '',
        category: '',
        weight: 0,
        sale: 0,
        description: '',
        rarity: 1, //редкость 1 - самый редкий 4 обычный
        logo: '',
        skills: [], //вариант на случай если предмет позволяет использовать навык
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
          damage: {
            chopping: 0, //рубящий
            pricking: 0, //колющий
            crushing: 0, //дробящий
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
      category: '',
      weight: 0,
      sale: 0,
      description: '',
      rarity: 1, //редкость 1 - самый редкий 4 обычный
      logo: '',
      skills: [],
    }
  },
  methods: {
    setRarity(rarity) {
      this.rarity = rarity.value
    },
    setCategory(category) {
      this.selectedCategory = category.value
    }
  },
  watch: {
    isProtection() {

    },
    isRequirements() {

    },
    isBuffs() {

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
    width: 25%;
    &-element {
      display: flex;
      gap: 10px;
    }
  }
}
</style>