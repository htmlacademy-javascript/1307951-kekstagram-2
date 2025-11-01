import { getPhotoArray } from './get-photo-objects.js';
import { renderThumbnails } from './thumbnails-render.js';

const photoData = getPhotoArray();

// console.log(photoData);

renderThumbnails(photoData);
