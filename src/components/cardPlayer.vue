<template>
  <div class="body" >
    <div class="stats">
      <div class="stats-first">
        <div class="stats-first-name stat">{{player.name}}</div>
        <div class="stats-first-class stat">{{player.class}}</div>
        <div class="stats-first-race stat">{{player.race}}</div>
        <div class="stats-first-city stat">{{player.city}}</div>
      </div>
      <div class="stats-ava"></div>
      <div class="stats-second">
        <div class="stats-second-table"
           v-for="(stat) in statsValues"
           :key="stat"
        >
          <div class="stats-second-table__name">{{ stat.name }}</div>
          <div class="stats-second-table__name">{{ stat.value }}</div>
          <button v-if="false">+</button>
        </div>
      </div>
      <div class="stats-third">
        <div class="stat fs14">Здоровье 22</div>
        <div class="stat fs14">Защита 22</div>
        <div class="stat fs14">Скрытность 22</div>
        <div class="stat fs14">Внимательность 22</div>
        <div class="stat fs14">Инициатива 22</div>
        <div class="stat fs14">Удача 22</div>
      </div>
      <div class="stats-fourth">
        <div class="stats-fourth__tab">
        Профессии
        </div>
        <div class="stats-fourth__tab">
        Языки
        </div>
      </div>
    </div>
    <div class="inventory" v-if="false"></div>
  </div>
</template>

<script>
// import ChromePicker from "./ChromePicker.vue";
export default {
  props: {
    player: {}
  },
  data() {
    return {
      stats: ['Сил', "Лов", "Вын", "Инт", "Муд", "Хар"],
      statsEng: ['Strength', "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"],
    }
  },
  components: {
  },
  mounted() {
    console.log(window.location.pathname)

  },
  methods: {

  },
  computed: {
    statsValues() {
      let result = []
      let statsValue =  Object.values(this.player.skills);
      console.log(statsValue)
      statsValue.forEach((el, index) => {
        let obj = {
          name: this.stats[index],
          value: statsValue[index],
        }
        result.push(obj)
      })
      return result
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
}
.stat {
  display: flex;
  justify-content: center;
  padding: 3px;
  width: 100%;
  background-color: #e79049;
  border: 1px solid #8B4513;
  border-radius: 10px;
  text-align: center;
  font-family: cursive;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.stats {
  padding: 15px;
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-first {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  &-second {
    display: flex;
    flex-direction: row;
    gap: 20px;
    &-table {
      text-align: center;
      &_name {

      }
    }
  }
  &-third {
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  &-fourth {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 20%;
    &__tab {
      width: 50%;
      border: 1px solid #8B4513;
      text-align: center;
    }
  }
  &-ava {
      background-color: #A9A9A9;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
.fs14 {
  font-size: 14px;
}
</style>
