import {isHashtagValid, error} from './check-hashtag-input.js';
import { isDescriptionValid, error as descError } from './check-description-input.js';
import { isEscapeKey, isEnter } from './utils.js';
import { initSliderEditor } from './slider-editor.js';

const IMG_SCALE_STEP = 25;

const bodyElement = document.querySelector('body');
const imgUploadFormElement = document.querySelector('.img-upload__form');
const imgUploadInputElement = imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
const imgUploadCancelElement = imgUploadFormElement.querySelector('.img-upload__cancel');

// pristine
const imgUploadFieldWrapperHashElement = imgUploadFormElement.querySelector('.img-upload__field-wrapper:has(.text__hashtags)');
const textHashtagsInputElement = imgUploadFormElement.querySelector('.text__hashtags');
const imgUploadFieldWrapperDescElement = imgUploadFormElement.querySelector('.img-upload__field-wrapper:has(.text__description)');
const textDescriptionElement = imgUploadFormElement.querySelector('.text__description');

// scale
const scaleControleSmallerElement = imgUploadFormElement.querySelector('.scale__control--smaller');
const scaleControleBiggerElement = imgUploadFormElement.querySelector('.scale__control--bigger');
const scaleControlValueElement = imgUploadFormElement.querySelector('.scale__control--value');
const imgUploadPreviewImgElement = imgUploadFormElement.querySelector('.img-upload__preview img');

// видимость окна редактирования фото
function changePhotoEditingWindowVisibility() {
  imgUploadOverlayElement.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
}

function resetFromEditor() {
  changePhotoEditingWindowVisibility();
  imgUploadFormElement.reset();
  imgUploadCancelElement.removeEventListener('pointerdown', onImgUploadFileClose);
  document.removeEventListener('keydown', onDocumentKeydown);
  // textHashtagsInputElement.removeEventListener('input', isHashtagValid);
}

function onImgUploadFileOpen(evt) {
  if (evt.target.value) {
    changePhotoEditingWindowVisibility();
    imgUploadCancelElement.addEventListener('pointerdown', onImgUploadFileClose);
    document.addEventListener('keydown', onDocumentKeydown);
  }
}

// закрываем окно редактирования фото
function onImgUploadFileClose(evt) {
  if(evt.type === 'pointerdown'){
    evt.preventDefault();
    resetFromEditor();
  }
}

function onDocumentKeydown(evt) {
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
}

function onFormSubmit(pristineArray, evt) {
  evt.preventDefault();
  const isAnyError = pristineArray.every((pristine) => pristine.validate());
  if (isAnyError) {
    textHashtagsInputElement.value = textHashtagsInputElement.value.trim();
    textDescriptionElement.value = textDescriptionElement.value.trim();
    imgUploadFormElement.submit();
  }
}

function onChangeScaleControlValue(evt) {
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
    //throw new Error('Неверный формат числа');

  } catch (err) {
    // console.error(err.message);
  }
}

// запуск события на отправку формы и прописание правил для инпутов Пристин
function initPristineFormValidation() {
  const defaultConfig = {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
  };

  // валидация формы хэш-тега
  // создаем объект пристин и вешаем его на элемент, где будут ошибки,
  // т.е. на wrapper
  const pristineHashTag = new Pristine(imgUploadFieldWrapperHashElement, defaultConfig);
  // добавляем валидатор {поле, где валидировать, обработчик, ошибка, приоритет, убрать обработчик или нет}
  // ошибка срабатывает, когда обработчик ее находит и возвращает false
  pristineHashTag.addValidator(textHashtagsInputElement, isHashtagValid, error, 1, false);

  const pristineDescription = new Pristine(imgUploadFieldWrapperDescElement, defaultConfig);
  pristineDescription.addValidator(textDescriptionElement, isDescriptionValid, descError, 1 , false);

  // добавляем событие закрытия формы с учетом проверки pristine
  imgUploadFormElement.addEventListener('submit', (evt) => {
    onFormSubmit([pristineHashTag, pristineDescription], evt);
  });
}


/**
 * устанавливаем событие загрузки файла
 */
const initUploadFormHandler = () => {
  // загрузили файл с фото
  imgUploadInputElement.addEventListener('change', onImgUploadFileOpen);
  scaleControleSmallerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  scaleControleBiggerElement.addEventListener('pointerdown', onChangeScaleControlValue);
  initPristineFormValidation();
  initSliderEditor();
};

export { initUploadFormHandler };
