import {isHashtagValid, error} from './check-hashtag-input.js';
import { isDescriptionValid, error as descError } from './check-description-input.js';
import { isEscapeKey, isEnter, showErrorMessage, showSuccessMessage } from './utils.js';
import { initSliderEditor, resetFilter } from './slider-editor.js';
import { sendData } from './server.js';

const IMG_SCALE_STEP = 25;
const IMG_DEFAULT_VALUE = 100;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.querySelector('body');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = imgUploadFormElement.querySelector('.img-upload__cancel');

const imgUploadFieldWrapperHashElement = imgUploadFormElement.querySelector('.img-upload__field-wrapper:has(.text__hashtags)');
const textHashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadFieldWrapperDescElement = imgUploadFormElement.querySelector('.img-upload__field-wrapper:has(.text__description)');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');

const scaleControleSmallerElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const scaleControleBiggerElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadFormElement.querySelector('.scale__control--value');
const imgUploadPreviewImgElement = imgUploadFormElement.querySelector('.img-upload__preview img');

const imageUploadSubmitButton = imgUploadFormElement.querySelector('.img-upload__submit');

const changePhotoEditingWindowVisibility = () => {
  imgUploadOverlayElement.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
};

const resetPhotoScale = () => {
  scaleControlValueElement.setAttribute('value', `${IMG_DEFAULT_VALUE}%`);
  imgUploadPreviewImgElement.setAttribute('style', `transform: scale(${IMG_DEFAULT_VALUE / 100});`);
};

const onDocumentKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    // если фокус на инпутах
    if(document.activeElement === textHashtagsInputElement || document.activeElement === textDescriptionElement) {
      evt.stopPropagation();
    } else {
      resetFromEditor();
    }
  }

  if(isEnter(evt)) {
    evt.preventDefault();
    if(document.activeElement === imgUploadCancelElement) {
      resetFromEditor();
    }
  }
};

const onImgUploadFileClose = (evt) => {
  if(evt.type === 'pointerdown'){
    evt.preventDefault();
    resetFromEditor();
  }
};


function resetFromEditor () {
  changePhotoEditingWindowVisibility();
  imgUploadFormElement.reset();
  resetFilter();
  resetPhotoScale();
  imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onImgUploadFileOpen = (evt) => {
  if (evt.target.value) {
    const file = imgUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imgUploadPreviewImgElement.src = URL.createObjectURL(file);
    }

    changePhotoEditingWindowVisibility();
    imgUploadCancelElement.addEventListener('pointerdown', onImgUploadFileClose);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const blockSubmitButton = () => {
  imageUploadSubmitButton.disabled = true;
  imageUploadSubmitButton.textContent = 'Сохраняю ...';
};

const unblockSubmitButton = () => {
  imageUploadSubmitButton.disabled = false;
  imageUploadSubmitButton.textContent = 'Сохранить';
};

const onFormSubmit = (pristineArray, evt) => {
  evt.preventDefault();
  const isAnyError = pristineArray.every((pristine) => pristine.validate());

  if (isAnyError) {
    blockSubmitButton();
    textHashtagsInputElement.value = textHashtagsInputElement.value.trim();
    textDescriptionElement.value = textDescriptionElement.value.trim();

    sendData(
      () => {
        showSuccessMessage();
        unblockSubmitButton();
      },
      (msg) => {
        showErrorMessage(msg);
        unblockSubmitButton();
      },
      () => {
        resetFromEditor();
      },
      new FormData(evt.target),
    );
  }
};

const onChangeScaleControlValue = (evt) => {
  try {
    let currentValue = parseInt(scaleControlValueElement.value, 10);

    if (evt.target.classList.contains('scale__control--smaller')) {
      currentValue -= IMG_SCALE_STEP;
      currentValue = currentValue < 25 ? 25 : currentValue;
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      currentValue += IMG_SCALE_STEP;
      currentValue = currentValue > 100 ? 100 : currentValue;
    }

    scaleControlValueElement.setAttribute('value', `${currentValue}%`);
    imgUploadPreviewImgElement.setAttribute('style', `transform: scale(${currentValue / 100});`);

  // eslint-disable-next-line no-shadow
  } catch (error) {
    showErrorMessage(error.message);
  }
};

// запуск события на отправку формы и прописание правил для инпутов Пристин
const initPristineFormValidation = () => {
  const defaultConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  };

  const pristineHashTag = new Pristine(imgUploadFieldWrapperHashElement, defaultConfig);
  pristineHashTag.addValidator(textHashtagsInputElement, isHashtagValid, error, 1, false);

  const pristineDescription = new Pristine(imgUploadFieldWrapperDescElement, defaultConfig);
  pristineDescription.addValidator(textDescriptionElement, isDescriptionValid, descError, 1 , false);

  imgUploadFormElement.addEventListener('submit', (evt) => {
    onFormSubmit([pristineHashTag, pristineDescription], evt);
  });
};

const initUploadFormHandler = () => {
  imgUploadInputElement.addEventListener('change', onImgUploadFileOpen);
  scaleControleSmallerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  scaleControleBiggerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  initPristineFormValidation();
  initSliderEditor();
};

export { initUploadFormHandler };
