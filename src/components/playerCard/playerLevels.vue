<template>
  <div class="levels">
    <div class="levels-header">
      <button @click="setLevel('del')" v-if="isAdmin">-</button>
      <div>Level {{player.level}}</div>
      <button @click="setLevel('add')" v-if="isAdmin">+</button>
      <button @click="setPoints('del')" v-if="isAdmin">-</button>
      <div>Points {{player.statsPoints}}</div>
      <button @click="setPoints('add')" v-if="isAdmin">+</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {eventBus} from "@/eventBus";
import helpers from "@/helpers";

export default {
  props: {
    player: {},
    isAdmin: {}
  },
  data() {
    return {
      currentLevel: 1,
    }
  },
  components: {},
  mounted() {
    /* eslint-disable */
    this.currentLevel = helpers.getCurrentLevelForExp(this.player.exp)
    eventBus.$on('setExp', (exp) => {
      this.currentLevel = helpers.getCurrentLevelForExp(this.player.exp)
      this.setNewLevel(exp)
    });
  },
  methods: {
    setLevel(tab, param = '') {
      if (tab === 'add') {
        this.player.level ++
        this.player.statsPoints = this.player.statsPoints + 2
      }
      if (tab === 'del') {
        this.player.level --
        this.player.statsPoints = this.player.statsPoints - 2
      }
      if(param !== 'none') this.player.exp = helpers.setExpForLevel(this.player.level) //чтобы не вызывалось при естественном увеличении опыта
      store.dispatch('sendSharedValue')
    },
    setPoints(tab) {
      if (tab === 'add') {
        this.player.statsPoints ++
      }
      if (tab === 'del') {
        this.player.statsPoints --
      }
      store.dispatch('sendSharedValue')
    },
    setNewLevel(exp) {
      if((500 > exp >= 0)) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      if(100 > exp >= 500) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      if(1500 > exp >= 1000) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      if(2000 > exp >= 1500) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      if(3000 > exp >= 2000) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      if(exp >= 3000) {
        if(this.player.level < this.currentLevel) this.setLevel('add', 'none')
      }
      console.log('currentLevel', this.currentLevel)
    }
  },
  computed: {

  },
}
</script>

<style scoped lang="scss">
.levels {
  &-header {
    border: 3px solid #8B4513;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    padding: 10px;
    display: flex;
    gap: 10px;
  }
}
</style>