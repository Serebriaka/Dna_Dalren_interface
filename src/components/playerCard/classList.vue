<template>
  <div class="body">
<!--    <div class="body-left">-->
<!--      <div class="body-left__list"></div>-->
<!--    </div>-->
    <div class="body-right">
      <select v-model="selectedClassSkill" v-if="isAdmin">
        <option v-for="skill in allSkills" :key="skill.name">{{skill.name}}</option>
      </select>
      <select v-model="selectedClass" v-if="isAdmin">
        <option v-for="skill in classSkills" :key="skill.name">{{skill.name}}</option>
      </select>
      <button @click="addSkill" v-if="isAdmin">+</button>
      <div
          class="body-right__list"
          v-for="(skill, index) in activeSkills"
          :key="skill.name"
          @click="openPopup(skill)"
      >
        {{skill.name}}
        <div @click="delClass(index)" v-if="isAdmin" style="cursor: pointer">x</div>
      </div>
    </div>
    <div class="body-popup" v-if="isClassInfo" @click="closePopup">
      <div class="body-popup-content" @click.stop="">
        <div>{{popupText}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
export default {
  /* eslint-disable */
  props: {
    player: {},
    isAdmin: {},
  },
  data() {
    return {
      selectedClassSkill: 'Воин',
      selectedClass: '',
      isClassInfo: false,
      popupText: '',
    }
  },
  mounted() {
  },
  methods: {
    addSkill() {
      let skill = this.classSkills.find(item => item.name  === this.selectedClass)
      console.log(skill)
      this.player.playerSkills.push(skill)
      store.dispatch('sendSharedValue')
    },
    delClass(index) {
      this.player.playerSkills.splice(index, 1)
      store.dispatch('sendSharedValue')
    },
    openPopup(skill) {
      this.isClassInfo = true
      this.popupText = skill.description
    },
    closePopup() {
      this.isClassInfo = false
      this.popupText = ''
    }
  },
  computed: {
    allSkills() {
      return store.state.classes
    },
    classSkills() {
      const selectedCharacter = store.state.classes.find(character => character.name === this.selectedClassSkill)
      const result = selectedCharacter.subClass.reduce((acc, subClass) => {
        acc.push(...subClass.passive);
        return acc;
      }, []);
      result.push(...selectedCharacter.passive)
      result.sort((a, b) => a.level - b.level)
      return result;
    },
    activeSkills() {
      return this.player.playerSkills
    }
  }
}
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 80%;
  width: 100%;
  padding-bottom: 15px;
  &-left {
   display: flex;
   flex-direction: column;
   height: 100%;
   width: 40%;
   //border: 3px solid #8B4513;
   //box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
   border-radius: 3px;
   &__list {

   }
 }
  &-right {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 80%;
    border: 3px solid #8B4513;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
    border-radius: 3px;

    &__list {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      text-align: center;
      padding: 5px;
      border: 2px solid #8B4513;
      border-radius: 5px;
      background: linear-gradient(322deg, #b7763f, #d78913);
      margin: 1px 3px;
    }
  }
  &-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    &-content {
      position: absolute;
      height: auto;
      width: 60%;
      padding: 10px;
      background: linear-gradient(8deg, #fdeea5, #ffd99b);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      border: 2px solid #8B4513;
    }
    &-closeIcon {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>