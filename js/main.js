import { getPhotoArray } from './get-photo-data.js';
import { renderThumbnails } from './thumbnails-render.js';
import { setPictureModalWindowHandler } from './picture-modal-window-handler.js';
import { initUploadFormHandler } from './image-upload-form.js';

const photoData = getPhotoArray();
renderThumbnails(photoData); // создали маленькие картинки с dataset.pictureId
setPictureModalWindowHandler();

initUploadFormHandler();
