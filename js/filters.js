const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultButtonElement = imgFiltersElement.querySelector('#filter-default');
const filterRandomButtonElement = imgFiltersElement.querySelector('#filter-random');
const filterDiscussedButtonElement = imgFiltersElement.querySelector('#filter-discussed');
const imgFiltersFormButtonsElements = imgFiltersElement.querySelectorAll('.img-filters__button');


const unsetButtons = () => {
  imgFiltersFormButtonsElements.forEach((elem) => {
    if(elem.classList.contains(ACTIVE_BUTTON_CLASS)) {
      elem.classList.remove(ACTIVE_BUTTON_CLASS);
    }
  });
};

const getActiveButton = () => Array.from(imgFiltersFormButtonsElements).find((elem) => elem.classList.contains(ACTIVE_BUTTON_CLASS));

const showFilters = () => {
  if (imgFiltersElement.classList.contains('img-filters--inactive')) {
    imgFiltersElement.classList.remove('img-filters--inactive');
  }
};

const hideFilters = () => {
  if (!imgFiltersElement.classList.contains('img-filters--inactive')) {
    imgFiltersElement.classList.add('img-filters--inactive');
  }
};

const setDefaultClick = (cb) => {
  filterDefaultButtonElement.addEventListener('pointerdown', (evt) => {
    unsetButtons();
    evt.target.classList.add(ACTIVE_BUTTON_CLASS);
    cb();
  });
};

const setRundomClick = (cb) => {
  filterRandomButtonElement.addEventListener('pointerdown', (evt) => {
    unsetButtons();
    evt.target.classList.add(ACTIVE_BUTTON_CLASS);
    cb();
  });
};

const setDiscussedClick = (cb) => {
  filterDiscussedButtonElement.addEventListener('pointerdown', (evt) => {
    unsetButtons();
    evt.target.classList.add(ACTIVE_BUTTON_CLASS);
    cb();
  });
};

export{showFilters, hideFilters, setRundomClick, setDefaultClick, setDiscussedClick, getActiveButton};
