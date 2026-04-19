const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let currentFilter = 'filter-default';
let currentPhotos = [];
let onFilterChangeCallback = null;

const getRandomPhotos = (photos) => {
  const photosCopy = [...photos];
  for (let i = photosCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [photosCopy[i], photosCopy[j]] = [photosCopy[j], photosCopy[i]];
  }
  return photosCopy.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case 'filter-random':
      return getRandomPhotos(currentPhotos);
    case 'filter-discussed':
      return getDiscussedPhotos(currentPhotos);
    default:
      return [...currentPhotos];
  }
};

const debounce = (callback, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

const updatePhotosDebounced = debounce(() => {
  if (onFilterChangeCallback) {
    const filteredPhotos = getFilteredPhotos();
    onFilterChangeCallback(filteredPhotos);
  }
}, DEBOUNCE_DELAY);

const onFilterClick = (evt) => {
  const buttonElement = evt.target.closest('.img-filters__button');
  if (!buttonElement || buttonElement.id === currentFilter) {
    return;
  }

  const filterButtonElements = document.querySelectorAll('.img-filters__button');
  filterButtonElements.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  buttonElement.classList.add('img-filters__button--active');
  currentFilter = buttonElement.id;

  updatePhotosDebounced();
};

export const initFilters = (photos, renderCallback) => {
  currentPhotos = photos;
  onFilterChangeCallback = renderCallback;

  const filtersContainerElement = document.querySelector('.img-filters');

  if (!filtersContainerElement) {
    return;
  }

  filtersContainerElement.classList.remove('img-filters--inactive');
  filtersContainerElement.addEventListener('click', onFilterClick);
};
