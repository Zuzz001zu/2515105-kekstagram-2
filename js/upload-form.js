import { pristine } from './validation.js';
import '../vendor/nouislider/nouislider.js';
import { sendPhoto } from './api.js';
import { showSuccessMessage, showErrorMessage } from './util.js';

const uploadFormElement = document.querySelector('.img-upload__form');
const uploadFileElement = document.querySelector('#upload-file');
const uploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadCancelElement = document.querySelector('#upload-cancel');
const hashtagsInputElement = uploadFormElement.querySelector('.text__hashtags');
const descriptionInputElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsRadioElements = document.querySelectorAll('.effects__radio');

const EFFECTS = {
  'none': {
    style: 'none',
    unit: '',
    filter: () => 'none',
    min: 0,
    max: 1,
    step: 0.01,
    start: 1
  },
  'chrome': {
    style: 'grayscale',
    unit: '',
    filter: (value) => `grayscale(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  'sepia': {
    style: 'sepia',
    unit: '',
    filter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  'marvin': {
    style: 'invert',
    unit: '%',
    filter: (value) => `invert(${value}%)`,
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  'phobos': {
    style: 'blur',
    unit: 'px',
    filter: (value) => `blur(${value}px)`,
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  'heat': {
    style: 'brightness',
    unit: '',
    filter: (value) => `brightness(${value})`,
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

let currentEffect = 'none';

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

let currentScale = DEFAULT_SCALE;

const updateScale = () => {
  const scaleValue = currentScale / 100;
  previewImageElement.style.transform = `scale(${scaleValue})`;
  scaleControlValueElement.setAttribute('value', `${currentScale}%`);
};

const scaleImage = (step) => {
  let newScale = currentScale + step;
  if (newScale < MIN_SCALE) {
    newScale = MIN_SCALE;
  }
  if (newScale > MAX_SCALE) {
    newScale = MAX_SCALE;
  }
  if (newScale !== currentScale) {
    currentScale = newScale;
    updateScale();
  }
};

const onScaleSmallerClick = () => scaleImage(-SCALE_STEP);
const onScaleBiggerClick = () => scaleImage(SCALE_STEP);

const applyEffect = () => {
  const effect = EFFECTS[currentEffect];
  if (!effect || currentEffect === 'none') {
    previewImageElement.style.filter = 'none';
    effectLevelValueElement.value = '';
    return;
  }

  const sliderValue = parseFloat(effectLevelValueElement.value) || effect.start;
  previewImageElement.style.filter = effect.filter(sliderValue);
};

const updateSliderVisibility = () => {
  const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
  effectLevelContainerElement.classList.toggle('hidden', currentEffect === 'none');
};

const updateEffectLevel = (value) => {
  const effect = EFFECTS[currentEffect];
  if (!effect || currentEffect === 'none') {
    return;
  }

  const formattedValue = effect.unit === '%' ? Math.round(value) : parseFloat(value.toFixed(2));
  effectLevelValueElement.value = formattedValue;
  applyEffect();
};

const initSlider = () => {
  if (!effectLevelSliderElement.noUiSlider) {
    noUiSlider.create(effectLevelSliderElement, {
      range: { min: 0, max: 1 },
      start: 1,
      step: 0.01,
      connect: 'lower',
      format: {
        to: (value) => parseFloat(value.toFixed(2)),
        from: (value) => parseFloat(value)
      }
    });

    effectLevelSliderElement.noUiSlider.on('update', (values) => {
      updateEffectLevel(values[0]);
    });
  }
};

const updateSliderSettings = () => {
  const effect = EFFECTS[currentEffect];
  if (!effectLevelSliderElement.noUiSlider) {
    initSlider();
  }

  if (currentEffect === 'none') {
    updateSliderVisibility();
    return;
  }

  effectLevelSliderElement.noUiSlider.updateOptions({
    range: { min: effect.min, max: effect.max },
    step: effect.step,
    start: effect.start
  });

  effectLevelSliderElement.noUiSlider.set(effect.start);
  updateSliderVisibility();
};

const resetEffect = () => {
  currentEffect = 'none';
  const noneRadioElement = document.querySelector('#effect-none');
  if (noneRadioElement) {
    noneRadioElement.checked = true;
  }
  updateSliderSettings();
  applyEffect();
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  updateSliderSettings();
  applyEffect();
};

const resetFormState = () => {
  currentScale = DEFAULT_SCALE;
  updateScale();
  resetEffect();
  previewImageElement.style.transform = 'scale(1)';
};

const onCloseUploadForm = () => {
  uploadOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadFormElement.reset();
  uploadFileElement.value = '';

  if (pristine) {
    pristine.reset();
  }

  resetFormState();
};

const openUploadForm = () => {
  uploadOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetFormState();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    const isInputFocused = evt.target === hashtagsInputElement || evt.target === descriptionInputElement;
    const isErrorVisible = document.querySelector('.error') !== null;

    if (!isInputFocused && !isErrorVisible) {
      evt.preventDefault();
      onCloseUploadForm();
    }
  }
}

const onLoadPreviewImage = (file) => {
  if (file) {
    const objectUrl = URL.createObjectURL(file);
    previewImageElement.src = objectUrl;

    const effectPreviewElements = document.querySelectorAll('.effects__preview');
    effectPreviewElements.forEach((preview) => {
      preview.style.backgroundImage = `url('${objectUrl}')`;
    });

    resetFormState();
  }
};

uploadFileElement.addEventListener('change', () => {
  if (uploadFileElement.files.length > 0) {
    onLoadPreviewImage(uploadFileElement.files[0]);
    openUploadForm();
  }
});

uploadCancelElement.addEventListener('click', onCloseUploadForm);

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

uploadFormElement.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  if (!pristine.validate()) {
    return;
  }

  const formData = new FormData(uploadFormElement);
  blockSubmitButton();

  try {
    await sendPhoto(formData);
    onCloseUploadForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    unblockSubmitButton();
  }
});

const init = () => {
  scaleControlSmallerElement.addEventListener('click', onScaleSmallerClick);
  scaleControlBiggerElement.addEventListener('click', onScaleBiggerClick);

  effectsRadioElements.forEach((radio) => {
    radio.addEventListener('change', onEffectChange);
  });

  initSlider();
  updateSliderVisibility();
};

init();
