import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  clearGallery,
  showLoader,
  hideLoader,
  createGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import { getImagesByQuery } from './js/pixabay-api';

const form = document.querySelector('.form');
hideLoader();
const loadMoreBtn = document.querySelector('.btn-load-more');

let searchQuery = '';
let page = 1;

const loadImages = async () => {
  showLoader();
  hideLoadMoreButton();
  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (data.hits.length > 0) {
      createGallery(data.hits);
      if (page > 1) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      if (page * 15 < data.totalHits) {
        showLoadMoreButton();
      } else {
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Failed to load images. Please try again later.',
      position: 'topRight',
    });
    if (page > 1) {
      page--;
      showLoadMoreButton();
    }
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  searchQuery = formData.get('search-text').trim();

  if (!searchQuery) {
    return;
  }
  clearGallery();
  hideLoadMoreButton();
  page = 1;
  loadImages();
});

loadMoreBtn.addEventListener('click', () => {
  page += 1;
  loadImages();
});
