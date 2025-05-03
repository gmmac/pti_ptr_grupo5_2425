import axios from 'axios';

axios.defaults.baseURL =
  window.location.protocol + '//' +
  window.location.hostname + ':' + 4005;

axios.defaults.withCredentials = true;

export default axios;
