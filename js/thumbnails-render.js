import { getActiveButton } from './filters.js';
import { showErrorMessage } from './utils.js';

const NUMBER_OF_RANDOM_IMAGES = 10;

const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();
const placeInPicturesElement = document.querySelector('.pictures');

const deleteThumbnailsFromDOM = () => {
  const thumbnailsArray = Array.from(document.querySelectorAll('.pictures > .picture'));
  if (thumbnailsArray.length) {
    thumbnailsArray.forEach((elem) => elem.remove());
  }
};

const compareCommentsNumber = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const reorderData = (pictureData) => {
  deleteThumbnailsFromDOM();
  try {
    const id = getActiveButton().id;
    if (id === 'filter-random') {
      return pictureData.slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, NUMBER_OF_RANDOM_IMAGES);
    } else if (id === 'filter-discussed') {
      return pictureData.slice()
        .sort(compareCommentsNumber);
    } else {
      return pictureData;
    }
  } catch (error) {
    showErrorMessage(error.message);
  }
};

const renderThumbnails = (pictureData) => {
  reorderData(pictureData).forEach(({id, url, description, likes, comments}) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.dataset.pictureId = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(photoElement);
  });
  placeInPicturesElement.append(fragment);
};

export {renderThumbnails};
