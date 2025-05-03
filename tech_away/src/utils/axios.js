import axios from 'axios';

axios.defaults.baseURL =
  'http://' +
  window.location.hostname + ':' + 4005;

axios.defaults.withCredentials = true;

export default axios;
