const REMOVE_MESSAGE_TIMEOUT = 5000;
const body = document.body;
const errorDataLoadTemplate = document.getElementById('data-error').content;
const errorDataLoadMessageElement = errorDataLoadTemplate.querySelector('.data-error__title');
const successSendDataTemplate = document.getElementById('success').content;
const errorFileLoadTemplate = document.getElementById('error').content;
const errorFileLoadMessage = errorFileLoadTemplate.querySelector('.error__title');

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
};

const showErrorFileMessage = (message) => {
  const errorArea = errorFileLoadTemplate.cloneNode(true);
  if (message) {
    errorFileLoadMessage.textContent = message;
  }
  body.append(errorArea);

};

const isEscapeKey = (evt) => evt.type === 'keydown' && evt.key === 'Escape';

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


export {isEscapeKey, showErrorMessage, showSuccessMessage, showErrorFileMessage, debounce};
