<template>
  <div class="body">
<!--    <button class="medieval-button">Добавить игрока</button>-->
    <div class="body-column">
      <cardPlayer
          v-for="player in playerCards"
          :key="player"
          :player="player"
      >

      </cardPlayer>
    </div>
<!--    <input type="text" v-model="pole">-->
<!--    <button @click="sendSharedValue()">Отправить данные</button>-->
<!--    <button @click="updateSharedValue">Получить данные</button>-->
<!--    <div class="body_1" v-show="isLocation === '/1'"></div>-->
<!--    <div class="body_2" v-show="isLocation === '/2'"></div>-->
  </div>
</template>

<script>
import cardPlayer from "./cardPlayer.vue";
import axios from "axios";
export default {
  data() {
    return {
      test: 1,
      playerCards: [
        {
          name: 'Попка',
          race:'Полурослик',
          history: 'Ученый',
          class: 'Воин',
          city: 'Дальрен',
          skills: {
            Strength: 12, //сила
            Dexterity: 10, //Ловкость
            Constitution: 12, //Выносливость
            Intelligence: 10, // Интерект
            Wisdom: 10, //Мудрость
            Charisma: 10 //Харизма
          },
        }
      ],
      classes: [
        {
        name: 'Раб',
        passive: '«Тяжелое сердце» - 1 раз до долгого отдыха восстанавливает себе +1d10 здоровья',
        skills: {
          Strength: 2, //сила
          Dexterity: 0, //Ловкость
          Constitution: 2, //Выносливость
          Intelligence: 0, // Интерект
          Wisdom: 0, //Мудрость
          Charisma: 0 //Харизма
        },
        instrumentSkils: [],
        languages: ["Всеобщий"],
        },
        {
          name: 'Преступник',
          passive: '«Опасные связи» - в любом городе преступник знает кому предложить взятку',
          skills: {
            Strength: 0, //сила
            Dexterity: 1, //Ловкость
            Constitution: 0, //Выносливость
            Intelligence: 0, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 1 //Харизма
          },
          instrumentSkils: ["Отмычка", 'саперский набор'],
          languages: ["Всеобщий"],
        },
        {
          name: 'Солдат',
          passive: "«Арсенал» - 2 раза за 1 бой может заменить оружие в руке на оружие из инвентаря, не тратя на это\n" +
              "действие",
          skills: {
            Strength: 1, //сила
            Dexterity: 0, //Ловкость
            Constitution: 1, //Выносливость
            Intelligence: 0, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 0 //Харизма
          },
          instrumentSkils: ["Отмычка", 'саперский набор'],
          languages: ["Всеобщий"],
        },
        {
          name: 'Дипломат',
          passive: "«Птица мира» - 1 раз до долгого отдыха может свести конфликт на нет (если это возможно)",
          skills: {
            Strength: 0, //сила
            Dexterity: 0, //Ловкость
            Constitution: 0, //Выносливость
            Intelligence: 0, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 2 //Харизма
          },
          instrumentSkils: [],
          languages: ["Всеобщий", 'Грязный эльфийский'],
        },
        {
          name: 'Одержимый',
          passive: "«Мерзкий шепот» - в некоторых ситуациях мастер решает за персонажа как поступить.",
          skills: {
            Strength: 0, //сила
            Dexterity: 0, //Ловкость
            Constitution: 1, //Выносливость
            Intelligence: 1, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 0 //Харизма
          },
          instrumentSkils: [],
          languages: ["Всеобщий", 'Грязный эльфийский', 'Язык крови', 'Забытый'],
        },
        {
          name: 'Дворянин',
          passive: "«Благородное происхождение» - фамилию героя знают во всех королевствах. Любой трактирщик\n" +
              "предложит комнату бесплатно на одну ночь",
          skills: {
            Strength: 0, //сила
            Dexterity: 0, //Ловкость
            Constitution: 0, //Выносливость
            Intelligence: 1, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 1 //Харизма
          },
          instrumentSkils: [],
          languages: ["Всеобщий", 'язык на выбор'],
        },
        {
          name: 'Ученый',
          passive: "«Книжный червь» - каждый раз в награду за выполнение задания получает на 10% больше опыта",
          skills: {
            Strength: 0, //сила
            Dexterity: 0, //Ловкость
            Constitution: 0, //Выносливость
            Intelligence: 2, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 0 //Харизма
          },
          instrumentSkils: [],
          languages: ["Всеобщий", 'Забытый', 'Высокий эльфийский'],
        },
        {
          name: 'Ремесленник',
          passive: "«Человек из гильдии» - вдвое быстрее осваивает профессии кожевенник, сапожник, портной",
          skills: {
            Strength: 1, //сила
            Dexterity: 0, //Ловкость
            Constitution: 0, //Выносливость
            Intelligence: 1, // Интерект
            Wisdom: 0, //Мудрость
            Charisma: 0 //Харизма
          },
          instrumentSkils: ["Набор сапера"],
          languages: ["Всеобщий"],
        },
      ],
      perks: [],
      stats: [],
      races: [
        {
          race: "Человек",
          racial_traits: "«Приспособленец» - 1 дополнительный поинт характеристик",
          languages: ["Всеобщий"],
          characteristics: {
            Strength: 8, //сила
            Dexterity: 8, //Ловкость
            Constitution: 8, //Выносливость
            Intelligence: 8, // Интерект
            Wisdom: 8, //Мудрость
            Charisma: 8 //Харизма
          }
        },
        {
          race: "Полуэльф",
          racial_traits: "«Ловкие пальцы» - бонус +1 к проверкам ловкости при кражах",
          languages: ["Всеобщий","Грязный эльфийский"],
          characteristics: {
            Strength: 8,
            Dexterity: 10,
            Constitution: 6,
            Intelligence: 8,
            Wisdom: 9,
            Charisma: 7
          }
        },
        {
          race: "Полурослик",
          racial_traits: "Компактный размер» - бонус +1 к показателю скрытности",
          languages: ["Всеобщий"],
          characteristics: {
            Strength: 7,
            Dexterity: 8,
            Constitution: 6,
            Intelligence: 10,
            Wisdom: 7,
            Charisma: 10
          }
        }
      ],
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
<style scoped lang="scss">
.body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  &-column {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.medieval-button {
  background-color: #8B4513;
  color: #fff;
  padding: 10px 20px;
  font-size: 18px;
  border: 2px solid #8B4513;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s ease;
}

.medieval-button:hover {
  transition: 0.3s ease;
  background-color: #A0522D;
  border-color: #A0522D;
}
</style>
