
<template>
  <div style="position: relative; width: 100%" >
<!--    Вариант только с текстом-->
    <div v-if="isText" class="text" :style="mainStyles">
      <div>{{ text }}</div>
    </div>
<!--    Вариант с 1 иконкой и 1 статой-->
    <div v-if="isStandardStats" class="body" :style="mainStyles">
      <div v-if="images.imageOne" class="statImage"
           :style="{backgroundImage: 'url(' + require(`@/images/icons/statIcons/${images.imageOne}.svg`) + ')', marginLeft: '10%'}"
      >
      </div>
      <button v-if="isAdmin" @click="$emit('setActHealth','dec')">-</button>
      <div>{{ text }}</div>
      <div class="statValue">
        {{value}}
      </div>
      <button v-if="isAdmin" @click="$emit('setActHealth','inc')">+</button>
    </div>
<!--    Вариант с 3 иконками и 3 статами-->
    <div v-if="isDamageStats" class="body" :style="mainStyles">
      <div v-if="images.imageOne" class="statImage"
           style="margin-left: 10px"
           :style="{backgroundImage: 'url(' + require(`@/images/icons/damageIcons/${images.imageOne}.svg`) + ')', }"
      >
      </div>
      <div class="statValue">
        {{damageValue.picking}}
      </div>
      <div v-if="images.imageOne" class="statImage"
           :style="{backgroundImage: 'url(' + require(`@/images/icons/damageIcons/${images.imageTwo}.svg`) + ')'}"
      >
      </div>
      <div class="statValue">
        {{damageValue.chopping}}
      </div>
      <div v-if="images.imageOne" class="statImage"
           :style="{backgroundImage: 'url(' + require(`@/images/icons/damageIcons/${images.imageThree}.svg`) + ')'}"
      >
      </div>
      <div class="statValue" style="margin-right: 10px">
        {{damageValue.crushing}}
      </div>
    </div>
<!--Вариант только текст с 2 строчками-->
    <div v-if="isTwoText" class="text" :style="mainStyles">
      <div>{{ textTop }}</div>
      <div>{{ textBottom }}</div>
    </div>

    <div v-if="rombsNeeded" class="romb-left" :style="[rombStyles, leftPosition]"></div>
    <div v-if="rombsNeeded" class="romb-right" :style="[rombStyles, rightPosition]"></div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      default: () => ({})
    },
    value: {
      default: '',
    },
    damageValue: {
      picking: 0,
      chopping: 0,
      crushing: 0,
    },
    height: {
      default: "17px"
    },
    width: {
      default: "100%"
    },
    backgroundColor: {
      default: "#8F4C3C"
    },
    color: {
      default: "#ffffff"
    },
    borderRadius: {
      default: "13px"
    },
    solidColor: {
      default: "1px solid #8F4C3C"
    },
    rombColor: {
      default: "#A4A86B"
    },
    rombSize: {
      default: "6px"
    },
    leftRombPosition: {
      default: "99%"
    },
    rightRombPosition: {
      default: "right: 97.6%;"
    },
    fontSize: {
      default: "12px"
    },
    text: {
      default: ""
    },
    textTop: {
      default: ""
    },
    textBottom: {
      default: ""
    },
    isText: {
      default: false
    },
    isTwoText: {
      default: false
    },
    isStandardStats: {
      default: false
    },
    isDamageStats: {
      default: false
    },
    isAdmin: {
      default: false
    },
    rombsNeeded: {
      default: true
    },
    boxShadow: {
      default: true
    }

  },
  data() {
    return {
      // mainStyles: {
      //   height: this.height,
      //   width: this.width,
      //   backgroundColor: this.backgroundColor,
      //   color: this.color,
      //   borderRadius: this.borderRadius,
      //   border: this.solidColor,
      //   fontSize: this.fontSize,
      //   boxShadow: this.boxShadow ? '0 4px 12px rgba(0, 0, 0, 0.45)' : 'none',
      // },
      rombStyles: {
        width: this.rombSize,
        height: this.rombSize,
        backgroundColor: this.rombColor,
        transform: `rotate(45deg) translateY(-50%)`,
        position: "absolute",
        top: "calc(50% - 1px)"
      },
      leftPosition: {
        right: this.leftRombPosition
      },
      rightPosition: {
        left: this.rightRombPosition
      }
    };
  },
  computed: {
    mainStyles() {
      return {
        height: this.height,
        width: this.width,
        backgroundColor: this.backgroundColor,
        color: this.color,
        borderRadius: this.borderRadius,
        border: this.solidColor,
        fontSize: this.fontSize,
        boxShadow: this.boxShadow ? '0 4px 12px rgba(0, 0, 0, 0.45)' : 'none',
      }
    }
  }
};
</script>

<style scoped lang="scss">
.body {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);

}
.text {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  white-space: pre-wrap;
  word-break: break-word;
}
.romb {
  &-left {
    z-index: 1;
    right: 99%;
  }

  &-right {
    left:97.6%;
  }
}
.statValue {
  padding: 3px;
  border-radius: 5px;
  color: #3E3727;
  background-color: #A4A86B;
  border: 1px solid #8F4C3C;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
  margin-right: 10px;
}
.statImage {
  height: 15px;
  width: 15px;
  background-size: cover;
  background-position: center;
}
</style>
