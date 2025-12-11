import { renderThumbnails } from './thumbnails-render.js';
import { setPictureModalWindowHandler } from './picture-modal-window-handler.js';
import { initUploadFormHandler } from './image-upload-form.js';
import { getData } from './server.js';
import { showErrorMessage, debounce } from './utils.js';
import { savePhotos } from './data.js';
import { setDefaultClick, setRundomClick, setDiscussedClick, showFilters } from './filters.js';

const RENDERER_DELAY = 500;

getData((data) => {

  renderThumbnails(data);
  savePhotos(data);

  setDefaultClick(debounce (
    ()=> renderThumbnails(data),
    RENDERER_DELAY,
  ));

  setRundomClick(debounce (
    ()=> renderThumbnails(data),
    RENDERER_DELAY,
  ));

  setDiscussedClick(debounce (
    ()=> renderThumbnails(data),
    RENDERER_DELAY,
  ));

  showFilters();
}, showErrorMessage);

setPictureModalWindowHandler();
initUploadFormHandler();
