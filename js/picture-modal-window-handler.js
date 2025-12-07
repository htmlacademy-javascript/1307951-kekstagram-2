import { renderPhotoCard, beforeClosePhotoCardActions } from './create-full-size-photo-card.js';
import { clearCommentsEvent } from './create-comments-list.js';
import { getPhotos } from './data.js';

const thumbnailsParentElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');


const onBigPictureClose = (evt) => {
  evt.preventDefault();
  if ((evt.type === 'keydown' & evt.key === 'Escape') || (evt.type === 'pointerdown')) {
    beforeClosePhotoCardActions();
    document.removeEventListener('keydown', onBigPictureClose);
    closeButtonElement.removeEventListener('pointerdown', onBigPictureClose);
    clearCommentsEvent();
  }
};

const onBigPictureOpen = (evt) => {
  if (evt.target.classList.contains('picture__img')) {
    evt.preventDefault();
    const currentPictureNode = evt.target.closest('.pictures');
    const smallPictureId = evt.target.parentElement.dataset.pictureId;

    if (currentPictureNode) {
      const photoData = getPhotos();
      const clickedThumbnail = photoData.find((item) => item.id === Number(smallPictureId));
      renderPhotoCard(clickedThumbnail);
    }

    document.addEventListener('keydown', onBigPictureClose);
    closeButtonElement.addEventListener('pointerdown', onBigPictureClose);
  }
};

const setPictureModalWindowHandler = () => {
  thumbnailsParentElement.addEventListener('pointerdown', onBigPictureOpen);
};

export { setPictureModalWindowHandler };
