const NAME_ARRAY = ['Артем', 'Михаил', 'Елена', 'Кира', 'Ольга', 'Александр', 'Игорь', 'Роман', 'Мия', 'Рамзан'];

const PHOTO_DESCRIPTION = ['Городская улица с пешеходами в дождливый день.',
  'Пейзаж гор с заснеженными вершинами и ясным небом.',
  'Детский парк с улыбающимися детьми на качелях.',
  'Осенний лес с золотистыми и красными листьями.',
  'Крупный план цветка с каплями росы на лепестках.',
  'Морской пляж с волнами и отдыхающими людьми.',
  'Старинный замок на вершине холма на фоне заката.',
  'Поля с подсолнухами под голубым небом.',
  'Ночной городской пейзаж с огнями небоскребов.',
  'Молодая пара,гуляющая по улице в весенний день.',
  'Живописный вид на реку с отражением деревьев.',
  'Экзотическая птица сидит на ветке с яркими перьями.',
  'Пустыня с песчаными дюнами под жарким солнцем.',
  'Заснеженная деревня с уютными домиками и дымом из труб.',
  'Спортивный автомобиль на гоночной трассе в движении.',
  'Портрет улыбающегося ребенка на фоне цветочного поля.',
  'Мост через реку в туманное утро.',
  'Фейерверк над городом в праздничный вечер.',
  'Ярмарка с разнообразными товарами и людьми в движении.',
  'Кафе на открытом воздухе с посетителями за столиками.',
  'Водопад в глубоком лесу с бурным потоком воды.',
  'Звездное небо с Млечным Путем над горами.',
  'Сельская дорога среди зеленых лугов летом.',
  'Семья на пикнике в парке в солнечный день.',
  'Кафе на открытом воздухе с посетителями за столиками.'
];

const MESSAGE_ARRAY = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NUMBER_OF_PHOTO_OBJECTS = 25;

/**
 * возвращает рандомное число от @param {number} min до @param {number} max
*/
function getRandomInt(min = 0, max = 1000) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/**  возвращает Функцию, которая считае число от
 * @param {number} min до @param {number} max,
 * которое не повторяется
 * */
const getUniqueRandomHelper = (min = 0, max = 1000) => {
  const array = [];
  let randomNumber = getRandomInt(min, max);

  return () => {
    try {
      if(array.length !== (max + 1)) {
        while(array.includes(randomNumber)) {
          randomNumber = getRandomInt(min, max);
        }
        array.push(randomNumber);
        return randomNumber;
      }

      throw new Error(`Вы перебрали все уникальные числа в диапазоне от ${min} до ${max}`);
    } catch (error) {
      console.error(error.message);
    }
  };
};

/** возвращает случайное имя из массиво @returns {string} (можно повторять)*/
function getRandomName(){
  return NAME_ARRAY[getRandomInt(0, NAME_ARRAY.length - 1)];
}

/**
 * @returns {string} текст комментария, который формируется из 1
 * или 2 случайных предложений.
 */
function getMessage(){
  const messageLength = getRandomInt(1, 2);

  return Array.from({length: messageLength}, () => MESSAGE_ARRAY[getRandomInt(0, MESSAGE_ARRAY.length - 1)]).join(' ');
}

/** Возвращает @returns {Array}  массив объектов-комментариев; уникальность id комментов в пределах одной фотки*/
function getCommentArray() {
  const getUniqueRandomNumber = getUniqueRandomHelper();
  const numberOfComments = getRandomInt(0, 30);
  return Array.from({length: numberOfComments}, () => getCommentObj(getUniqueRandomNumber));
}

/**
 * @param {*} getId получает callback рандомайзера с рассчетом уникальных значений
 * @returns {Object} возвращает объект-комментарий
 */
function getCommentObj(getId) {
  return {
    id: getId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: getMessage(),
    name: getRandomName(),
  };
}

/**
 *
 * @param {number} index порядковй номер объекта
 * @returns {object} объект-фото
 */
function getPhotoObject(index) {
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: PHOTO_DESCRIPTION[index],
    likes: getRandomInt(15, 200),
    comments: getCommentArray(),
  };
}

const photoData = Array.from({length: NUMBER_OF_PHOTO_OBJECTS}, (element, index) => getPhotoObject(index));

console.log(photoData);
