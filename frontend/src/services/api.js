import axios from 'axios';

let backendUrl;

const ENV = process.env.NODE_ENV;
if (ENV !== undefined && ENV === 'production') {
  backendUrl = 'https://backend.seuminu.com:443';
} else {
  backendUrl = 'http://192.168.0.2:3333';
}

const api = axios.create({
  baseURL: backendUrl,
});

export default api;
