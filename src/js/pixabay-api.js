import axios from 'axios';

const baseUrl = 'https://pixabay.com/api/';
const API_KEY = '49049131-65cfd826261c88d8551f302c6';

export const getImagesByQuery = query => {
  return axios
    .get(baseUrl, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => response.data);
};
