<template>
  <div class="header">
    <div class="header-avatar">
      <avatar-component
          :player="player"
      />
    </div>
    <div class="header-right">
      <div class="header-right__level">
        <div class="header-right__level-name"/>
        <div class="header-right__level-value">
          <castom-text
              textTop="Ур"
              :textBottom="player.level"
              :isTwoText="true"
              height="100%"
              background-color="#A4A86B"
              rightRombPosition="92.6%"
              rombColor="#738F5F"
              color="#3E3727"
          />
        </div>
      </div>
      <div class="header-right__text">
        <div class="inventory-card"> Инвентарь игрока</div>
      </div>
      <div class="header-right__name">
        <castom-text
            backgroundColor="#8C5D3F"
            :text="players[indexCard].name"
            :isText="true"
            :boxShadow="false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AvatarComponent from "@/components/playerCard/avatarComponent.vue";
import CastomText from "@/components/castomText.vue";

export default {
  name: "header-inventory",
  components: {CastomText, AvatarComponent},
  props: {
    player: {},
    players: {},
    indexCard: {},
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 16%;
  width: 100%;
  gap: 10px;
  &-avatar {
    height: 100%;
    width: 35%;
  }
  &-right {
    width: 65%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    &__level {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 35%;
      &-name {
        width: 85px;
        height: 100%;
        background-image: url("@/images/dalren.svg");
        background-repeat: no-repeat;
      }
      &-value {
        width: 30%;
      }
    }
  }
}
</style>