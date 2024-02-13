<template>
  <div  class="stats-second">
    <div class="stats-second-table"
         v-for="(stat) in statsValues"
         :key="stat.name"
    >
      <div class="stats-second-table__name">{{ stat.name }}</div>
      <button v-if="isAdmin" @click="minSkill( stat.statsEng )">-</button>
      <div class="stats-second-table__name">{{ stat.value }}</div>
      <button v-if="isAdmin" @click="addSkill(stat.statsEng )">+</button>
      <div class="stats-second-table__name">
        {{ stat.mode }}
      </div>
    </div>
  </div>
</template>
<script>
// import {mapGetters} from "vuex";
import store from "../../store"
export default  {
  props: {
    player:{},
    isAdmin: {}
  },
  data() {
    return {
      stats: ['Сил', "Лов", "Вын", "Инт", "Муд", "Хар"],
      statsEng: ['strength', "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
    }
  },
  mounted() {
    console.log(store.state.test)
  },
  methods: {
    minSkill(stat) {
      /* eslint-disable */
      this.player.skills[stat] = this.player.skills[stat]-1
      store.dispatch('sendSharedValue')
    },
    addSkill(stat) {
      this.player.skills[stat] = this.player.skills[stat]+1
      store.dispatch('sendSharedValue')
    },
  },
  computed: {
    statsValues() {
      let result = []
      let statsValue =  Object.values(this.player.skills);
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
          mode: mod,
          statsEng: this.statsEng[index]
          // engName: this.player.stats[index].engName
        }
        result.push(obj)
      })
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
}
</style>