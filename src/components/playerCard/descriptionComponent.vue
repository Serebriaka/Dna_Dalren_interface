<template>
  <div class="description">
    <div
        class="description-close"
        @click="closeDescription"
    >
      <img src="@/images/icons/closeIcon.svg" alt="Описание изображения" class="image">
    </div>
    <div class="gap">
      <img style="height: 10vh" src="@/images/dalren.svg" alt="Описание изображения" class="image">
        <castom-text
            :text="isClasses ? 'Навык' : 'Инвентарь'"
            :isText="true"
            rightRombPosition="calc(100% - 5px)"
            leftRombPosition="calc(100% - 1px)"
        />
    </div>


    <div class="description-box">
      <castom-text
          :text="specification?.name"
          :isText="true"
          height="17px"
          width="100%"
          solid-color="1px solid #3E3727"
          :background-color="backColor"
          rightRombPosition="calc(100% - 5px)"
          leftRombPosition="calc(100% - 1px)"
          rombColor="#3E3727"
      />
      <div class="description-text"
           :style="bodyColor">
        {{specification?.description}}
              <div v-if="isDamage">Урон:</div>
              <div class="body-popup-content__damage fs12" v-if="isDamage">
                <div v-if="specification?.buffs.damage.chopping">Рубящий: {{specification.buffs.damage.chopping}}</div>
                <div v-if="specification?.buffs.damage.crushing">Дробящий: {{specification.buffs.damage.crushing}}</div>
                <div v-if="specification?.buffs.damage.pricking">Колющий: {{specification.buffs.damage.pricking}}</div>
              </div>
              <div v-if="isProtection">Защита:</div>
              <div class="body-popup-content__protection fs12" v-if="isProtection">
                <div v-if="specification?.protection.chopping">Рубящая: {{specification.protection.chopping}}</div>
                <div v-if="specification?.protection.crushing">Дробящая: {{specification.protection.crushing}}</div>
                <div v-if="specification?.protection.pricking">Колющая: {{specification.protection.pricking}}</div>
              </div>
              <div v-if="isRequirements">Требования:</div>
              <div class="body-popup-content__requirements fs12" v-if="isRequirements">
                <div v-if="specification?.requirements.strength">Сила: {{specification.requirements.strength}}</div>
                <div v-if="specification?.requirements.dexterity">Ловкость: {{specification.requirements.dexterity}}</div>
                <div v-if="specification?.requirements.constitution">Выносливость: {{specification.requirements.constitution}}</div>
                <div v-if="specification?.requirements.intelligence">Интеллект: {{specification.requirements.intelligence}}</div>
                <div v-if="specification?.requirements.wisdom">Мудрость: {{specification.requirements.wisdom}}</div>
                <div v-if="specification?.requirements.charisma">Харизма: {{specification.requirements.charisma}}</div>
              </div>
              <div v-if="isBuffs">Бонусы:</div>
              <div class="body-popup-content__requirements fs12" v-if="isBuffs">
                <div v-if="specification?.buffs.strength">Сила: {{specification.buffs.strength}}</div>
                <div v-if="specification?.buffs.dexterity">Ловкость: {{specification.buffs.dexterity}}</div>
                <div v-if="specification?.buffs.constitution">Выносливость: {{specification.buffs.constitution}}</div>
                <div v-if="specification?.buffs.intelligence">Интеллект: {{specification.buffs.intelligence}}</div>
                <div v-if="specification?.buffs.wisdom">Мудрость: {{specification.buffs.wisdom}}</div>
                <div v-if="specification?.buffs.charisma">Харизма: {{specification.buffs.charisma}}</div>
                <div v-if="specification?.buffs.health">Доп. здоровье: {{specification.buffs.health}}</div>
              </div>
              <div class="mt10 fs12" v-if="specification?.sale">Цена: {{specification.sale}}</div>
              <div class="fs12" v-if="specification?.weight">Вес: {{specification.weight}}</div>
      </div>

    </div>
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
</template>
<script>
import footerCard from "@/components/playerCard/footerCard.vue";
import store from "@/store";
import CastomText from "@/components/castomText.vue";

export default {
  props: {
    player: {},
    isAdmin: {},
  },
  data() {
    return {
      currentLevel: 1,
    }
  },
  components: {
    CastomText,
    footerCard,
  },
  mounted() {
  },
  methods: {
    setPage(tab) {
      /* eslint-disable */
      this.player.page = tab
    },
    closeDescription() {
      if(!this.isClasses) {
        this.player.page = "inventory"
      } else {
        this.player.page = "classes"
      }
      this.sendChangePlayer()
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
  },
  computed: {
    isDamage() {
      let result = false
      if (this.specification?.buffs.damage.chopping || this.specification?.buffs.damage.crushing || this.specification?.buffs.damage.pricking) {
        result = true
      }
      return result
    },
    isRequirements() {
      let result = false
      if (
          this.specification?.requirements.strength
          || this.specification?.requirements.dexterity
          || this.specification?.requirements.constitution
          || this.specification?.requirements.intelligence
          || this.specification?.requirements.wisdom
          || this.specification?.requirements.charisma
      ) {
        result = true
      }
      return result
    },
    isBuffs() {
      let result = false
      if (
          this.specification?.buffs.strength
          || this.specification?.buffs.dexterity
          || this.specification?.buffs.constitution
          || this.specification?.buffs.intelligence
          || this.specification?.buffs.wisdom
          || this.specification?.buffs.charisma
          || this.specification?.buffs.health
      ) {
        result = true
      }
      return result
    },
    isProtection() {
      let result = false
      if (this.specification?.protection.chopping || this.specification?.protection.crushing || this.specification?.protection.pricking) {
        result = true
      }
      return result
    },
    specification() {
      return store.state.description
    },
    isClasses() {
      let result = false
      if(this.specification?.level) result = true
      return result
    },
    backColor() {
      let result = '#8C5D3F'
      if(this.isClasses) result = '#A4A86B'
      return result
     },
    bodyColor() {
      let result = {
        backgroundColor:'rgba(143,96,66,0.4)'
      }
      if(this.isClasses) result = {
        backgroundColor: 'rgba(164,168,107,0.4)'
      }
      return result
    }
  },
}
</script>

<style scoped lang="scss">
.description {
  height: calc(100% - 17px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-close {
    position: absolute;
    right: 5vw;
    top: 3vh;
  }
  &-box {
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-text {
    width: 90%;
    padding: 10px;
    border-left: 1px solid #3E3727;
    border-right: 1px solid #3E3727;
    border-bottom: 1px solid #3E3727;
    border-radius: 0 0 12px 12px;
  }
}
.gap {
  gap: 30px;
  display: flex;
  flex-direction: column;
}
.fs12 {
  font-size: 12px;
}
.mt10 {
  margin-top: 10px;
}
</style>