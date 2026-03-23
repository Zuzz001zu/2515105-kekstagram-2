const picturesContainer = document.querySelector('.pictures');

function createThumbnail(photo) {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photo.url;
  thumbnail.querySelector('.picture__img').alt = photo.description;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

  return thumbnail;
}

export function renderThumbnails(photos) {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  picturesContainer.appendChild(fragment);
}
