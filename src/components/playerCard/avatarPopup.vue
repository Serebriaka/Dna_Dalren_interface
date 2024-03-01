<template>
  <div class="popup">
    <div class="popup-container">
      <div
          class="popup-container__avatar-block"
          v-for="(avatar, index) in avatars"
          :key="avatar"
          :style="{backgroundImage: 'url(' + require(`@/images/avatars/${avatar}.jpg`) + ')'}"
          @click="clickAva(index+1)"
      >
      </div>
    </div>
  </div>
</template>
<script>
export default  {
  data() {
    return {
      avatars: [
        'avatar_1',
        'avatar_2',
        'avatar_3',
        'avatar_4',
        'avatar_5',
        'avatar_6',
        'avatar_7',
        'avatar_8',
      ]
    }
  },
  methods: {
    clickAva(index) {
      this.$emit('avatarChange', index)
    }
  }
}
</script>
<style lang="scss">
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  &-container {
    height: auto;
    width: 70vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    justify-content: space-between;
    gap: 10px;
    &__avatar-block {
      display: flex;
      height: 33vw;
      width: 33vw;
      box-shadow: 0 0 10px rgba(0, 0, 0, 1.0);
      background-size: cover;
      background-position: center;
    }
  }
}
.dynamic-ava {

}
</style>