import axios from 'axios';

let backendUrl;

const ENV = process.env.NODE_ENV;
if (ENV !== undefined && ENV === 'production') {
  backendUrl = 'http://ec2-3-23-231-99.us-east-2.compute.amazonaws.com:3333';
} else {
  backendUrl = 'http://192.168.0.2:3333';
}

const api = axios.create({
  baseURL: backendUrl,
});

export default api;
