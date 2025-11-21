import {renderPhotoCard, beforeClosePhotoCard} from './create-full-size-photo-card.js';
import { photoData } from './get-photo-data.js';
import { clearCommentsEvent} from './create-comments-list.js';

const thumbnailsParentElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');


function onBigPictureClose(evt) {
  evt.preventDefault();
  if ((evt.type === 'keydown' & evt.key === 'Escape') || (evt.type === 'pointerdown')) {
    beforeClosePhotoCard();
    document.removeEventListener('keydown', onBigPictureClose);
    closeButtonElement.removeEventListener('pointerdown', onBigPictureClose);
    clearCommentsEvent();
  }
}

function onBigPictureOpen(evt) {
  evt.preventDefault();
  const currentPictureNode = evt.target.closest('.pictures');
  const smallPictureId = evt.target.parentElement.dataset.pictureId;

  if (currentPictureNode) {
    const clickedThumbnail = photoData.find((item) => item.id === Number(smallPictureId));
    renderPhotoCard(clickedThumbnail);
  }

  document.addEventListener('keydown', onBigPictureClose);
  closeButtonElement.addEventListener('pointerdown', onBigPictureClose);
}

function setPictureModalWindowHandler () {
  thumbnailsParentElement.addEventListener('pointerdown', onBigPictureOpen);
}

export {setPictureModalWindowHandler};
