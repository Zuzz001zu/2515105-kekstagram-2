const COMMENTS_PER_PAGE = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const commentShownCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const commentTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

let currentComments = [];
let shownCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  li.append(img, p);

  return li;
};

const renderNextComments = () => {
  const nextComments = currentComments.slice(shownCount, shownCount + COMMENTS_PER_PAGE);

  const fragment = document.createDocumentFragment();
  nextComments.forEach((comment) => fragment.append(createCommentElement(comment)));
  commentsListElement.append(fragment);

  shownCount += nextComments.length;
  commentShownCountElement.textContent = shownCount;

  if (shownCount >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
};

const renderComments = (comments) => {
  currentComments = comments;
  shownCount = 0;
  commentsListElement.innerHTML = '';
  commentTotalCountElement.textContent = comments.length;

  renderNextComments();
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (photo) => {
  bigPictureImgElement.src = photo.url;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  renderComments(photo.comments);

  commentCountElement.classList.remove('hidden');

  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

commentsLoaderElement.addEventListener('click', renderNextComments);
closeButtonElement.addEventListener('click', closeBigPicture);

export { openBigPicture };
