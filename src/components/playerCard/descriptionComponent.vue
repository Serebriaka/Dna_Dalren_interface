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

</style>