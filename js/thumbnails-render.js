const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();
const placeInPicturesElement = document.querySelector('.pictures');

const renderThumbnails = (pictureData) => {

  pictureData.forEach(({_, url, description, likes, comments}) => {
    const photoElement = pictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    fragment.append(photoElement);
  });
  placeInPicturesElement.append(fragment);
};

export {renderThumbnails};
