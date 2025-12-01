const MAX_HASHTAG_LENGTH = 20;
let errorMessage = '';

/**
 * @param {string} inputHashtag строка хэштег для проверки
 * @returns {boolean} возвращает fasle,  если появляется хотя бы одна ошибка
 */
const checkHashTagRules = (inputHashtag) => {
  const rules = [
    {
      check: (inputHashtag.length === 1 && inputHashtag[0] === '#'),
      error: 'Хештег не может состоять только из одной решётки'
    },
    {
      check: inputHashtag[0] !== '#',
      error: 'Хэштег начинается с символа # (решётка)'
    },
    {
      check: !/^#[a-zа-яё0-9]+$/.test(inputHashtag),
      error: 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д. Разделяйте хэштеги пробелами.'
    },
    {
      check: inputHashtag.length > 20,
      error: `Максимальная длина одного хэштега ${MAX_HASHTAG_LENGTH} символов, включая решётку`,
    },
  ];

  return !rules.some((rule) => {
    const isRuleValid = rule.check;
    if (isRuleValid) {
      errorMessage += rule.error;
    }
    return isRuleValid;
  });
};

const error = () => errorMessage;
/**
 * @param {inputHashTagsArray} массив с хэштегами
 * @return {boolean} true если есть повторения хэштегов
*/
const checkHashTagsClones = (inputHashTagsArray) => {
  const arrayWithoutHashTagClones = inputHashTagsArray.filter((item, index) => inputHashTagsArray.indexOf(item) === index);
  const isAnyClones = (arrayWithoutHashTagClones.length !== inputHashTagsArray.length);
  return isAnyClones;
};

/**
 * @param {inputHashTagsArray} передает строку с хэштегами
 * @param {search} передает разделитель для создания массива из хэштегов
 * @returns {boolean} если длина получившегося массива больше 5, то true
 */
const checkHashTagsNumbers = (inputHashTagsString, search) => search.length ? (inputHashTagsString.split(search).length - 1) > 5 : false;
/**
 * @param {String} inputArray строка ввода формы с хэштегом
 * @returns {Boolean} возвращает true, если ошибок нет, и false - если есть
 */
const isHashtagValid = (inputArray) => {
  errorMessage = '';
  const inputArrayString = inputArray.trim().toLowerCase();

  if (inputArrayString) {
    const inputHashTagsArray = inputArrayString.split(' ');
    // если несколько хт
    if (inputHashTagsArray.length > 1) {
      // проверяем есть ли дубликаты
      if (checkHashTagsClones(inputHashTagsArray)) {
        errorMessage += 'Oдин и тот же хэштег не может быть использован дважды';
        return false;
      }
      // проверяем количество хэштегов
      if (checkHashTagsNumbers(inputArrayString, '#')) {
        errorMessage += 'Нельзя указать больше пяти хэштегов';
        return false;
      }
    }
    // проверяем все остальные ошибки
    return inputHashTagsArray.every(checkHashTagRules);
  }
  return true;
};

export { isHashtagValid, error };
