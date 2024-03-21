<template>
  <div class="custom-select">
    <div class="selected-item" @click="toggleDropdown">{{ selectedOption }}</div>
    <div v-if="isOpen" class="dropdown-menu" @click.stop>
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
  mounted() {
    document.addEventListener('click', this.closeSelects)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeSelects)
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.isOpen = false
      this.selectedOption = option.name;
      this.$emit('change', option)
    },
    closeSelects(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    },
  },
  watch: {

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
  padding: 7px;
}
.dropdown-menu {
  position: absolute;
  border-radius: 10px;
  top: 110%;
  left: 0;
  z-index: 1000;
  background-color: #e7edec;
  border: 1px solid #ccc;
  list-style: none;
}
.dropdown-menu li {
  padding: 5px;
}
.li {
  padding: 7px;
}
.li:hover {
  background-color: rgba(175, 147, 147, 0.62);
}
</style>
