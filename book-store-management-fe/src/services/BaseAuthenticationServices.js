import axios from 'axios';

// Create a new instance of axios with default configurations
const api = axios.create({
  baseURL: 'http://103.173.229.92:6789/', // Replace with your API base URL
});

// Set the JWT token in the request headers
api.defaults.headers.common['Authorization'] = "Bearer "+window.localStorage.getItem('token');

export default api;


