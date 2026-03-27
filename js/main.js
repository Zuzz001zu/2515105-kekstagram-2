import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const photos = generatePhotos();

renderThumbnails(photos);

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

