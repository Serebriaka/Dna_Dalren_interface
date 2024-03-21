
<template>
  <div class="custom-select">
    <div class="selected-item" @click="toggleDropdown">{{ selectedOption }}</div>
    <div v-if="isOpen" class="dropdown-menu">
      <div
          class="li"
          v-for="option in options" :key='option.value'
          @click="selectOption(option)"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {},
  },
  data() {
    return {
      isOpen: false,
      selectedOption: "Выберите значение",
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option.name;
      this.$emit('change', option)
    },
  },
  watch: {
    selectedOption() {
      this.isOpen = false
    }
  }
}
</script>

<style>
.custom-select {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.selected-item {
  border: 1px solid #ccc;
  padding: 5px;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #ccc;
  list-style: none;
}
.dropdown-menu li {
  padding: 5px;
}
.li:hover {
  background-color: rgba(175, 147, 147, 0.62);
}
</style>
