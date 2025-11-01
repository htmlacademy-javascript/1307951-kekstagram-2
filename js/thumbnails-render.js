const pictureTemplateFragment = document.querySelector('#picture').content;
const pictureTemplate = pictureTemplateFragment.querySelector('.picture');
const fragment = document.createDocumentFragment();
const placeInPicturesElement = document.querySelector('.pictures');


const fillInPhotoDataElement = (({_, url, description, likes, comments}, element) => {
  const img = element.querySelector('.picture__img');
  img.src = url;
  img.alt = description;
  element.querySelector('.picture__likes').textContent = likes;
  element.querySelector('.picture__comments').textContent = comments.length;

  return element;
});

const renderThumbnails = (pictureObjects, pictureLimits = 0) => {

  if (pictureLimits) {
    for (let i = 0; i < pictureLimits; i++) {
      const photoElement = pictureTemplate.cloneNode(true);
      fragment.append(fillInPhotoDataElement(pictureObjects[i], photoElement));
    }
  }

  placeInPicturesElement.append(fragment);

};

export {renderThumbnails};
