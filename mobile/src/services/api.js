import axios from 'axios';

// import { API_URL } from 'react-native-dotenv';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

export default api;
