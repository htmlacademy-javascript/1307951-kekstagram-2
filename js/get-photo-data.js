import {NAME_ARRAY, PHOTO_DESCRIPTION, MESSAGE_ARRAY,NUMBER_OF_PHOTO_OBJECTS} from './data.js';
import {getRandomInt, getUniqueRandomHelper} from './utils.js';

let photoData;
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

function getPhotoArray () {
  photoData = Array.from({length: NUMBER_OF_PHOTO_OBJECTS}, (element, index) => getPhotoObject(index));
  return photoData;
}

/** создать большие фотки */


export {getPhotoArray};
export{photoData};
