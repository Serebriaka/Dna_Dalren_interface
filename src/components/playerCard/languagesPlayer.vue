<template>
    <div class="stats-fourth">
      <div class="stats-fourth__tab">
        Профессии:
        <div class="stats-fourth__tab-elem" v-for="prof in player.professions" :key="prof">
          {{prof}} <div @click="delProf(prof)" v-if="isAdmin">x</div >
        </div>
        <select v-if="isAdmin" v-model="selectedProfession" style="width: 90%" >
          <option disabled value="">Выберите профессию</option>
          <option v-for="prof in professions" :key="prof"> {{ prof }}</option>
        </select>
        <button v-if="isAdmin" @click="addProf">+</button>
      </div>
      <div class="stats-fourth__tab">
        Языки:
        <div class="stats-fourth__tab-elem" v-for="lang in player.languages" :key="lang">
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

.stats-fourth {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
  height: 28%;
  justify-content: center;
  &__tab {
    width: 50%;
    border: 1px solid #8B4513;
    text-align: center;
    &-elem {
      font-size: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      justify-content: center;
    }
  }
}

</style>