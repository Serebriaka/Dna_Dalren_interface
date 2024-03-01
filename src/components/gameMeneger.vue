<template>
  <div class="container">
    <div class="body">
      <div class="body-column">
          <cardPlayer
              v-for="(player, index) in playerCards"
              :key="player.name"
              v-show="isLocation === '/' + index || isAdmin"
              :player="player"
              :index="index"
              @changeDel="delPlayer"
          >
          </cardPlayer>
      </div>
      <div class="form_add_player" v-if="isAdmin">
        <select v-model="selectedClass">
          <option disabled value="">Выберите класс</option>
          <option v-for="clas in classes" :key="clas.name">{{ clas.name}}</option>
        </select>
        <select v-model="selectedHistory">
          <option disabled value="">Выберите историю</option>
          <option v-for="history in historys" :key="history.name">{{ history.name}}</option>
        </select>
        <select v-model="selectedRace">
          <option disabled value="">Выберите рассу</option>
          <option v-for="race in races" :key="race.name">{{ race.name}}</option>
        </select>
        <input type='text' v-model="playerName" placeholder="Напишите имя">
        <input type='text' v-model="playerCity" placeholder="Напишите гражданство">
        <button class="medieval-button" @click="createPlayerCard">Добавить игрока</button>
      </div>

      <!--    <input type="text" v-model="pole">-->
      <!--    <button @click="sendSharedValue()">Отправить данные</button>-->
      <!--    <button @click="updateSharedValue">Получить данные</button>-->
      <!--    <div class="body_1" v-show="isLocation === '/1'"></div>-->
      <!--    <div class="body_2" v-show="isLocation === '/2'"></div>-->
    </div>
  </div>
</template>

<script>
import cardPlayer from "./playerCard/cardPlayer.vue";
import store from "../store";
// import axios from "axios";
export default {
  data() {
    return {
      // playerCards: [],
      perks: [],
      stats: [],
      selectedClass: "",
      selectedHistory: "",
      selectedRace: "",
      playerName: "",
      playerCity: "",
    }
  },
  components: {
    cardPlayer
  },
  created() {
  },
  async mounted() {
    setInterval(() => {
      store.dispatch('updateSharedValue');
    }, 2500);
  },
  methods: {
    createPlayerCard() {
       let race = this.races.find((race) => {
         return race.name === this.selectedRace
       })
      let history = this.historys.find((history) => {
        return history.name === this.selectedHistory
      })
      let clas = this.classes.find((clas) => {
        return clas.name === this.selectedClass
      })
      let language = race.languages.concat(history.languages).filter((item, index, array) => array.indexOf(item) === index)
      let name = this.playerName
      let city = this.playerCity
       let card = {
         name: name,
         race: race.name,
         history: history.name,
         class: clas.name,
         city: city,
         languages: language,
         page: 'stats',
         skills: {
           strength: race.characteristics.strength + history.skills.strength,
           dexterity: race.characteristics.dexterity + history.skills.dexterity,
           constitution: race.characteristics.constitution + history.skills.constitution,
           intelligence: race.characteristics.intelligence + history.skills.intelligence,
           wisdom: race.characteristics.wisdom + history.skills.wisdom,
           charisma: race.characteristics.charisma + history.skills.charisma
         },
         choppingArmor: 0, //рубящий
         crushingArmor: 0, //дробящий
         prickingArmor: 0, //колющий
         inventory: [],
         equipment: [],
         actHealth: null,
         gold: 0,
         exp: 0,
         isSteal: false,
         subName: '',
         domName: '',
         invName: '',
         professions: [],
         avatar: 'avatar_5',
         isAvatar: true,
       }
       this.playerCards.push(card)
      store.dispatch('sendSharedValue')
    },
    delPlayer(index) {
      this.playerCards.splice(index, 1)
      this.sendChangePlayer()
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
  },
  computed: {
    historys() {
      return store.state.historys
    },
    races() {
      return store.state.races
    },
    classes() {
      return store.state.classes
    },
    isLocation() {
      return window.location.pathname
    },
    playerCards() {
      return store.state.playerCards
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
.container {
  width: 100%;
  height: 100%;
}
.body {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &-column {
    width: 450px;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
}
.medieval-button {
  background-color: #8B4513;
  color: #fff;
  padding: 5px 5px;
  font-size: 18px;
  border: 2px solid #8B4513;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s ease;
  height: 40px;
}

.medieval-button:hover {
  transition: 0.3s ease;
  background-color: #A0522D;
  border-color: #A0522D;
}
.form_add_player {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;
}
@media (max-width: 576px) {
  .body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    &-column {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
