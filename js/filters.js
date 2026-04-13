const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;

let currentFilter = 'filter-default';
let currentPhotos = [];
let onFilterChangeCallback = null;

const getRandomPhotos = (photos) => {
  const shuffled = [...photos];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
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
  const button = evt.target.closest('.img-filters__button');
  if (!button || button.id === currentFilter) {
    return;
  }

  const filterButtons = document.querySelectorAll('.img-filters__button');

  filterButtons.forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });

  button.classList.add('img-filters__button--active');

  currentFilter = button.id;

  updatePhotosDebounced();
};

export const initFilters = (photos, renderCallback) => {
  currentPhotos = photos;
  onFilterChangeCallback = renderCallback;

  const filtersContainer = document.querySelector('.img-filters');

  if (!filtersContainer) {
    return;
  }

  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', onFilterClick);
};

export const resetFilter = () => {
  const defaultButton = document.querySelector('#filter-default');
  if (defaultButton && currentFilter !== 'filter-default') {
    defaultButton.click();
  }
};

