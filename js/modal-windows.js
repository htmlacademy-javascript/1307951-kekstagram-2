const elementsToCloseModalCheck = (evt, modalClass) => {
  const modalWindow = document.querySelector(`.${modalClass}`);
  if (evt.key === 'Escape') {
    if(modalWindow) {
      modalWindow.remove();
    }
  }

  if(evt.type === 'pointerdown') {
    evt.stopPropagation();
    if((evt.target.className === modalClass) || (evt.target.className === `${modalClass}__button`)){
      modalWindow.remove();
    }
  }
};

const onCloseSuccessMsg = (evt) => {
  elementsToCloseModalCheck(evt, 'success');
};

const successMessageHandler = () => {
  const successButtonElement = document.querySelector('.success__button');
  successButtonElement.addEventListener('pointerdown', onCloseSuccessMsg);
  document.addEventListener('keydown', onCloseSuccessMsg);
  document.addEventListener('pointerdown', onCloseSuccessMsg);
};

const onCloseErrorMessage = (evt) => {
  elementsToCloseModalCheck(evt, 'error');
};

const failedFileLoadHandler = () => {
  const errorButtonElement = document.querySelector('.error__button');
  errorButtonElement.addEventListener('pointerdown', onCloseErrorMessage);
  document.addEventListener('keydown', onCloseErrorMessage);
  document.addEventListener('pointerdown', onCloseErrorMessage);
};

export {successMessageHandler, failedFileLoadHandler};
