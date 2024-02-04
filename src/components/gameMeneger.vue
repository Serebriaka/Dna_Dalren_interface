<template>
  <div class="body" >
    <cardPlayer></cardPlayer>
    <input type="text" v-model="pole">
    <button @click="sendSharedValue()">Отправить данные</button>
    <button @click="updateSharedValue">Получить данные</button>
    <div class="body_1" v-show="isLocation === '/1'">{{ test }}</div>
    <div class="body_2" v-show="isLocation === '/2'">{{ test }}</div>
  </div>
</template>

<script>
import cardPlayer from "./cardPlayer.vue";
import axios from "axios";
export default {
  data() {
    return {
      test: 1,
      pole:''
    }
  },
  components: {
    cardPlayer
  },
  created() {

  },
  mounted() {
    // setInterval(this.updateSharedValue, 500);
  },
  methods: {
     async sendSharedValue() {

      const data = { test: this.pole }; // Данные для отправки
      try {
        console.log(data, "отправленное")
        await axios.post('http://192.168.0.100:3000/saveData', data);

      } catch (error) {
        console.error('Error:', error);
      }
    },
    async updateSharedValue() {
      try {
        const response = await axios.get('http://192.168.0.100:3000/getData');
        console.log(response.data, "полученное")
        console.log(response.data)
        this.test = response.data.message.test
        // Ответ от сервера
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  computed: {
    isLocation() {
      return window.location.pathname
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
