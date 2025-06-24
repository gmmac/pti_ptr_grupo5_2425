import axios from 'axios';

axios.defaults.baseURL =
  window.location.protocol + '//' +
  window.location.hostname;

axios.defaults.withCredentials = true;

export default axios;
