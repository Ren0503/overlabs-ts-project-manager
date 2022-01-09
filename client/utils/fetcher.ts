import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const publicFetch = axios.create({ baseURL });

export { publicFetch, baseURL };