const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const sliderElement = imgUploadOverlayElement.querySelector('.effect-level__slider');
const effectLevelValueInputElement = imgUploadOverlayElement.querySelector('.effect-level__value');
const effectsItemsArray = imgUploadOverlayElement.querySelectorAll('.effects__item input');
const sliderContainerElement = imgUploadOverlayElement.querySelector('.img-upload__effect-level');
const imageUploadPreviewElement = imgUploadOverlayElement.querySelector('.img-upload__preview img');
const effectsListElement = imgUploadOverlayElement.querySelector('.effects__list');

/** const values */
const sliderEffectChromeOption = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  format: {
    to: function (value) {
      // то значение, которое получаетс слайдер set()
      return value;
    },
    // то значение, которое слайдер передает get()
    from: function (value) {
      return parseFloat(value).toFixed(1);
    }
  },
};

const sliderEffectSepiaOption = {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  format: {
    to: function (value) {
      // то значение, которое получаетс слайдер set()
      return value;
    },
    // то значение, которое слайдер передает get()
    from: function (value) {
      return parseFloat(value).toFixed(1);
    }
  },
};

const sliderEffectMarvinOption = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1
};

const sliderEffectPhobosOption = {
  range: {
    min: 0,
    max: 3
  },
  start: 3,
  step: 0.1,
  format: {
    to: function (value) {
      // то значение, которое получаетс слайдер set()
      return value;
    },
    // то значение, которое слайдер передает get()
    from: function (value) {
      return parseFloat(value).toFixed(1);
    }
  },
};

const sliderEffectHeatOption = {
  range: {
    min: 1,
    max: 3
  },
  start: 3,
  step: 0.1,
  format: {
    to: function (value) {
      // то значение, которое получаетс слайдер set()
      return value;
    },
    // то значение, которое слайдер передает get()
    from: function (value) {
      return parseFloat(value).toFixed(1);
    }
  },
};

const Effects = {
  none: sliderEffectMarvinOption,
  chrome: sliderEffectChromeOption,
  sepia: sliderEffectSepiaOption,
  marvin: sliderEffectMarvinOption,
  phobos: sliderEffectPhobosOption,
  heat: sliderEffectHeatOption,
};

const getChromeStyleFilter = (value) => `grayscale(${value})`;
const getSepiaStyleFilter = (value) => `sepia(${value})`;
const getMarvinStyleFilter = (value) => `invert(${value}%)`;
const getPhobosStyleFilter = (value) => `blur(${value}px)`;
const getHeatStyleFilter = (value) => `brightness(${value})`;

const styleFilterEffects = {
  chrome: getChromeStyleFilter,
  sepia: getSepiaStyleFilter,
  marvin: getMarvinStyleFilter,
  phobos: getPhobosStyleFilter,
  heat: getHeatStyleFilter
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

effectLevelValueInputElement.value = 100;

const onUpdateSliderOption = (effect) => {
  sliderElement.noUiSlider.updateOptions(Effects[effect]);
};

const resetFilter = () => {
  imageUploadPreviewElement.style.removeProperty('filter');
  sliderContainerElement.classList.add('hidden');
};

const onChangeSliderStatus = (evt) => {
  const pressedElement = evt.target;

  if (pressedElement.classList.contains('effects__radio')) {
    if (pressedElement.value !== 'none') {
      if (sliderContainerElement.classList.contains('hidden')) {
        sliderContainerElement.classList.remove('hidden');
      }
      onUpdateSliderOption(pressedElement.value);
    } else {
      resetFilter();
    }
  }
};

const initSliderEditor = () => {
  sliderElement.noUiSlider.on('update', () => {
    effectLevelValueInputElement.value = sliderElement.noUiSlider.get();
    effectsItemsArray.forEach((item) => {
      if (item.checked) {
        if (item.value !== 'none') {
          if (sliderContainerElement.classList.contains('hidden')) {
            sliderContainerElement.classList.remove('hidden');
          }
          const filterValue = styleFilterEffects[item.value](effectLevelValueInputElement.value);
          imageUploadPreviewElement.style.filter = filterValue;
        } else {
          resetFilter();
        }
      }
    });

  });

  effectsListElement.addEventListener('change', onChangeSliderStatus);
};

export { initSliderEditor , resetFilter};
