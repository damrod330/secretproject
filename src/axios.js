import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://37.233.102.142:9091/'
});

instance.interceptors.request.use(config => {
    const  token = localStorage.getItem('token');
    const type = localStorage.getItem('tokenType')
    config.headers= {
        Authorization: type + " " + token
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;
