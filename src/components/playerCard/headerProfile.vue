<template>
  <div class="stats-header">
    <div class="stats-header-column">
      <div
          class="stats-ava"
          :style="{backgroundImage: 'url(' + require(`@/images/avatars/${player.avatar}.jpg`) + ')'}"
      >
      </div>
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
          :boxShadow="false"
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

export default {
  name: "headerProfile",
  components: {CastomText, AvatarPopup},
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
  padding: 15px 15px 0 15px;
  width: 100%;
  height: 96%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  &-level {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    gap: 3px;
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
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
  &-ava {
    border: solid 2px #8F4C3C;
    background-color: #3E3727;
    background-size: cover;
    background-position: center;
    width: 86px;
    height: 86px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
}
</style>