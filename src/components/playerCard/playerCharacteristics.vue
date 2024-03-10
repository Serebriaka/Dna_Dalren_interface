<template>
  <div  class="stats-second">
    <div class="stats-second-table"
         v-for="(stat) in statsValues"
         :key="stat.name"
    >
      <div class="stats-second-table__name">{{ stat.name }}</div>
      <button class="btn-stats" v-if="isAdmin || (isStatRedactor && stat.isMinActive)" @click="minSkill( stat.statsEng )">-</button>
      <div class="stats-second-table__name">{{ stat.value }}</div>
      <button class="btn-stats" v-if="isAdmin || (isStatRedactor && stat.isAddActive)" @click="addSkill(stat.statsEng )">+</button>
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
    isSetStats:{},
    isAdmin: {}
  },
  data() {
    return {
      stats: ['Сил', "Лов", "Вын", "Инт", "Муд", "Хар"],
      statsEng: ['strength', "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
      accCharacteristics: {}
    }
  },
  mounted() {
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
      let result = Object.values(this.player.skills).map((value, index) => {
        let mod =
            value < 8 ? -2 :
                value < 10 ? -1 :
                    value < 12 ? 0 :
                        value < 14 ? 1 :
                            value < 16 ? 2 :
                                value < 18 ? 3 :
                                    value > 18 ? 4 : 3
        return {
          name: this.stats[index],
          value: value,
          mode: mod,
          statsEng: this.statsEng[index],
          isMinActive: value > this.accCharacteristics[index],
          isAddActive: true,
          // engName: this.player.stats[index].engName
        }
      });
      return result;
    },
    isStatRedactor() {
      return this.player.isStatRedactor
    }
  },
  watch: {
    isSetStats() {
      if(this.isSetStats) {
        this.accCharacteristics = Object.values(this.player.skills)
      }
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
.btn-stats {
  background-color: #9b462a;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
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