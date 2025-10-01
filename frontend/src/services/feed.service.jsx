
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/feed/';

const getFeed = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const feedService = {
  getFeed,
};

export default feedService;
