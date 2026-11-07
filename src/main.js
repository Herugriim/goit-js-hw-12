import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  showLoader,
  hideLoader,
  createGallery,
} from './js/render-functions';

import { getImagesByQuery } from './js/pixabay-api';

const form = document.querySelector('.form');
hideLoader();

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const query = formData.get('search-text').trim();
  clearGallery();
  if (!query) {
    return;
  }
  showLoader();
  getImagesByQuery(query)
    .then(data => {
      if (data.hits.length > 0) {
        createGallery(data.hits);
      } else {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Failed to load images. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => hideLoader());
});
