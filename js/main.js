import { generatePhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const photos = generatePhotos();

renderThumbnails(photos);
