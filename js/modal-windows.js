const MESSAGE_CONTAINER_CLASSES = ['error', 'success'];

const onCloseSuccessMsg = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();

  const modalWindow = document.querySelector('.success');
  const successButtonElement = document.querySelector('.success__button');

  if (evt.key === 'Escape') {
    if (modalWindow) {
      successButtonElement.removeEventListener('pointerdown', onCloseSuccessMsg);
      document.removeEventListener('keydown', onCloseSuccessMsg);
      document.removeEventListener('pointerdown', onCloseSuccessMsg);
      modalWindow.remove();
    }
  }

  if (evt.type === 'pointerdown') {
    evt.stopPropagation();
    if ((evt.target.className === 'success') || (evt.target.className === 'success__button')) {
      successButtonElement.removeEventListener('pointerdown', onCloseSuccessMsg);
      document.removeEventListener('keydown', onCloseSuccessMsg);
      document.removeEventListener('pointerdown', onCloseSuccessMsg);
      modalWindow.remove();
    }
  }
};

const onCloseErrorMessage = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  const errorButtonElement = document.querySelector('.error__button');
  const errorWindow = document.querySelector('.error');

  if (evt.key === 'Escape') {
    if (errorWindow) {

      errorButtonElement.removeEventListener('pointerdown', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
      document.removeEventListener('pointerdown', onCloseErrorMessage);
      errorWindow.remove();
    }
  }

  if (evt.type === 'pointerdown') {
    evt.stopPropagation();
    if ((evt.target.className === 'error') || (evt.target.className === 'error__button')) {

      errorButtonElement.removeEventListener('pointerdown', onCloseErrorMessage);
      document.removeEventListener('keydown', onCloseErrorMessage);
      document.removeEventListener('pointerdown', onCloseErrorMessage);
      errorWindow.remove();
    }
  }

};

const successMessageHandler = () => {
  const successButtonElement = document.querySelector('.success__button');
  successButtonElement.addEventListener('pointerdown', onCloseSuccessMsg);
  document.addEventListener('keydown', onCloseSuccessMsg);
  document.addEventListener('pointerdown', onCloseSuccessMsg);
};

const failedFileLoadHandler = () => {
  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('pointerdown', onCloseErrorMessage);
  document.addEventListener('keydown', onCloseErrorMessage);
  document.addEventListener('pointerdown', onCloseErrorMessage);
};

export {successMessageHandler, failedFileLoadHandler, MESSAGE_CONTAINER_CLASSES};
