<template>
    <div class="stats-fourth">
      <div class="stats-fourth__tab">
        <div class="stats-professions">
          Профессии:
          <div class="rhombus-position-left"/>
          <div class="rhombus-position-right"/>
        </div>
        <div class="stats-fourth__tab-elem" v-for="prof in player.professions" :key="prof">
          <div class="rhombus"/>
          {{prof}} <div @click="delProf(prof)" v-if="isAdmin">x</div >
        </div>
        <select v-if="isAdmin" v-model="selectedProfession" style="width: 90%" >
          <option disabled value="">Выберите профессию</option>
          <option v-for="prof in professions" :key="prof"> {{ prof }}</option>
        </select>
        <button v-if="isAdmin" @click="addProf">+</button>
      </div>
      <div class="stats-fourth__tab">
        <div class="stats-professions">
          Языки:
          <div class="rhombus-position-left"/>
          <div class="rhombus-position-right"/>
        </div>
        <div class="stats-fourth__tab-elem" v-for="lang in player.languages" :key="lang">
          <div class="rhombus"/>
          {{lang}} <div @click="delLang(lang)" v-if="isAdmin">x</div >
        </div>
        <select v-if="isAdmin" v-model="selectedLang" style="width: 90%" >
          <option disabled value="">Выберите язык</option>
          <option v-for="lang in languages" :key="lang"> {{ lang }}</option>
        </select>
        <button v-if="isAdmin" @click="addLang">+</button>
      </div>
  </div>

</template>
<script>
import store from "@/store";

export default {
  props: {
    player: {}
  },
  data() {
    return {
      languages: ["Грязный эльфийский", "Высокий эльфийский", "Забытый", "Всеобщий", "Язык крови", "Ташадо"],
      professions: ['Пекарь/кондитер', 'Кузнец', 'Кожевенник', 'Лучник', 'Сапожник', 'Портной', 'Цирюльник', 'Врач', 'Охотник/мясник', 'Золотарь', 'Кирилл'],
      selectedLang: '',
      selectedProfession: '',
    }
  },
  methods: {
    addLang() {
      /* eslint-disable */
      this.player.languages.push(this.selectedLang)
      store.dispatch('sendSharedValue')
    },
    addProf() {
      /* eslint-disable */
      this.player.professions.push(this.selectedProfession)
      store.dispatch('sendSharedValue')
    },
    delLang(lang) {
      if(this.isAdmin) {
        this.player.languages = this.player.languages.filter(item => item !== lang)
        store.dispatch('sendSharedValue')
      }
    },
    delProf(prof) {
      if(this.isAdmin) {
        this.player.professions = this.player.professions.filter(item => item !== prof)
        store.dispatch('sendSharedValue')
      }
    },
  },
  computed: {
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

.stats {
  &-professions {
    background-color: #A4A86B;
    border-radius: 13px;
    border: 1px solid #3E3727;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.30);
    position: relative;
    bottom: 1px;
  }
  &-fourth {
    display: flex;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    height: 18%;
    justify-content: center;

    &__tab {
      width: 40vw;
      border: 1px solid #3E3727;
      text-align: center;
      background-color: #bec7b4;
      border-radius: 13px;
      box-shadow: 0 7px 12px rgba(0, 0, 0, 0.25);

      &-elem {
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 4px;
        justify-content: flex-start;
        margin-left: 4px;
        margin-top: 4px;
      }
    }
  }
}
.rhombus {
  width: 6px;
  height: 6px;
  background-color: #3E3727;
  rotate: 45deg;
  &-position {
    &-left {
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #3E3727;
      rotate: 45deg;
      top: 7px;
      left: -4px;
    }
    &-right {
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #3E3727;
      rotate: 45deg;
      top: 7px;
      right: -4px;
    }
  }
}
</style>