const data = {};

const savePhotos = (photos) => {
  data.photos = photos;
};

const getPhotos = () => data.photos;

export{ savePhotos, getPhotos};
