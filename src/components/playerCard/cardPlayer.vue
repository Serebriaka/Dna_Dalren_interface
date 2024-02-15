<template>
  <div class="body" >
    <div class="stats" v-if="isAdmin || player.page === 'stats'">
      <div class="stats-header">
        <div class="stats-header-column">
          <div class="stats-ava"></div>
          <div class="stats-first-name stat">{{player.name}}</div>
        </div>
        <div class="stats-first">
          <div class="stats-first-class stat">{{player.class}}</div>
          <div class="stats-first-history stat">{{player.history}}</div>
          <div class="stats-first-race stat">{{player.race}}</div>
          <div class="stats-first-city stat">{{player.city}}</div>
        </div>
      </div>
      <div>
        <playerCharacteristics
          :player="player"
          :isAdmin="isAdmin"
        />
      </div>
      <div class="stats-third">
        <div class="stat fs14">Здоровье {{setHeat}}</div>
        <div class="stat fs14">Защита 0</div>
        <div class="stat fs14">Скрытность {{setStels}}</div>
        <div class="stat fs14">Внимательность {{setObservation}}</div>
        <div class="stat fs14">Инициатива {{setIniciative}}</div>
        <div class="stat fs14">Удача {{setLucky}}</div>
      </div>
      <languages-player
        :player="player"
      />
      <footer-card
        :isAdmin="isAdmin"
        :player="player"
        pageRightTab="inventory"
        pageLeftTab="inventory"
        nameRightTab="Инвентарь"
        nameLeftTab="Классы"
        @tabChange="setpage"
      />
    </div>
    <InventoryPlayer
        v-if="isAdmin || player.page === 'inventory'"
        :player="player"
    />
    <button
        class="del-player" v-if="isAdmin"
        @mousedown.stop="startHold"
        @mouseup.stop="endHold"
    >
      Удалить игрока
    </button>
  </div>
</template>

<script>
// import ChromePicker from "./ChromePicker.vue";
import playerCharacteristics from "./playerCharacteristics.vue";
import store from "@/store";
import LanguagesPlayer from "@/components/playerCard/languagesPlayer.vue";
import footerCard from "@/components/playerCard/footerCard.vue";
import InventoryPlayer from '@/components/playerCard/InventoryPlayer.vue'

export default {
  props: {
    player: {},
    index: {}
  },
  data() {
    return {
      stats: ['Сил', "Лов", "Вын", "Инт", "Муд", "Хар"],
      statsEng: ['strength', "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
      testValue: 0.2
    }
  },
  components: {
    LanguagesPlayer,
    playerCharacteristics,
    footerCard,
    InventoryPlayer
  },
  mounted() {
  },
  methods: {
    minSkill(value, statsEng) {
      /* eslint-disable */
      this.player.skills[statsEng] = value
      this.sendChangePlayer()
    },
    addSkill(value, statsEng) {
      /* eslint-disable */
      this.player.skills[statsEng] = value
      this.sendChangePlayer()
    },
    setpage(tab) {
      this.player.page = tab
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
    startHold() {
      this.holdTimer = setTimeout(() => {
        this.doAction()
      }, 1000);
    },
    endHold() {
      clearTimeout(this.holdTimer);
    },
    doAction() {
      this.$emit('changeDel', this.index)
    }
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
    setLucky() {
      let result = []
      result = this.statsValues[5].mode
      return result
    },
    setObservation() {
      let result = []
      result = this.statsValues[4].mode
      return result
    },
    setHeat() {
      let result = []
      result = this.statsValues[2].value * 3
      return result
    },
    setStels() {
      let result = []
      result = this.statsValues[1].mode
      return result
    },
    setIniciative() {
      let result = []
      result = this.statsValues[3].mode
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.body {
  width: 100%;
  height: auto;
}
.btn {
  background-color: #e3a774;
  transition: 0.3s ease;
}
.btn:hover {
  background-color: #e18a47;
  transition: 0.3s ease;
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
  &-third {
    display: grid;
    grid-template-columns: repeat(2, 4fr);
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  &-ava {
      //background-color: #A9A9A9;
      background-image: url('../../images/ava.png');
      background-size: cover;
      background-position: center;
      width: 90px;
      height: 90px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
.inventory {
  padding: 15px 15px 0 15px;
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  @media screen and (min-width: 576px) {
    height: 580px;
  }

}
.del-player {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  margin-left: 15px;
}
.fs14 {
  font-size: 14px;
}
</style>
