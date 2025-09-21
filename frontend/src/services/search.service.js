
import axios from 'axios';

const API_URL = 'http://localhost:5000/search/';

const search = (query) => {
  return axios.post(API_URL, { query });
};

const searchService = {
  search,
};

export default searchService;
