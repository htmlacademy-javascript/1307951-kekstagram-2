import {createCommentList} from './create-comments-list.js';

const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');
const imageElement = bigPictureElement.querySelector('.big-picture__img img');
const socialLikesCoutnElement = bigPictureElement.querySelector('.likes-count');
const socialCommentCountElement = bigPictureElement.querySelector('.social__comment-count');
const socialCommentLoaderElement = bigPictureElement.querySelector('.comments-loader');

const socialCaptionElement = bigPictureElement.querySelector('.social__caption');

const createPhotoCard = ({id: pictureId, url, description, likes, comments}) => {
  bigPictureElement.dataset.pictureId = pictureId;
  imageElement.src = url;
  imageElement.alt = description;
  socialLikesCoutnElement.textContent = likes;
  socialCaptionElement.textContent = description;

  createCommentList(comments);
};

const changeToInitialStateOfClassNames = () => {
  bigPictureElement.classList.add('hidden');
  socialCommentCountElement.classList.remove('hidden');
  socialCommentLoaderElement.classList.remove('hidden');
  bodyElement.classList.remove('modal-open');
};

const renderPhotoCard = (picture) => {
  createPhotoCard(picture);
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

export {renderPhotoCard, changeToInitialStateOfClassNames};
