const createThumbnail = (photo) => {
  const templateElement = document.querySelector('#picture');
  const thumbnailElement = templateElement.content.cloneNode(true);

  thumbnailElement.querySelector('.picture__img').src = photo.url;
  thumbnailElement.querySelector('.picture__img').alt = photo.description;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;
  thumbnailElement.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnailElement.querySelector('.picture').dataset.photoId = photo.id;

  return thumbnailElement;
};

export const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();
  const picturesContainerElement = document.querySelector('.pictures');

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  picturesContainerElement.appendChild(fragment);
};
