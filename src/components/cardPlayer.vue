<template>
  <div class="body" >
    <div class="stats">
      <div class="stats-header">
        <div class="stats-header-column">
          <div class="stats-ava"></div>
          <div class="stats-first-name stat">{{player.name}}</div>
        </div>
        <div class="stats-first">
          <div class="stats-first-history stat">{{player.history}}</div>
          <div class="stats-first-class stat">{{player.class}}</div>
          <div class="stats-first-race stat">{{player.race}}</div>
          <div class="stats-first-city stat">{{player.city}}</div>
        </div>
      </div>


      <div class="stats-second">
        <div class="stats-second-table"
           v-for="(stat) in statsValues"
           :key="stat"
        >
          <div class="stats-second-table__name">{{ stat.name }}</div>
          <button v-if="false">-</button>
          <div class="stats-second-table__name">{{ stat.value }}</div>
          <button v-if="false">+</button>
          <div class="stats-second-table__name">
            {{ stat.mod }}
          </div>
        </div>
      </div>
      <div class="stats-third">
        <div class="stat fs14">Здоровье {{setHeat}}</div>
        <div class="stat fs14">Защита 22</div>
        <div class="stat fs14">Скрытность {{setStels}}</div>
        <div class="stat fs14">Внимательность {{setObservation}}</div>
        <div class="stat fs14">Инициатива {{setIniciative}}</div>
        <div class="stat fs14">Удача {{setLucky}}</div>
      </div>
      <div class="stats-fourth">
        <div class="stats-fourth__tab">
        Профессии
        </div>
        <div class="stats-fourth__tab">
        Языки
        </div>
      </div>
      <div class="footer-menu">
        <div class="footer-menu__gold stat">333</div>
        <div class="footer-menu__exp stat">Опыт</div>
        <div class="footer-menu__btn-inventory stat" >Инвентарь</div>
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
        let mod =
            statsValue[index] < 8 ? -2 :
                statsValue[index] < 10 ? -1 :
                    statsValue[index] < 12 ? 0 :
                      statsValue[index] < 14 ? 1 :
                        statsValue[index] < 16 ? 2 :
                          statsValue[index] < 18 ? 3 :
                            statsValue[index] > 18 ? 4 :3
        let obj = {
          name: this.stats[index],
          value: statsValue[index],
          mod: mod,
        }
        result.push(obj)
      })
      return result
    },
    setLucky() {
      let result = []
      result = this.statsValues[5].value
      return result
    },
    setObservation() {
      let result = []
      result = this.statsValues[4].value
      return result
    },
    setHeat() {
      let result = []
      result = this.statsValues[2].value
      return result
    },
    setStels() {
      let result = []
      result = this.statsValues[1].value
      return result
    },
    setIniciative() {
      let result = []
      result = this.statsValues[3].value
      return result
    },
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
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1px;
  width: 100%;
  background-color: #e79049;
  border: 1px solid #8B4513;
  border-radius: 10px;
  text-align: center;
  font-family: cursive;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  font-size: 12px;
  font-weight: 600;
}
.stats {
  padding: 15px 15px 0 15px;
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-header {
    display: flex;
    flex-direction: row;
    height: 18%;
    width: 100%;
    justify-content: space-between;
    &-column {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  &-first {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;
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
      width: 90px;
      height: 90px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
.footer-menu {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 30px;
  justify-content: space-between;
  &__gold {
    height: 100%;
    width: 25%;
  }
  &__exp {
    height: 100%;
    width: 25%;
    text-align: center;
  }
  &__btn-inventory {
    height: 100%;
    width: 25%;
    text-align: center;
  }
}
.fs14 {
  font-size: 14px;
}
</style>
