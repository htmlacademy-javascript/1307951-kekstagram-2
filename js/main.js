import { getPhotoArray } from './get-photo-data.js';
import { renderThumbnails } from './thumbnails-render.js';
import { setPictureModalWindowHandler } from './picture-modal-window-handler.js';
import { initUploadFormHandler } from './image-upload-form.js';

const photoData = getPhotoArray();
renderThumbnails(photoData); // создали маленькие картинки с dataset.pictureId
setPictureModalWindowHandler();

initUploadFormHandler();

const addSlider = () => {
  const sliderElement = document.querySelector('.effect-level__slider');
  const sliderInputElement = document.querySelector('.effect-level__value');
  sliderInputElement.value = 30;
  console.log(sliderElement);
  console.log(sliderInputElement);
  // sliderElement.removeAttribute('disabled');
  noUiSlider.create(sliderElement, {
    range: {
      'min': 0,
      'max': 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    sliderInputElement.value = sliderElement.noUiSlider.get();
  });

};

addSlider();
