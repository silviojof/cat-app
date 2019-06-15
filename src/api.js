import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'a1ed7cf3-22c3-42aa-9e47-766b28c93fac';
const BASE_URL = 'https://api.thecatapi.com/v1/';

export const fetchCats = async (id) => {
  let response = await axios.get(`${BASE_URL}images/search?limit=10&category_ids=${id}`);
  return await response.data;
};

export const fecthCategories = async () => {
  let response = await axios.get(`${BASE_URL}categories/`);
  return await response.data;
};