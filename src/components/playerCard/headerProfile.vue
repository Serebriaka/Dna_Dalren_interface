<template>
  <div class="stats-header">
    <div class="stats-header-column">
      <avatar-component
        :player="player"
      />
      <avatar-popup
          @avatarChange="avatarChange"
          v-if="isPopupAvatar && !isAdmin && player.isAvatar"
      />
      <castom-text
          solidColor="1px solid black"
          height="36px"
          border-radius="23px"
          :rombsNeeded="false"
          :text="player.name"
          :isText="true"
      />
    </div>
    <div class="stats-first">
      <div class="stats-level">
        <castom-text
            textTop="Уровень"
            :textBottom="player.level"
            :isTwoText="true"
            height="31px"
            background-color="#A4A86B"
            rombColor="#738F5F"
            color="#3E3727"
        />
        <castom-text
            textTop="Очки"
            :textBottom="player.statsPoints"
            height="31px"
            :isTwoText="true"
            :boxShadow="false"
            rombColor="#738F5F"
            rightRombPosition="93.6%"
            solidColor="1px solid #A4A86B"
            style="width: 70%"
        />
      </div>
      <castom-text
          :text="player.class"
          :isText="true"
          :boxShadow="false"
      />
      <castom-text
          :text="player.history"
          :isText="true"
          :boxShadow="false"
      />
      <castom-text
          :text="player.race"
          :isText="true"
          :boxShadow="false"
      />
      <castom-text
          :text="player.city"
          :isText="true"
          :boxShadow="false"
      />
    </div>
  </div>
</template>
<script>
import AvatarPopup from "@/components/playerCard/avatarPopup.vue";
import CastomText from "@/components/castomText.vue";
import store from "@/store";
import AvatarComponent from "@/components/playerCard/avatarComponent.vue";

export default {
  name: "headerProfile",
  components: {AvatarComponent, CastomText, AvatarPopup},
  props: {
    isAdmin: {},
    player: {}
  },
  data() {
    return {
      isPopupAvatar: true,
    }
  },
  methods: {
    avatarChange(index) {
      /* eslint-disable */
      this.player.avatar = 'avatar_' + index
      this.player.isAvatar = false
      this.isPopupAvatar = false
      this.sendChangePlayer()
    },
    sendChangePlayer() {
      store.dispatch('sendSharedValue')
    },
  }
}
</script>
<style scoped lang="scss">
.stats {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-level {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 2px;
  }
  &-first {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    &-name {
      background-color: #8F4C3C;
      color: white;
      text-align: center;
      border-radius: 23px;
      border: 1px solid #3E3727;
      padding: 4px;
      font-size: 12px;
    }
  }
  &-header {
    display: flex;
    flex-direction: row;
    height: 22%;
    width: 100%;
    justify-content: space-between;

    &-column {
      height: 100%;
      width: 35%;
      gap: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
}

</style>