import { getPhotos } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';
import { initFilters } from './filters.js';
import './upload-form.js';
import './validation.js';
import { showErrorMessage } from './util.js';

const picturesContainer = document.querySelector('.pictures');

let photos = [];

const clearThumbnails = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const renderPhotos = (photosToRender) => {
  clearThumbnails();
  renderThumbnails(photosToRender);
};

const loadAndRenderPhotos = async () => {
  try {
    const data = await getPhotos();
    photos = data;
    renderPhotos(photos);
    initFilters(photos, renderPhotos);
  } catch (error) {
    showErrorMessage(error.message);
  }
};

loadAndRenderPhotos();

picturesContainer.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture[data-photo-id]');

  if (!thumbnail) {
    return;
  }

  const photoId = Number(thumbnail.dataset.photoId);
  const photo = photos.find(({ id }) => id === photoId);

  if (photo) {
    openBigPicture(photo);
  }
});

