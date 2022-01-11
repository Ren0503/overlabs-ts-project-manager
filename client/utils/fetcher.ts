import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const publicFetch = axios.create({
    baseURL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
});

export { publicFetch, baseURL };