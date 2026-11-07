import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');
export const createGallery = images => {
  const markup = images
    .map(image => {
      return `<li class="item"><a href="${image.largeImageURL}"><img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" /></a><div class="info"><p><span>Likes</span> ${image.likes}</p><p><span>Views</span> ${image.views}</p><p><span>Comments</span> ${image.comments}</p><p><span>Downloads</span> ${image.downloads}</p></div></li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
};
export const clearGallery = () => {
  gallery.innerHTML = '';
};
export const showLoader = () => {
  loader.classList.remove('is-hidden');
};
export const hideLoader = () => {
  loader.classList.add('is-hidden');
};
