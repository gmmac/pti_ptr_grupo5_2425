import axios from 'axios';

//localhost
axios.defaults.baseURL =
  window.location.protocol + '//' +
  window.location.hostname + ':' + 4005;

  //deploy
axios.defaults.baseURL =
  window.location.protocol + '//' +
  window.location.hostname;

axios.defaults.withCredentials = true;

export default axios;
