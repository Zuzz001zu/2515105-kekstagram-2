import { pristine } from './validation.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const descriptionInput = uploadForm.querySelector('.text__description');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
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

uploadFile.addEventListener('change', () => {
  if (uploadFile.files.length > 0) {
    openUploadForm();
  }
});

uploadCancel.addEventListener('click', closeUploadForm);

uploadForm.method = 'post';
uploadForm.enctype = 'multipart/form-data';
uploadForm.action = 'https://25.javascript.pages.academy/kekstagram';

uploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});
