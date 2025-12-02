import {isHashtagValid, error} from './check-hashtag-input.js';
import { isDescriptionValid, error as descError } from './check-description-input.js';
import { isEscapeKey, isEnter } from './utils.js';
// import { initSliderEditor } from './slider-editor.js';

const IMG_SCALE_STEP = 25;

const bodyElement = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
// const imgUploadSubmit = imgUploadForm.querySelector('.img-upload__submit');
// const textHashtags = imgUploadForm.querySelector('.text__hashtags');

// pristine
const imgUploadFieldWrapperHash = imgUploadForm.querySelector('.img-upload__field-wrapper:has(.text__hashtags)');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const imgUploadFieldWrapperDesc = imgUploadForm.querySelector('.img-upload__field-wrapper:has(.text__description)');
const textDescription = imgUploadForm.querySelector('.text__description');

// scale
const scaleControleSmaller = imgUploadForm.querySelector('.scale__control--smaller');
const scaleControleBigger = imgUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imgUploadForm.querySelector('.scale__control--value');
const imgUploadPreviewImg = imgUploadForm.querySelector('.img-upload__preview img');

// видимость окна редактирования фото
function changePhotoEditingWindowVisibility() {
  imgUploadOverlay.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
}

function resetFromEditor() {
  changePhotoEditingWindowVisibility();
  imgUploadForm.reset();
  imgUploadCancel.removeEventListener('pointerdown', onImgUploadFileClose);
  document.removeEventListener('keydown', onDocumentKeydown);
  // textHashtagsInput.removeEventListener('input', isHashtagValid);
}

function onImgUploadFileOpen(evt) {
  if (evt.target.value) {
    changePhotoEditingWindowVisibility();
    imgUploadCancel.addEventListener('pointerdown', onImgUploadFileClose);
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
    if(document.activeElement === textHashtagsInput || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else {
      resetFromEditor();
    }
  }

  if(isEnter(evt)) {
    evt.preventDefault();
    if(document.activeElement === imgUploadCancel) {
      resetFromEditor();
    }
  }
}

function onFormSubmit(pristineArray, evt) {
  evt.preventDefault();
  const isAnyError = pristineArray.every((pristine) => pristine.validate());
  if (isAnyError) {
    textHashtagsInput.value = textHashtagsInput.value.trim().replaceAll(/\s+/g);
    textDescription.value = textDescription.value.trim();
    imgUploadForm.submit();
  }
}

function onChangeScaleControlValue(evt) {
  try {
    let currentValue = parseInt(scaleControlValue.value, 10);

    if (evt.target.classList.contains('scale__control--smaller')) {
      currentValue -= IMG_SCALE_STEP;
      currentValue = currentValue < 25 ? 25 : currentValue;
    }

    if (evt.target.classList.contains('scale__control--bigger')) {
      currentValue += IMG_SCALE_STEP;
      currentValue = currentValue > 100 ? 100 : currentValue;
    }

    scaleControlValue.setAttribute('value', `${currentValue}%`);
    imgUploadPreviewImg.setAttribute('style', `transform: scale(${currentValue / 100});`);
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
  const pristineHashTag = new Pristine(imgUploadFieldWrapperHash, defaultConfig);
  // добавляем валидатор {поле, где валидировать, обработчик, ошибка, приоритет, убрать обработчик или нет}
  // ошибка срабатывает, когда обработчик ее находит и возвращает false
  pristineHashTag.addValidator(textHashtagsInput, isHashtagValid, error, 1, false);

  const pristineDescription = new Pristine(imgUploadFieldWrapperDesc, defaultConfig);
  pristineDescription.addValidator(textDescription, isDescriptionValid, descError, 1 , false);

  // добавляем событие закрытия формы с учетом проверки pristine
  imgUploadForm.addEventListener('submit', (evt) => {
    onFormSubmit([pristineHashTag, pristineDescription], evt);
  });
}


/**
 * устанавливаем событие загрузки файла
 */
const initUploadFormHandler = () => {
  // загрузили файл с фото
  imgUploadInput.addEventListener('change', onImgUploadFileOpen);
  scaleControleSmaller.addEventListener('pointerdown', onChangeScaleControlValue);
  scaleControleBigger.addEventListener('pointerdown', onChangeScaleControlValue);
  initPristineFormValidation();
  // initSliderEditor();
};

export { initUploadFormHandler };
