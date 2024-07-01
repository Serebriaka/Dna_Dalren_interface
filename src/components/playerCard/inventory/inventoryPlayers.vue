<template>
  <div class="inventory-players">
    <div class="inventory-players-tab"
         v-for="(play, index) in players"
         :key="play.name"
         @click="$emit('change', index)"
         :style="{backgroundImage: 'url(' + require(`@/images/avatars/${play.avatar}.jpg`) + ')'}"
    >
      <div class="inventory-players__name">
        {{play.name}}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "inventoryPlayers",
  components: {},
  props: {
    players: {}
  },
}
</script>

<style scoped lang="scss">
.inventory-players {
  display: flex;
  flex-direction: row;
  height: 70px;
  gap: 10px;
 &__name {
   position: relative;
   overflow: hidden;
   width: 100%;
   top: 40px;
   padding: 4px;
   border-radius: 20px;
   border: 1px solid #8F4C3C;
   font-size: 9px;
   background-color: #A4A86B;
   color: #3E3727;
 }
  &-tab {
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border: 2px solid rgb(101, 92, 29);
    height: 40px;
    width: 40px;
    background-color: green;
    color: white;
    cursor: pointer;
  }
}
</style>