<template>
  <div
      class="stats-ava"
      :style="{backgroundImage: 'url(' + require(`@/images/avatars/${player.avatar}.jpg`) + ')'}"
  >
    <div class="romb-left romb"></div>
    <div class="romb-right romb"></div>
  </div>
</template>

<script>
export default {
  name: "avatarComponent",
  props: {
    player: {}
  }
}
</script>

<style scoped lang="scss">
.stats-ava {
  border: solid 2px #8F4C3C;
  background-color: #3E3727;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.romb {
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  background-color: #738F5F;
  position: relative;
  left: 45%;
  &-left {
    top: 99%;
  }
  &-right {
    bottom: 11px;
  }
}
</style>