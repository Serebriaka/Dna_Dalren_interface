<template>
  <div class="container">
    <div class="body">
      <div class="body-column">
        <cardPlayer
            v-for="player in playerCards"
            :key="player"
            :player="player"
        >

        </cardPlayer>
      </div>
<!--      <div class="form_add_player">-->
<!--        <select v-model="selectedClass">-->
<!--          <option disabled value="">Выберите класс</option>-->
<!--          <option v-for="clas in classes" :key="clas">{{ clas.name}}</option>-->
<!--        </select>-->
<!--        <select v-model="selectedClass">-->
<!--          <option disabled value="">Выберите историю</option>-->
<!--          <option v-for="history in historys" :key="history">{{ history.name}}</option>-->
<!--        </select>-->
<!--        <select v-model="selectedClass">-->
<!--          <option disabled value="">Выберите рассу</option>-->
<!--          <option v-for="race in races" :key="race">{{ race.name}}</option>-->
<!--        </select>-->
<!--        <button class="medieval-button">Добавить игрока</button>-->
<!--      </div>-->

      <!--    <input type="text" v-model="pole">-->
      <!--    <button @click="sendSharedValue()">Отправить данные</button>-->
      <!--    <button @click="updateSharedValue">Получить данные</button>-->
      <!--    <div class="body_1" v-show="isLocation === '/1'"></div>-->
      <!--    <div class="body_2" v-show="isLocation === '/2'"></div>-->
    </div>
  </div>
</template>

<script>
import cardPlayer from "./cardPlayer.vue";
import axios from "axios";
export default {
  data() {
    return {
      playerCards: [
        {
          name: 'Попка',
          race:'Полурослик',
          history: 'Ученый',
          class: 'Воин',
          city: 'Дальрен',
          skills: {
            Strength: 4, //сила
            Dexterity: 14, //Ловкость
            Constitution: 12, //Выносливость
            Intelligence: 9, // Интерект
            Wisdom: 16, //Мудрость
            Charisma: 25 //Харизма
          },
        }
      ],
      historys: [
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
      classes: [
        {
          name: "Воин",
          passive: [
            {
              title: "Воин с тяжелым оружием",
              level: 1,
              description: "Пассивный навык, тяжелое, древковое, двуручное и полуторное оружие в руках воина наносит дополнительно 1d4 урона и может сбить врага с ног до следующего его хода d20(>10)"
            },
            {
              title: "Воин с щитом",
              level: 1,
              description: "Пассивный навык, дающий возможность использовать щиты более эффективно, показатель защиты при использовании щита увеличивается на +1"
            },
            {
              title: "Холодный расчет",
              level: 2,
              description: "Активный навык, 1 раз за битву воин наносит 3 удара по одной цели, первый удар точно игнорирует защиту цели"
            },
            {
              title: "Удар щитом",
              level: 2,
              description: "Активный навык, 2 раза за бой. Удар по врагу щитом, если цель не проходит проверку - теряет равновесие на один ход и роняет оружие"
            },
            {
              title: "Тяжеловес",
              level: 3,
              description: "Пассивный навык, дает +2 к показателю силы"
            },
            {
              title: "Страж",
              level: 3,
              description: "Пассивный навык, стоя на соседней клетке с союзником, увеличивает защиту союзника на +1"
            },
          ],
          subClass: [
            {
              name: "Гвареец",
              description: "",
              level: 4,
              passive: [
                {
                  name: "Верность клятве",
                  description: "Пассивный навык, дающий +2 к выносливости и +1 к силе.",
                  level: 4
                },
                {
                  name: "Долг клятвы",
                  description: "Пассивный навык, 1 раз до короткого отдыха вы продолжаете битву с 1 единицей здоровья, получая смертельный урон",
                  level: 5
                },
                {
                  name: "Строевая подготовка",
                  description: "Активный навык, дополнительное действие. На 2 хода встает рядом с выбранным союзником, каждый раз, когда союзник наносит удар по врагу, гвардеец так же проводит атаку.",
                  level: 6
                },
              ]
            },
            {
              name: "Берсерк",
              description: "",
              level: 4
            },
            {
              name: "Наемник",
              description: "",
              level: 4
            },
          ]
        },
        {
          name: "Разбойник",
        },
        {
          name: "Артист",
        },
        {
          name: "Фехтовальщик",
        },
        {
          name: "Охотник",
        },
      ],
      selectedClass: "",
      selectedHistory: "",
      selectedRace: "",
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
.container {
  width: 100%;
  height: 100%;
}
.body {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  &-column {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
.medieval-button {
  background-color: #8B4513;
  color: #fff;
  padding: 5px 5px;
  font-size: 18px;
  border: 2px solid #8B4513;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Times New Roman', serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: 0.3s ease;
  height: 40px;
}

.medieval-button:hover {
  transition: 0.3s ease;
  background-color: #A0522D;
  border-color: #A0522D;
}
.form_add_player {
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 40px;
}
@media (max-width: 480px) {
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
}
</style>
