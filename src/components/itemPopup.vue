<template>
  <div class="popup">
    <div class="popup-char">Название: {{item.name}}</div>
    <div class="popup-char">Описание: {{item.description}}</div>
    <div class="popup-char">Категория: {{item.category}}</div>
    <div class="popup-char">Редкость: {{rarity}}</div>
    <div class="popup-char">Цена: {{item.sale}}</div>
    <div class="popup-char">Вес: {{item.weight}}</div>

<!--    <div class="popup-char">Название: {{item.name}}</div>-->

  </div>
</template>

<script>
export default {
  props: {
    item: {}
  },
  data() {
    return {
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
      name: '',
      selectedCategory: '',
      weight: 0,
      sale: 0,
      description: '',
    }
  },
  computed: {
    rarity() {
      let result = ''
      if(this.item.rarity === 1) result = 'Обычная'
      if(this.item.rarity === 2) result = 'Редкая'
      if(this.item.rarity === 3) result = 'Легендарная'
      if(this.item.rarity === 4) result = 'Квестовая'
      return result
    }
  },
}
</script>



<style scoped lang="scss">
.popup {
  position: absolute;
  background-color: white;
  border: 1px solid #000000;
  border-radius: 7px;
  height: auto;
  width: 30%;
  padding: 10px;
  gap: 5px;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  &-char {

  }
}
</style>