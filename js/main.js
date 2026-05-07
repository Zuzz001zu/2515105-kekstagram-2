import { getPhotos } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';
import { initFilters } from './filters.js';
import { initAiHashtags } from './ai-hashtags.js';
import './upload-form.js';
import './validation.js';
import { showDataErrorMessage } from './util.js';

const picturesContainerElement = document.querySelector('.pictures');

let photos = [];

const clearThumbnails = () => {
  const pictureElements = picturesContainerElement.querySelectorAll('.picture');
  pictureElements.forEach((picture) => picture.remove());
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
    showDataErrorMessage();
  }
};

loadAndRenderPhotos();
initAiHashtags();

picturesContainerElement.addEventListener('click', (evt) => {
  const thumbnailElement = evt.target.closest('.picture[data-photo-id]');

  if (!thumbnailElement) {
    return;
  }

  const photoId = Number(thumbnailElement.dataset.photoId);
  const photo = photos.find(({ id }) => id === photoId);

  if (photo) {
    openBigPicture(photo);
  }
});
