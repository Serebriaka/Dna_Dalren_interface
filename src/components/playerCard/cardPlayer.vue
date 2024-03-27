<template>
  <div class="body" >
    <div class="stats" v-if="isAdmin || player.page === 'stats'">
      <div class="stats-header">
        <div class="stats-header-column">
          <div
              class="stats-ava"
              :style="{backgroundImage: 'url(' + require(`@/images/avatars/${player.avatar}.jpg`) + ')'}"
          >
          </div>
          <avatar-popup
            @avatarChange="avatarChange"
            v-if="isPopupAvatar && !isAdmin && player.isAvatar"
          />
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
          :isSetStats="player.isStatRedactor"
        />
      </div>
      <div class="stats-third">
        <div class="stat fs14">
          Здоровье
          <select v-if="isAdmin" v-model="selectedHealthPoint">
            <option v-for="point in points" :key="point">{{point}}</option>
          </select>
          <button class="btn" v-if="isAdmin" @click="setActHealth('dec')">-</button>
          {{player.actHealth}}
          <button class="btn" v-if="isAdmin" @click="setActHealth('inc')">+</button>
          /
          {{setHeat}}
        </div>
        <div class="stat fs14 row" style="justify-content: space-around">
          <div class="row">
            <div class="choppingArmor"></div> <div>{{setArmor.choppingArmor}}</div>
          </div>
          <div class="row">
            <div class="crushingArmor"></div> <div>{{setArmor.crushingArmor}}</div>
          </div>
          <div class="row">
            <div class="prickingArmor"></div> <div>{{setArmor.prickingArmor}}</div>
          </div>
        </div>
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
        pageLeftTab="classes"
        nameRightTab="Инвентарь"
        nameLeftTab="Классы"
        @tabChange="setPage"
      />
    </div>
    <InventoryPlayer
        v-if="isAdmin || player.page === 'inventory'"
        :player="player"
        :index="index"
    />
    <classes-component
        v-if="isAdmin || player.page === 'classes'"
        :player="player"
        :isAdmin="isAdmin"
        :index="index"
    />
    <button
        class="del-player" v-if="isAdmin"
        @mousedown.stop="startHold"
        @mouseup.stop="endHold"
    >
      Удалить игрока
    </button>
    <button
        class="stat-player" v-if="isAdmin"
        :class="{'active-button': this.player.isStatRedactor}"
        @click="setStatRedactor"
    >
      возможность редактировать статы
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
import AvatarPopup from "@/components/playerCard/avatarPopup.vue";
import ClassesComponent from "@/components/playerCard/classesComponent.vue";

export default {
  props: {
    player: {},
    index: {}
  },
  data() {
    return {
      stats: ['Сил', "Лов", "Вын", "Инт", "Муд", "Хар"],
      statsEng: ['strength', "dexterity", "constitution", "intelligence", "wisdom", "charisma"],
      selectedHealthPoint: 1,
      points: [1,2,3,5,10,20,50],
      isPopupAvatar: true,
    }
  },
  components: {
    ClassesComponent,
    AvatarPopup,
    LanguagesPlayer,
    playerCharacteristics,
    footerCard,
    InventoryPlayer
  },
  mounted() {
    /* eslint-disable */
    if(this.player.actHealth === null) {
      this.player.actHealth = this.player.skills.constitution * 3
      this.sendChangePlayer()
    }
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
    setPage(tab) {
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
    },
    setActHealth(tab) {
      if(tab === 'dec') this.player.actHealth = this.player.actHealth - +this.selectedHealthPoint
      if(tab === 'inc') this.player.actHealth = this.player.actHealth + +this.selectedHealthPoint
      this.sendChangePlayer()
    },
    avatarChange(index) {
      this.player.avatar = 'avatar_' + index
      this.player.isAvatar = false
      this.isPopupAvatar = false
      this.sendChangePlayer()
    },
    setStatRedactor() {
      this.player.isStatRedactor = !this.player.isStatRedactor
      this.sendChangePlayer()
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
    setExtraHealth() {
      let result = 0
      result = this.player.equipment.reduce((acc, item) => item.buffs.health + acc, 0)
      return result
    },
    setObservation() {
      let result = []
      result = this.statsValues[4].mode
      return result
    },
    setHeat() {
      let result = []
      result = this.statsValues[2].value * 3 + this.setExtraHealth
      if(this.player.actHealth > result) this.player.actHealth = result
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
    setArmor() {
      let result = {
        choppingArmor: 0,
        crushingArmor: 0,
        prickingArmor: 0,
      }
      this.player.equipment.forEach(item => {
          result.choppingArmor += item.protection.chopping
          result.crushingArmor += item.protection.crushing
          result.prickingArmor += item.protection.pricking
      })
      return result
    },
    isAdmin() {
      let result = false
      if(this.isLocation === '/admin') result = true
      return result
    },
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
  //font-family: cursive;
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
      background-size: cover;
      background-position: center;
      width: 90px;
      height: 90px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
.choppingArmor{
  margin-right: 5px;
  height: 20px;
  width: 20px;
  background: url("../../images/icons/choppingArmor.png") no-repeat center center / cover;
}
.crushingArmor{
  margin-right: 5px;
  height: 20px;
  width: 20px;
  background: url("../../images/icons/crushingArmor.png") no-repeat center center / cover;
}
.prickingArmor{
  margin-right: 5px;
  height: 20px;
  width: 20px;
  background: url("../../images/icons/prickingArmor.png") no-repeat center center / cover;
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
    height: 100vh;
  }
}
.del-player {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  margin-left: 15px;
}
.stat-player {
  width: 100%;
  text-align: center;
  margin-top: 15px;
  cursor: pointer;
  margin-left: 15px;
  background-color: #b06273;
}
.active-button {
  background-color: #5dc35d;
}
.fs14 {
  font-size: 14px;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
