const REMOVE_MESSAGE_TIMEOUT = 5000;
const body = document.body;
const errorDataLoadTemplate = document.getElementById('data-error').content;
const errorDataLoadMessageElement = errorDataLoadTemplate.querySelector('.data-error__title');
const successSendDataTemplate = document.getElementById('success').content;
const errorFileLoadTemplate = document.getElementById('error').content;
const errorFileLoadMessage = errorFileLoadTemplate.querySelector('error__title');

/**
 * возвращает рандомное число от @param {number} min до @param {number} max
*/
const getRandomInt = (min = 0, max = 1000) => Math.floor(min + Math.random() * (max + 1 - min));

const showErrorMessage = (message) => {
  const errorArea = errorDataLoadTemplate.cloneNode(true);

  if(message) {
    errorDataLoadMessageElement.textContent = message;
  }

  body.append(errorArea);

  const errorLoadDataArea = body.querySelector('.data-error');

  setTimeout(() => {
    errorLoadDataArea.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const showSuccessMessage = () => {
  const successArea = successSendDataTemplate.cloneNode(true);
  body.append(successArea);

  const deleteElement = body.querySelector('.success');

  setTimeout(() => {
    deleteElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

const showErrorFileMessage = (message) => {
  const errorArea = errorFileLoadTemplate.cloneNode(true);

  if (message) {
    errorFileLoadMessage.textContent = message;
  }

  body.append(errorArea);
  const errorAreaContainer = body.querySelector('.success__title');

  setTimeout(() => {
    errorAreaContainer.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};


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
      showErrorMessage(error.message);
    }
  };
};

const isEscapeKey = (evt) => evt.type === 'keydown' && evt.key === 'Escape';
const isEnter = (evt) => evt.type === 'keydown' && evt.key === 'Enter';


// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export {getRandomInt, getUniqueRandomHelper, isEscapeKey, isEnter, showErrorMessage, showSuccessMessage, showErrorFileMessage, debounce, throttle};
