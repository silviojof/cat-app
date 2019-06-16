import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1/';
axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;

export const fetchCats = async (id) => {
  let response = await axios.get(`${BASE_URL}images/search?limit=10&category_ids=${id}`);
  return await response.data;
};

export const fecthCategories = async () => {
  let response = await axios.get(`${BASE_URL}categories/`);
  return await response.data;
};