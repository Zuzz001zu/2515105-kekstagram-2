import { pristine } from './validation.js';
import 'vendor/nouislider/nouislider.js';
import { sendPhoto } from './api.js';
import { showSuccessMessage, showErrorMessage } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadios = document.querySelectorAll('.effects__radio');

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
    step: 0.01,
    start: 1
  },
  'sepia': {
    style: 'sepia',
    unit: '',
    filter: (value) => `sepia(${value})`,
    min: 0,
    max: 1,
    step: 0.01,
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
  previewImage.style.transform = `scale(${scaleValue})`;
  scaleControlValue.value = `${currentScale}%`;
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
    previewImage.style.filter = 'none';
    effectLevelValue.value = '';
    return;
  }

  const sliderValue = parseFloat(effectLevelValue.value) || effect.start;
  const filterValue = effect.filter(sliderValue);
  previewImage.style.filter = filterValue;
};

const updateSliderVisibility = () => {
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');
  effectLevelContainer.classList.toggle('hidden', currentEffect === 'none');
};

const updateEffectLevel = (value) => {
  const effect = EFFECTS[currentEffect];
  if (!effect || currentEffect === 'none') {
    return;
  }

  const formattedValue = effect.unit === '%' ? Math.round(value) : parseFloat(value.toFixed(2));
  effectLevelValue.value = formattedValue;
  applyEffect();
};

const initSlider = () => {
  if (!effectLevelSlider.noUiSlider) {
    noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.01,
      connect: 'lower',
      format: {
        to: (value) => parseFloat(value.toFixed(2)),
        from: (value) => parseFloat(value)
      }
    });

    effectLevelSlider.noUiSlider.on('update', (values) => {
      const value = values[0];
      updateEffectLevel(value);
    });
  }
};

const updateSliderSettings = () => {
  const effect = EFFECTS[currentEffect];
  if (!effectLevelSlider.noUiSlider) {
    initSlider();
  }

  if (currentEffect === 'none') {
    updateSliderVisibility();
    return;
  }

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    step: effect.step,
    start: effect.start
  });

  effectLevelSlider.noUiSlider.set(effect.start);
  updateSliderVisibility();
};

const resetEffect = () => {
  currentEffect = 'none';
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
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
  previewImage.style.transform = 'scale(1)';
};

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetFormState();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadForm.reset();
  uploadFile.value = '';

  if (pristine) {
    pristine.reset();
  }

  resetFormState();
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    const isInputFocused = evt.target === hashtagsInput || evt.target === descriptionInput;

    if (!isInputFocused) {
      evt.preventDefault();
      closeUploadForm();
    }
  }
}

const loadPreviewImage = (file) => {
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    previewImage.src = reader.result;
    resetFormState();
  });

  if (file) {
    reader.readAsDataURL(file);
  }
};

uploadFile.addEventListener('change', () => {
  if (uploadFile.files.length > 0) {
    loadPreviewImage(uploadFile.files[0]);
    openUploadForm();
  }
});

uploadCancel.addEventListener('click', closeUploadForm);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикация...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

uploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(uploadForm);

  blockSubmitButton();

  try {
    await sendPhoto(formData);
    closeUploadForm();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    unblockSubmitButton();
  }
});

const init = () => {
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);

  effectsRadios.forEach((radio) => {
    radio.addEventListener('change', onEffectChange);
  });

  initSlider();
  updateSliderVisibility();
};

init();

