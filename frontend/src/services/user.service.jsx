
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/users/';

const follow = (userId) => {
  return axios.post(API_URL + `follow/${userId}`, {}, { headers: authHeader() });
};

const unfollow = (userId) => {
  return axios.post(API_URL + `unfollow/${userId}`, {}, { headers: authHeader() });
};

const getUser = (userId) => {
  return axios.get(API_URL + userId);
};

const userService = {
  getUser,
  follow,
  unfollow,
};

export default userService;
