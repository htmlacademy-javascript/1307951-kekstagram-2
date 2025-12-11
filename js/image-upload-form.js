import { isHashtagValid, showHashtagError } from './check-hashtag-input.js';
import { isDescriptionValid, showDescriptionError } from './check-description-input.js';
import { isEscapeKey, showSuccessMessage, showErrorFileMessage } from './utils.js';
import { initSliderEditor, resetFilter } from './slider-editor.js';
import { sendData } from './server.js';
import { successMessageHandler, failedFileLoadHandler } from './modal-windows.js';
import { MESSAGE_CONTAINER_CLASSES } from './modal-windows.js';

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
const effectsPreviewElements = imgUploadFormElement.querySelectorAll('.effects__preview');

const imageUploadSubmitButton = imgUploadFormElement.querySelector('.img-upload__submit');

const pristineInstances = {
  pristineObj: [],
};


const blockSubmitButton = () => {
  imageUploadSubmitButton.setAttribute('disabled', 'disabled');
  imageUploadSubmitButton.textContent = 'Сохраняю ...';
};

const unblockSubmitButton = () => {
  imageUploadSubmitButton.disabled = false;
  imageUploadSubmitButton.textContent = 'Сохранить';
};

const showPhotoEditingWindow = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

const hidePhotoEditingWindow = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};

const resetPhotoScale = () => {
  scaleControlValueElement.setAttribute('value', `${IMG_DEFAULT_VALUE}%`);
  imgUploadPreviewImgElement.setAttribute('style', `transform: scale(${IMG_DEFAULT_VALUE / 100});`);
};

function resetFromEditor() {
  imgUploadFormElement.reset();
  resetFilter();
  resetPhotoScale();
}

const onChangeScaleControlValue = (evt) => {
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

};


function onFormSubmit(evt) {

  evt.preventDefault();
  const isAnyError = pristineInstances.pristineObj.every((pristine) => pristine.validate());

  if (isAnyError) {
    blockSubmitButton();
    textHashtagsInputElement.value = textHashtagsInputElement.value.trim();
    textDescriptionElement.value = textDescriptionElement.value.trim();

    sendData(
      () => {
        showSuccessMessage();
        successMessageHandler();
        pristineInstances.pristineObj.forEach((pristine) => {
          pristine.destroy();
        });
        pristineInstances.pristineObj.splice(0, pristineInstances.pristineObj.length);

        unblockSubmitButton();

        resetFromEditor();
        imgUploadFormElement.removeEventListener('submit', onFormSubmit);
        imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
        document.removeEventListener('keydown', onDocumentKeydown);
        hidePhotoEditingWindow();

      },
      (msg) => {
        showErrorFileMessage(msg);
        failedFileLoadHandler();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  }
}


function onDocumentKeydown(evt) {
  const isMessageWindowOpen = MESSAGE_CONTAINER_CLASSES.some((className) => document.querySelector(`.${className}`));
  if (!isMessageWindowOpen) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();

      if (document.activeElement === textHashtagsInputElement || document.activeElement === textDescriptionElement) {
        evt.stopPropagation();
      } else {
        if (!imgUploadOverlayElement.classList.contains('hidden') && bodyElement.classList.contains('modal-open')) {

          resetFromEditor();

          pristineInstances.pristineObj.forEach((pristine) => {
            pristine.destroy();
          });
          pristineInstances.pristineObj.splice(0, pristineInstances.pristineObj.length);

          imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
          document.removeEventListener('keydown', onDocumentKeydown);

          imgUploadFormElement.removeEventListener('submit', onFormSubmit);

          hidePhotoEditingWindow();
        }
      }

    }
  }

}

function onImgUploadFileClose(evt) {

  if (evt.type === 'pointerdown') {
    evt.preventDefault();
    resetFromEditor();

    pristineInstances.pristineObj.forEach((pristine) => {
      pristine.destroy();
    });

    pristineInstances.pristineObj.splice(0, pristineInstances.pristineObj.length);
    imgUploadFormElement.removeEventListener('submit', onFormSubmit);
    imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
    document.removeEventListener('keydown', onDocumentKeydown);
    hidePhotoEditingWindow();
  }
}

const initPristineFormValidation = () => {
  const defaultConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  };

  const pristineHashTag = new Pristine(imgUploadFieldWrapperHashElement, defaultConfig);
  pristineHashTag.addValidator(textHashtagsInputElement, isHashtagValid, showHashtagError, 1, false);

  const pristineDescription = new Pristine(imgUploadFieldWrapperDescElement, defaultConfig);
  pristineDescription.addValidator(textDescriptionElement, isDescriptionValid, showDescriptionError, 1, false);

  pristineInstances.pristineObj.push(pristineHashTag);
  pristineInstances.pristineObj.push(pristineDescription);

};

const onImgUploadFileOpen = (evt) => {
  if (evt.target.value) {
    const file = imgUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imgUploadPreviewImgElement.src = URL.createObjectURL(file);
      Array.from(effectsPreviewElements).forEach((element) => {
        element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
    }

    showPhotoEditingWindow();
    initPristineFormValidation();
    imgUploadFormElement.addEventListener('submit', onFormSubmit);
    imgUploadCancelElement.addEventListener('pointerdown', onImgUploadFileClose);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

const initUploadFormHandler = () => {
  imgUploadInputElement.addEventListener('change', onImgUploadFileOpen);
  scaleControleSmallerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  scaleControleBiggerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  initSliderEditor();
};

export { initUploadFormHandler };
