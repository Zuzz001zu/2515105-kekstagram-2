import { getPhotos } from './api.js';
import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';
import './upload-form.js';
import './validation.js';
import { showErrorMessage } from './util.js';

let photos = [];

const loadAndRenderPhotos = async () => {
  try {
    const data = await getPhotos();
    photos = data;
    renderThumbnails(photos);

    const imgFilters = document.querySelector('.img-filters');
    if (imgFilters) {
      imgFilters.classList.remove('img-filters--inactive');
    }
  } catch (error) {
    showErrorMessage(error.message);
  }
};

loadAndRenderPhotos();

const picturesContainer = document.querySelector('.pictures');

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
