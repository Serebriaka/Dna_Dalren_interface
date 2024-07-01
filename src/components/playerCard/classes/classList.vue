<template>
  <div class="body">
    <div class="body-right">
      <castom-text
          style="top: -4px; position: absolute"
          text="Навыки"
          :isText="true"
          height="17px"
          width="100%"
          solid-color="1px solid #3E3727"
          background-color="#A4A86B"
          rightRombPosition="calc(100% - 5px)"
          leftRombPosition="calc(100% - 1px)"
          rombColor="#3E3727"
          color="#3E3727"
      />
      <div class="body-right__box">
        <select v-model="selectedClassSkill" v-if="isAdmin">
          <option v-for="skill in allSkills" :key="skill.name">{{skill.name}}</option>
        </select>
        <select v-model="selectedClass" v-if="isAdmin">
          <option v-for="skill in classSkills" :key="skill.name">{{skill.name}}</option>
        </select>
        <button @click="addSkill" v-if="isAdmin && selectedClass">+</button>
        <div
            v-for="(skill, index) in activeSkills"
            :key="skill.name"
            @click="openPopup(skill)"
            style="width: 90%;margin-bottom: 8px;"
        >
          <castom-text
              rombColor="#3E3727"
              backgroundColor="#8F4C3C"
              :text="skill.name"
              :isText="true"
              height="28px"
          />
          <div @click="delClass(index)" v-if="isAdmin" style="cursor: pointer">x</div>
        </div>
      </div>

      <div v-if="isClassInfo">
        <description-popup
            :description="popupText"
            @close="closePopup"
        />
      </div>
      <div class="container">
        <img src="@/images/icons/dalrenlistic.svg" alt="Описание изображения" class="image">
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import descriptionPopup from "@/components/descriptionPopup.vue";
import CastomText from "@/components/castomText.vue";
export default {
  /* eslint-disable */
  props: {
    player: {},
    isAdmin: {},
  },
  components: {
    CastomText,
    descriptionPopup,
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
      if (this.selectedClass !== '') {
        let skill = this.classSkills.find(item => item.name  === this.selectedClass)
        this.player.playerSkills.push(skill)
        this.selectedClass = ''
        store.dispatch('sendSharedValue')
      }
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
  },
  watch: {
    selectedClassSkill() {
      this.selectedClass = ''
    }
  }
}
</script>

<style scoped lang="scss">
.body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 60%;
  width: 100%;
  padding-bottom: 15px;
  &-right {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 80%;
    background-color: rgba(62, 55, 39, 13%);
    border: 2px solid #3E3727;
    box-shadow: 0px 5px 5px 0px rgba(0, 0, 10, 0.3);
    border-radius: 12px;
    padding-top: 18px;

    &__box {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border-radius: 12px;
      overflow-y: auto;
    }
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
.container {
  position: absolute;
  z-index: 1;
  bottom: -34px;
  right: -19px;
  width: 83px;
  height: 53px;
  transform: rotate(351deg)
}
</style>