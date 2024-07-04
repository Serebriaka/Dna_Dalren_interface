<template>
  <div class="body-popup" @click="$emit('close')">
<!--    <div class="body-popup-content" @click.stop="">-->
<!--      <div class="fs12">{{description}}</div>-->
<!--      <div class="body-popup-content__damage fs12" v-if="isDamage">-->
<!--        <div>Урон</div>-->
<!--        <div v-if="item.buffs.damage.chopping">Рубящий: {{item.buffs.damage.chopping}}</div>-->
<!--        <div v-if="item.buffs.damage.crushing">Дробящий: {{item.buffs.damage.crushing}}</div>-->
<!--        <div v-if="item.buffs.damage.pricking">Колющий: {{item.buffs.damage.pricking}}</div>-->
<!--      </div>-->
<!--      <div class="body-popup-content__protection fs12" v-if="isProtection">-->
<!--        <div>Защита</div>-->
<!--        <div v-if="item.protection.chopping">Рубящая: {{item.protection.chopping}}</div>-->
<!--        <div v-if="item.protection.crushing">Дробящая: {{item.protection.crushing}}</div>-->
<!--        <div v-if="item.protection.pricking">Колющая: {{item.protection.pricking}}</div>-->
<!--      </div>-->
<!--      <div class="body-popup-content__requirements fs12" v-if="isRequirements">-->
<!--        <div>Требования</div>-->
<!--        <div v-if="item.requirements.strength">Сила: {{item.requirements.strength}}</div>-->
<!--        <div v-if="item.requirements.dexterity">Ловкость: {{item.requirements.dexterity}}</div>-->
<!--        <div v-if="item.requirements.constitution">Выносливость: {{item.requirements.constitution}}</div>-->
<!--        <div v-if="item.requirements.intelligence">Интеллект: {{item.requirements.intelligence}}</div>-->
<!--        <div v-if="item.requirements.wisdom">Мудрость: {{item.requirements.wisdom}}</div>-->
<!--        <div v-if="item.requirements.charisma">Харизма: {{item.requirements.charisma}}</div>-->
<!--      </div>-->
<!--      <div class="body-popup-content__requirements fs12" v-if="isBuffs">-->
<!--        <div>Бонусы</div>-->
<!--        <div v-if="item.buffs.strength">Сила: {{item.buffs.strength}}</div>-->
<!--        <div v-if="item.buffs.dexterity">Ловкость: {{item.buffs.dexterity}}</div>-->
<!--        <div v-if="item.buffs.constitution">Выносливость: {{item.buffs.constitution}}</div>-->
<!--        <div v-if="item.buffs.intelligence">Интеллект: {{item.buffs.intelligence}}</div>-->
<!--        <div v-if="item.buffs.wisdom">Мудрость: {{item.buffs.wisdom}}</div>-->
<!--        <div v-if="item.buffs.charisma">Харизма: {{item.buffs.charisma}}</div>-->
<!--        <div v-if="item.buffs.health">Доп. здоровье: {{item.buffs.health}}</div>-->
<!--      </div>-->
<!--      <div class="mt10 fs12" v-if="item?.sale">Цена: {{item.sale}}</div>-->
<!--      <div class="fs12" v-if="item?.weight">Вес: {{item.weight}}</div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    description: {},
    item: {},
  },
  computed: {
    isDamage() {
      let result = false
      if (this.item?.buffs.damage.chopping || this.item?.buffs.damage.crushing || this.item?.buffs.damage.pricking) {
        result = true
      }
      return result
    },
    isProtection() {
      let result = false
      if (this.item?.protection.chopping || this.item?.protection.crushing || this.item?.protection.pricking) {
        result = true
      }
      return result
    },
    isRequirements() {
      let result = false
      if (
             this.item?.requirements.strength
          || this.item?.requirements.dexterity
          || this.item?.requirements.constitution
          || this.item?.requirements.intelligence
          || this.item?.requirements.wisdom
          || this.item?.requirements.charisma
      ) {
        result = true
      }
      return result
    },
    isBuffs() {
      let result = false
      if (
             this.item?.buffs.strength
          || this.item?.buffs.dexterity
          || this.item?.buffs.constitution
          || this.item?.buffs.intelligence
          || this.item?.buffs.wisdom
          || this.item?.buffs.charisma
          || this.item?.buffs.health
      ) {
        result = true
      }
      return result
    },
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
  &-popup {
    position: absolute;
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
      &__damage {
        margin-top: 10px;
      }
      &__protection {
        margin-top: 10px;
      }
      &__requirements {
        margin-top: 10px;
      }
    }
  }
}
.fs12 {
  font-size: 12px;
}
.mt10 {
  margin-top: 10px;
}
</style>