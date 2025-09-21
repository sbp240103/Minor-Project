
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:5000/repositories/';

const getAllRepositories = () => {
  return axios.get(API_URL);
};

const getRepository = (id) => {
  return axios.get(API_URL + id);
};

const uploadRepository = (formData) => {
  return axios.post(API_URL, formData, { headers: authHeader() });
};

const likeRepository = (id) => {
  return axios.post(API_URL + `like/${id}`, {}, { headers: authHeader() });
};

const unlikeRepository = (id) => {
  return axios.post(API_URL + `unlike/${id}`, {}, { headers: authHeader() });
};

const addComment = (id, text) => {
  return axios.post(API_URL + `comment/${id}`, { text }, { headers: authHeader() });
};

const deleteComment = (id, commentId) => {
  return axios.delete(API_URL + `comment/${id}/${commentId}`, { headers: authHeader() });
};

const getTrendingRepositories = () => {
  return axios.get(API_URL + 'trending');
};

const repositoryService = {
  getAllRepositories,
  getRepository,
  uploadRepository,
  likeRepository,
  unlikeRepository,
  addComment,
  deleteComment,
  getTrendingRepositories,
};

export default repositoryService;
