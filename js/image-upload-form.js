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
  // обнуляем все поля формы
  imgUploadFormElement.reset();
  // обнуляем фильтр (удаляем свойство фильтр у картинки и скрываем слайдер)
  resetFilter();
  // устанавливаем занчение кнопок масштаба по умолчанию
  resetPhotoScale();
}

// событие на изменение значений слайдера
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


//СОБЫТИЕ когда нажимаем кнопку отправить форму [форму отправляем]
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
        //удаляем событие отправки формы
        imgUploadFormElement.removeEventListener('submit', onFormSubmit);
        // удаляем событе нажания на кнпку закрыть модального окна
        imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
        // удаляем событие нажатия на кнопку esc для закрытия модального окна
        document.removeEventListener('keydown', onDocumentKeydown);
        // скрываем модальное окно
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


// СОБЫТИЕ сбрасываем форму при нажатии на клавишу esc [форму не отправляем]
function onDocumentKeydown(evt) {
  const isMessageWindowOpen = MESSAGE_CONTAINER_CLASSES.some((className) => document.querySelector(`.${className}`));
  if (!isMessageWindowOpen) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      // если фокус на инпутах
      if (document.activeElement === textHashtagsInputElement || document.activeElement === textDescriptionElement) {
        evt.stopPropagation();
      } else {
        if (!imgUploadOverlayElement.classList.contains('hidden') && bodyElement.classList.contains('modal-open')) {

          // обнуляем все поля формы, скрываем слайдер, удаляем свой-во фильтр, кнопки масштаба по умолч
          resetFromEditor();

          pristineInstances.pristineObj.forEach((pristine) => {
            pristine.destroy();
          });
          pristineInstances.pristineObj.splice(0, pristineInstances.pristineObj.length);

          // удаляем событе нажания на кнпку закрыть модального окна
          imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
          // удаляем событие нажатия на кнопку esc для закрытия модального окна
          document.removeEventListener('keydown', onDocumentKeydown);

          // удаляем событие отправки формы
          imgUploadFormElement.removeEventListener('submit', onFormSubmit);

          // скрываем модальное окно
          hidePhotoEditingWindow();
        }
      }

    }
  }

}

// СОБЫТИЕ сбрасываем форму при нажатии на кнопку закрытия модального окна [форму не отправляем]
function onImgUploadFileClose(evt) {

  if (evt.type === 'pointerdown') {
    evt.preventDefault();
    // обнуляем все поля формы, скрываем слайдер, удаляем свой-во фильтр, кнопки масштаба по умолч
    resetFromEditor();

    pristineInstances.pristineObj.forEach((pristine) => {
      pristine.destroy();
    });

    pristineInstances.pristineObj.splice(0, pristineInstances.pristineObj.length);
    // удаляем событие отправки формы
    imgUploadFormElement.removeEventListener('submit', onFormSubmit);
    // удаляем событе нажания на кнпку закрыть модального окна
    imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
    // удаляем событие нажатия на кнопку esc для закрытия модального окна
    document.removeEventListener('keydown', onDocumentKeydown);
    // скрываем модальное окно
    hidePhotoEditingWindow();
  }
}

// 3. установка события на отправку формы и прописание правил для инпутов Пристин
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

// 2. когда загрузили фото, открыли окно формы, создали события пристин, добавили события на закрытие формы
const onImgUploadFileOpen = (evt) => {
  if (evt.target.value) {
    const file = imgUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
    // если фото подошло по параметрам, то вствили в превью
    if (matches) {
      imgUploadPreviewImgElement.src = URL.createObjectURL(file);
      Array.from(effectsPreviewElements).forEach((element) => {
        element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
    }
    // отобразили остальные окна формы, а загрузку скрыли
    showPhotoEditingWindow();
    // создать объекты пристин и повесить на форму
    initPristineFormValidation();
    // создать событие отправки формы
    imgUploadFormElement.addEventListener('submit', onFormSubmit);
    // Добавили событие на закрытие окна крестиком
    imgUploadCancelElement.addEventListener('pointerdown', onImgUploadFileClose);
    // добавили событие на закрытие esc
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

// 1. установка события на загрузку фотки, события для слайдера и масштаба
const initUploadFormHandler = () => {
  // обработчик на кнопку загрузки фото
  imgUploadInputElement.addEventListener('change', onImgUploadFileOpen);
  // обработчики на масштабные кнопки
  scaleControleSmallerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  scaleControleBiggerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  // обработчик на слайдер
  initSliderEditor();
};

export { initUploadFormHandler };
