<template>
  <div class="body" >
    <div class="stats" v-if="isAdmin || player.page === 'stats'">
      <header-profile
        :player="player"
        :isAdmin="isAdmin"
      />
      <playerCharacteristics
        :player="player"
        :isAdmin="isAdmin"
        :isSetStats="player.isStatRedactor"
      />
      <div class="stats-third">
        <div class="stats-third__center">
          <castom-text
              :text="`Здоровье`"
              :value="player.actHealth + '/' + setHeat"
              width="170px"
              :images="{imageOne: 'health'}"
              :isStandardStats="true"
              :isAdmin="isAdmin"
              @setActHealth="setActHealth"
          />
          <select v-if="isAdmin" v-model="selectedHealthPoint">-->
            <option v-for="point in points" :key="point">{{point}}</option>
          </select>
        </div>
        <div class="stats-third__column">
          <castom-text
              :images="{
              imageOne: 'pickingDamage',
              imageTwo: 'choppingDamage',
              imageThree: 'crushingDamage'
            }"
              :damageValue="{
              picking: 0,
              chopping: 0,
              crushing: 0,
            }"
              :isDamageStats="true"
          />
          <castom-text
              :images="{
              imageOne: 'pickingArmor',
              imageTwo: 'choppingArmor',
              imageThree: 'crushingArmor'
            }"
              :damageValue="{
              picking: setArmor.pickingArmor,
              chopping: setArmor.choppingArmor,
              crushing: setArmor.crushingArmor,
            }"
              :isDamageStats="true"
          />
          <castom-text
              :text="`Скрытность`"
              :value="setStels"
              :images="{imageOne: 'stealth'}"
              :isStandardStats="true"
          />
          <castom-text
              :text="`Инициатива`"
              :value="setIniciative"
              :images="{imageOne: 'initiative'}"
              :isStandardStats="true"
          />
          <castom-text
              :text="`Внимательность`"
              :value="setObservation"
              :images="{imageOne: 'attentiveness'}"
              :isStandardStats="true"
          />
          <castom-text
              :text="`Удача`"
              :value="setLucky"
              :images="{imageOne: 'luck'}"
              :isStandardStats="true"
          />
        </div>
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
    <descriptionComponent
        v-if="isAdmin || player.page === 'description'"
        :isAdmin="isAdmin"
        :player="player"/>
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
import InventoryPlayer from '@/components/playerCard/inventory/InventoryPlayer.vue'
import ClassesComponent from "@/components/playerCard/classes/classesComponent.vue";
import CastomText from "@/components/castomText.vue";
import HeaderProfile from "@/components/playerCard/headerProfile.vue";
import descriptionComponent from "@/components/playerCard/descriptionComponent.vue";

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
    }
  },
  components: {
    descriptionComponent,
    HeaderProfile,
    CastomText,
    ClassesComponent,
    LanguagesPlayer,
    playerCharacteristics,
    footerCard,
    InventoryPlayer
  },
  created() {
    /* eslint-disable */
    this.player.page = 'stats'
    this.sendChangePlayer()
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
                              statsValue[index] < 22 ? 4 :
                                statsValue[index] > 22 ? 5 : 4

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
        pickingArmor: 0,
      }
      this.player.equipment.forEach(item => {
          result.choppingArmor += item.protection.chopping
          result.crushingArmor += item.protection.crushing
          result.pickingArmor += item.protection.pricking //опечатка, исправится после новой версии инвентаря
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
  //padding: 15px 15px 0 15px;
  width: 100%;
  height: calc(100% - 17px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-third {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
    &__column {
      display: grid;
      grid-template-columns: repeat(2, 4fr);
      justify-content: center;
      align-items: center;
      gap: 10px 0px;
      width: 100%;
    }
    &__center {
      display: flex;
    }
  }
}
//.inventory {
//  //padding: 15px 15px 0 15px;
//  width: 100%;
//  height: calc(100% - 17px);
//  display: flex;
//  flex-direction: column;
//  justify-content: end;
//  align-items: center;
//  @media screen and (min-width: 576px) {
//    height: 100vh;
//  }
//}
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
  background-color: #D2DFC5;
  width: 100%;
}
</style>
